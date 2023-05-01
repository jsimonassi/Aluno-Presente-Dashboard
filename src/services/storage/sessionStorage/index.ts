/**
 Qualquer conteúdo/dado salvo no objeto sessionStorage estará disponível 
 enquanto o navegador estiver aberto.
 */


export const storeSessionData = (key: string, encodedValue: string) => {
	try {
		sessionStorage.setItem(key, encodedValue);
	} catch (e) {
		console.log(e);
	}
};

export const getSessionData = (key: string) => {
	try {
		return sessionStorage.getItem(key);
	} catch (e) {
		console.log(e);
	}
};

export const clearSessionStorage = () => {
	try {
		sessionStorage.clear();
	} catch (e) {
		console.log(e);
	}
};