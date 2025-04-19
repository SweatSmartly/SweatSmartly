'use client'

import { FC } from 'react'
import {
  Dialog,
  Portal,
  CloseButton,
  Button,
  Text,
  VStack,
  Field,
  Input,
} from '@chakra-ui/react'

interface NewsletterModalProps {
  open: boolean
  onClose: () => void
}

const NewsletterModal: FC<NewsletterModalProps> = ({ open, onClose }) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open) {
          onClose()
        }
      }}
      size="sm"
      placement="center"
    >
      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
        <Dialog.Content bg="white" color="black">
            <Dialog.Header>
                <Text fontWeight="bold" fontSize="xl">
                    Meld je aan voor onze nieuwsbrief
                </Text>
            </Dialog.Header>

            <Dialog.CloseTrigger asChild>
                <CloseButton
                aria-label="Sluit modal"
                position="absolute"
                top={3}
                right={3}
                size="sm"
                />
            </Dialog.CloseTrigger>

            <Dialog.Body>
                <Text mb={6} fontSize="sm">
                Helaas heeft de applicatie nog geen volledige functionaliteit, maar
                wil je wel als eerste testen? Meld je aan voor onze nieuwsbrief
                en ontvang als eerste de laatste updates!
                </Text>

                <VStack gap={4} align="stretch">
                <Field.Root>
                    <Field.Label>Naam</Field.Label>
                    <Input placeholder="Je naam" />
                </Field.Root>

                <Field.Root>
                    <Field.Label>Emailadres</Field.Label>
                    <Input type="email" placeholder="jij@example.com" />
                </Field.Root>
                </VStack>
            </Dialog.Body>

            <Dialog.Footer>
                <Button colorPalette="red" onClick={onClose}>
                Aanmelden
                </Button>
            </Dialog.Footer>
            </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default NewsletterModal
