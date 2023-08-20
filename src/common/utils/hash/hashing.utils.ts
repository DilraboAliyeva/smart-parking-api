import * as CryptoJS from 'crypto-js';
import { HttpError } from '../../exception/http.error';
import { config } from 'dotenv';
config();

export function encrypt(text: string) {
  try {
    // Encrypt the plaintext using AES and the key
    const ciphertext = CryptoJS.AES.encrypt(
      text.toString(),
      process.env.PASSPHRASE,
    );

    // Convert the ciphertext to a string
    const ciphertextString = ciphertext.toString();
    return ciphertextString;
  } catch (error) {
    HttpError(error);
  }
}

export function decrypt(text: string) {
  try {
    // Decrypt the ciphertext using AES and the key
    const decrypted = CryptoJS.AES.decrypt(
      text.toString(),
      process.env.PASSPHRASE,
    );

    // Convert the decrypted data to a string
    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    return plaintext;
  } catch (error) {
    HttpError(error);
  }
}
