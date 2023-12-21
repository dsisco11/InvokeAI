import type { BoxProps, PopoverProps } from '@chakra-ui/react';
import {
  Box,
  Divider,
  Flex,
  forwardRef,
  Image,
  Portal,
} from '@chakra-ui/react';
import { useAppSelector } from 'app/store/storeHooks';
import { InvButton } from 'common/components/InvButton/InvButton';
import { InvHeading } from 'common/components/InvHeading/wrapper';
import {
  InvPopover,
  InvPopoverBody,
  InvPopoverCloseButton,
  InvPopoverContent,
  InvPopoverTrigger,
} from 'common/components/InvPopover/wrapper';
import { InvText } from 'common/components/InvText/wrapper';
import { merge, omit } from 'lodash-es';
import type { PropsWithChildren } from 'react';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaExternalLinkAlt } from 'react-icons/fa';

import type { Feature } from './constants';
import { OPEN_DELAY, POPOVER_DATA, POPPER_MODIFIERS } from './constants';

type Props = PropsWithChildren & {
  feature: Feature;
  wrapperProps?: BoxProps;
  popoverProps?: PopoverProps;
};

const IAIInformationalPopover = forwardRef(
  ({ feature, children, wrapperProps, ...rest }: Props, ref) => {
    const { t } = useTranslation();
    const shouldEnableInformationalPopovers = useAppSelector(
      (state) => state.system.shouldEnableInformationalPopovers
    );

    const data = useMemo(() => POPOVER_DATA[feature], [feature]);

    const popoverProps = useMemo(
      () => merge(omit(data, ['image', 'href', 'buttonLabel']), rest),
      [data, rest]
    );

    const heading = useMemo<string | undefined>(
      () => t(`popovers.${feature}.heading`),
      [feature, t]
    );

    const paragraphs = useMemo<string[]>(
      () =>
        t(`popovers.${feature}.paragraphs`, {
          returnObjects: true,
        }) ?? [],
      [feature, t]
    );

    const handleClick = useCallback(() => {
      if (!data?.href) {
        return;
      }
      window.open(data.href);
    }, [data?.href]);

    if (!shouldEnableInformationalPopovers) {
      return (
        <Box ref={ref} w="full" {...wrapperProps}>
          {children}
        </Box>
      );
    }

    return (
      <InvPopover
        isLazy
        closeOnBlur={false}
        trigger="hover"
        variant="informational"
        openDelay={OPEN_DELAY}
        modifiers={POPPER_MODIFIERS}
        placement="top"
        {...popoverProps}
      >
        <InvPopoverTrigger>{children}</InvPopoverTrigger>
        <Portal>
          <InvPopoverContent w={96}>
            <InvPopoverCloseButton />
            <InvPopoverBody>
              <Flex
                sx={{
                  gap: 2,
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                {heading && (
                  <>
                    <InvHeading size="sm">{heading}</InvHeading>
                    <Divider />
                  </>
                )}
                {data?.image && (
                  <>
                    <Image
                      sx={{
                        objectFit: 'contain',
                        maxW: '60%',
                        maxH: '60%',
                        backgroundColor: 'white',
                      }}
                      src={data.image}
                      alt="Optional Image"
                    />
                    <Divider />
                  </>
                )}
                {paragraphs.map((p) => (
                  <InvText key={p}>{p}</InvText>
                ))}
                {data?.href && (
                  <>
                    <Divider />
                    <InvButton
                      pt={1}
                      onClick={handleClick}
                      leftIcon={<FaExternalLinkAlt />}
                      alignSelf="flex-end"
                      variant="link"
                    >
                      {t('common.learnMore') ?? heading}
                    </InvButton>
                  </>
                )}
              </Flex>
            </InvPopoverBody>
          </InvPopoverContent>
        </Portal>
      </InvPopover>
    );
  }
);

IAIInformationalPopover.displayName = 'IAIInformationalPopover';

export default memo(IAIInformationalPopover);
