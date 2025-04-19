'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import type { ReactNode, FC } from 'react';
import theme from '../../app/theme';

type ProviderProps = {
  children: ReactNode;
};

export const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
};
