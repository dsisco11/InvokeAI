import ParamDynamicPromptsCollapse from 'features/dynamicPrompts/components/ParamDynamicPromptsCollapse';
import ParamLoraCollapse from 'features/lora/components/ParamLoraCollapse';
import ParamAdvancedCollapse from 'features/parameters/components/Advanced/ParamAdvancedCollapse';
import ControlAdaptersCollapse from 'features/controlAdapters/components/ControlAdaptersCollapse';
import ParamSymmetryCollapse from 'features/parameters/components/Symmetry/ParamSymmetryCollapse';
import ParamHrfCollapse from 'features/parameters/components/HighResFix/ParamHrfCollapse';
import { memo } from 'react';
import TextToImageTabCoreParameters from './TextToImageTabCoreParameters';
import { Prompts } from 'features/parameters/components/Prompts';

const TextToImageTabParameters = () => {
  return (
    <>
      <Prompts />
      <TextToImageTabCoreParameters />
      <ControlAdaptersCollapse />
      <ParamLoraCollapse />
      <ParamDynamicPromptsCollapse />
      <ParamSymmetryCollapse />
      <ParamHrfCollapse />
      <ParamAdvancedCollapse />
    </>
  );
};

export default memo(TextToImageTabParameters);
