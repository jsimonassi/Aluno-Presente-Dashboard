import React, { createContext, useContext, useState } from "react";
import Api from "../services/api";
import { SessionAuthConfig, TokenRequestConfig, TokenSession } from "../types/Session";
import { Helpers } from "../helpers";
import { LocalStorage } from "../services/storage";
import { Storage } from "../services";

const SESSION_CACHE_KEY = "currentSession";

interface SessionContextData {
	redirectToLogin: (redirectUrl: string) => void;
	getAuthToken: (code: string) => Promise<void>;
	currentSession: TokenSession | null;
}

interface SessionProviderProps {
	children: React.ReactNode;
}

export const SessionContext = createContext({} as SessionContextData);

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {

	const cachedSession = LocalStorage.getLocalData(SESSION_CACHE_KEY);
	const [currentSession, setCurrentSession] = useState<TokenSession | null>(cachedSession ? JSON.parse(cachedSession) : null);


	const redirectToLogin = async (redirectUrl: string) => {
		const codeVerifier = Helpers.CodeGenerator.generateCodeVerifier();
		const codeChallenge = await Helpers.CodeGenerator.generateCodeChallenge(codeVerifier);
		LocalStorage.storeLocalData("codeVerifier", codeVerifier);
		LocalStorage.storeLocalData("codeChallenge", codeChallenge);

		const authConfig: SessionAuthConfig = {
			redirectUrl: redirectUrl,
			codeChallenge
		};

		Api.Session.redirectToLogin(authConfig);
	};

	const getAuthToken = (code: string) => {
		return new Promise<void>((resolve, reject) => {
			const tokenRequestConfig: TokenRequestConfig = {
				code,
				client_id: "public",
				grant_type: "authorization_code",
				code_verifier: LocalStorage.getLocalData("codeVerifier") ?? "",
				scope: "openid read profile",
				redirect_uri: "http://localhost:3000/post-login"
			};

			Api.Session.getToken(tokenRequestConfig)
				.then((response) => {
					setCurrentSession(response);
					Storage.LocalStorage.storeLocalData(SESSION_CACHE_KEY, JSON.stringify(response));
					resolve();
				})
				.catch((error) => {
					setCurrentSession(null);
					Storage.LocalStorage.clearItem(SESSION_CACHE_KEY);
					reject(error);
				});
		});
	};


	return (
		<SessionContext.Provider
			value={{
				redirectToLogin,
				getAuthToken,
				currentSession
			}}
		>
			{children}
		</SessionContext.Provider>
	);
};

const useSession = () => {
	const context = useContext(SessionContext);

	return context;
};

export { SessionProvider, useSession };
