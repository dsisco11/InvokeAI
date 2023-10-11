#!/usr/bin/env python
# Copyright (c) 2022 Lincoln D. Stein (https://github.com/lstein)
# Before running stable-diffusion on an internet-isolated machine,
# run this script from one with internet connectivity. The
# two machines must share a common .cache directory.

"""
This is the npyscreen frontend to the model installation application.
"""

import argparse
import curses
import sys
import traceback
from argparse import Namespace
from dataclasses import dataclass, field
from pathlib import Path
from shutil import get_terminal_size
from typing import Dict, List, Optional, Tuple

import npyscreen
import omegaconf
import torch
from npyscreen import widget
from pydantic import BaseModel

import invokeai.configs as configs
from invokeai.app.services.config import InvokeAIAppConfig
from invokeai.app.services.model_install_service import ModelInstallJob, ModelInstallService
from invokeai.backend.install.install_helper import InstallHelper, UnifiedModelInfo
from invokeai.backend.model_manager import BaseModelType, ModelType
from invokeai.backend.util import choose_precision, choose_torch_device
from invokeai.backend.util.logging import InvokeAILogger
from invokeai.frontend.install.widgets import (
    MIN_COLS,
    MIN_LINES,
    BufferBox,
    CenteredTitleText,
    CyclingForm,
    MultiSelectColumns,
    SingleSelectColumns,
    TextBox,
    WindowTooSmallException,
    set_min_terminal_size,
)

config = InvokeAIAppConfig.get_config()
logger = InvokeAILogger.get_logger()

# build a table mapping all non-printable characters to None
# for stripping control characters
# from https://stackoverflow.com/questions/92438/stripping-non-printable-characters-from-a-string-in-python
NOPRINT_TRANS_TABLE = {i: None for i in range(0, sys.maxunicode + 1) if not chr(i).isprintable()}

# maximum number of installed models we can display before overflowing vertically
MAX_OTHER_MODELS = 72


@dataclass
class InstallSelections:
    install_models: List[UnifiedModelInfo] = field(default_factory=list)
    remove_models: List[str] = field(default_factory=list)


def make_printable(s: str) -> str:
    """Replace non-printable characters in a string."""
    return s.translate(NOPRINT_TRANS_TABLE)


