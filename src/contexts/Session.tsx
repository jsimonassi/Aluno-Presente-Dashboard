import React, { useContext } from "react";
import { AuthContext, AuthProvider, IAuthContext, TAuthConfig, TRefreshTokenExpiredEvent } from "react-oauth2-code-pkce";

interface SessionProviderProps {
	children: React.ReactNode;
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {

	const authConfig: TAuthConfig = {
		clientId: "public",
		authorizationEndpoint: "http://0.tcp.sa.ngrok.io:10720/v1/auth/oauth2/authorize",
		tokenEndpoint: "http://0.tcp.sa.ngrok.io:10720/v1/auth/oauth2/token",
		redirectUri: "http://localhost:3000/post-login",
		scope: "openid read profile",
		onRefreshTokenExpire: (event: TRefreshTokenExpiredEvent) => window.confirm("Session expired. Refresh page to continue using the site?") && event.login(),
	};


	return (
		<AuthProvider authConfig={authConfig} >
			{children}
		</AuthProvider>
	);
};

const useSession = () => {
	const context = useContext<IAuthContext>(AuthContext);

	return context;
};

export { SessionProvider, useSession };
