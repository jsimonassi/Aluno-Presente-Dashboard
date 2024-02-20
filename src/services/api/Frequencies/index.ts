import moment from "moment";
import { __ApiResourceClient } from "..";
import { CourseFrequency } from "../../../types/Course";

const Frequencies = {
	getFrequencyByMonth: (courseId: string, startDate: string, endDate: string) => {
		return new Promise<CourseFrequency[]>((resolve) => {
			__ApiResourceClient.get(`/frequencies/courses/${courseId}/owner?start=${startDate}&end=${endDate}`)
				.then((response) => {
					const frequencyArray = response.data.map((frequency) => ({
						...frequency,
						name: frequency.alias,
						frequencies: frequency.frequencies.sort((a, b) => moment(a.date).isBefore(b.date) ? -1 : 1)
					})) as CourseFrequency[];
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
	}
};

export default Frequencies;
