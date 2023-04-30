import { getLocalData, storeLocalData, clearLocalStorage } from "./localStorage";
import { getSessionData, storeSessionData, clearSessionStorage } from "./sessionStorage";

export const LocalStorage = {
	getLocalData,
	storeLocalData,
	clearLocalStorage
};

export const SessionStorage = {
	getSessionData,
	storeSessionData,
	clearSessionStorage
};
