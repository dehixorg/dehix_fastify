/* file for common utils */

import { createCipheriv, createDecipheriv, randomBytes, scrypt } from "crypto"; // Importing necessary cryptographic functions.
import * as bcrypt from "bcrypt"; // Importing bcrypt for password hashing.
import { promisify } from "util"; // Importing promisify to convert callback-based functions to promise-based.

import {
  STATUS_CODES,
  RESPONSE_MESSAGE,
  PASSWORD_SALT_ROUNDS,
} from "../common/constants"; // Importing constants for status codes and response messages.

// Generate a random 6-digit number
export async function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generating a random OTP between 100000 and 999999.
  return otp.toString(); // Converting OTP to string format before returning.
}

// Wrapper function to format success responses
export function sendSuccessResponse(reply, data) {
  const response = {
    success: true, // Indicating that the response is successful.
    data: data, // Including the data in the response.
  };

  // Sending the success response with status code and message.
  reply.status(STATUS_CODES.SUCCESS).send({
    status: RESPONSE_MESSAGE.SUCCESS, // Setting the success status message.
    ...data, // Spreading the data into the response object.
  });
  reply.send(response); // Sending the formatted success response.
}

// The key length is dependent on the encryption algorithm. In this case for AES, it is 256 bits (32 bytes).
const AES_ENCRYPTION_KEY_LENGTH_BYTES = 32; // Defining the length of the encryption key.
const ENCRYPTION_ALGORITHM = { AES_256: "aes-256-cbc" }; // Specifying the encryption algorithm to be used.

// Generate a secure key using a password and a salt.
export const generateKey = async (
  password: string, // Password used for key generation.
  salt: string, // Salt value to enhance security.
): Promise<Buffer> => {
  // Using scrypt to derive a secure key from the password and salt.
  const key = (await promisify(scrypt)(
    password,
    salt,
    AES_ENCRYPTION_KEY_LENGTH_BYTES,
  )) as Buffer; // Converting the derived key to a Buffer.
  return Buffer.from(key); // Returning the key as a Buffer.
};

// Encrypt data using AES-256-CBC algorithm.
export const encrypt = async (
  data: string, // Data to be encrypted.
  secret: string, // Secret key used for encryption.
): Promise<string> => {
  const iv = randomBytes(16); // Generating a random initialization vector (IV).
  const key = await generateKey(secret, "salt"); // Generating the encryption key from the secret.
  const cipher = createCipheriv(ENCRYPTION_ALGORITHM.AES_256, key, iv); // Creating a cipher instance.
  const encrypted = Buffer.concat([cipher.update(data), cipher.final()]); // Encrypting the data and finalizing it.
  return iv.toString("hex") + ":" + encrypted.toString("hex"); // Returning the IV and encrypted data as a hex string.
};

// Decrypt data.
export const decrypt = async (
  encryptedData: string, // Data to be decrypted.
  secret: string, // Secret key used for decryption.
): Promise<string> => {
  const [iv, encrypted] = encryptedData
    .split(":") // Splitting the IV and encrypted data.
    .map((part) => Buffer.from(part, "hex")); // Converting hex strings to Buffers.
  const key = await generateKey(secret, "salt"); // Generating the decryption key.
  const decipher = createDecipheriv(ENCRYPTION_ALGORITHM.AES_256, key, iv); // Creating a decipher instance.
  const decrypted = Buffer.concat([
    decipher.update(encrypted), // Decrypting the data.
    decipher.final(), // Finalizing the decryption.
  ]);
  return decrypted.toString(); // Returning the decrypted data as a string.
};

// Hash a password using bcrypt.
export const hashPassword = async (password: any) => {
  const hashedPassword = await bcrypt.hash(password, PASSWORD_SALT_ROUNDS); // Hashing the password with a specified salt rounds.
  return hashedPassword; // Returning the hashed password.
};
