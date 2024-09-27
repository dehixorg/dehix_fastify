import { S3 } from "@aws-sdk/client-s3";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Initialize the S3 client with correct configuration
const s3 = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

interface UploadParams {
  bucketName: string;
  fileKey: string;
  fileBuffer: Buffer;
  contentType: string;
}

const uploadFileToS3 = async (params: UploadParams): Promise<void> => {
  const { bucketName, fileKey, fileBuffer, contentType } = params;

  const uploadParams = {
    Bucket: bucketName,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: contentType,
    // ACL: "public-read", // Uncomment if you want public access
  };

  // Upload the file
  await s3.putObject(uploadParams);
};

const processImage = async (buffer: Buffer): Promise<Buffer> => {
  // Optional image processing logic here
  return buffer;
};

const processPdf = async (buffer: Buffer): Promise<Buffer> => {
  // Optional PDF processing logic here
  return buffer;
};

export const handleFileUpload = async (
  file: any,
  filename: string,
): Promise<void> => {
  const bucketName = process.env.S3_BUCKET_NAME; // Ensure this is set correctly
  const fileExt = path.extname(filename).toLowerCase();

  // Convert file stream to buffer
  const chunks: Buffer[] = [];
  for await (const chunk of file) {
    chunks.push(chunk);
  }
  let fileBuffer = Buffer.concat(chunks);

  // Perform processing based on file extension
  if (fileExt === ".jpg" || fileExt === ".jpeg" || fileExt === ".png") {
    fileBuffer = await processImage(fileBuffer);
  } else if (fileExt === ".pdf") {
    fileBuffer = await processPdf(fileBuffer);
  }

  const fileKey = `${Date.now()}-${filename}`;
  console.log("Uploading to S3:", bucketName, fileKey);

  // Upload the processed file to S3
  await uploadFileToS3({
    bucketName,
    fileKey,
    fileBuffer,
    contentType: file.mimetype,
  });
};
