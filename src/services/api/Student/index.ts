import { __ApiResourceClient } from "..";
import { Student as StudentType } from "../../../types/Student";

const Student = {
	addSingleStudent: (student: StudentType, courseId: string) => {
		return new Promise<void>((resolve, reject) => {
			const parsedObj = {
				email: student.email,
				registration: student.registration,
				alias: student.name
			};
			__ApiResourceClient.patch(`/courses/${courseId}/member`, parsedObj)
				.then(() => resolve())
				.catch((error) => reject(error));
		});
	}, 
};

export default Student;
