import axios from "axios";
import qs from "qs";
import { SessionAuthConfig, TokenRequestConfig, TokenSession } from "../../../types/Session";
import { __ApiResourceClient } from "..";
import { User } from "../../../types/User";


const Session = {
	redirectToLogin: (sessionAuthConfig: SessionAuthConfig) => {
		const uri = process.env.REACT_APP_AUTH_SERVER_BASE_URL + "/v1/auth/oauth2/authorize?response_type=code&client_id=" + process.env.REACT_APP_AUTH_CLIENT_ID + "&scope=openid%20read%20profile&redirect_uri=" + sessionAuthConfig.redirectUrl + "&code_challenge=" + sessionAuthConfig.codeChallenge + "&code_challenge_method=S256";
		window.location.href = uri;
	},
	getToken: (tokenRequestConfig: TokenRequestConfig) => {
		return new Promise<TokenSession>((resolve, reject) => {
			const options = {
				method: "POST",
				headers: { "content-type": "application/x-www-form-urlencoded" },
				data: qs.stringify(tokenRequestConfig),
				url: process.env.REACT_APP_AUTH_SERVER_BASE_URL + "/v1/auth/oauth2/token"
			};
			axios(options).then((response) => {
				resolve({
					accessToken: response.data.access_token,
					expiresIn: response.data.expires_in,
					idToken: response.data.id_token,
					scope: response.data.scope,
					tokenType: response.data.token_type
				} as TokenSession);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	getLoggedUser: () => {
		return new Promise<User>((resolve, reject) => {
			__ApiResourceClient.get<User>("/users").then((response) => {
				resolve(response.data);
			}).catch((error) => {
				reject(error);
			});
		});
	},
	updateLoggedUser: (newUser: User) => {
		return new Promise<void>((resolve, reject) => {
			__ApiResourceClient.patch("/users", newUser.info)
				.then(() => {
					resolve();
				}).catch((error) => {
					reject(error);
				});
		});
	},
	revokeToken: (idToken: string) => {
		const uri = process.env.REACT_APP_AUTH_SERVER_BASE_URL + "/v1/auth/connect/logout?id_token_hint=" + idToken;
		window.location.href = uri;
	}
};

export default Session;
