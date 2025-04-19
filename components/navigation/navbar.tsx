'use client'

import {
  Flex,
  Text,
  Image,
  Link,
  IconButton,
  useDisclosure,
  VStack,
  Box,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'

const MotionBox = motion.create(Box)

const Navbar = () => {
  const { open, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Flex
        as="nav"
        position="absolute"
        top={0}
        left={0}
        w="100%"
        py={4}
        px={8}
        alignItems="center"
        justifyContent="space-between"
        zIndex="50"
        bg="transparent"
        color="white"
      >
        
        <Flex flex="1" alignItems="center">
          <Image src="/logo-sweatsmartly.png" alt="Logo SweatSmartly" h="40px" />
          <Text
            fontSize="xl"
            fontWeight="bold"
            fontFamily="Poppins, sans-serif"
            ml={2}
          >
            SweatSmartly
          </Text>
        </Flex>

        
        <Flex
          flex="1"
          justifyContent="center"
          display={{ base: 'none', md: 'flex' }}
          gap={6}
        >
          <Link
            href="/"
            color="white"
            textDecoration="none"
            _hover={{ textDecoration: 'none', color: 'red.400' }}
            _focus={{ boxShadow: 'none', outline: 'none' }}
          >
            Home
          </Link>
          <Link
           href="/ons-team"
           color="white"
           _hover={{textDecoration: 'none', color: 'red.400' }}
           _focus={{ boxShadow: 'none', outline: 'none' }}>
            Ons team
          </Link>
        </Flex>

        {/* Menu Toggle (mobiel) */}
        <Flex flex="1" justifyContent="flex-end">
        <IconButton
            display={{ base: 'flex', md: 'none' }}
            aria-label="Open menu"
            onClick={open ? onClose : onOpen}
            variant="ghost"
            color="white"
            fontSize="24px"
            >
            {open ? <FiX /> : <FiMenu />}
        </IconButton>
        </Flex>
      </Flex>

    
      {open && (
        <MotionBox
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          position="fixed"
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg="blackAlpha.800"
          color="white"
          zIndex="40"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <VStack gap={8}>
            <Link
              href="/"
              onClick={onClose}
              fontSize="2xl"
              color="white"
              _hover={{ color: 'red.400' }}
            >
              Home
            </Link>
            <Link
              href="/ons-team"
              onClick={onClose}
              fontSize="2xl"
              color="white"
              _hover={{ color: 'red.400' }}
            >
              Ons team
            </Link>
          </VStack>
        </MotionBox>
      )}
    </>
  )
}

export default Navbar
