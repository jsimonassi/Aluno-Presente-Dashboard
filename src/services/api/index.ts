import axios from "axios";
import Classes from "./Classes";
import Session from "./Session";
import Periods from "./Periods";
import Student from "./Student";
import Frequencies from "./Frequencies";
import { LocalStorage } from "../storage";
import { SESSION_CACHE_KEY } from "../../contexts/Session";
import { TokenSession } from "../../types/Session";
import { Helpers } from "../../helpers";
import CONSTANTS from "../../constants";

export const __ApiResourceClient = axios.create({
	baseURL: process.env.REACT_APP_RESOURCE_SERVER_BASE_URL + "/v1/api",
	timeout: 30000,
	headers: {
		"Content-Type": "application/json"
	},
});

__ApiResourceClient.interceptors.request.use((config) => {
	const tokenData = LocalStorage.getLocalData(SESSION_CACHE_KEY);
	if(tokenData){
		const token: TokenSession = JSON.parse(tokenData);
		config.headers.Authorization = `Bearer ${token.accessToken}`;
	}
	return config;
});

__ApiResourceClient.interceptors.response.use((response) => {
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
	Periods,
	Student,
	Frequencies
};

export default Api;