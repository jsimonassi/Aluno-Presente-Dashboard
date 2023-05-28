import { StudentsClass } from "../../../types/StudentsClass";

const Classes = {
	getClasses: () => {
		return new Promise<StudentsClass[]>((resolve) => {
			setTimeout(() => {
				resolve([
					{
						id: 1,
						courseName: "Engenharia de Software",
						period: "2023.1",
						daysOfWeek: [
							{
								start: "19:00",
								end: "22:00",
								dayOfWeek: "Segunda"
							}
						]
					},
					{
						id: 2,
						courseName: "Inteligência Artificial",
						period: "2023.1",
						daysOfWeek: [
							{
								start: "19:00",
								end: "22:00",
								dayOfWeek: "Segunda"
							}
						]
					},
					{
						id: 3,
						courseName: "Linguagens de Programação",
						period: "2023.1",
						daysOfWeek: [
							{
								start: "19:00",
								end: "22:00",
								dayOfWeek: "Segunda"
							}
						]
					},
					{
						id: 4,
						courseName: "Linguagens de Programação",
						period: "2023.1",
						daysOfWeek: [
							{
								start: "19:00",
								end: "22:00",
								dayOfWeek: "Segunda"
							}
						]
					}
				]);
			}, 3000);
		});
	}
};

export default Classes;