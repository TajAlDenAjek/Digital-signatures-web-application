import { message } from "antd";
// import crypto from 'crypto-js';

export const showErrors = (err:any)=>{
    console.log(err);
    if(err?.data?.message){
        message.error(err?.data?.message);
    }
    else if(err?.originalStatus == 429 ){
        message.error('You have exceeded your requests limit per minute. please try again later.');
    }
}
// const getBase64 = async (img: FileType, callback: (url: string) => void) => {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result as string));
//     reader.readAsDataURL(img);

// };
export const getBase64 = async (img : any )=>{
    return ( new Promise((resolve, reject)=>{
        const reader = new FileReader() ; 
        reader.addEventListener('load' , ()=>{
            resolve(reader.result as string ) ;
        })
        reader.readAsDataURL(img);
    }))
};
  
export const getPrivateKey = ()=>{
    let privateKey : any = localStorage.getItem('privateKey') ; 
    return privateKey ;
}

export async function generatePrivateAndPublicKey() {
    const keyPair = await window.crypto.subtle.generateKey(
        {
            name: "RSASSA-PKCS1-v1_5",
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: { name: "SHA-256" },
        },
        true,
        ["sign", "verify"]
    );

    const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
    const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

    const pemPublicKey = `-----BEGIN PUBLIC KEY-----\n${window.btoa(String.fromCharCode(...new Uint8Array(publicKey)))}\n-----END PUBLIC KEY-----`;
    const pemPrivateKey = `-----BEGIN PRIVATE KEY-----\n${window.btoa(String.fromCharCode(...new Uint8Array(privateKey)))}\n-----END PRIVATE KEY-----`;

    return {
        publicKey: pemPublicKey,
        privateKey: pemPrivateKey,
    };
}

export async function sign(document, privateKey) {
    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    const pemContents = privateKey.substring(pemHeader.length, privateKey.length - pemFooter.length);
    const binaryDerString = window.atob(pemContents);
    const binaryDer = Uint8Array.from(binaryDerString, char => char.charCodeAt(0));

    const key = await window.crypto.subtle.importKey(
        "pkcs8",
        binaryDer,
        {
            name: "RSASSA-PKCS1-v1_5",
            hash: { name: "SHA-256" },
        },
        false,
        ["sign"]
    );

    const signature = await window.crypto.subtle.sign(
        "RSASSA-PKCS1-v1_5",
        key,
        new TextEncoder().encode(document)
    );

    return window.btoa(String.fromCharCode(...new Uint8Array(signature)));
}

export async function verify(signature, publicKey, document) {
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    const pemContents = publicKey.substring(pemHeader.length, publicKey.length - pemFooter.length);
    const binaryDerString = window.atob(pemContents);
    const binaryDer = Uint8Array.from(binaryDerString, char => char.charCodeAt(0));

    const key = await window.crypto.subtle.importKey(
        "spki",
        binaryDer,
        {
            name: "RSASSA-PKCS1-v1_5",
            hash: { name: "SHA-256" },
        },
        false,
        ["verify"]
    );

    const isValid = await window.crypto.subtle.verify(
        "RSASSA-PKCS1-v1_5",
        key,
        Uint8Array.from(atob(signature), c => c.charCodeAt(0)),
        new TextEncoder().encode(document)
    );

    return isValid;
}


