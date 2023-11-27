import { Course } from "../../../types/Course";
import { __ApiClient } from "..";
import { fromApiClassTimeToApp, fromAppClassTimeToApi } from "./parser";

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
			// const body = {...course, daysOfWeeks: fromAppClassTimeToApi(course.daysOfWeeks)};
			const body = {...course, daysOfWeeks: null};
			console.log("Opa", body);
			__ApiClient.post("/courses", body)
				.then((response) => {
					resolve(response.data);
				}).catch((error) => {
					console.log(error);
					reject(error);
				});
		});
	},
	deleteClass: (id: string) => {
		return new Promise<void>((resolve,reject) => {
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
