import React, { useEffect, useMemo, useState } from "react";
import { createContext, useContext } from "react";
import { Student } from "../types/Student";
import Api from "../services/api";
import { BatchProcess } from "../types/api/BatchProcess";


interface AddBatchContextData {
	currentAddBatchList: BatchProcess[] | null;
	openBatchesCount: number;
	newBatchesCount: number;
	lastUpdate: Date;
    addStudentsByBatch: (students: Student[], classId: string) => Promise<void>;
	refreshAddBatchList: () => Promise<void>;
	getFullBatchInfo: (batchId: string) => Promise<BatchProcess>;
	markBatchAsRead: (batchId: string) => Promise<void>;
}

interface AddBatchProviderProps {
    children: React.ReactNode;
}

export const AddBatchContext = createContext({} as AddBatchContextData);

const AddBatchProvider: React.FC<AddBatchProviderProps> = ({ children }) => {

	const [currentAddBatchList, setCurrentAddBatchList] = useState<BatchProcess[] | null>(null);
	const openBatchesCount = useMemo(() => {
		if(!currentAddBatchList) return 0;
		return currentAddBatchList.filter((batch) => !batch.isFinished).length;
	}, [currentAddBatchList]);

	const newBatchesCount = useMemo(() => {
		if(!currentAddBatchList) return 0;
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
					setCurrentAddBatchList([...currentList, addedBatch]);
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

	const markBatchAsRead = (batchId: string) => {
		return new Promise<void>((resolve, reject) => {
			Api.Student.markBatchAsRead(batchId)
				.then(() => {
					const currentList = currentAddBatchList || [];
					const updatedBatches = currentList.map((batch) => {
						if (batch.id === batchId) {
							return { ...batch, isViewed: true };
						}
						return batch;
					});
					setCurrentAddBatchList(updatedBatches);
					resolve();
				})
				.catch((error) => reject(error));
		});
	};

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
