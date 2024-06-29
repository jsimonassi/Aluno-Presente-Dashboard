import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createContext, useContext } from "react";
import { Student } from "../types/Student";
import Api from "../services/api";
import { BatchProcess } from "../types/api/BatchProcess";
import moment from "moment";


interface AddBatchContextData {
	currentAddBatchList: BatchProcess[] | null;
	openBatchesCount: number;
	newBatchesCount: number;
	lastUpdate: Date;
	addStudentsByBatch: (students: Student[], classId: string) => Promise<void>;
	refreshAddBatchList: () => Promise<void>;
	getFullBatchInfo: (batchId: string) => Promise<BatchProcess>;
	markBatchAsRead: (batch: BatchProcess) => Promise<void>;
}

interface AddBatchProviderProps {
	children: React.ReactNode;
}

export const AddBatchContext = createContext({} as AddBatchContextData);

const AddBatchProvider: React.FC<AddBatchProviderProps> = ({ children }) => {

	const [currentAddBatchList, setCurrentAddBatchList] = useState<BatchProcess[] | null>(null);
	const openBatchesCount = useMemo(() => {
		if (!currentAddBatchList) return 0;
		return currentAddBatchList.filter((batch) => !batch.isFinished && moment(batch.createdAt).diff(moment(), "days") >= 1).length;
	}, [currentAddBatchList]);

	const newBatchesCount = useMemo(() => {
		if (!currentAddBatchList) return 0;
		return currentAddBatchList.filter((batch) => !batch.isViewed).length;
	}, [currentAddBatchList]);
	const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

	useEffect(() => {
		refreshAddBatchList();
	}, []);
	useEffect(() => setLastUpdate(new Date()), [currentAddBatchList]);

	const refreshAddBatchList = () => {
		return new Promise<void>((resolve, reject) => {
			Api.Student.getAllAddBatchProcesses()
				.then((batches) => {
					const data = batches || [];
					data.sort(
						(a: BatchProcess, b: BatchProcess) => { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); }
					);
					setCurrentAddBatchList(batches);
					resolve();
				})
				.catch((error) => reject(error));
		});

	};

	const addStudentsByBatch = (students: Student[], classId: string) => {
		return new Promise<void>((resolve, reject) => {
			Api.Student.addStudentsByBatch(students, classId)
				.then((addedBatch) => {
					const currentList = currentAddBatchList || [];
					setCurrentAddBatchList([addedBatch, ...currentList]);
					resolve();
				})
				.catch((error) => reject(error));
		});
	};

	const getFullBatchInfo = (batchId: string) => {
		return new Promise<BatchProcess>((resolve, reject) => {
			Api.Student.getFullBatchInfo(batchId).then((response) => {
				const currentList = currentAddBatchList || [];
				const updatedBatchList = currentList.map((batch) => {
					if (batch.id === batchId) {
						return response;
					}
					return batch;
				});
				setCurrentAddBatchList(updatedBatchList);
				resolve(response);
			}).catch((error) => reject(error));
		});
	};

	const markBatchAsRead = useCallback((batch: BatchProcess) => {
		return new Promise<void>((resolve, reject) => {
			Api.Student.markBatchAsRead(batch.id)
				.then(() => {
					setTimeout(() => {
						const currentList = currentAddBatchList || [];
						const updatedBatches = currentList.map((currentBatch) => {
							if (currentBatch.id === batch.id) {
								return { ...batch, isViewed: true };
							}
							return currentBatch;
						});
						setCurrentAddBatchList(updatedBatches);
						resolve();
					}, 2000);
				}).catch((error) => reject(error));
		});
	}, [currentAddBatchList]);

	return (
		<AddBatchContext.Provider
			value={{
				currentAddBatchList,
				lastUpdate,
				openBatchesCount,
				newBatchesCount,
				addStudentsByBatch,
				refreshAddBatchList,
				getFullBatchInfo,
				markBatchAsRead
			}}>
			{children}
		</AddBatchContext.Provider>
	);

};

const useAddBatch = () => {
	const context = useContext(AddBatchContext);

	return context;
};

export { AddBatchProvider, useAddBatch };
