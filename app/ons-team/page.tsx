'use client'

import {
  Box,
  Heading,
  Text,
  Avatar,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react'

const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"]

const pickPalette = (name: string) => {
    const index = name.charCodeAt(0) % colorPalette.length
    return colorPalette[index]
  }

const teamMembers = [
  {
    name: 'Robert-Jan Haasnoot',
    role: 'Projectmanager, ontwikkelaar',
    bio: 'Robert-Jan is de drijvende kracht achter ons team en zorgt dat alles op rolletjes loopt.',
    image: '/team/sophie.jpg',
  },
  {
    name: 'David Claassens',
    role: 'Ontwikkelaar',
    bio: 'David zorgt voor de technische kant van de website en zorgt dat alles werkt.',
    image: '/team/jeroen.jpg',
  },
  {
    name: 'Kenan Aksu',
    role: 'Marketeer, Sport expert',
    bio: 'Kenan zorgt voor de marketing en de content op de website.',
    image: '/team/lotte.jpg',
  },
  {
    name: 'Stijn Gorter',
    role: 'Marketeer, Ontwikkelaar',
    bio: 'Stijn zorgt voor de marketing en de content op de website.',
    image: '/team/lotte.jpg',
  },
  {
    name: 'Steyn Diepemaat',
    role: 'Ontwikkelaar',
    bio: 'Steyn zorgt voor de technische kant van de website en zorgt dat alles werkt.',
    image: '/team/lotte.jpg',
  },
]

export default function TeamPage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgImage="url('/hero-image.png')"
        bgSize="cover"
        backgroundPosition="center"
        minH="50vh"
        borderBottomRadius="xl"
        color="white"
        py={10}
        px={4}
        textAlign="center"
      >
        <Heading as="h1" fontSize="5xl" mt={20} mb={4}>
          Ontmoet ons team
        </Heading>
      </Box>

      {/* Introductie */}
      <Box maxW="4xl" mx="auto" my={10} px={4} textAlign="center">
        <Heading as="h2" fontSize="2xl" mb={4}>
          Ons geheime wapen? Het team van SweatSmartly.
        </Heading>
        <Text fontSize="lg" mb={2}>
          Slimme koppen, grote ideeën en vooral: een berg enthousiasme.
        </Text>
        <Text fontSize="lg" mb={2}>
          We zijn allemaal verschillend – van tech-nerds tot creatievelingen – maar we hebben één doel: jou helpen comfortabeler en slimmer te bewegen.
        </Text>
        <Text fontSize="lg" mb={2}>
          We houden het graag simpel. Geen ingewikkelde termen of stoffige verhalen. Gewoon een team dat doet wat het belooft, met een nuchtere blik en een gezonde dosis humor.
        </Text>
        <Text fontSize="lg" mb={2}>
          We werken hard, lachen veel, en zijn altijd op zoek naar manieren om dingen nét even beter te doen.
        </Text>
        <Text fontSize="lg">
          Benieuwd wie er allemaal achter SweatSmartly zitten? Scroll gerust verder – je zult zien: we zijn net zo menselijk als jij, met ieder onze eigen dromen, skills en stiekeme sportverslaving.
        </Text>
      </Box>

      {/* Team Cards */}
      <Box maxW="6xl" mx="auto" px={4} py={12}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={10}>
          {teamMembers.map((member) => (
            <VStack
              key={member.name}
              gap={4}
              alignItems="center"
              textAlign="center"
            >
              <Avatar.Root colorPalette={pickPalette(member.name)} boxSize="20">
                <Avatar.Fallback name={member.name}></Avatar.Fallback>
                <Avatar.Image src={member.image} alt={member.name} />
              </Avatar.Root>
              <Box>
                <Text fontWeight="bold" fontSize="xl">
                  {member.name}
                </Text>
                <Text color="gray.500" mb={2}>
                  {member.role}
                </Text>
                <Text fontSize="sm" color="gray.700">
                  {member.bio}
                </Text>
              </Box>
            </VStack>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
}
