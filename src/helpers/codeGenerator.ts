import randomstring from "randomstring";
import { encode as base64encode } from "base64-arraybuffer";

const generateCodeVerifier = () => {
	return randomstring.generate(128);
};


const generateCodeChallenge = async (codeVerifier: string) => {
	const encoder = new TextEncoder();
	const data = encoder.encode(codeVerifier);
	const digest = await window.crypto.subtle.digest("SHA-256", data);
	const base64Digest = base64encode(digest);
	// you can extract this replacing code to a function
	return base64Digest
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=/g, "");
};

const generateRandomId32 = () => {
	return randomstring.generate(32);
};


export const CodeGenerator = {
	generateCodeVerifier,
	generateCodeChallenge,
	generateRandomId32
};