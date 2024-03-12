import React from "react";
import { ButtonGroup, CloseIconContainer, Container, InputGroup } from "./styles";
import { MainInput } from "../../../../Inputs";
import { MainButton, OutlineButton } from "../../../../Buttons";
import { ReactComponent as CloseIcon } from "../../../../../assets/images/closeIcon.svg";
import { useAppTheme } from "../../../../../contexts/Theme";

interface ContactCardProps {
	onCancel: () => void;
	availableType: { type: string, prettyName: string, placeholder: string }[];
	newContact: { type: string, value: string };
	onChange: (type: string, value: string) => void;
	errorText: string;
}

const AddContactCard = (props: ContactCardProps) => {

	const { currentTheme } = useAppTheme();

	return (
		<Container>
			<InputGroup>
				<MainInput
					onChange={(newValue) => props.onChange(props.newContact.type, newValue)}
					placeholder={props.availableType.find((type) => type.type === props.newContact.type)?.placeholder ?? ""}
					value={props.newContact.value}
					type=""
					errorText={props.errorText}
					inputStyle={{backgroundColor: currentTheme.surface2, height: "40px", marginBottom: "5px", width: "90%", borderRadius: "16px"}}
					title={props.availableType.find((type) => type.type === props.newContact.type)?.prettyName ?? ""}
				/>
				<CloseIconContainer onClick={props.onCancel}>
					<CloseIcon />
				</CloseIconContainer>
			</InputGroup>
			<ButtonGroup>
				{
					props.availableType.map((type, index) => {
						if (type.type === props.newContact.type) {
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
								onClick={() => props.onChange(type.type, props.newContact.value)} />
						);
					})
				}
			</ButtonGroup>
		</Container>
	);
};

export default AddContactCard;