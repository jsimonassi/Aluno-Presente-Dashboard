import { CourseAttendance } from "../types/Course";

export const getPastClassesTimeByFrequency = (frequency: CourseAttendance[]) => {

	const uniqueDates: string[] = [];

	frequency.forEach(item => {
		item.frequencies.forEach(frequency => {
			if (!uniqueDates.includes(frequency.date)) {
				uniqueDates.push(frequency.date);
			}
		});
	});
	
	uniqueDates.sort((a, b) => {
		const dateA = new Date(a);
		const dateB = new Date(b);
		return dateA.getTime() - dateB.getTime();
	});

	//To fix layout width
	if(uniqueDates.length < 30) {
		for(let i = 0; i < 30 - uniqueDates.length; i++) {
			uniqueDates.push("");
		}
	}

	return uniqueDates;
};

export const filterFrequencyByMonth = (frequency: CourseAttendance[], momentMonth: number) => {
	if(!frequency) return [];

	const filteredFrequency = JSON.parse(JSON.stringify(frequency)) as CourseAttendance[];
	return filteredFrequency.map(item => {
		item.frequencies = item.frequencies.filter(frequency => {
			const date = new Date(frequency.date);
			return date.getMonth() === momentMonth;
		});
		return item;
	});
};