class addModelsForm(CyclingForm, npyscreen.FormMultiPage):
    """Main form for interactive TUI."""

    # for responsive resizing set to False, but this seems to cause a crash!
    FIX_MINIMUM_SIZE_WHEN_CREATED = True

    # for persistence
    current_tab = 0

    def __init__(self, parentApp, name, multipage=False, *args, **keywords):
        self.multipage = multipage
        self.subprocess = None
        super().__init__(parentApp=parentApp, name=name, *args, **keywords)

    def create(self):
        self.installer = self.parentApp.install_helper.installer
        self.model_labels = self._get_model_labels()
        self.keypress_timeout = 10
        self.counter = 0
        self.subprocess_connection = None

        window_width, window_height = get_terminal_size()

        self.nextrely -= 1
        self.add_widget_intelligent(
            npyscreen.FixedText,
            value="Use ctrl-N and ctrl-P to move to the <N>ext and <P>revious fields. Cursor keys navigate, and <space> selects.",
            editable=False,
            color="CAUTION",
        )
        self.nextrely += 1
        self.tabs = self.add_widget_intelligent(
            SingleSelectColumns,
            values=[
                "STARTERS",
                "MAINS",
                "CONTROLNETS",
                "T2I-ADAPTERS",
                "IP-ADAPTERS",
                "LORAS",
                "TI EMBEDDINGS",
            ],
            value=[self.current_tab],
            columns=7,
            max_height=2,
            relx=8,
            scroll_exit=True,
        )
        self.tabs.on_changed = self._toggle_tables

        top_of_table = self.nextrely
        self.starter_pipelines = self.add_starter_pipelines()
        bottom_of_table = self.nextrely

        self.nextrely = top_of_table
        self.pipeline_models = self.add_pipeline_widgets(
            model_type=ModelType.Main, window_width=window_width, exclude=self.starter_models
        )
        # self.pipeline_models['autoload_pending'] = True
        bottom_of_table = max(bottom_of_table, self.nextrely)

        self.nextrely = top_of_table
        self.controlnet_models = self.add_model_widgets(
            model_type=ModelType.ControlNet,
            window_width=window_width,
        )
        bottom_of_table = max(bottom_of_table, self.nextrely)

        self.nextrely = top_of_table
        self.t2i_models = self.add_model_widgets(
            model_type=ModelType.T2IAdapter,
            window_width=window_width,
        )
        bottom_of_table = max(bottom_of_table, self.nextrely)
        self.nextrely = top_of_table
        self.ipadapter_models = self.add_model_widgets(
            model_type=ModelType.IPAdapter,
            window_width=window_width,
        )
        bottom_of_table = max(bottom_of_table, self.nextrely)

        self.nextrely = top_of_table
        self.lora_models = self.add_model_widgets(
            model_type=ModelType.Lora,
            window_width=window_width,
        )
        bottom_of_table = max(bottom_of_table, self.nextrely)

        self.nextrely = top_of_table
        self.ti_models = self.add_model_widgets(
            model_type=ModelType.TextualInversion,
            window_width=window_width,
        )
        bottom_of_table = max(bottom_of_table, self.nextrely)

        self.nextrely = bottom_of_table + 1

        self.nextrely += 1
        back_label = "BACK"
        cancel_label = "CANCEL"
        current_position = self.nextrely
        if self.multipage:
            self.back_button = self.add_widget_intelligent(
                npyscreen.ButtonPress,
                name=back_label,
                when_pressed_function=self.on_back,
            )
        else:
            self.nextrely = current_position
            self.cancel_button = self.add_widget_intelligent(
                npyscreen.ButtonPress, name=cancel_label, when_pressed_function=self.on_cancel
            )
            self.nextrely = current_position

        label = "APPLY CHANGES"
        self.nextrely = current_position
        self.done = self.add_widget_intelligent(
            npyscreen.ButtonPress,
            name=label,
            relx=window_width - len(label) - 15,
            when_pressed_function=self.on_done,
        )

        # This restores the selected page on return from an installation
        for i in range(1, self.current_tab + 1):
            self.tabs.h_cursor_line_down(1)
        self._toggle_tables([self.current_tab])

    ############# diffusers tab ##########
    def add_starter_pipelines(self) -> dict[str, npyscreen.widget]:
        """Add widgets responsible for selecting diffusers models"""
        widgets = dict()

        all_models = self.all_models  # master dict of all models, indexed by key
        model_list = [x for x in self.starter_models if all_models[x].model_type in ["main", "vae"]]
        model_labels = [self.model_labels[x] for x in model_list]

        widgets.update(
            label1=self.add_widget_intelligent(
                CenteredTitleText,
                name="Select from a starter set of Stable Diffusion models from HuggingFace and Civitae.",
                editable=False,
                labelColor="CAUTION",
            )
        )

        self.nextrely -= 1
        # if user has already installed some initial models, then don't patronize them
        # by showing more recommendations
        show_recommended = len(self.installed_models) == 0

        checked = [
            model_list.index(x)
            for x in model_list
            if (show_recommended and all_models[x].recommended) or all_models[x].installed
        ]
        widgets.update(
            models_selected=self.add_widget_intelligent(
                MultiSelectColumns,
                columns=1,
                name="Install Starter Models",
                values=model_labels,
                value=checked,
                max_height=len(model_list) + 1,
                relx=4,
                scroll_exit=True,
            ),
            models=model_list,
        )

        self.nextrely += 1
        return widgets

    ############# Add a set of model install widgets ########
    def add_model_widgets(
        self,
        model_type: ModelType,
        window_width: int = 120,
        install_prompt: str = None,
        exclude: set = set(),
    ) -> dict[str, npyscreen.widget]:
        """Generic code to create model selection widgets"""
        widgets = dict()
        all_models = self.all_models
        model_list = [x for x in all_models if all_models[x].model_type == model_type and x not in exclude]
        model_labels = [self.model_labels[x] for x in model_list]

        show_recommended = len(self.installed_models) == 0
        truncated = False
        if len(model_list) > 0:
            max_width = max([len(x) for x in model_labels])
            columns = window_width // (max_width + 8)  # 8 characters for "[x] " and padding
            columns = min(len(model_list), columns) or 1
            prompt = (
                install_prompt
                or f"Select the desired {model_type.value.title()} models to install. Unchecked models will be purged from disk."
            )

            widgets.update(
                label1=self.add_widget_intelligent(
                    CenteredTitleText,
                    name=prompt,
                    editable=False,
                    labelColor="CAUTION",
                )
            )

            if len(model_labels) > MAX_OTHER_MODELS:
                model_labels = model_labels[0:MAX_OTHER_MODELS]
                truncated = True

            widgets.update(
                models_selected=self.add_widget_intelligent(
                    MultiSelectColumns,
                    columns=columns,
                    name=f"Install {model_type} Models",
                    values=model_labels,
                    value=[
                        model_list.index(x)
                        for x in model_list
                        if (show_recommended and all_models[x].recommended) or all_models[x].installed
                    ],
                    max_height=len(model_list) // columns + 1,
                    relx=4,
                    scroll_exit=True,
                ),
                models=model_list,
            )

        if truncated:
            widgets.update(
                warning_message=self.add_widget_intelligent(
                    npyscreen.FixedText,
                    value=f"Too many models to display (max={MAX_OTHER_MODELS}). Some are not displayed.",
                    editable=False,
                    color="CAUTION",
                )
            )

        self.nextrely += 1
        widgets.update(
            download_ids=self.add_widget_intelligent(
                TextBox,
                name="Additional URLs, or HuggingFace repo_ids to install (Space separated. Use shift-control-V to paste):",
                max_height=6,
                scroll_exit=True,
                editable=True,
            )
        )
        return widgets

    ### Tab for arbitrary diffusers widgets ###
    def add_pipeline_widgets(
        self,
        model_type: ModelType = ModelType.Main,
        window_width: int = 120,
        **kwargs,
    ) -> dict[str, npyscreen.widget]:
        """Similar to add_model_widgets() but adds some additional widgets at the bottom
        to support the autoload directory"""
        widgets = self.add_model_widgets(
            model_type=model_type,
            window_width=window_width,
            install_prompt=f"Installed {model_type.value.title()} models. Unchecked models in the InvokeAI root directory will be deleted. Enter URLs, paths or repo_ids to import.",
            **kwargs,
        )

        return widgets

    def resize(self):
        super().resize()
        if s := self.starter_pipelines.get("models_selected"):
            s.values = [self.model_labels[x] for x in self.starter_pipelines.get("models")]

    def _toggle_tables(self, value=None):
        selected_tab = value[0]
        widgets = [
            self.starter_pipelines,
            self.pipeline_models,
            self.controlnet_models,
            self.t2i_models,
            self.ipadapter_models,
            self.lora_models,
            self.ti_models,
        ]

        for group in widgets:
            for k, v in group.items():
                try:
                    v.hidden = True
                    v.editable = False
                except Exception:
                    pass
        for k, v in widgets[selected_tab].items():
            try:
                v.hidden = False
                if not isinstance(v, (npyscreen.FixedText, npyscreen.TitleFixedText, CenteredTitleText)):
                    v.editable = True
            except Exception:
                pass
        self.__class__.current_tab = selected_tab  # for persistence
        self.display()

    def _get_model_labels(self) -> dict[str, str]:
        """Return a list of trimmed labels for all models."""
        window_width, window_height = get_terminal_size()
        checkbox_width = 4
        spacing_width = 2
        result = dict()

        models = self.all_models
        label_width = max([len(models[x].name) for x in self.starter_models])
        description_width = window_width - label_width - checkbox_width - spacing_width

        for key in self.all_models:
            description = models[key].description
            description = (
                description[0 : description_width - 3] + "..."
                if description and len(description) > description_width
                else description
                if description
                else ""
            )
            result[key] = f"%-{label_width}s %s" % (models[key].name, description)

        return result

    def _get_columns(self) -> int:
        window_width, window_height = get_terminal_size()
        cols = 4 if window_width > 240 else 3 if window_width > 160 else 2 if window_width > 80 else 1
        return min(cols, len(self.installed_models))

    def confirm_deletions(self, selections: InstallSelections) -> bool:
        remove_models = selections.remove_models
        if len(remove_models) > 0:
            mods = "\n".join([self.all_models[x].name for x in remove_models])
            return npyscreen.notify_ok_cancel(
                f"These unchecked models will be deleted from disk. Continue?\n---------\n{mods}"
            )
        else:
            return True

    @property
    def all_models(self) -> Dict[str, UnifiedModelInfo]:
        return self.parentApp.install_helper.all_models

    @property
    def starter_models(self) -> List[str]:
        return self.parentApp.install_helper._starter_models

    @property
    def installed_models(self) -> List[str]:
        return self.parentApp.install_helper._installed_models

    def on_back(self):
        self.parentApp.switchFormPrevious()
        self.editing = False

    def on_cancel(self):
        self.parentApp.setNextForm(None)
        self.parentApp.user_cancelled = True
        self.editing = False

    def on_done(self):
        self.marshall_arguments()
        if not self.confirm_deletions(self.parentApp.install_selections):
            return
        self.parentApp.setNextForm(None)
        self.parentApp.user_cancelled = False
        self.editing = False

    def marshall_arguments(self):
        """
        Assemble arguments and store as attributes of the application:
        .starter_models: dict of model names to install from INITIAL_CONFIGURE.yaml
                         True  => Install
                         False => Remove
        .scan_directory: Path to a directory of models to scan and import
        .autoscan_on_startup:  True if invokeai should scan and import at startup time
        .import_model_paths:   list of URLs, repo_ids and file paths to import
        """
        selections = self.parentApp.install_selections
        all_models = self.all_models

        # Defined models (in INITIAL_CONFIG.yaml or models.yaml) to add/remove
        ui_sections = [
            self.starter_pipelines,
            self.pipeline_models,
            self.controlnet_models,
            self.t2i_models,
            self.ipadapter_models,
            self.lora_models,
            self.ti_models,
        ]
        for section in ui_sections:
            if "models_selected" not in section:
                continue
            selected = set([section["models"][x] for x in section["models_selected"].value])
            models_to_install = [x for x in selected if not self.all_models[x].installed]
            models_to_remove = [x for x in section["models"] if x not in selected and self.all_models[x].installed]
            selections.remove_models.extend(models_to_remove)
            selections.install_models.extend([all_models[x] for x in models_to_install])

        # models located in the 'download_ids" section
        for section in ui_sections:
            if downloads := section.get("download_ids"):
                models = [UnifiedModelInfo(source=x) for x in downloads.value.split()]
                selections.install_models.extend(models)

        # NOT NEEDED - DONE IN BACKEND NOW
        # # special case for the ipadapter_models. If any of the adapters are
        # # chosen, then we add the corresponding encoder(s) to the install list.
        # section = self.ipadapter_models
        # if section.get("models_selected"):
        #     selected_adapters = [
        #         self.all_models[section["models"][x]].name for x in section.get("models_selected").value
        #     ]
        #     encoders = []
        #     if any(["sdxl" in x for x in selected_adapters]):
        #         encoders.append("ip_adapter_sdxl_image_encoder")
        #     if any(["sd15" in x for x in selected_adapters]):
        #         encoders.append("ip_adapter_sd_image_encoder")
        #     for encoder in encoders:
        #         key = f"any/clip_vision/{encoder}"
        #         repo_id = f"InvokeAI/{encoder}"
        #         if key not in self.all_models:
        #             selections.install_models.append(repo_id)


