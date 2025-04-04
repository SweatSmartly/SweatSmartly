// components/ui/ToastHelper.js
import { useToast } from '@chakra-ui/react';

export const useAppToast = () => {
  const toast = useToast();

  const showToast = ({
    title,
    description = '',
    status = 'info', // 'success' | 'error' | 'warning' | 'info'
    duration = 4000,
    position = 'bottom-right',
    isClosable = true,
  }) => {
    toast({
      title,
      description,
      status,
      duration,
      position,
      isClosable,
    });
  };

  return { showToast };
};
