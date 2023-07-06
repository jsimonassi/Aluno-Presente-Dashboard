import moment from "moment";
import { ClassTime } from "../types/Course";

const convertClassTimeToMoment = (classTime: ClassTime) => {
	return {
		start: moment().hour(classTime.startHour).minute(classTime.startMinute),
		end: moment().hour(classTime.endHour).minute(classTime.endMinute)
	};
};


export const DateConverter = {
	convertClassTimeToMoment,
};