import axios from "axios";
import Classes from "./Classes";
import Session from "./Session";
import { LocalStorage } from "../storage";
import { SESSION_CACHE_KEY } from "../../contexts/Session";

export const __ApiClient = axios.create({
	baseURL: process.env.REACT_APP_RESOURCE_SERVER_BASE_URL,
	timeout: 5000,
	headers: {
		"Content-Type": "application/json"
	},
});

__ApiClient.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${LocalStorage.getLocalData(SESSION_CACHE_KEY)}`;
	console.log("PAssei aqui", config);
	return config;
});

__ApiClient.interceptors.response.use((response) => {
	return response;
}, (error) => {
	if (error.response.status === 401) {
		alert("Sessão expirada!");
		// Session.logout();
	}
	return Promise.reject(error);
});

export const Api = {
	Classes,
	Session
};

export default Api;