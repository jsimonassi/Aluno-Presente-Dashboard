import React from "react";
import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader, TableContainer } from "./styles";
import MESSAGES from "../../../../../../../../../constants/messages";
import { BatchAddResponseModel } from "../../../../../../../../../types/api/Student";
import { MainButton } from "../../../../../../../../../components/Buttons";
import { ResultTable } from "./components";

interface FailToAddModalProps {
	isOpen: boolean;
	onClose: () => void;
	failedResponse: BatchAddResponseModel | null;
}

const FailToAddModal = (props: FailToAddModalProps) => {

	return (
		<ModalContainer isOpen={props.isOpen} >
			<ModalContent >
				<ModalHeader >
					<h1>{MESSAGES.MY_CLASSES.MANAGE_CLASS.FAIL_TO_ADD_MODAL.TITLE}</h1>
				</ModalHeader>
				<ModalBody >
					<p>{MESSAGES.MY_CLASSES.MANAGE_CLASS.FAIL_TO_ADD_MODAL.MESSAGE}</p>
					<TableContainer>
						<ResultTable studentsWithFail={props.failedResponse?.failed ?? null} />
					</TableContainer>
				</ModalBody>
				<ModalFooter >
					<MainButton enabled onClick={props.onClose} text={"Ok"} />
				</ModalFooter>
			</ModalContent>
		</ModalContainer>
	);
};

export default FailToAddModal;