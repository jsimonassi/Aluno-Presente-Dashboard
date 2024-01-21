import { Student } from "../types/Student";
import XLSX from "xlsx";

/**
 * Le planilha no padrão da prograd e retorna uma lista de estudantes
 * @param file Arquivo .xlsx com os alunos no formato fornecido pela PROGRAD
 * @returns Lista de estudantes encontrados
 */
const getStudentsFromXlsx = async (file: File | undefined): Promise<Student[]> => {
	try {
		if (file === undefined) return [];

		const data = await file.arrayBuffer();
		const workbook = XLSX.read(data);
		const worksheet = workbook.Sheets[workbook.SheetNames[0]];
		const matrixData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];

		let startIndex = 0;
		while (matrixData[startIndex][0] !== "Matrícula"){
			startIndex++;
		}

		matrixData.splice(0, startIndex + 1);

		const students: Student[] = matrixData.map((row) => {
			return {
				id: "",
				registration: row[1],
				name: row[2],
				email: row[3],
			};
		});

		return students;
	} catch (error) {
		console.log(error);
		throw new Error("Erro ao ler o arquivo. Verifique se o mesmo está no padrão da PROGRAD");
	}
};

export const XlsxManager = {
	getStudentsFromXlsx,
};