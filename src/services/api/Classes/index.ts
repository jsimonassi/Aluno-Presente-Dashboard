import { Course } from "../../../types/Course";
import { __ApiClient } from "..";

const Classes = {
	getClasses: () => {
		return new Promise<Course[]>((resolve) => {
			__ApiClient.get<Course[]>("/courses/owner").then((response) => {
				console.log("xablau", response.data);
				resolve([]);
			});
		});
	},
	addClass: (course: Course) => {
		return new Promise<Course>((resolve) => {
			__ApiClient.post<Course>("/courses", course).then((response) => {
				resolve(response.data);
			});
		});
	}
};

export default Classes;


// //		{
// 	id: 4,
// 	courseName: "Linguagens de Programação",
// 	period: "2023.1",
// 	daysOfWeek: [
// 		{
// 			startHour: 19,
// 			startMinute: 0,
// 			endHour: 22,
// 			endMinute: 0,
// 			dayOfWeek: 0
// 		}
// 	]
// }
// ]);