class AddModelApplication(npyscreen.NPSAppManaged):
    def __init__(self, opt: Namespace, install_helper: InstallHelper):
        super().__init__()
        self.program_opts = opt
        self.user_cancelled = False
        self.install_selections = InstallSelections()
        self.install_helper = install_helper

    def onStart(self):
        npyscreen.setTheme(npyscreen.Themes.DefaultTheme)
        self.main_form = self.addForm(
            "MAIN",
            addModelsForm,
            name="Install Stable Diffusion Models",
            cycle_widgets=False,
        )


def list_models(installer: ModelInstallService, model_type: ModelType):
    """Print out all models of type model_type."""
    models = installer.store.search_by_name(model_type=model_type)
    print(f"Installed models of type `{model_type}`:")
    for model in models:
        path = (config.models_path / model.path).resolve()
        print(f"{model.name:40}{model.base_model.value:14}{path}")


# --------------------------------------------------------
def select_and_download_models(opt: Namespace):
    """Prompt user for install/delete selections and execute."""
    precision = "float32" if opt.full_precision else choose_precision(torch.device(choose_torch_device()))
    config.precision = precision
    install_helper = InstallHelper(config)
    installer = install_helper.installer

    if opt.list_models:
        list_models(installer, opt.list_models)

    elif opt.add or opt.delete:
        selections = InstallSelections(
            install_models=[UnifiedModelInfo(source=x) for x in (opt.add or [])], remove_models=opt.delete or []
        )
        install_helper.add_or_delete(selections)

    elif opt.default_only:
        selections = InstallSelections(install_models=[initial_models.default_model()])
        install_helper.add_or_delete(selections)

    elif opt.yes_to_all:
        selections = InstallSelections(install_models=initial_models.recommended_models())
        install_helper.add_or_delete(selections)

    # this is where the TUI is called
    else:
        if not set_min_terminal_size(MIN_COLS, MIN_LINES):
            raise WindowTooSmallException(
                "Could not increase terminal size. Try running again with a larger window or smaller font size."
            )

        installApp = AddModelApplication(opt, install_helper)
        try:
            installApp.run()
        except KeyboardInterrupt as e:
            print("Aborted...")
            sys.exit(-1)

        install_helper.add_or_delete(installApp.install_selections)


