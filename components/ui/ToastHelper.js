import { useToast } from '@chakra-ui/react';

export const useAppToast = () => {
  const toast = useToast();

  const showToast = ({
    title,
    description = '',
    status = 'info',
    duration = 4000,
    position,
    isClosable = true,
  }) => {
    if (!position) {
      throw new Error('Toast position is required.');
    }

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