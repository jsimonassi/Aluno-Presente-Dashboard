import { __ApiResourceClient } from "..";
import { Student as StudentType } from "../../../types/Student";
import { BatchAddResponseModel } from "../../../types/api/Student";

const Student = {
	addSingleStudent: (student: StudentType, courseId: string) => {
		return new Promise<void>((resolve, reject) => {
			const parsedObj = {
				email: student.email?.toLowerCase(),
				registration: student.registration,
				alias: student.name
			};
			__ApiResourceClient.patch(`/courses/${courseId}/member`, parsedObj)
				.then(() => resolve())
				.catch((error) => reject(error));
		});
	}, 
	addMultipleStudents: (students: StudentType[], courseId: string) => {
		return new Promise<BatchAddResponseModel>((resolve, reject) => {
			const parsedObj = students.map((student) => {
				return {
					email: student.email,
					registration: student.registration,
					alias: student.name
				};
			});
			__ApiResourceClient.patch(`/courses/${courseId}/member-batch`, {members: parsedObj})
				.then((response) => resolve(response.data))
				.catch((error) => reject(error));
		});
	}
};

export default Student;
