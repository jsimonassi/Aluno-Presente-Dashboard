import React, { createContext, useContext, useEffect, useState } from "react";
import Api from "../services/api";
import { SessionAuthConfig, TokenRequestConfig, TokenSession } from "../types/Session";
import { Helpers } from "../helpers";
import { LocalStorage } from "../services/storage";
import { Storage } from "../services";
import { User } from "../types/User";
import CONSTANTS from "../constants";

export const SESSION_CACHE_KEY = "currentSession";
export const CURRENT_USER_CACHE_KEY = "currentUser";

interface SessionContextData {
	redirectToLogin: (redirectUrl: string) => void;
	getAuthToken: (code: string, redirectUrl: string) => Promise<TokenSession>;
	logout: () => Promise<void>;
	currentSession: TokenSession | null;
	currentUser: User | null;
}

interface SessionProviderProps {
	children: React.ReactNode;
}

export const SessionContext = createContext({} as SessionContextData);

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {

	const cachedSession = LocalStorage.getLocalData(SESSION_CACHE_KEY);
	const cachedUser = LocalStorage.getLocalData(CURRENT_USER_CACHE_KEY);
	const [currentSession, setCurrentSession] = useState<TokenSession | null>(cachedSession ? JSON.parse(cachedSession) : null);
	const [currentUser, setCurrentUser] = useState<User | null>(cachedUser ? JSON.parse(cachedUser) : null);

	useEffect(() => {
		const handleUnauthorized = () => {
			__resetLocalSession();
		};
	
		Helpers.eventEmitter.on(CONSTANTS.EVENT.SESSION_EXPIRED, handleUnauthorized);
	
		return () => {
			Helpers.eventEmitter.off(CONSTANTS.EVENT.SESSION_EXPIRED, handleUnauthorized);
		};
	}, []);


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

	const getAuthToken =  async (code: string, redirectUrl: string) => {
		const tokenRequestConfig: TokenRequestConfig = {
			code,
			client_id: "public",
			grant_type: "authorization_code",
			code_verifier: LocalStorage.getLocalData("codeVerifier") ?? "",
			scope: "openid read profile",
			redirect_uri: redirectUrl
		};

		try{
			const newSession = await Api.Session.getToken(tokenRequestConfig);
			setCurrentSession(newSession);
			Storage.LocalStorage.storeLocalData(SESSION_CACHE_KEY, JSON.stringify(newSession)); //Save token is needed for future requests
		
			const newUser = await Api.Session.getLoggedUser();
			setCurrentUser(newUser);
			Storage.LocalStorage.storeLocalData(CURRENT_USER_CACHE_KEY, JSON.stringify(newUser));
			return Promise.resolve(newSession);
		}catch(error){
			__resetLocalSession();
			return Promise.reject(error);
		}
	};

	const __resetLocalSession = () => {
		setCurrentSession(null);
		setCurrentUser(null);
		Storage.LocalStorage.clearLocalStorage();
		Storage.SessionStorage.clearSessionStorage();
	};


	const logout = () => {
		return new Promise<void>((resolve) => {
			//TODO: Add backend call, when available
			setTimeout(() => {
				__resetLocalSession();
				resolve();
			}, 2000);
		});
	};


	return (
		<SessionContext.Provider
			value={{
				redirectToLogin,
				getAuthToken,
				logout,
				currentSession,
				currentUser
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
