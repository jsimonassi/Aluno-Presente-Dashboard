import { getLocalData, storeLocalData, clearLocalStorage, clearItem } from "./localStorage";
import { getSessionData, storeSessionData, clearSessionStorage } from "./sessionStorage";

export const LocalStorage = {
	getLocalData,
	storeLocalData,
	clearLocalStorage,
	clearItem
};

export const SessionStorage = {
	getSessionData,
	storeSessionData,
	clearSessionStorage,
};
