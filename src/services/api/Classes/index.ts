import { Course } from "../../../types/Course";
import { __ApiResourceClient } from "..";
import { fromApiClassTimeToApp } from "./parser";

const Classes = {
	getClasses: () => {
		return new Promise<Course[]>((resolve) => {
			__ApiResourceClient.get("/courses/owner").then((response) => {
				response.data.forEach((course) => {
					course.daysOfWeek = fromApiClassTimeToApp(course.daysOfWeek);
				});
				resolve(response.data);
			});
		});
	},
	addClass: (course: Course) => {
		return new Promise<Course>((resolve, reject) => {
			__ApiResourceClient.post("/courses", course)
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
			__ApiResourceClient.put(`/courses/${course.id}`, course)
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
			__ApiResourceClient.delete("/courses/" + id)
				.then(() => {
					resolve();
				}).catch((error) => {
					reject(error);
				});
		});
	}
};

export default Classes;
