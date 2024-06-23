/* file for common utils*/

import { createCipheriv, createDecipheriv, randomBytes, scrypt } from "crypto";
import * as bcrypt from "bcrypt";
import { promisify } from "util";

import {
  STATUS_CODES,
  RESPONSE_MESSAGE,
  PASSWORD_SALT_ROUNDS,
} from "../common/constants";

// Generate a random 6-digit number
export async function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

// Wrapper function to format success responses
export function sendSuccessResponse(reply, data) {
  const response = {
    success: true,
    data: data,
  };

  reply.status(STATUS_CODES.SUCCESS).send({
    status: RESPONSE_MESSAGE.SUCCESS,
    ...data,
  });
  reply.send(response);
}

// The key length is dependent on the encryption algorithm. In this case for AES, it is 256 bits (32 bytes).
const AES_ENCRYPTION_KEY_LENGTH_BYTES = 32;
const ENCRYPTION_ALGORITHM = { AES_256: "aes-256-cbc" };

// Generate a secure key.
export const generateKey = async (
  password: string,
  salt: string,
): Promise<Buffer> => {
  const key = (await promisify(scrypt)(
    password,
    salt,
    AES_ENCRYPTION_KEY_LENGTH_BYTES,
  )) as Buffer;
  return Buffer.from(key);
};

// Encrypt data.
export const encrypt = async (
  data: string,
  secret: string,
): Promise<string> => {
  const iv = randomBytes(16);
  const key = await generateKey(secret, "salt");
  const cipher = createCipheriv(ENCRYPTION_ALGORITHM.AES_256, key, iv);
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

// Decrypt data.
export const decrypt = async (
  encryptedData: string,
  secret: string,
): Promise<string> => {
  const [iv, encrypted] = encryptedData
    .split(":")
    .map((part) => Buffer.from(part, "hex"));
  const key = await generateKey(secret, "salt");
  const decipher = createDecipheriv(ENCRYPTION_ALGORITHM.AES_256, key, iv);
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);
  return decrypted.toString();
};

export const hashPassword = async (password: any) => {
  const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS);
  return hashedPassword;
};
