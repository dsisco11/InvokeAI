import ParamDynamicPromptsCollapse from 'features/dynamicPrompts/components/ParamDynamicPromptsCollapse';
import ParamAdvancedCollapse from 'features/parameters/components/Advanced/ParamAdvancedCollapse';
import ParamCompositingSettingsCollapse from 'features/parameters/components/Canvas/Compositing/ParamCompositingSettingsCollapse';
import ParamInfillAndScalingCollapse from 'features/parameters/components/Canvas/InfillAndScaling/ParamInfillAndScalingCollapse';
import ControlAdaptersCollapse from 'features/controlAdapters/components/ControlAdaptersCollapse';
import ParamSDXLRefinerCollapse from './ParamSDXLRefinerCollapse';
import SDXLUnifiedCanvasTabCoreParameters from './SDXLUnifiedCanvasTabCoreParameters';
import { SDXLPrompts } from 'features/sdxl/components/SDXLPrompts';
import LoRACollapse from 'features/lora/components/LoRACollapse';

export default function SDXLUnifiedCanvasTabParameters() {
  return (
    <>
      <SDXLPrompts />
      <SDXLUnifiedCanvasTabCoreParameters />
      <ParamSDXLRefinerCollapse />
      <ControlAdaptersCollapse />
      <LoRACollapse />
      <ParamDynamicPromptsCollapse />
      <ParamInfillAndScalingCollapse />
      <ParamCompositingSettingsCollapse />
      <ParamAdvancedCollapse />
    </>
  );
}
