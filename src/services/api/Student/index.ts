import { __ApiResourceClient } from "..";
import { Student as StudentType } from "../../../types/Student";
import { BatchProcess } from "../../../types/api/BatchProcess";
import { BatchAddResponseModel } from "../../../types/api/Student";

const Student = {
	/**
	 * @param student student to be added
	 * @param courseId id of the course
	 * @returns void
	 */
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
	/**
	 * @deprecated use addStudentsByBatch instead
	 * @param students list of students to be added
	 * @param courseId id of the course
	 * @returns list of failed insertions
	 */
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
	},
	/**
	 * @param students list of students to be added
	 * @param courseId id of the course
	 * @returns batch process object
	 */
	addStudentsByBatch: (students: StudentType[], courseId: string) => {
		return new Promise<BatchProcess>((resolve, reject) => {
			const parsedObj = students.map((student) => {
				return {
					email: student.email,
					registration: student.registration,
					alias: student.name
				};
			});
			__ApiResourceClient.post(`/batch-process/${courseId}/add-members`, {members: parsedObj})
				.then((response) => resolve(response.data))
				.catch((error) => reject(error));
		});
	},

	/**
	 * @returns list of batch processes
	 */
	getAllAddBatchProcesses: () => {
		return new Promise<BatchProcess[]>((resolve, reject) => {
			__ApiResourceClient.get("/batch-process", {params: {target: "ADD_MEMBER"}})
				.then((response) => resolve(response.data))
				.catch((error) => reject(error));
		});
	},

	/**
	 * @param batchId id of the batch process
	 * @returns Full data of the batch process
	 */
	getFullBatchInfo: (batchId: string) => {
		return new Promise<BatchProcess>((resolve, reject) => {
			__ApiResourceClient.get(`/batch-process/${batchId}`)
				.then((response) => resolve(response.data))
				.catch((error) => reject(error));
		});
	}
};

export default Student;
