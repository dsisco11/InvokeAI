import ControlAdaptersCollapse from 'features/controlAdapters/components/ControlAdaptersCollapse';
import ParamDynamicPromptsCollapse from 'features/dynamicPrompts/components/ParamDynamicPromptsCollapse';
import LoRACollapse from 'features/lora/components/LoRACollapse';
import ParamAdvancedCollapse from 'features/parameters/components/Advanced/ParamAdvancedCollapse';
import { SDXLPrompts } from 'features/sdxl/components/SDXLPrompts';
import TextToImageTabCoreParameters from 'features/ui/components/tabs/TextToImage/TextToImageTabCoreParameters';
import { memo } from 'react';

import ParamSDXLRefinerCollapse from './ParamSDXLRefinerCollapse';

const SDXLTextToImageTabParameters = () => {
  return (
    <>
      <SDXLPrompts />
      <TextToImageTabCoreParameters />
      <ParamSDXLRefinerCollapse />
      <ControlAdaptersCollapse />
      <LoRACollapse />
      <ParamDynamicPromptsCollapse />
      <ParamAdvancedCollapse />
    </>
  );
};

export default memo(SDXLTextToImageTabParameters);
