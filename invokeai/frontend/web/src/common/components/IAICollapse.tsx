import { ChevronUpIcon } from '@chakra-ui/icons';
import { Box, Collapse, Flex, Spacer, useDisclosure } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { memo } from 'react';
import { InvText } from './InvText';

export type IAIToggleCollapseProps = PropsWithChildren & {
  label: string;
  activeLabel?: string;
  defaultIsOpen?: boolean;
};

const IAICollapse = (props: IAIToggleCollapseProps) => {
  const { label, activeLabel, children, defaultIsOpen = false } = props;
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen });

  return (
    <Box>
      <Flex
        onClick={onToggle}
        sx={{
          alignItems: 'center',
          p: 2,
          px: 4,
          gap: 2,
          borderTopRadius: 'base',
          borderBottomRadius: isOpen ? 0 : 'base',
          bg: 'base.750',
          color: 'base.100',
          _hover: {
            bg: 'base.700',
          },
          fontSize: 'sm',
          fontWeight: 600,
          cursor: 'pointer',
          transitionProperty: 'common',
          transitionDuration: 'normal',
          userSelect: 'none',
        }}
        data-testid={`${label} collapsible`}
      >
        {label}
        <AnimatePresence>
          {activeLabel && (
            <motion.div
              key="statusText"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: { duration: 0.1 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.1 },
              }}
            >
              <InvText sx={{ color: 'accent.300' }}>{activeLabel}</InvText>
            </motion.div>
          )}
        </AnimatePresence>
        <Spacer />
        <ChevronUpIcon
          sx={{
            w: '1rem',
            h: '1rem',
            transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)',
            transitionProperty: 'common',
            transitionDuration: 'normal',
          }}
        />
      </Flex>
      <Collapse in={isOpen} animateOpacity style={{ overflow: 'unset' }}>
        <Box
          sx={{
            p: 4,
            pb: 4,
            borderBottomRadius: 'base',
            bg: 'base.800',
          }}
        >
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

export default memo(IAICollapse);
