import ControlAdaptersCollapse from 'features/controlAdapters/components/ControlAdaptersCollapse';
import ParamHrfCollapse from 'features/parameters/components/HighResFix/ParamHrfCollapse';
import { Prompts } from 'features/parameters/components/Prompts/Prompts';
import { AdvancedSettingsAccordion } from 'features/settingsAccordions/AdvancedSettingsAccordion/AdvancedSettingsAccordion';
import { GenerationSettingsAccordion } from 'features/settingsAccordions/GenerationSettingsAccordion/GenerationSettingsAccordion';
import { ImageSettingsAccordion } from 'features/settingsAccordions/ImageSettingsAccordion/ImageSettingsAccordion';
import { memo } from 'react';

const TextToImageTabParameters = () => {
  return (
    <>
      <Prompts />
      <ImageSettingsAccordion />
      <GenerationSettingsAccordion />
      <AdvancedSettingsAccordion />
      <ControlAdaptersCollapse />
      <ParamHrfCollapse />
    </>
  );
};

export default memo(TextToImageTabParameters);
