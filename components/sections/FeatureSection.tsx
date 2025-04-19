// app/components/FeaturesSection.tsx
'use client'

import { FC } from 'react'
import { 
  Box, 
  Text, 
  VStack, 
  Heading, 
  Flex 
} from '@chakra-ui/react'

interface FeatureBlockProps {
  title: string
  description: string
}

const FeatureBlock: FC<FeatureBlockProps> = ({ title, description }) => (
  <Flex
    flexDirection={{ base: 'column', md: 'row' }}
    alignItems={{ base: 'center', md: 'flex-start' }}
    gap={4}                       // was `spacing`, nu v3‑stijl
    textAlign={{ base: 'center', md: 'left' }}
  >
    <Heading
      as="h3"
      color="red.400"
      fontSize={{ base: 'lg', md: '2xl' }}
      fontWeight="bold"
      maxW={{ base: '100%', md: '250px' }}
    >
      {title}
    </Heading>
    <Text
      fontSize={{ base: 'sm', md: 'md' }}
      color="white"
      maxW={{ base: '100%', md: '400px' }}
    >
      {description}
    </Text>
  </Flex>
)

const FeaturesSection: FC = () => {
  return (
    <Box
      minHeight="100vh"            // was `minH`
      backgroundImage="url('/feature-bg.png')" // shorthand → volle naam
      backgroundSize="cover"       // was `bgSize`
      backgroundPosition="center"  // was `bgPosition`
      px={{ base: 4, md: 20 }}
      pt={{ base: 16, md: 24 }}
      pb={12}
      color="white"
    >
      <Heading
        as="h2"
        fontSize={{ base: '3xl', md: '6xl' }}
        fontWeight="extrabold"
        color="red.400"
        mb={{ base: 12, md: 20 }}
        maxW="2xl"
        textAlign={{ base: 'center', md: 'left' }}
        mx={{ base: 'auto', md: 0 }}
      >
        De features die<br />
        wij bieden
      </Heading>

      <VStack
        alignItems="start"           // was `align`
        gap={16}                     // was `spacing`
        marginLeft={{ base: 0, md: '50%' }} // was `ml`
        px={{ base: 2, md: 0 }}
      >
        <FeatureBlock
          title="Gecertificeerde personal trainers"
          description="Wij bieden gecertificeerde personal trainers die jou de perfecte tips kunnen geven waar nodig"
        />
        <FeatureBlock
          title="Een snelle reactietijd"
          description="Onze trainers zijn altijd bereikbaar via de app, zodat je nooit lang hoeft te wachten op een antwoord."
        />
        <FeatureBlock
          title="Slimme tools & tips"
          description="We helpen je met handige tools en slimme inzichten om jouw doelen écht te bereiken."
        />
      </VStack>
    </Box>
  )
}

export default FeaturesSection
