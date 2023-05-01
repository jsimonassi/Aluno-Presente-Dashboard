/**
 Qualquer conteúdo/dado salvo no objeto localStorage estará disponível 
 depois que o navegador for reiniciado (fechado e aberto novamente).
 */


export const storeLocalData = (key: string, encodedValue: string) => {
	try {
		localStorage.setItem(key, encodedValue);
	} catch (e) {
		console.log(e);
	}
};

export const getLocalData = (key: string) => {
	try {
		return localStorage.getItem(key);
	} catch (e) {
		console.log(e);
	}
};

export const clearLocalStorage = () => {
	try {
		localStorage.clear();
	} catch (e) {
		console.log(e);
	}
};