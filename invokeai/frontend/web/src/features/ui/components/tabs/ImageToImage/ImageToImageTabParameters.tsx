import ControlAdaptersCollapse from 'features/controlAdapters/components/ControlAdaptersCollapse';
import ParamDynamicPromptsCollapse from 'features/dynamicPrompts/components/ParamDynamicPromptsCollapse';
import LoRACollapse from 'features/lora/components/LoRACollapse';
import ParamAdvancedCollapse from 'features/parameters/components/Advanced/ParamAdvancedCollapse';
import { Prompts } from 'features/parameters/components/Prompts/Prompts';
import ParamSymmetryCollapse from 'features/parameters/components/Symmetry/ParamSymmetryCollapse';
import { memo } from 'react';

import ImageToImageTabCoreParameters from './ImageToImageTabCoreParameters';

const ImageToImageTabParameters = () => {
  return (
    <>
      <Prompts />
      <ImageToImageTabCoreParameters />
      <ControlAdaptersCollapse />
      <LoRACollapse />
      <ParamDynamicPromptsCollapse />
      <ParamSymmetryCollapse />
      <ParamAdvancedCollapse />
    </>
  );
};

export default memo(ImageToImageTabParameters);
