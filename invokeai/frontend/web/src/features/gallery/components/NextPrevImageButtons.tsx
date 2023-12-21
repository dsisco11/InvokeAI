import type { ChakraProps } from '@chakra-ui/react';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useNextPrevImage } from 'features/gallery/hooks/useNextPrevImage';
import { InvIconButton } from 'common/components';

const nextPrevButtonStyles: ChakraProps['sx'] = {
  color: 'base.100',
  pointerEvents: 'auto',
};

const NextPrevImageButtons = () => {
  const { t } = useTranslation();

  const {
    handlePrevImage,
    handleNextImage,
    isOnFirstImage,
    isOnLastImage,
    handleLoadMoreImages,
    areMoreImagesAvailable,
    isFetching,
  } = useNextPrevImage();

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        sx={{
          pos: 'absolute',
          top: '50%',
          transform: 'translate(0, -50%)',
          insetInlineStart: 0,
        }}
      >
        {!isOnFirstImage && (
          <InvIconButton
            aria-label={t('accessibility.previousImage')}
            icon={<FaAngleLeft size={64} />}
            variant="unstyled"
            onClick={handlePrevImage}
            boxSize={16}
            sx={nextPrevButtonStyles}
          />
        )}
      </Box>
      <Box
        sx={{
          pos: 'absolute',
          top: '50%',
          transform: 'translate(0, -50%)',
          insetInlineEnd: 0,
        }}
      >
        {!isOnLastImage && (
          <InvIconButton
            aria-label={t('accessibility.nextImage')}
            icon={<FaAngleRight size={64} />}
            variant="unstyled"
            onClick={handleNextImage}
            boxSize={16}
            sx={nextPrevButtonStyles}
          />
        )}
        {isOnLastImage && areMoreImagesAvailable && !isFetching && (
          <InvIconButton
            aria-label={t('accessibility.loadMore')}
            icon={<FaAngleDoubleRight size={64} />}
            variant="unstyled"
            onClick={handleLoadMoreImages}
            boxSize={16}
            sx={nextPrevButtonStyles}
          />
        )}
        {isOnLastImage && areMoreImagesAvailable && isFetching && (
          <Flex
            sx={{
              w: 16,
              h: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Spinner opacity={0.5} size="xl" />
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default memo(NextPrevImageButtons);
