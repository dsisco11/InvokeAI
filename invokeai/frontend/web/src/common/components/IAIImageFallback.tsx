import {
  As,
  Flex,
  FlexProps,
  Icon,
  Skeleton,
  Spinner,
  StyleProps,
} from '@chakra-ui/react';
import { FaImage } from 'react-icons/fa';
import { ImageDTO } from 'services/api/types';
import { InvText } from './InvText';

type Props = { image: ImageDTO | undefined };

export const IAILoadingImageFallback = (props: Props) => {
  if (props.image) {
    return (
      <Skeleton
        sx={{
          w: `${props.image.width}px`,
          h: 'auto',
          objectFit: 'contain',
          aspectRatio: `${props.image.width}/${props.image.height}`,
        }}
      />
    );
  }

  return (
    <Flex
      sx={{
        opacity: 0.7,
        w: 'full',
        h: 'full',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'base',
        bg: 'base.900',
      }}
    >
      <Spinner size="xl" />
    </Flex>
  );
};

type IAINoImageFallbackProps = FlexProps & {
  label?: string;
  icon?: As | null;
  boxSize?: StyleProps['boxSize'];
};

export const IAINoContentFallback = (props: IAINoImageFallbackProps) => {
  const { icon = FaImage, boxSize = 16, sx, ...rest } = props;

  return (
    <Flex
      sx={{
        w: 'full',
        h: 'full',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'base',
        flexDir: 'column',
        gap: 2,
        userSelect: 'none',
        opacity: 0.7,
        color: 'base.500',
        ...sx,
      }}
      {...rest}
    >
      {icon && <Icon as={icon} boxSize={boxSize} opacity={0.7} />}
      {props.label && <InvText textAlign="center">{props.label}</InvText>}
    </Flex>
  );
};

type IAINoImageFallbackWithSpinnerProps = FlexProps & {
  label?: string;
};

export const IAINoContentFallbackWithSpinner = (
  props: IAINoImageFallbackWithSpinnerProps
) => {
  const { sx, ...rest } = props;

  return (
    <Flex
      sx={{
        w: 'full',
        h: 'full',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'base',
        flexDir: 'column',
        gap: 2,
        userSelect: 'none',
        opacity: 0.7,
        color: 'base.500',
        ...sx,
      }}
      {...rest}
    >
      <Spinner size="xl" />
      {props.label && <InvText textAlign="center">{props.label}</InvText>}
    </Flex>
  );
};
