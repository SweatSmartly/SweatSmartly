import { NextResponse } from 'next/server';
import { BlobServiceClient } from '@azure/storage-blob';
import formidable from 'formidable';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper om Next.js Request om te zetten naar Node.js compatible format
async function getNodeRequest(request) {
  const body = request.body;
  const readable = Readable.fromWeb(body);

  const headers = {};
  for (const [key, value] of request.headers.entries()) {
    headers[key.toLowerCase()] = value;
  }

  return {
    headers,
    method: request.method,
    url: '',
    pipe: readable.pipe.bind(readable),
    on: readable.on.bind(readable),
    resume: readable.resume.bind(readable),
  };
}

async function parseFormData(request) {
  const nodeRequest = await getNodeRequest(request);

  const form = formidable({
    multiples: false,
    maxFileSize: 150 * 1024 * 1024, // 150MB limiet
  });

  return new Promise((resolve, reject) => {
    form.parse(nodeRequest, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
}

export async function POST(req) {
  try {
    const { fields, files } = await parseFormData(req);

    const videoFile = files.video;
    if (!videoFile) {
      return NextResponse.json({ error: "Geen videobestand ontvangen" }, { status: 400 });
    }

    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const containerName = "videos";
    const blobName = `${Date.now()}-${videoFile.originalFilename}`;

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadFile(videoFile.filepath);

    console.log(`Upload succesvol: ${blobName}`);
    return NextResponse.json({ filename: blobName }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Upload fout: " + error.message }, { status: 500 });
  }
}