# -------------------------------------
def main():
    parser = argparse.ArgumentParser(description="InvokeAI model downloader")
    parser.add_argument(
        "--add",
        nargs="*",
        help="List of URLs, local paths or repo_ids of models to install",
    )
    parser.add_argument(
        "--delete",
        nargs="*",
        help="List of names of models to delete. Use type:name to disambiguate, as in `controlnet:my_model`",
    )
    parser.add_argument(
        "--full-precision",
        dest="full_precision",
        action=argparse.BooleanOptionalAction,
        type=bool,
        default=False,
        help="use 32-bit weights instead of faster 16-bit weights",
    )
    parser.add_argument(
        "--yes",
        "-y",
        dest="yes_to_all",
        action="store_true",
        help='answer "yes" to all prompts',
    )
    parser.add_argument(
        "--default_only",
        action="store_true",
        help="Only install the default model",
    )
    parser.add_argument(
        "--list-models",
        choices=[x.value for x in ModelType],
        help="list installed models",
    )
    parser.add_argument(
        "--root_dir",
        dest="root",
        type=str,
        default=None,
        help="path to root of install directory",
    )
    opt = parser.parse_args()

    invoke_args = []
    if opt.root:
        invoke_args.extend(["--root", opt.root])
    if opt.full_precision:
        invoke_args.extend(["--precision", "float32"])
    config.parse_args(invoke_args)
    logger = InvokeAILogger().get_logger(config=config)

    if not config.model_conf_path.exists():
        logger.info("Your InvokeAI root directory is not set up. Calling invokeai-configure.")
        from invokeai.frontend.install.invokeai_configure import invokeai_configure

        invokeai_configure()
        sys.exit(0)

    try:
        select_and_download_models(opt)
    except AssertionError as e:
        logger.error(e)
        sys.exit(-1)
    except KeyboardInterrupt:
        curses.nocbreak()
        curses.echo()
        curses.endwin()
        logger.info("Goodbye! Come back soon.")
    except WindowTooSmallException as e:
        logger.error(str(e))
    except widget.NotEnoughSpaceForWidget as e:
        if str(e).startswith("Height of 1 allocated"):
            logger.error("Insufficient vertical space for the interface. Please make your window taller and try again")
        input("Press any key to continue...")
    except Exception as e:
        if str(e).startswith("addwstr"):
            logger.error(
                "Insufficient horizontal space for the interface. Please make your window wider and try again."
            )
        else:
            print(f"An exception has occurred: {str(e)} Details:")
            print(traceback.format_exc(), file=sys.stderr)
        input("Press any key to continue...")


# -------------------------------------
if __name__ == "__main__":
    main()
