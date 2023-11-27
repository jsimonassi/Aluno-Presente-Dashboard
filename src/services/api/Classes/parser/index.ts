import moment from "moment";
import { Helpers } from "../../../../helpers";
import { ClassTime } from "../../../../types/Course";

export const fromAppClassTimeToApi = (classTime: ClassTime[]) => {
	return classTime.map((classTime) => {
		return {
			start: classTime.momentStart.format(Helpers.DateHelpers.APP_DATE_FORMAT),
			end: classTime.momentEnd.format(Helpers.DateHelpers.APP_DATE_FORMAT),
		};
	});
};

export const fromApiClassTimeToApp = (classTime: {start: string, end: string}[]): ClassTime[] => {
	if(!classTime) return [];
	return classTime.map((classTime) => {
		return {
			start: classTime.start,
			end: classTime.end,
			momentStart: moment(classTime.start, Helpers.DateHelpers.APP_DATE_FORMAT),
			momentEnd: moment(classTime.end, Helpers.DateHelpers.APP_DATE_FORMAT)
		};
	});
};