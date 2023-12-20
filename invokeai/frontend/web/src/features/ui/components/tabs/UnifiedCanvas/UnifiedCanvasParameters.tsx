import ParamDynamicPromptsCollapse from 'features/dynamicPrompts/components/ParamDynamicPromptsCollapse';
import ParamAdvancedCollapse from 'features/parameters/components/Advanced/ParamAdvancedCollapse';
import ParamCompositingSettingsCollapse from 'features/parameters/components/Canvas/Compositing/ParamCompositingSettingsCollapse';
import ParamInfillAndScalingCollapse from 'features/parameters/components/Canvas/InfillAndScaling/ParamInfillAndScalingCollapse';
import ControlAdaptersCollapse from 'features/controlAdapters/components/ControlAdaptersCollapse';
import ParamSymmetryCollapse from 'features/parameters/components/Symmetry/ParamSymmetryCollapse';
import { memo } from 'react';
import UnifiedCanvasCoreParameters from './UnifiedCanvasCoreParameters';
import { Prompts } from 'features/parameters/components/Prompts';
import LoRACollapse from 'features/lora/components/LoRACollapse';

const UnifiedCanvasParameters = () => {
  return (
    <>
      <Prompts />
      <UnifiedCanvasCoreParameters />
      <ControlAdaptersCollapse />
      <LoRACollapse />
      <ParamDynamicPromptsCollapse />
      <ParamSymmetryCollapse />
      <ParamInfillAndScalingCollapse />
      <ParamCompositingSettingsCollapse />
      <ParamAdvancedCollapse />
    </>
  );
};

export default memo(UnifiedCanvasParameters);
