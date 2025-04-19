'use client';

import { useState, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Spinner,
} from '@chakra-ui/react';
import { useAppToast } from '../ToastHelper';

export default function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { showToast } = useAppToast();

  const handleUpload = async () => {
    if (!file) {
      showToast({
        title: 'Geen bestand geselecteerd',
        status: 'warning',
        position: 'bottom-right',
      });
      return;
    }

    if (file.size > 150 * 1024 * 1024) {
      showToast({
        title: 'Bestand is te groot',
        description: 'Maximaal 150MB toegestaan',
        status: 'error',
        position: 'bottom-right',
      });
      return;
    }

    setIsUploading(true);

    try {
      const sasRes = await fetch('/api/sas');
      const { uploadUrl, blobName }: { uploadUrl: string; blobName: string } = await sasRes.json();

      const putRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'x-ms-blob-type': 'BlockBlob',
          'Content-Type': file.type,
        },
        body: file,
      });

      if (!putRes.ok) throw new Error('Azure upload is mislukt');

      showToast({
        title: 'Upload gelukt',
        description: `Bestand: ${blobName}`,
        status: 'success',
        position: 'bottom-right',
      });

      setFile(null);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Onbekende fout';
      showToast({
        title: 'Upload mislukt',
        description: message,
        status: 'error',
        position: 'bottom-right',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  return (
    <Box p={6} borderWidth="1px" borderRadius="xl" boxShadow="md" maxW="md" mx="auto">
      <VStack spacing={4} align="stretch">
        <Text fontSize="lg" fontWeight="bold">Upload een video</Text>

        <Input
          aria-label="Bestand uploaden"
          type="file"
          accept="video/*"
          onChange={handleFileChange}
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
