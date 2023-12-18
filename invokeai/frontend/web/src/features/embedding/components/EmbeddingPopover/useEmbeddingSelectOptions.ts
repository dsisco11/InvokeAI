import { RootState } from 'app/store/store';
import { useAppSelector } from 'app/store/storeHooks';
import { GroupBase } from 'chakra-react-select';
import { InvSelectOption } from 'common/components/';
import { t } from 'i18next';
import { groupBy, reduce } from 'lodash-es';
import { useMemo } from 'react';
import {
  textualInversionModelsAdapter,
  useGetTextualInversionModelsQuery,
} from 'services/api/endpoints/models';

const getTooltip = (
  hasMainModel: boolean,
  isCompatible: boolean
): string | undefined => {
  if (!hasMainModel) {
    return t('models.noMainModelSelected');
  }
  if (!isCompatible) {
    return t('models.incompatibleBaseModel');
  }
};

export const useEmbeddingSelectOptions = () => {
  const { data, isLoading } = useGetTextualInversionModelsQuery();
  const currentBaseModel = useAppSelector(
    (state: RootState) => state.generation.model?.base_model
  );

  const options = useMemo(() => {
    if (!data) {
      return [];
    }
    const embeddingsArray = textualInversionModelsAdapter
      .getSelectors()
      .selectAll(data);
    const embeddingsGroupedByBaseModel = groupBy(
      embeddingsArray,
      (embedding) => embedding.base_model
    );
    const hasMainModel = Boolean(currentBaseModel);
    const _options = reduce(
      embeddingsGroupedByBaseModel,
      (result, group, label) => {
        const options = group
          // Map LoRAs to options
          .map((embedding) => {
            const isCompatible = currentBaseModel === embedding.base_model;
            const tooltip = getTooltip(hasMainModel, isCompatible);
            const isDisabled = !hasMainModel || !isCompatible;
            return {
              value: embedding.model_name,
              label: embedding.model_name,
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
  }, [data, currentBaseModel]);

  return { options, isLoading };
};
