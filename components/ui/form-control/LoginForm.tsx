'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { useAppToast } from '../ToastHelper';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showToast } = useAppToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((res) => setTimeout(res, 1000));

    showToast({
      title: 'Succesvol ingelogd!',
      description: 'Welkom terug!',
      status: 'success',
      duration: 3000,
      position: 'top',
    });

    setIsLoading(false);
    router.push('/dashboard');
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      p={4}
    >
      <Box
        bg="white"
        p={8}
        rounded="md"
        shadow="md"
        w="full"
        maxW="md"
      >
        <Heading mb={6} textAlign="center">
          Login
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email adres</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Voer je email in"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Wachtwoord</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Voer je wachtwoord in"
              />
            </FormControl>
            <Button
              type="submit"
              bg="red.400"
              color="white"
              _hover={{ bg: 'red.500' }}
              w="full"
              isLoading={isLoading}
              loadingText="Inloggen..."
            >
              Inloggen
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
