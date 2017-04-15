import crypto from "crypto-js";

export const sessionCookieEncryptionKey = "a key for encryption of cookies";
const sessionAccessKey = "recipy-book";

export const sessionConfig = {
  key: sessionAccessKey,
  encode: body => {
    body = JSON.stringify(body);
    return crypto.AES.encrypt(body, sessionCookieEncryptionKey).toString();
  },
  decode: string => {
    const body = crypto.AES.decrypt(string, sessionCookieEncryptionKey);
    return JSON.parse(body.toString(crypto.enc.Utf8));
  }
};
