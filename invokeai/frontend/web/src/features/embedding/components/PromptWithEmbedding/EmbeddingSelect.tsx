import { SingleValue } from 'chakra-react-select';
import {
  InvControl,
  InvSelect,
  InvSelectFallback,
  InvSelectOption,
} from 'common/components/';
import { EmbeddingSelectProps } from 'features/embedding/components/PromptWithEmbedding/types';
import { useEmbeddingSelectOptions } from 'features/embedding/components/PromptWithEmbedding/useEmbeddingSelectOptions';
import { t } from 'i18next';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const noOptionsMessage = () => t('embedding.noMatchingEmbedding');

export const EmbeddingSelect = ({
  onSelect,
  onClose,
}: EmbeddingSelectProps) => {
  const { t } = useTranslation();
  const { options, isLoading } = useEmbeddingSelectOptions();
  const onChange = useCallback(
    (v: SingleValue<InvSelectOption>) => {
      if (!v) {
        return;
      }
      onSelect(v.value);
    },
    [onSelect]
  );

  if (isLoading) {
    return <InvSelectFallback label={t('common.loading')} />;
  }

  if (options.length === 0) {
    return <InvSelectFallback label={t('embedding.noEmbeddingsLoaded')} />;
  }

  return (
    <InvControl isDisabled={!options.length}>
      <InvSelect
        placeholder={t('embedding.addEmbedding')}
        defaultMenuIsOpen
        autoFocus
        value={null}
        options={options}
        isDisabled={!options.length}
        noOptionsMessage={noOptionsMessage}
        onChange={onChange}
        onMenuClose={onClose}
        data-testid="add-embedding"
        sx={{ w: 'full' }}
      />
    </InvControl>
  );
};
