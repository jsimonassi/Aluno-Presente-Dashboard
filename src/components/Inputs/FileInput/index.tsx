/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useRef } from "react";
import { FilenameText, InfoBoxContainer, InputContainer, InputStyled, StackContainer, TitleContainer } from "./styles";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useAppTheme } from "../../../contexts/Theme";
import MESSAGES from "../../../constants/messages";


interface MainInputProps {
	value?: string | undefined | null;
	onChange: (value: File) => void;
	errorText?: string;
	title?: string;
	style?: React.CSSProperties;
	InfoBox?: React.ReactNode;
	infoBoxStyle?: React.CSSProperties;
	accept?: string;
}

const FileInput = (props: MainInputProps) => {

	const [helpVisible, setHelpVisible] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const { currentTheme } = useAppTheme();

	const handleOnChange = () => {
		if(inputRef?.current?.files?.[0]){
			const userFileValue = inputRef?.current?.files?.[0];
			const updatedFile = new File([userFileValue], userFileValue.name.replace(" ", "_"), {type: userFileValue.type});
			props.onChange(updatedFile);
			inputRef.current.value = "";
		}
	};

	const getValue = () => {
		const value = props.value;
		if(value?.includes("/")){
			return "..." + value?.split("/").pop()?.substring(0, 20);
		}
		return value;
	};

	return (
		<StackContainer style={props.style} >

			{props.title &&
				<TitleContainer>
					<h1>{props.title}</h1>
					{props.InfoBox !== undefined ?
						<>
							<AiOutlineInfoCircle color={currentTheme.primary}
								onMouseEnter={() => setHelpVisible(true)}
								onMouseLeave={() => setHelpVisible(false)} />
							<InfoBoxContainer visible={helpVisible} style={props?.infoBoxStyle}>
								{props.InfoBox}
							</InfoBoxContainer>
						</> : null
					}
				</TitleContainer>
			}
			<InputContainer onClick={() => inputRef?.current?.click()} isError={props.errorText !== ""}>
				<FilenameText>{MESSAGES.GENERAL.SELECT_FILE}</FilenameText>
				<InputStyled
					onChange={() => handleOnChange()}
					ref={inputRef}
					type="file"
					accept= {props.accept}
				/>
			</InputContainer>
			<h3>{getValue()}</h3>
			{props.errorText && <span>{props.errorText}</span>}
		</StackContainer>
	);
};

export default FileInput;