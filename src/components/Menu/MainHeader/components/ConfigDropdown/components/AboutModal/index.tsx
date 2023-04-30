import React from "react";
import { ChangeInfos, ModalBody, ModalContainer, ModalContent, ModalHeader, UpdateInfos } from "./styles";
import { ReactComponent as CloseIcon } from "../../../../../../assets/images/closeIcon.svg";
import { CHANGELOG } from "../../../../../../../changelog";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
}


const AboutModal = (props: ModalProps) => {


	return (
		<ModalContainer isOpen={props.isOpen} >
			<ModalContent>
				<ModalHeader>
					{/* <h3>{MESSAGES.PT_BR.CONFIG.ABOUT}</h3> */}
					<div>
						<CloseIcon onClick={() => props.onClose()} />
					</div>
				</ModalHeader>
				<ModalBody>
					<div>
						<p>Versão atual: {process.env.REACT_APP_VERSION}</p>
						<p>Ambiente: {process.env.REACT_APP_ENVIRONMENT}</p>
					</div>
					{
						Object.keys(CHANGELOG).slice(0).reverse().map((version, index) => {
							return (
								<UpdateInfos key={index}>
									<h4>{version}</h4>
									{/* <h6>{CHANGELOG[version].date}</h6> */}
									{/* {CHANGELOG[version].changes.map((change, index) => {
										return (
											<ChangeInfos key={index}>{" - " + change}</ChangeInfos>
										);
									})} */}
								</UpdateInfos>
							);
						})
					}
				</ModalBody>
			</ModalContent>
		</ModalContainer>
	);

};

export default AboutModal;