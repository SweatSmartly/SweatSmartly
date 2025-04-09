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
      // 1. Haal de upload-URL met SAS-token op
      const sasRes = await fetch('/api/sas');
      const { uploadUrl, blobName } = await sasRes.json();
  
      // 2. Upload het bestand rechtstreeks naar Azure Blob Storage
      const putRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'x-ms-blob-type': 'BlockBlob',
          'Content-Type': file.type,
        },
        body: file,
      });
  
      if (!putRes.ok) throw new Error("Azure upload is mislukt");
  
      showToast({
        title: 'Upload gelukt',
        description: `Bestand: ${blobName}`,
        status: 'success',
        position: 'bottom-right',
      });
  
      setFile(null);
    } catch (error) {
      showToast({
        title: 'Upload mislukt',
        description: error.message,
        status: 'error',
        position: 'bottom-right',
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
