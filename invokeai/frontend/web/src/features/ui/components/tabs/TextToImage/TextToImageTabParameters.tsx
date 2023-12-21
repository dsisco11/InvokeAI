import ControlAdaptersCollapse from 'features/controlAdapters/components/ControlAdaptersCollapse';
import ParamDynamicPromptsCollapse from 'features/dynamicPrompts/components/ParamDynamicPromptsCollapse';
import LoRACollapse from 'features/lora/components/LoRACollapse';
import ParamAdvancedCollapse from 'features/parameters/components/Advanced/ParamAdvancedCollapse';
import ParamHrfCollapse from 'features/parameters/components/HighResFix/ParamHrfCollapse';
import { Prompts } from 'features/parameters/components/Prompts/Prompts';
import ParamSymmetryCollapse from 'features/parameters/components/Symmetry/ParamSymmetryCollapse';
import { AdvancedSettingsAccordion } from 'features/settingsAccordions/AdvancedSettingsAccordion/AdvancedSettingsAccordion';
import { GenerationSettingsAccordion } from 'features/settingsAccordions/GenerationSettingsAccordion/GenerationSettingsAccordion';
import { ImageSettingsAccordion } from 'features/settingsAccordions/ImageSettingsAccordion/ImageSettingsAccordion';
import { memo } from 'react';

import TextToImageTabCoreParameters from './TextToImageTabCoreParameters';

const TextToImageTabParameters = () => {
  return (
    <>
      <Prompts />
      <ImageSettingsAccordion />
      <GenerationSettingsAccordion />
      <AdvancedSettingsAccordion />
      <TextToImageTabCoreParameters />
      <ControlAdaptersCollapse />
      <LoRACollapse />
      <ParamDynamicPromptsCollapse />
      <ParamSymmetryCollapse />
      <ParamHrfCollapse />
      <ParamAdvancedCollapse />
    </>
  );
};

export default memo(TextToImageTabParameters);
