import {
  Tooltip as ChakraTooltip,
  TooltipProps as ChakraTooltipProps,
} from '@chakra-ui/react';
import type { ReactNode, FC } from 'react';

type CustomTooltipProps = {
  label: ReactNode;
  children: ReactNode;
  disabled?: boolean;
} & ChakraTooltipProps;

export const Tooltip: FC<CustomTooltipProps> = ({
  label,
  children,
  disabled = false,
  ...rest
}) => {
  if (disabled) return <>{children}</>;

  return (
    <ChakraTooltip label={label} hasArrow {...rest}>
      {children}
    </ChakraTooltip>
  );
};
