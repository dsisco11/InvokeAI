import ParamDynamicPromptsCollapse from 'features/dynamicPrompts/components/ParamDynamicPromptsCollapse';
import ParamAdvancedCollapse from 'features/parameters/components/Advanced/ParamAdvancedCollapse';
import ControlAdaptersCollapse from 'features/controlAdapters/components/ControlAdaptersCollapse';
import TextToImageTabCoreParameters from 'features/ui/components/tabs/TextToImage/TextToImageTabCoreParameters';
import { memo } from 'react';
import ParamSDXLRefinerCollapse from './ParamSDXLRefinerCollapse';
import { SDXLPrompts } from 'features/sdxl/components/SDXLPrompts';
import LoRACollapse from 'features/lora/components/LoRACollapse';

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
