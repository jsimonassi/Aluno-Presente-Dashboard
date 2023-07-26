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