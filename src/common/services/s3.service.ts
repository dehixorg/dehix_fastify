import { S3 } from "@aws-sdk/client-s3"; // Import from the new AWS SDK
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Initialize the S3 client
const s3 = new S3({
  region: process.env.AWS_REGION,
  // You can also set credentials here if needed
});

interface UploadParams {
  bucketName: string;
  fileKey: string;
  fileBuffer: Buffer;
  contentType: string;
}

const uploadFileToS3 = async (
  params: UploadParams,
): Promise<void> => {
  const { bucketName, fileKey, fileBuffer, contentType } = params;

  const uploadParams = {
    Bucket: bucketName,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: contentType,
    ACL: "public-read", // Ensure the file is publicly accessible
  };

  await s3.putObject(uploadParams); // Use putObject instead of upload
};

// Placeholder for image compression if needed in the future
const processImage = async (buffer: Buffer): Promise<Buffer> => {
  // Add any image processing logic here, for now, just return the buffer as is
  return buffer;
};

const processPdf = async (buffer: Buffer): Promise<Buffer> => {
  // Placeholder for PDF processing logic
  return buffer;
};

export const handleFileUpload = async (
  file: any,
): Promise<void> => {
  const bucketName = process.env.S3_BUCKET_NAME || "default-bucket-name";
  const fileExt = path.extname(file.filename).toLowerCase();
  let fileBuffer = await file.toBuffer();

  if (fileExt === ".jpg" || fileExt === ".jpeg" || fileExt === ".png") {
    fileBuffer = await processImage(fileBuffer); // No compression
  } else if (fileExt === ".pdf") {
    fileBuffer = await processPdf(fileBuffer); // No compression
  }

  const fileKey = `${Date.now()}-${file.filename}`;
  console.log("testing", bucketName, fileKey, fileBuffer);
  await uploadFileToS3({
    bucketName,
    fileKey,
    fileBuffer,
    contentType: file.mimetype,
  });
};
