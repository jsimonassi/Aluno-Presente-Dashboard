import React, { useEffect, useState } from "react";
import { ModalContainer, ModalContent, ModalHeader } from "./styles";
import closeIcon from "../../../../../../../../../assets/images/closeIcon.svg";
import MESSAGES from "../../../../../../../../../constants/messages";
import { AttendanceInProgressType } from "../../shared/types";
import { MainButton } from "../../../../../../../../../components/Buttons";
import moment from "moment";


interface NewAttendanceModalProps {
    isOpen: boolean;
    onCancel: () => void;
    attendanceType: AttendanceInProgressType | null;
    courseId: string;
}

const AttendanceInProgressModal = (props: NewAttendanceModalProps) => {

	// const url = "wss://" + 
	// process.env.REACT_APP_RESOURCE_SERVER_BASE_URL +  
	// "/v1/api/attendences/ws/courses/" +
	// props.courseId +
	// "/dates/" +
	// moment().format();

	const ws = new WebSocket("wss://ws.bitstamp.net");
  
	const apiCall = {
		event: "bts:subscribe",
		data: { channel: "order_book_btcusd" },
	};
  
	ws.onopen = () => {
		ws.send(JSON.stringify(apiCall));
	};
  
	ws.onmessage = function (event) {
		const json = JSON.parse(event.data);
		try {
			console.log(json);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<ModalContainer isOpen={props.isOpen} >
			<ModalContent >
				<ModalHeader >
					<h1>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.TITLE}</h1>
					<div>
						<img src={closeIcon} alt="Close" onClick={() => { props.onCancel(); }} />
					</div>
					<MainButton onClick={() => null}  text="Send" enabled/>
				</ModalHeader>
			</ModalContent>
		</ModalContainer>
	);
};

export default AttendanceInProgressModal;