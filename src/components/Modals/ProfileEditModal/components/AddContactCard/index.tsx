import React from "react";
import { ButtonGroup, CloseIconContainer, Container, InputGroup } from "./styles";
import { MainInput } from "../../../../Inputs";
import { MainButton, OutlineButton } from "../../../../Buttons";
import { ReactComponent as CloseIcon } from "../../../../../assets/images/closeIcon.svg";
import { useAppTheme } from "../../../../../contexts/Theme";

interface ContactCardProps {
	onCancel: () => void;
	availableType: { id: number, prettyName: string, placeholder: string }[];
	newContact: { id: number, value: string };
	onChange: (id: number, value: string) => void;
	errorText: string;
}

const AddContactCard = (props: ContactCardProps) => {

	const { currentTheme } = useAppTheme();

	return (
		<Container>
			<InputGroup>
				<MainInput
					onChange={(newValue) => props.onChange(props.newContact.id, newValue)}
					placeholder={props.availableType.find((type) => type.id === props.newContact.id)?.placeholder ?? ""}
					value={props.newContact.value}
					type=""
					errorText={props.errorText}
					inputStyle={{backgroundColor: currentTheme.surface2, height: "40px", marginBottom: "5px", width: "90%", borderRadius: "16px"}}
					title={props.availableType.find((type) => type.id === props.newContact.id)?.prettyName ?? ""}
				/>
				<CloseIconContainer onClick={props.onCancel}>
					<CloseIcon />
				</CloseIconContainer>
			</InputGroup>
			<ButtonGroup>
				{
					props.availableType.map((type, index) => {
						if (type.id === props.newContact.id) {
							return <MainButton
								enabled
								key={index}
								text={type.prettyName}
								onClick={() => null} />;
						}

						return (
							<OutlineButton
								enabled
								styles={{backgroundColor: "white"}}
								key={index}
								text={type.prettyName}
								onClick={() => props.onChange(type.id, props.newContact.value)} />
						);
					})
				}
			</ButtonGroup>
		</Container>
	);
};

export default AddContactCard;