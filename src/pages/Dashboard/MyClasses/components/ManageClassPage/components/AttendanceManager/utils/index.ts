import { CourseFrequency } from "../../../../../../../../types/Course";

export const getPastClassesTimeByFrequency = (frequency: CourseFrequency[]) => {

	const uniqueDates: string[] = [];

	frequency.forEach(item => {
		item.frequencies.forEach(frequency => {
			if (!uniqueDates.includes(frequency.date)) {
				uniqueDates.push(frequency.date);
			}
		});
	});

	return uniqueDates;
};

export const filterFrequencyByMonth = (frequency: CourseFrequency[], momentMonth: number) => {
	if(!frequency) return [];

	const filteredFrequency = JSON.parse(JSON.stringify(frequency)) as CourseFrequency[];
	return filteredFrequency.map(item => {
		item.frequencies = item.frequencies.filter(frequency => {
			const date = new Date(frequency.date);
			return date.getMonth() === momentMonth;
		});
		return item;
	});
};