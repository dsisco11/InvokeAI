import { Flex, Heading, Link, useToast } from '@chakra-ui/react';
import { InvButton, InvText } from 'common/components';
import newGithubIssueUrl from 'new-github-issue-url';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCopy, FaExternalLinkAlt } from 'react-icons/fa';
import { FaArrowRotateLeft } from 'react-icons/fa6';
import { serializeError } from 'serialize-error';

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

const AppErrorBoundaryFallback = ({ error, resetErrorBoundary }: Props) => {
  const toast = useToast();
  const { t } = useTranslation();

  const handleCopy = useCallback(() => {
    const text = JSON.stringify(serializeError(error), null, 2);
    navigator.clipboard.writeText(`\`\`\`\n${text}\n\`\`\``);
    toast({
      title: 'Error Copied',
    });
  }, [error, toast]);

  const url = useMemo(
    () =>
      newGithubIssueUrl({
        user: 'invoke-ai',
        repo: 'InvokeAI',
        template: 'BUG_REPORT.yml',
        title: `[bug]: ${error.name}: ${error.message}`,
      }),
    [error.message, error.name]
  );
  return (
    <Flex
      layerStyle="body"
      sx={{
        w: '100vw',
        h: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
      }}
    >
      <Flex
        layerStyle="first"
        sx={{
          flexDir: 'column',
          borderRadius: 'base',
          justifyContent: 'center',
          gap: 8,
          p: 16,
        }}
      >
        <Heading>{t('common.somethingWentWrong')}</Heading>
        <Flex
          layerStyle="second"
          sx={{
            px: 8,
            py: 4,
            borderRadius: 'base',
            gap: 4,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <InvText fontWeight={600} color="error.400">
            {error.name}: {error.message}
          </InvText>
        </Flex>
        <Flex sx={{ gap: 4 }}>
          <InvButton
            leftIcon={<FaArrowRotateLeft />}
            onClick={resetErrorBoundary}
          >
            {t('accessibility.resetUI')}
          </InvButton>
          <InvButton leftIcon={<FaCopy />} onClick={handleCopy}>
            {t('common.copyError')}
          </InvButton>
          <Link href={url} isExternal>
            <InvButton leftIcon={<FaExternalLinkAlt />}>
              {t('accessibility.createIssue')}
            </InvButton>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(AppErrorBoundaryFallback);
