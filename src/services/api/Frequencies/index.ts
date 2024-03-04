import moment from "moment";
import { __ApiResourceClient } from "..";
import { CourseAttendance } from "../../../types/Course";

const Frequencies = {
	getFrequencyByDate: (courseId: string, startDate: string, endDate: string) => {
		return new Promise<CourseAttendance[]>((resolve) => {
			__ApiResourceClient.get(`/frequencies/courses/${courseId}/owner?start=${startDate}&end=${endDate}`)
				.then((response) => {
					const frequencyArray = response.data.map((frequency) => ({
						...frequency,
						name: frequency.alias,
						frequencies: frequency.frequencies.sort((a, b) => moment(a.date).isBefore(b.date) ? -1 : 1)
					})) as CourseAttendance[];
					frequencyArray.sort((a, b) => a.name.localeCompare(b.name));
					resolve(frequencyArray);
				});
		});
	},
	createFrequencyWithStaticCode: (courseId: string, date: string) => {
		return new Promise<{code: string}>((resolve, reject) => {
			__ApiResourceClient.post(`/frequencies/courses/${courseId}`, { date })
				.then((response) => {
					resolve({ code: response.data.code });
				}).catch((error) => {
					console.error(error);
					reject(error);
				});
		});
	},
	updateFrequency: (frequencyId: string, memberId: string, status: number) => {
		return new Promise<void>((resolve, reject) => {
			console.log("Atualizando frequência: ", frequencyId, memberId, status);
			__ApiResourceClient.patch(`/attendances/frequencies/${frequencyId}/members/${memberId}`, { status })
				.then(() => {
					resolve();
				}).catch((error) => {
					reject(error);
				});
		});
	}
};

export default Frequencies;
