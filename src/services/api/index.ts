import axios from "axios";
import Classes from "./Classes";
import Session from "./Session";
import Periods from "./Periods";
import { LocalStorage } from "../storage";
import { SESSION_CACHE_KEY } from "../../contexts/Session";
import { TokenSession } from "../../types/Session";
import { Helpers } from "../../helpers";
import CONSTANTS from "../../constants";

export const __ApiClient = axios.create({
	baseURL: process.env.REACT_APP_RESOURCE_SERVER_BASE_URL + "/v1/api",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json"
	},
});

__ApiClient.interceptors.request.use((config) => {
	const tokenData = LocalStorage.getLocalData(SESSION_CACHE_KEY);
	console.log("Token Data", tokenData);
	if(tokenData){
		const token: TokenSession = JSON.parse(tokenData);
		config.headers.Authorization = `Bearer ${token.accessToken}`;
	}
	return config;
});

__ApiClient.interceptors.response.use((response) => {
	return response;
}, (error) => {
	if (error.response.status === 401) {
		Helpers.eventEmitter.emit(CONSTANTS.EVENT.SESSION_EXPIRED);
	}
	return Promise.reject(error);
});

export const Api = {
	Classes,
	Session,
	Periods
};

export default Api;