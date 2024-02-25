import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { AttendanceUpdateQueueItem, CacheByMonthCourseAttendance, CourseAttendance } from "../types/Course";
import Api from "../services/api";
import moment from "moment";
import { getSessionData, removeSessionData, storeSessionData } from "../services/storage/sessionStorage";
import toast from "react-hot-toast";


interface AttendanceContextData {
	recoverAttendanceCache: () => void;
	getAttendanceByMonth: (courseId: string, startDate: string) => Promise<CourseAttendance[]>;
	invalidateAttendanceCache: () => void;
	updateFrequency: (studentAttendanceId: string, memberId: string, newStatusValue: number, updatedMonthData: CourseAttendance[], compositeKey: string) => void;
	getCompositeKey: (courseId: string, startDate: string) => string;
	attendanceData: CacheByMonthCourseAttendance | null;
}

interface AttendanceProviderProps {
	children: React.ReactNode;
}

export const AttendanceContext = createContext({} as AttendanceContextData);

const CACHE_ATTENDANCE_BY_MONTH_KEY = "attendanceByMonthCache";

const AttendanceProvider: React.FC<AttendanceProviderProps> = ({ children }) => {

	const [attendanceData, setAttendanceData] = useState<CacheByMonthCourseAttendance | null>(null);
	const [updateQueue, setUpdatedQueue] = useState<AttendanceUpdateQueueItem[]>([]);

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
			Api.Frequencies.getFrequencyByMonth(courseId, startDate, endDate)
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

	const updateFrequency = (studentAttendanceId: string, memberId: string, newStatusValue: number, updatedMonthData: CourseAttendance[], compositeKey: string) => {
		const backupState = { ...attendanceData };
		let data = {};
		if (attendanceData) {
			data = { ...attendanceData };
		}
		data[compositeKey] = updatedMonthData;
		setAttendanceData(data);
		storeSessionData(CACHE_ATTENDANCE_BY_MONTH_KEY, JSON.stringify(data));
		addToPromiseQueue({ backupState, promise: Api.Frequencies.updateFrequency(studentAttendanceId, memberId, newStatusValue) });
	};

	const invalidateAttendanceCache = () => {
		removeSessionData(CACHE_ATTENDANCE_BY_MONTH_KEY);
	};

	const addToPromiseQueue = (queueItem: AttendanceUpdateQueueItem) => {
		setUpdatedQueue(previous => [...previous, queueItem]);
	};

	useEffect(() => {
		//TODO: Preciso chamar apenas aqui e não na adição de novos itens.
		console.log("Update queue effect: ", updateQueue.length);
		if (updateQueue.length > 0) {
			const queueItem = updateQueue[0];
			queueItem.promise.then(() => {
				setUpdatedQueue(previous => previous.slice(1));
				console.log("Promise resolved");
			}).catch((error) => {
				//TODO: Não está caindo no catch. Verificar!
				console.log("DEU ERROROOO: ", error);
				const backupState = queueItem.backupState;
				setAttendanceData(backupState);
				storeSessionData(CACHE_ATTENDANCE_BY_MONTH_KEY, JSON.stringify(backupState));
				setUpdatedQueue([]);
				toast.error("Erro ao atualizar frequência. Tente novamente!");
				console.log("Promise rejected");
			});
		}
	}, [updateQueue]);

	const getCompositeKey = (courseId: string, startDate: string) => {
		return courseId + "_" + startDate;
	};


	return (
		<AttendanceContext.Provider
			value={{
				attendanceData,
				recoverAttendanceCache,
				getAttendanceByMonth,
				invalidateAttendanceCache,
				updateFrequency,
				getCompositeKey
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


