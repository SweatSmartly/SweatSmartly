'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Spinner,
} from '@chakra-ui/react';
import { useAppToast } from '../../ui/ToastHelper';

export default function VideoUpload() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { showToast } = useAppToast();

  const handleUpload = async () => {
    if (!file) {
      showToast({
        title: 'Geen bestand geselecteerd',
        status: 'warning',
      });
      return;
    }

    if (file.size > 150 * 1024 * 1024) {
      showToast({
        title: 'Bestand is te groot',
        description: 'Maximaal 150MB toegestaan',
        status: 'error',
      });
      return;
    }

    const formData = new FormData();
    formData.append('video', file);

    setIsUploading(true);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        showToast({
          title: 'Upload gelukt',
          description: `Bestand: ${data.filename}`,
          status: 'success',
        });
        setFile(null);
      } else {
        showToast({
          title: 'Upload mislukt',
          description: data.error || 'Er is iets misgegaan',
          status: 'error',
        });
      }
    } catch (error) {
      showToast({
        title: 'Netwerkfout',
        description: error.message,
        status: 'error',
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="xl" boxShadow="md" maxW="md" mx="auto">
      <VStack spacing={4} align="stretch">
        <Text fontSize="lg" fontWeight="bold">Upload een video</Text>

        <Input
          type="file"
          accept="video/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <Button
          colorScheme="blue"
          isDisabled={!file || isUploading}
          onClick={handleUpload}
        >
          {isUploading ? <Spinner size="sm" /> : 'Uploaden'}
        </Button>
      </VStack>
    </Box>
  );
}
