'use client';

import { Box, Heading, Text, Button, VStack, SimpleGrid } from '@chakra-ui/react';
import TrainerOverview from "@/components/Dashboard/TrainerOverview";
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

const DashboardPage: FC = () => {
  const router = useRouter();

  const handleLogout = (): void => {
    localStorage.removeItem('auth');
    router.push('/login');
  };

  return (
    <Box p={8}>
      <VStack spacing={6} align="start">
        <Heading size="lg">Welkom bij je Dashboard</Heading>
        </VStack>
        <TrainerOverview />

        <Button onClick={handleLogout} colorScheme="red">
          Uitloggen
        </Button>
      
    </Box>
  );
};

export default DashboardPage;
