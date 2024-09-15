import AWS from "aws-sdk";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  // No access key and secret, we'll rely on the bucket's public permissions
});

interface UploadParams {
  bucketName: string;
  fileKey: string;
  fileBuffer: Buffer;
  contentType: string;
}

const uploadFileToS3 = async (
  params: UploadParams,
): Promise<AWS.S3.ManagedUpload.SendData> => {
  const { bucketName, fileKey, fileBuffer, contentType } = params;

  const uploadParams = {
    Bucket: bucketName,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: contentType,
    ACL: "public-read", // Ensure the file is publicly accessible
  };

  return s3.upload(uploadParams).promise();
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
): Promise<AWS.S3.ManagedUpload.SendData> => {
  const bucketName = process.env.S3_BUCKET_NAME || "default-bucket-name";
  const fileExt = path.extname(file.filename).toLowerCase();
  let fileBuffer = await file.toBuffer();

  if (fileExt === ".jpg" || fileExt === ".jpeg" || fileExt === ".png") {
    fileBuffer = await processImage(fileBuffer); // No compression
  } else if (fileExt === ".pdf") {
    fileBuffer = await processPdf(fileBuffer); // No compression
  }

  const fileKey = `${Date.now()}-${file.filename}`;

  return uploadFileToS3({
    bucketName,
    fileKey,
    fileBuffer,
    contentType: file.mimetype,
  });
};
