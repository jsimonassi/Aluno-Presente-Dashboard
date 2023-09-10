import axios from "axios";
import qs from "qs";
import { SessionAuthConfig, TokenRequestConfig, TokenSession } from "../../../types/Session";


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
	}
};

export default Session;
