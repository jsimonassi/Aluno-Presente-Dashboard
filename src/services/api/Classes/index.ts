import { Course } from "../../../types/Course";
import { __ApiClient } from "..";
import { fromApiClassTimeToApp } from "./parser";

const Classes = {
	getClasses: () => {
		return new Promise<Course[]>((resolve) => {
			__ApiClient.get("/courses/owner").then((response) => {
				response.data.forEach((course) => {
					course.daysOfWeeks = fromApiClassTimeToApp(course.daysOfWeeks);
				});
				resolve(response.data);
			});
		});
	},
	addClass: (course: Course) => {
		return new Promise<Course>((resolve, reject) => {
			const body = { ...course, daysOfWeeks: null };
			__ApiClient.post("/courses", body)
				.then((response) => {
					resolve(response.data);
				}).catch((error) => {
					console.log(error);
					reject(error);
				});
		});
	},
	editClass: (course: Course) => {
		return new Promise<Course>((resolve, reject) => {
			const body = { ...course, daysOfWeeks: null };
			__ApiClient.put(`/courses/${course.id}`, body)
				.then((response) => {
					resolve(response.data);
				}).catch((error) => {
					console.log(error);
					reject(error);
				});
		});
	},
	deleteClass: (id: string) => {
		return new Promise<void>((resolve, reject) => {
			__ApiClient.delete("/courses/" + id)
				.then(() => {
					resolve();
				}).catch((error) => {
					reject(error);
				});
		});
	}
};

export default Classes;
