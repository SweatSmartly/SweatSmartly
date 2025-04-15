'use client';
import { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel, Heading, VStack } from "@chakra-ui/react";
import { useAppToast } from "../ToastHelper";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useAppToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast({
          title: "Succesvol ingelogd!",
          description: "Welkom terug!",
          status: "success",
          duration: 3000,
          position: "top",
        });
        // Eventueel redirecten naar dashboard
        // router.push('/dashboard');
      } else {
        throw new Error(data.message || "Login mislukt");
      }
    } catch (error) {
      showToast({
        title: "Login mislukt",
        description: error.message || "Onbekende fout.",
        status: "error",
        duration: 3000,
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50" p={4}>
      <Box bg="white" p={8} rounded="md" shadow="md" w="full" maxW="md">
        <Heading mb={6} textAlign="center">Login</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email adres</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Voer je email in"
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Wachtwoord</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Voer je wachtwoord in"
              />
            </FormControl>
            <Button
              type="submit"
              bg="red.400"
              color="white"
              _hover={{ bg: "red.500" }}
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
