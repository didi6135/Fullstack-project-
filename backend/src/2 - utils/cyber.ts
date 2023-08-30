import crypto from 'crypto';

const salt = "secret-key-to-make-decode-hard";

export const hashing = (text: string): string => {
    if (!text) return null;

    const hashedText = crypto.createHmac("sha512", salt).update(text).digest("hex");

    return hashedText;
};

export const verifyHash = (text: string, hashedText: string): boolean => {
    if (!text || !hashedText) return false;

    const calculatedHash = hashing(text);
    console.log(calculatedHash)
    return hashedText === calculatedHash;
};

