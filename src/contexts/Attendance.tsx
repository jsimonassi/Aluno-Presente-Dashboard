import React, { createContext, useContext } from "react";
import { CourseAttendance } from "../types/Course";
import Api from "../services/api";
import moment from "moment";
import { getSessionData, removeSessionData, storeSessionData } from "../services/storage/sessionStorage";


interface AttendanceContextData {
    getAttendanceByMonth: (courseId: string, startDate: string) => Promise<CourseAttendance[]>;
	invalidateAttendanceCache: () => void;
	updateFrequency: (studentAttendanceId: string, memberId: string, dateKey: string, newStatusValue: number) => Promise<CourseAttendance[] | null>;
}

interface AttendanceProviderProps {
    children: React.ReactNode;
}

export const AttendanceContext = createContext({} as AttendanceContextData);

const CACHE_ATTENDANCE_BY_MONTH_KEY = "ATTENDANCE_BY_MONTH";

const AttendanceProvider: React.FC<AttendanceProviderProps> = ({ children }) => {

	const getAttendanceByMonth = (courseId: string, startDate: string) => {
		return new Promise<CourseAttendance[]>((resolve, reject) => {
			const cache = __getImmediateCache(startDate);
			if (cache) {
				resolve(cache);
				return;
			}

			const endDate = moment(startDate).endOf("month").format();
			Api.Frequencies.getFrequencyByMonth(courseId, startDate, endDate)
				.then((response) => {
					__updateImmediateCache(startDate, response);
					resolve(response);
				}).catch((error) => {
					console.log(error);
					reject(error);
				});
		});
	};

	const updateFrequency = (studentAttendanceId: string, memberId: string, dateKey: string, newStatusValue: number) => {
		return new Promise<CourseAttendance[] | null>((resolve, reject) => {
			Api.Frequencies.updateFrequency(studentAttendanceId, memberId, newStatusValue)
				.then(() => {
					const data = __getImmediateCache(dateKey);
					if(data) {
						const newData = data.map((item) => {
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
						__updateImmediateCache(dateKey, newData);
						resolve(data);
						return;
					}
					resolve(null);
				}).catch((error) => {
					console.error(error);
					reject(error);
				});
		});
	};

	const invalidateAttendanceCache = () => {
		removeSessionData(CACHE_ATTENDANCE_BY_MONTH_KEY);
	};

	const __updateImmediateCache = (startDate: string, courseFrequency: CourseAttendance[]) => {
		const cacheData = getSessionData(CACHE_ATTENDANCE_BY_MONTH_KEY);
		let cache = {};
		if (cacheData) {
			cache = JSON.parse(cacheData);
		}
		cache[startDate] = courseFrequency;
		storeSessionData(CACHE_ATTENDANCE_BY_MONTH_KEY, JSON.stringify(cache));
	};

	const __getImmediateCache = (startDate: string): CourseAttendance[] | null => {
		const cacheData = getSessionData(CACHE_ATTENDANCE_BY_MONTH_KEY);
		if (cacheData) {
			const cache = JSON.parse(cacheData);
			return cache[startDate];
		}
		return null;
	};


	return (
		<AttendanceContext.Provider
			value={{
				getAttendanceByMonth,
				invalidateAttendanceCache,
				updateFrequency
			}}>
			{children}
		</AttendanceContext.Provider>
	);
};

const useAttendance = () => {
	const context = useContext(AttendanceContext);

	return context;
};

export { AttendanceProvider, useAttendance };