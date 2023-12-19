import { SystemStyleObject } from '@chakra-ui/react';
import { MouseEvent, ReactElement, memo } from 'react';
import { InvIconButton } from 'common/components';

type Props = {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  tooltip: string;
  icon?: ReactElement;
  styleOverrides?: SystemStyleObject;
};

const IAIDndImageIcon = (props: Props) => {
  const { onClick, tooltip, icon, styleOverrides } = props;

  return (
    <InvIconButton
      onClick={onClick}
      aria-label={tooltip}
      tooltip={tooltip}
      icon={icon}
      size="sm"
      variant="link"
      sx={{
        position: 'absolute',
        top: 1,
        insetInlineEnd: 1,
        p: 0,
        minW: 0,
        svg: {
          transitionProperty: 'common',
          transitionDuration: 'normal',
          fill: 'base.100',
          _hover: { fill: 'base.50' },
          filter: 'drop-shadow(0px 0px 0.1rem var(--invokeai-colors-base-800))',
        },
        ...styleOverrides,
      }}
      data-testid={tooltip}
    />
  );
};

export default memo(IAIDndImageIcon);
