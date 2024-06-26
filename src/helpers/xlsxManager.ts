import { Course, CourseAttendance } from "../types/Course";
import { Student } from "../types/Student";
import XLSX from "xlsx";
import ExcelJS from "exceljs";
import { getPastClassesTimeByFrequency } from "../utils";
import moment from "moment";
// import logo from "../assets/images/logoBlue.png";
import { AVAILABLE_FREQUENCY_STATUS } from "../constants/frequency";
import axios from "axios";

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
		while (matrixData[startIndex][0] !== "Matrícula") {
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

const createAttendanceXlsx = async (attendance: CourseAttendance[], courseInfos: Course) => {
	try {
		const workbook = new ExcelJS.Workbook();
		const sheet = workbook.addWorksheet("My Sheet");

		const imageBuffer = await axios.get("https://alunopresente.vercel.app/logoBlue.png", { responseType: "arraybuffer" });
		const imageId2 = workbook.addImage({
			buffer: imageBuffer.data,
			extension: "png",
		});

		sheet.addImage(imageId2, "A1:A4");

		const dateHeaderItems = getPastClassesTimeByFrequency(attendance);
		const formattedHeaderItems = dateHeaderItems.map(date => {
			if (date === "")
				return "";
			return moment(date).format("DD/MM/YYYY - HH:mm");
		});

		const data = [
			["Curso", courseInfos.name],
			["Professor", courseInfos.teacher?.name],
			["Período", courseInfos.period],
			["Data de criação", courseInfos.createdAt],
			[],
			["E-mail", "Matrícula", "Nome do aluno", "Frequência", ...formattedHeaderItems]
		];

		attendance.forEach(studentAttendance => {
			const currentStudentAttendance: string[] = [];
			let totalClassesForStudent = 0;
			let totalPresentClassesForStudent = 0;
			dateHeaderItems.forEach((headerDate) => {
				let statusName = AVAILABLE_FREQUENCY_STATUS.get(studentAttendance.frequencies.find(item => item.date === headerDate)?.status ?? -1)?.name;
				if (statusName === undefined) {
					statusName = "Não inscrito";
				}
				if (headerDate === "") {
					statusName = "";
				}

				if(statusName === "P") {
					totalPresentClassesForStudent++;
				}

				if(statusName !== "" && statusName !== "Não inscrito"){
					totalClassesForStudent++;
				}

				currentStudentAttendance.push(statusName);
			});
			const userFrequency = totalClassesForStudent > 0 ? Math.round((totalPresentClassesForStudent / totalClassesForStudent) * 100) : 0;
			data.push([studentAttendance.id, studentAttendance.registration ?? "", studentAttendance.name, userFrequency + "%", ...currentStudentAttendance]);
		});

		data.forEach((row, rowIndex) => {
			row.forEach((cell, cellIndex) => {
				sheet.getCell(rowIndex + 5, cellIndex + 1).value = cell; // Adiciona 2 ao rowIndex para deixar espaço para a imagem
			});
		});

		//Estiliza a planilha

		//Bg da imagem
		for(let i = 1; i <= 4; i++) {
			sheet.getCell(`A${i}`).style = {
				fill: {
					type: "pattern",
					pattern:"solid",
					fgColor:{argb:"FFFFFF"}
				}
			};
		}
		// for(let row = 1; row <= 4; row++) {
		// 	for(const col of ["A", "B"]) {
		// 		sheet.getCell(`${col}${row}`).style = {
		// 			fill: {
		// 				type: "pattern",
		// 				pattern:"solid",
		// 				fgColor:{argb:"FFFFFF"}
		// 			}
		// 		};
		// 	}
		// }

		const header = sheet.getRow(10);
		header.font = { bold: true };
		header.fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FFD9D9D9" },
		};

		sheet.columns.forEach(column => {
			column.width = 20;
			if (column.number && column.number >= 3) {
				column.alignment = { horizontal: "center" };
			}
		});

		sheet.getRow(5).getCell(1).font = { bold: true };
		sheet.getRow(6).getCell(1).font = { bold: true };
		sheet.getRow(7).getCell(1).font = { bold: true };
		sheet.getRow(8).getCell(1).font = { bold: true };

		// Cria e exporta o arquivo
		workbook.xlsx.writeBuffer().then(function (data) {
			const blob = new Blob([data], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
			const url = window.URL.createObjectURL(blob);
			const anchor = document.createElement("a");
			anchor.href = url;
			anchor.download = courseInfos.name + " - Frequência.xlsx";
			anchor.click();
			window.URL.revokeObjectURL(url);
		}).catch((error) => {
			console.log(error);
			throw new Error("Erro ao criar o arquivo! Tente novamente.");
		});
	} catch (error) {
		console.log(error);
		throw new Error("Erro ao criar o arquivo! Tente novamente.");
	}
};

export const XlsxManager = {
	getStudentsFromXlsx,
	createAttendanceXlsx
};
