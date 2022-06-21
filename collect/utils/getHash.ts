import CryptoJS from 'crypto-js';

export default function getHash(data: string) {
    return CryptoJS.SHA256(data).toString();
}
