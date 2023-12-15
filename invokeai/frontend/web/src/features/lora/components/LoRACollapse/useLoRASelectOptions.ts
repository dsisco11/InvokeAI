import { createMemoizedSelector } from 'app/store/createMemoizedSelector';
import { RootState, stateSelector } from 'app/store/store';
import { useAppSelector } from 'app/store/storeHooks';
import { GroupBase } from 'chakra-react-select';
import { InvSelectOption } from 'common/components/';
import { t } from 'i18next';
import { groupBy, reduce } from 'lodash-es';
import { useMemo } from 'react';
import {
  loraModelsAdapter,
  useGetLoRAModelsQuery,
} from 'services/api/endpoints/models';

const selector = createMemoizedSelector(stateSelector, ({ lora }) => ({
  addedLoRAs: lora.loras,
}));

const getTooltip = (
  hasMainModel: boolean,
  isCompatible: boolean,
  isAdded: boolean
): string | undefined => {
  if (!hasMainModel) {
    return t('models.noMainModelSelected');
  }
  if (!isCompatible) {
    return t('models.incompatibleBaseModel');
  }
  if (isAdded) {
    return t('models.loraAlreadyAdded');
  }
};

export const useLoRASelectOptions = () => {
  const { addedLoRAs } = useAppSelector(selector);
  const { data } = useGetLoRAModelsQuery();
  const currentBaseModel = useAppSelector(
    (state: RootState) => state.generation.model?.base_model
  );

  const options = useMemo(() => {
    if (!data) {
      return [];
    }
    const lorasArray = loraModelsAdapter.getSelectors().selectAll(data);
    const lorasGroupedByBaseModel = groupBy(
      lorasArray,
      (lora) => lora.base_model
    );
    const hasMainModel = Boolean(currentBaseModel);
    const _options = reduce(
      lorasGroupedByBaseModel,
      (result, group, label) => {
        const options = group
          // Map LoRAs to options
          .map((lora) => {
            const isCompatible = currentBaseModel !== lora.base_model;
            const isAdded = Boolean(addedLoRAs[lora.id]);
            const tooltip = getTooltip(hasMainModel, isCompatible, isAdded);
            const isDisabled = !hasMainModel || !isCompatible || isAdded;
            return {
              value: lora.id,
              label: lora.model_name,
              isDisabled,
              tooltip,
            };
          })
          // Sort by label
          .sort((a, b) => (a.label && !b.label ? 1 : -1));
        result.push({ label, options });
        return result;
      },
      [] as GroupBase<InvSelectOption>[]
    );

    // Sort the groups such that LoRAs w/ current main model are on top
    _options.sort((a) => (a.label === currentBaseModel ? -1 : 1));

    return _options;
  }, [data, currentBaseModel, addedLoRAs]);

  return options;
};
