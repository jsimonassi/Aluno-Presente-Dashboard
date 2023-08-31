import React, { createContext, useContext, useState } from "react";
import { User } from "../types/User";

interface UserContextData {
    loggedUser: User;
	setLoggedUser: (user: User) => void;
}

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserContext = createContext({} as UserContextData);

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

	const [loggedUser, setLoggedUser] = useState<User>({} as User);

	return (
		<UserContext.Provider
			value={{
				loggedUser: loggedUser,
				setLoggedUser: setLoggedUser
			}}>
			{children}
		</UserContext.Provider>
	);
};

const useUser = () => {
	const context = useContext(UserContext);

	return context;
};

export { UserProvider, useUser };
