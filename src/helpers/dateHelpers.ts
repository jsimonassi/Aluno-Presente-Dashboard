import moment, { Moment } from "moment";

const APP_DATE_FORMAT = "YYYY-MM-DDTHH:mm:ssZ";

const updateHourAndMinute = (currentTime: Moment, newTime: string) => {
	const time = moment(newTime, APP_DATE_FORMAT);
	time.weekday(currentTime.isoWeekday());
	return time;
};

const endDateIsValid = (startDate: Moment, endDate: Moment) => {
	return (startDate.hour() < endDate.hour());
};

const getNextValidEndDate = (startDate: Moment, endDate: Moment) => {
	if (!endDateIsValid(startDate, endDate)) {
		endDate = startDate.clone().add(1, "hour");
	}
	return endDate;
};


export const DateHelpers = {
	updateHourAndMinute,
	getNextValidEndDate,
	endDateIsValid,
	APP_DATE_FORMAT
};