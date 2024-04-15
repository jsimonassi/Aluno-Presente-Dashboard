import React, { useEffect, useMemo, useState } from "react";
import { createContext, useContext } from "react";
import { Student } from "../types/Student";
import Api from "../services/api";
import { BatchProcess } from "../types/api/BatchProcess";


interface AddBatchContextData {
	currentAddBatchList: BatchProcess[];
	openBatchesCount: number;
    addStudentsByBatch: (students: Student[], classId: string) => Promise<void>;
	refreshAddBatchList: () => void;
	getFullBatchInfo: (batchId: string) => Promise<BatchProcess>;
}

interface AddBatchProviderProps {
    children: React.ReactNode;
}

export const AddBatchContext = createContext({} as AddBatchContextData);

const AddBatchProvider: React.FC<AddBatchProviderProps> = ({ children }) => {

	const [currentAddBatchList, setCurrentAddBatchList] = useState<BatchProcess[]>([]);
	const openBatchesCount = useMemo(() => {
		console.log("Chamou atualizaão de batches", currentAddBatchList.filter((batch) => !batch.isFinished).length);
		return currentAddBatchList.filter((batch) => !batch.isFinished).length;
	}, [currentAddBatchList]);

	useEffect(() => refreshAddBatchList(), []);

	const refreshAddBatchList = () => {
		Api.Student.getAllAddBatchProcesses()
			.then((batches) => setCurrentAddBatchList(batches));
	};

	const addStudentsByBatch = (students: Student[], classId: string) => {
		return new Promise<void>((resolve, reject) => {
			Api.Student.addStudentsByBatch(students, classId)
				.then((addedBatch) => {
					setCurrentAddBatchList([...currentAddBatchList, addedBatch]);
					resolve();
				})
				.catch((error) => reject(error));
		});
	};

	const getFullBatchInfo = (batchId: string) => {
		return Api.Student.getFullBatchInfo(batchId);
	};

	return (
		<AddBatchContext.Provider
			value={{
				currentAddBatchList,
				openBatchesCount,
				addStudentsByBatch,
				refreshAddBatchList,
				getFullBatchInfo
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
