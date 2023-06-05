import CryptoJS from "crypto-js";

const secret = `${process.env.REACT_APP_SECRET_KEY}`;

export const encrypt = (data) => {
  return CryptoJS.AES.encrypt(data, secret).toString();
};

export const decrypt = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secret);
  return bytes.toString(CryptoJS.enc.Utf8);
};