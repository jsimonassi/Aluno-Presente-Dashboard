import React from "react";
import { CloseIconContainer, Container, InfosContainer } from "./styles";
import { ReactComponent as CloseIcon } from "../../../../../assets/images/closeIcon.svg";
import { useAppTheme } from "../../../../../contexts/Theme";

interface ContactCardProps {
	value: string;
    prettyTypeName: string;
    onRemoveRequested: () => void;
}

const AddContactCard = (props: ContactCardProps) => {

	return (
		<Container>
			<InfosContainer>
				<h2>{props.value}</h2>
				<p>{props.prettyTypeName}</p>
			</InfosContainer>
			<CloseIconContainer onClick={props.onRemoveRequested}>
				<CloseIcon />
			</CloseIconContainer>
		</Container>
	);
};

export default AddContactCard;