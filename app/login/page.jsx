'use client'
import { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel, Heading, VStack } from "@chakra-ui/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hier kun je de login-logica toevoegen
    console.log("Email:", email);
    console.log("Password:", password);
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
            <Button type="submit"  bg="red.400" color="white" _hover={{ bg: "red.500" }} colorScheme="blue" w="full">Inloggen</Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}
