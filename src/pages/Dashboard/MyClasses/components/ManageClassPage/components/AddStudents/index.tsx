import React, { useState } from "react";
import { AddBatchCounter, Container, SubTitleContainer } from "./styles";
import MESSAGES from "../../../../../../../constants/messages";
import { AddFromManualModal, AddFromXlsxModal, FailToAddModal } from "./components";
import { BigButton } from "../../../../../../../components/Buttons";
import toast from "react-hot-toast";
import Api from "../../../../../../../services/api";
import { Student } from "../../../../../../../types/Student";
import { BatchAddResponseModel } from "../../../../../../../types/api/Student";
import { useAttendance } from "../../../../../../../contexts/Attendance";
import { useAddBatch } from "../../../../../../../contexts/AddBatch";
import { Tooltip } from "react-tooltip";
import { useAppTheme } from "../../../../../../../contexts/Theme";

interface AddStudentsProps {
	courseId: string;
	onRefreshClassRequested: () => void;
}

const AddStudents = (props: AddStudentsProps) => {

	const [addFromXlsxModalIsOpen, setAddFromXlsxModalIsOpen] = useState(false);
	const [addFromManualModalIsOpen, setAddFromManualModalIsOpen] = useState(false);
	const [studentsWithFail, setStudentsWithFail] = useState<BatchAddResponseModel | null>(null);
	const { invalidateAttendanceCache } = useAttendance();
	const { addStudentsByBatch, openBatchesCount } = useAddBatch();
	const theme = useAppTheme();

	const onAddSingleRequest = (newStudent: Student) => {
		setAddFromManualModalIsOpen(false);
		const toastRef = toast.loading(MESSAGES.MY_CLASSES.MANAGE_CLASS.ADDING_STUDENT);
		Api.Student.addSingleStudent(newStudent, props.courseId)
			.then(() => {
				toast.success(MESSAGES.MY_CLASSES.MANAGE_CLASS.ADDED_STUDENT, { id: toastRef });
				invalidateAttendanceCache();
				props.onRefreshClassRequested();
			})
			.catch(() => {
				toast.error(MESSAGES.MY_CLASSES.MANAGE_CLASS.ERROR_ADDING_STUDENT, { id: toastRef });
			});
	};

	const onAddMultipleRequest = (newStudents: Student[]) => {
		setAddFromXlsxModalIsOpen(false);
		const toastRef = toast.loading(MESSAGES.MY_CLASSES.MANAGE_CLASS.ADDING_STUDENTS);
		invalidateAttendanceCache();
		addStudentsByBatch(newStudents, props.courseId)
			.then(() => {
				props.onRefreshClassRequested();
				toast.success(MESSAGES.MY_CLASSES.MANAGE_CLASS.STUDENTS_ADDED, { id: toastRef });
			})
			.catch(() => {
				toast.error(MESSAGES.MY_CLASSES.MANAGE_CLASS.ERROR_ADDING_STUDENT, { id: toastRef });
			});
	};

	const getTooltipContent = () => {
		if (openBatchesCount > 1) return "Você tem " + openBatchesCount + " processos de adição de alunos em andamento. Ao Criar uma nova adição, ela ficará na fila até que as demais solicitações sejam concluídas.";
		if (openBatchesCount === 1) return "Você tem um processo de adição de alunos em andamento. Ao Criar uma nova adição, ela ficará na fila até que as demais solicitações sejam concluídas.";
		return "";
	};

	return (
		<Container>
			<FailToAddModal
				failedResponse={studentsWithFail}
				isOpen={studentsWithFail !== null}
				onClose={() => setStudentsWithFail(null)}
			/>
			<AddFromXlsxModal
				isOpen={addFromXlsxModalIsOpen}
				onClose={() => setAddFromXlsxModalIsOpen(false)}
				onAddStudentRequested={(newStudents) => onAddMultipleRequest(newStudents)}
			/>
			<AddFromManualModal
				isOpen={addFromManualModalIsOpen}
				onClose={() => setAddFromManualModalIsOpen(false)}
				onAddStudentRequested={onAddSingleRequest}
			/>
			<SubTitleContainer>
				<h2>{MESSAGES.MY_CLASSES.MANAGE_CLASS.SELECT_OPTION}</h2>
				{
					openBatchesCount > 0 &&
					(
						<>
							<AddBatchCounter
								data-tooltip-id="add-batch-tooltip"
								data-tooltip-content={getTooltipContent()}
							>
								{openBatchesCount}
							</AddBatchCounter>
							<Tooltip
								id="add-batch-tooltip"
								data-tooltip-place="right-end"
								style={{
									backgroundColor: theme.currentTheme.primary,
									color: theme.currentTheme.surface1,
									maxWidth: "300px",
									borderRadius: "16px",
									justifyContent: "center",
									alignItems: "center",
									padding: "16px",
									textAlign: "center"
								}}
							/>
						</>
					)
				}
			</SubTitleContainer>
			<BigButton
				boxStyle={{ marginTop: "16px" }}
				onClick={() => setAddFromXlsxModalIsOpen(true)}
				title={MESSAGES.MY_CLASSES.MANAGE_CLASS.IMPORT_STUDENTS}
				description={MESSAGES.MY_CLASSES.MANAGE_CLASS.IMPORT_STUDENTS_DESCRIPTION}
			/>
			<BigButton
				boxStyle={{ marginTop: "16px" }}
				onClick={() => setAddFromManualModalIsOpen(true)}
				title={MESSAGES.MY_CLASSES.MANAGE_CLASS.MANUAL_ADD}
				description={MESSAGES.MY_CLASSES.MANAGE_CLASS.MANUAL_ADD_DESCRIPTION}
			/>
		</Container>
	);
};

export default AddStudents;