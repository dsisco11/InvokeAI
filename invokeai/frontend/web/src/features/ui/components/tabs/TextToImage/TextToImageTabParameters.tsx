import ControlAdaptersCollapse from 'features/controlAdapters/components/ControlAdaptersCollapse';
import ParamDynamicPromptsCollapse from 'features/dynamicPrompts/components/ParamDynamicPromptsCollapse';
import { ImageSettings } from 'features/ImageSettings/ImageSettings';
import LoRACollapse from 'features/lora/components/LoRACollapse';
import ParamAdvancedCollapse from 'features/parameters/components/Advanced/ParamAdvancedCollapse';
import ParamHrfCollapse from 'features/parameters/components/HighResFix/ParamHrfCollapse';
import { Prompts } from 'features/parameters/components/Prompts/Prompts';
import ParamSymmetryCollapse from 'features/parameters/components/Symmetry/ParamSymmetryCollapse';
import { memo } from 'react';

import TextToImageTabCoreParameters from './TextToImageTabCoreParameters';

const TextToImageTabParameters = () => {
  return (
    <>
      <Prompts />
      <ImageSettings />
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
