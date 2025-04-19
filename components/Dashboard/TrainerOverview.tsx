import { FC } from "react";
import { SimpleGrid, Box, Heading, Text } from "@chakra-ui/react";

const TrainerOverview: FC = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={5} mt={12}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={6}
        boxShadow="md"
        w="100%"
        bg="gray.50"
      >
        <Heading size="md" mb={4}>
          Favoriete Trainers
        </Heading>
        <Text color="gray.600">Je hebt nog geen favoriete trainers.</Text>
      </Box>

      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={6}
        boxShadow="md"
        w="100%"
        bg="gray.50"
      >
        <Heading size="md" mb={4}>
          Top rated trainers
        </Heading>
        <Text color="gray.600">Nog geen trainers gevonden.</Text>
      </Box>
    </SimpleGrid>
  );
};

export default TrainerOverview;
