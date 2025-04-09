import { NextResponse } from 'next/server';
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  ContainerSASPermissions,
  SASProtocol
} from '@azure/storage-blob';

export async function GET() {
  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
  const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;
  const containerName = 'videos';

  if (!accountName || !accountKey) {
    return NextResponse.json({ error: 'Azure credentials ontbreken' }, { status: 500 });
  }

  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

  const blobName = `${Date.now()}-upload.mp4`;
  const expiresOn = new Date(new Date().valueOf() + 10 * 60 * 1000);

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName,
      blobName,
      permissions: ContainerSASPermissions.parse("cw"),
      expiresOn,
      protocol: SASProtocol.Https
    },
    sharedKeyCredential
  ).toString();

  const uploadUrl = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;

  return NextResponse.json({ uploadUrl, blobName });
}
