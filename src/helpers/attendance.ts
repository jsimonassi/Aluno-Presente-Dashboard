import { CourseAttendance } from "../types/Course";

const generateNewAttendance = (courseAttendanceArray: CourseAttendance[], memberId: string, studentAttendanceId: string, newStatusValue: number) => {
	const newData = courseAttendanceArray.map((item) => {
		if(item.id === memberId) {
			const newFrequencies = item.frequencies.map((frequency) => {
				if(frequency.id === studentAttendanceId) {
					return {
						...frequency,
						status: newStatusValue
					};
				}
				return frequency;
			});
			return {
				...item,
				frequencies: newFrequencies
			};
		}
		return item;
	});

	return newData;
};

export const AttendanceHelper = {
	generateNewAttendance
};