import { Box, Flex } from '@chakra-ui/react';
import { RootState } from 'app/store/store';
import { useAppDispatch, useAppSelector } from 'app/store/storeHooks';
import {
  InvControl,
  InvIconButton,
  InvSelect,
  InvSelectOnChange,
  InvSelectOption,
  InvText,
} from 'common/components';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { FaTimes } from 'react-icons/fa';
import { setAdvancedAddScanModel } from 'features/modelManager/store/modelManagerSlice';
import AdvancedAddCheckpoint from './AdvancedAddCheckpoint';
import AdvancedAddDiffusers from './AdvancedAddDiffusers';
import { ManualAddMode, isManualAddMode } from './AdvancedAddModels';
import { useTranslation } from 'react-i18next';

export default function ScanAdvancedAddModels() {
  const advancedAddScanModel = useAppSelector(
    (state: RootState) => state.modelmanager.advancedAddScanModel
  );

  const { t } = useTranslation();

  const options: InvSelectOption[] = useMemo(
    () => [
      { label: t('modelManager.diffusersModels'), value: 'diffusers' },
      { label: t('modelManager.checkpointOrSafetensors'), value: 'checkpoint' },
    ],
    [t]
  );

  const [advancedAddMode, setAdvancedAddMode] =
    useState<ManualAddMode>('diffusers');

  const [isCheckpoint, setIsCheckpoint] = useState<boolean>(true);

  useEffect(() => {
    advancedAddScanModel &&
    ['.ckpt', '.safetensors', '.pth', '.pt'].some((ext) =>
      advancedAddScanModel.endsWith(ext)
    )
      ? setAdvancedAddMode('checkpoint')
      : setAdvancedAddMode('diffusers');
  }, [advancedAddScanModel, setAdvancedAddMode, isCheckpoint]);

  const dispatch = useAppDispatch();

  const handleClickSetAdvanced = useCallback(
    () => dispatch(setAdvancedAddScanModel(null)),
    [dispatch]
  );

  const handleChangeAddMode = useCallback<InvSelectOnChange>((v) => {
    if (!isManualAddMode(v?.value)) {
      return;
    }
    setAdvancedAddMode(v.value);
    if (v.value === 'checkpoint') {
      setIsCheckpoint(true);
    } else {
      setIsCheckpoint(false);
    }
  }, []);

  const value = useMemo(
    () => options.find((o) => o.value === advancedAddMode),
    [options, advancedAddMode]
  );

  if (!advancedAddScanModel) {
    return null;
  }

  return (
    <Box
      as={motion.div}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1, transition: { duration: 0.2 } }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minWidth: '40%',
        maxHeight: window.innerHeight - 300,
        overflow: 'scroll',
        p: 4,
        gap: 4,
        borderRadius: 4,
        bg: 'base.800',
      }}
    >
      <Flex justifyContent="space-between" alignItems="center">
        <InvText size="xl" fontWeight={600}>
          {isCheckpoint || advancedAddMode === 'checkpoint'
            ? 'Add Checkpoint Model'
            : 'Add Diffusers Model'}
        </InvText>
        <InvIconButton
          icon={<FaTimes />}
          aria-label={t('modelManager.closeAdvanced')}
          onClick={handleClickSetAdvanced}
          size="sm"
        />
      </Flex>
      <InvControl label={t('modelManager.modelType')}>
        <InvSelect
          value={value}
          options={options}
          onChange={handleChangeAddMode}
        />
      </InvControl>
      {isCheckpoint ? (
        <AdvancedAddCheckpoint
          key={advancedAddScanModel}
          model_path={advancedAddScanModel}
        />
      ) : (
        <AdvancedAddDiffusers
          key={advancedAddScanModel}
          model_path={advancedAddScanModel}
        />
      )}
    </Box>
  );
}
