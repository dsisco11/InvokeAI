import ParamDynamicPromptsCollapse from 'features/dynamicPrompts/components/ParamDynamicPromptsCollapse';
import ParamAdvancedCollapse from 'features/parameters/components/Advanced/ParamAdvancedCollapse';
import ControlAdaptersCollapse from 'features/controlAdapters/components/ControlAdaptersCollapse';
import { memo } from 'react';
import ParamSDXLRefinerCollapse from './ParamSDXLRefinerCollapse';
import SDXLImageToImageTabCoreParameters from './SDXLImageToImageTabCoreParameters';
import { SDXLPrompts } from 'features/sdxl/components/SDXLPrompts';
import LoRACollapse from 'features/lora/components/LoRACollapse';

const SDXLImageToImageTabParameters = () => {
  return (
    <>
      <SDXLPrompts />
      <SDXLImageToImageTabCoreParameters />
      <ParamSDXLRefinerCollapse />
      <ControlAdaptersCollapse />
      <LoRACollapse />
      <ParamDynamicPromptsCollapse />
      <ParamAdvancedCollapse />
    </>
  );
};

export default memo(SDXLImageToImageTabParameters);
