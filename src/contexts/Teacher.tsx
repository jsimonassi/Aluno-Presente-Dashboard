import React, { createContext, useContext, useState } from "react";
import { Teacher } from "../types/Teacher";

interface TeacherUserContextData {
    loggedTeacher: Teacher;
	setLoggedTeacher: (teacher: Teacher) => void;
}

interface TeacherProviderProps {
    children: React.ReactNode;
}

export const TeacherContext = createContext({} as TeacherUserContextData);

const TeacherProvider: React.FC<TeacherProviderProps> = ({ children }) => {

	const [loggedTeacher, setLoggedTeacher] = useState<Teacher>({} as Teacher);

	return (
		<TeacherContext.Provider
			value={{
				loggedTeacher,
				setLoggedTeacher
			}}>
			{children}
		</TeacherContext.Provider>
	);
};

const useTeacher = () => {
	const context = useContext(TeacherContext);

	return context;
};

export { TeacherProvider, useTeacher };
