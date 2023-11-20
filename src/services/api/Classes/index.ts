import { Course } from "../../../types/Course";
import { __ApiClient } from "..";

const Classes = {
	getClasses: () => {
		return new Promise<Course[]>((resolve) => {
			__ApiClient.get<Course[]>("/course/owner").then((response) => {
				console.log("xablau", response.data);
				resolve([]);
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