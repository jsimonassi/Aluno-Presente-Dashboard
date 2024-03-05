import React, { createContext, useContext, useState } from "react";
import { CacheByMonthCourseAttendance, CourseAttendance } from "../types/Course";
import Api from "../services/api";
import moment from "moment";
import { getSessionData, removeSessionData, storeSessionData } from "../services/storage/sessionStorage";
import toast from "react-hot-toast";
import MESSAGES from "../constants/messages";
import { AttendanceInProgress, LatLng } from "../types/Attendance";
import { Helpers } from "../helpers";
import { storeLocalData } from "../services/storage/localStorage";

interface AttendanceContextData {
	recoverAttendanceCache: () => void;
	getAttendanceByMonth: (courseId: string, startDate: string) => Promise<CourseAttendance[]>;
	invalidateAttendanceCache: () => void;
	updateFrequency: (studentAttendanceId: string, memberId: string, newStatusValue: number, updatedMonthData: CourseAttendance[], compositeKey: string) => void;
	getCompositeKey: (courseId: string, startDate: string) => string;
	startAttendance: (courseId: string, type: "qrCode" | "sessionCode", location: LatLng | null) => AttendanceInProgress;
	getPeriodAttendanceByDateWithoutCache: (courseId: string, startDate: string, endDate: string) => Promise<CourseAttendance[]>;
	attendanceData: CacheByMonthCourseAttendance | null;
}

interface AttendanceProviderProps {
	children: React.ReactNode;
}

export const AttendanceContext = createContext({} as AttendanceContextData);

const CACHE_ATTENDANCE_BY_MONTH_KEY = "attendanceByMonthCache";

const AttendanceProvider: React.FC<AttendanceProviderProps> = ({ children }) => {

	const [attendanceData, setAttendanceData] = useState<CacheByMonthCourseAttendance | null>(null);

	const recoverAttendanceCache = () => {
		const cacheData = getSessionData(CACHE_ATTENDANCE_BY_MONTH_KEY);
		if (cacheData) {
			const cache = JSON.parse(cacheData);
			if (cache) {
				setAttendanceData(cache);
			}
		}
	};

	const getAttendanceByMonth = (courseId: string, startDate: string) => {
		return new Promise<CourseAttendance[]>((resolve, reject) => {
			if (attendanceData && attendanceData[getCompositeKey(courseId, startDate)]) {
				resolve(attendanceData[getCompositeKey(courseId, startDate)]);
				return;
			}

			const endDate = moment(startDate).endOf("month").format();
			Api.Frequencies.getFrequencyByDate(courseId, startDate, endDate)
				.then((response) => {
					let data = {};
					if (attendanceData) {
						data = { ...attendanceData };
					}
					data[getCompositeKey(courseId, startDate)] = response;
					setAttendanceData(data);
					storeSessionData(CACHE_ATTENDANCE_BY_MONTH_KEY, JSON.stringify(data));
					resolve(response);
				}).catch((error) => {
					console.log(error);
					let data = {};
					if (attendanceData) {
						data = { ...attendanceData };
					}
					data[getCompositeKey(courseId, startDate)] = [];
					storeSessionData(CACHE_ATTENDANCE_BY_MONTH_KEY, JSON.stringify(data));
					setAttendanceData(data);
					reject(error);
				});
		});
	};


	const getPeriodAttendanceByDateWithoutCache = (courseId: string, startDate: string, endDate: string) => {
		return Api.Frequencies.getFrequencyByDate(courseId, startDate, endDate);
	};


	const startAttendance = (courseId: string, type: "qrCode" | "sessionCode", location: LatLng | null) => {
		const attendanceInProgress: AttendanceInProgress = {
			courseId: courseId,
			type: type,
			date: moment().format(),
			status: "requested",
			id: Helpers.CodeGenerator.generateRandomId32(),
			location: location
		};
		storeLocalData(attendanceInProgress.id, JSON.stringify(attendanceInProgress));
		invalidateAttendanceCache();
		return attendanceInProgress;
	};

	const updateFrequency = (studentAttendanceId: string, memberId: string, newStatusValue: number, updatedMonthData: CourseAttendance[], compositeKey: string) => {
		const backupState = { ...attendanceData };
		let data = {};
		if (attendanceData) {
			data = { ...attendanceData };
		}
		data[compositeKey] = updatedMonthData;
		setAttendanceData(data);
		storeSessionData(CACHE_ATTENDANCE_BY_MONTH_KEY, JSON.stringify(data));
		Api.Frequencies.updateFrequency(studentAttendanceId, memberId, newStatusValue)
			.catch(() => {
				setAttendanceData(backupState);
				storeSessionData(CACHE_ATTENDANCE_BY_MONTH_KEY, JSON.stringify(backupState));
				toast.error(MESSAGES.MY_CLASSES.ATTENDANCE_CONTROLLER.ERROR_UPDATING_ATTENDANCE);
			});
	};

	const invalidateAttendanceCache = () => {
		removeSessionData(CACHE_ATTENDANCE_BY_MONTH_KEY);
		setAttendanceData(null);
	};

	const getCompositeKey = (courseId: string, startDate: string) => {
		return courseId + "_" + startDate;
	};

	return (
		<AttendanceContext.Provider
			value={{
				attendanceData,
				recoverAttendanceCache,
				getAttendanceByMonth,
				getPeriodAttendanceByDateWithoutCache,
				invalidateAttendanceCache,
				updateFrequency,
				getCompositeKey,
				startAttendance
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



/*
1 - Coloca a promise na lista;
2 - Pega o resultado;
3 - Foi sucesso? Vai para a próxima promise : Foi erro? Vai para o catch e cancela o resto das promises;
*/


