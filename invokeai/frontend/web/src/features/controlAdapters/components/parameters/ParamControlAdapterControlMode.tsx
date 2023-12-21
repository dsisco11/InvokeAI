import { useAppDispatch } from 'app/store/storeHooks';
import type { InvSelectOnChange } from 'common/components';
import { InvControl, InvSelect } from 'common/components';
import IAIInformationalPopover from 'common/components/IAIInformationalPopover/IAIInformationalPopover';
import { useControlAdapterControlMode } from 'features/controlAdapters/hooks/useControlAdapterControlMode';
import { useControlAdapterIsEnabled } from 'features/controlAdapters/hooks/useControlAdapterIsEnabled';
import { controlAdapterControlModeChanged } from 'features/controlAdapters/store/controlAdaptersSlice';
import type { ControlMode } from 'features/controlAdapters/store/types';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  id: string;
};

export default function ParamControlAdapterControlMode({ id }: Props) {
  const isEnabled = useControlAdapterIsEnabled(id);
  const controlMode = useControlAdapterControlMode(id);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const CONTROL_MODE_DATA = useMemo(
    () => [
      { label: t('controlnet.balanced'), value: 'balanced' },
      { label: t('controlnet.prompt'), value: 'more_prompt' },
      { label: t('controlnet.control'), value: 'more_control' },
      { label: t('controlnet.megaControl'), value: 'unbalanced' },
    ],
    [t]
  );

  const handleControlModeChange = useCallback<InvSelectOnChange>(
    (v) => {
      if (!v) {
        return;
      }
      dispatch(
        controlAdapterControlModeChanged({
          id,
          controlMode: v.value as ControlMode,
        })
      );
    },
    [id, dispatch]
  );

  const value = useMemo(
    () => CONTROL_MODE_DATA.filter((o) => o.value === controlMode)[0],
    [CONTROL_MODE_DATA, controlMode]
  );

  if (!controlMode) {
    return null;
  }

  return (
    <IAIInformationalPopover feature="controlNetControlMode">
      <InvControl isDisabled={!isEnabled} label={t('controlnet.controlMode')}>
        <InvSelect
          value={value}
          options={CONTROL_MODE_DATA}
          onChange={handleControlModeChange}
        />
      </InvControl>
    </IAIInformationalPopover>
  );
}
