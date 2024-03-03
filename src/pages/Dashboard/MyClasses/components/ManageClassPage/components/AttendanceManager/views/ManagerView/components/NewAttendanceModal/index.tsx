import React, { useEffect, useRef, useState } from "react";
import { ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader, OptionLabel, SelectContainer } from "./styles";
import { BigButton, MainButton } from "../../../../../../../../../../../components/Buttons";
import closeIcon from "../../../../../../../../../../../assets/images/closeIcon.svg";
import MESSAGES from "../../../../../../../../../../../constants/messages";
import { AttendanceInProgressType, LatLng } from "../../../../../../../../../../../types/Attendance";
import { LocationBox } from "../../../../../../../../../../../components/LocationBox";


interface NewAttendanceModalProps {
	isOpen: boolean;
	onCancel: () => void;
	onRequestStartAttendance: (type: AttendanceInProgressType, location: LatLng | null) => void;
}

const NewAttendanceModal = (props: NewAttendanceModalProps) => {

	const [enableLocation, setEnableLocation] = useState(true);
	const [selectedLatLng, setSelectedLatLng] = useState<{ lat: number, lng: number } | null>(null);
	const [selectedOption, setSelectedOption] = useState<AttendanceInProgressType | null>(null);
	const locationScrollRef = useRef<HTMLDivElement | null>(null);

	//TODO: Verificar a remoção do enableLocation

	useEffect(() => {
		resetStates();
	}, [props.isOpen]);

	useEffect(() => {
		setTimeout(() => {
			if (locationScrollRef.current) {
				locationScrollRef.current.scrollIntoView({ behavior: "smooth" });
			}
		}, 800);
	}, [selectedOption, selectedLatLng, enableLocation]);

	const resetStates = () => {
		setSelectedOption(null);
		setEnableLocation(true);
		setSelectedLatLng(null);
	};

	return (
		<ModalContainer isOpen={props.isOpen} >
			<ModalContent >
				<ModalHeader >
					<h1>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.TITLE}</h1>
					<div>
						<img src={closeIcon} alt="Close" onClick={() => { props.onCancel(); }} />
					</div>
				</ModalHeader>
				<ModalBody>
					<OptionLabel>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.CHOOSE_OPTION}</OptionLabel>
					<BigButton
						selected={selectedOption === "qrCode"}
						boxStyle={{ marginBottom: "16px" }}
						onClick={() => setSelectedOption("qrCode")}
						title={MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.QR_CODE_TITLE}
						description={MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.QR_CODE_DESCRIPTION}
					/>
					<BigButton
						selected={selectedOption === "sessionCode"}
						boxStyle={{ marginBottom: "8px" }}
						onClick={() => setSelectedOption("sessionCode")}
						title={MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.SESSION_CODE_TITLE}
						description={MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.SESSION_CODE_DESCRIPTION}
					/>
					{
						selectedOption && (
							<>
								{
									enableLocation && (
										<>
											<OptionLabel>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.LOCATION}</OptionLabel>
											<LocationBox
												onLocationSelected={(place) => { setSelectedLatLng(place); }}
												onLocationReset={() => setSelectedLatLng(null)}
											/>
										</>
									)
								}
								<SelectContainer ref={locationScrollRef} onClick={() => {
									if (enableLocation) {
										setSelectedLatLng(null);
									}

									setEnableLocation(previous => !previous);
								}}>
									<input type="checkbox" checked={enableLocation} onChange={() => null} />
									<label>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.ENABLE_LOCATION}</label>
								</SelectContainer>
								<span>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.OBS}</span>
							</>
						)
					}
				</ModalBody>
				{selectedOption && (enableLocation && selectedLatLng) || !enableLocation ?
					<ModalFooter>
						<MainButton
							enabled
							onClick={() =>
								selectedOption &&
								selectedLatLng?.lat &&
								props.onRequestStartAttendance(selectedOption, { latitude: selectedLatLng.lat, longitude: selectedLatLng.lng })}
							text={MESSAGES.MY_CLASSES.NEW_FREQUENCY_MODAL.START}
						/>
					</ModalFooter>
					: null
				}
			</ModalContent>
		</ModalContainer>
	);
};

export default NewAttendanceModal;