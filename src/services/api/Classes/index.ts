import { Course } from "../../../types/Course";

const Classes = {
	getClasses: () => {
		return new Promise<Course[]>((resolve) => {
			setTimeout(() => {
				resolve([
					{
						id: 1,
						courseName: "Engenharia de Software",
						period: "2023.1",
						daysOfWeek: [
							{
								startHour: 19,
								startMinute: 0,
								endHour: 22,
								endMinute: 0,
								dayOfWeek: 0
							}
						]
					},
					{
						id: 2,
						courseName: "Inteligência Artificial",
						period: "2023.1",
						daysOfWeek: [
							{
								startHour: 19,
								startMinute: 0,
								endHour: 22,
								endMinute: 0,
								dayOfWeek: 0
							}
						]
					},
					{
						id: 3,
						courseName: "Linguagens de Programação",
						period: "2023.1",
						daysOfWeek: [
							{
								startHour: 19,
								startMinute: 0,
								endHour: 22,
								endMinute: 0,
								dayOfWeek: 0
							}
						]
					},
					{
						id: 4,
						courseName: "Linguagens de Programação",
						period: "2023.1",
						daysOfWeek: [
							{
								startHour: 19,
								startMinute: 0,
								endHour: 22,
								endMinute: 0,
								dayOfWeek: 0
							}
						]
					}
				]);
			}, 3000);
		});
	}
};

export default Classes;