import AWS from "aws-sdk";
import path from "path";
import sharp from "sharp";
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

const compressImage = async (buffer: Buffer): Promise<Buffer> => {
  return sharp(buffer)
    .jpeg({ quality: 80 })
    .png({ compressionLevel: 9 })
    .toBuffer();
};

const compressPdf = async (buffer: Buffer): Promise<Buffer> => {
  // Assuming you have a PDF compression logic, for now just returning the buffer
  return buffer;
};

export const handleFileUpload = async (
  file: any,
): Promise<AWS.S3.ManagedUpload.SendData> => {
  const bucketName = process.env.S3_BUCKET_NAME || "default-bucket-name";
  const fileExt = path.extname(file.filename).toLowerCase();
  let fileBuffer = await file.toBuffer();

  if (fileExt === ".jpg" || fileExt === ".jpeg" || fileExt === ".png") {
    fileBuffer = await compressImage(fileBuffer);
  } else if (fileExt === ".pdf") {
    fileBuffer = await compressPdf(fileBuffer);
  }

  const fileKey = `${Date.now()}-${file.filename}`;

  return uploadFileToS3({
    bucketName,
    fileKey,
    fileBuffer,
    contentType: file.mimetype,
  });
};
