import React from "react";
import { InputStyled, LoaderContainer, RowContainer, StackContainer, TextAreaStyled } from "./styles";
// import ReactLoading from "react-loading";


interface MainInputProps {
	placeholder: string;
	value: string;
	type: string | undefined;
	onChange: (value: string) => void;
	errorText?: string;
	title?: string;
	rowsNumber?: number;
	style?: React.CSSProperties;
	inputStyle?: React.CSSProperties;
	disabled?: boolean;
	isLoading?: boolean;
}

const MainInput = (props: MainInputProps) => {


	return (
		<StackContainer style={props.style} disabled={props.disabled}>
			{props.title && <h1>{props.title}</h1>}
			<RowContainer>
				{props?.rowsNumber ?
					<TextAreaStyled
						placeholder={props.placeholder}
						onChange={(e) => props.onChange(e.target.value)}
						rowsNumber={props?.rowsNumber}
						rows={props?.rowsNumber}
						value={props.value}
						disabled={props.disabled || props.isLoading}
						isError={!!props.errorText}
						style={props.inputStyle}
					/>
					:
					<InputStyled
						placeholder={props.placeholder}
						onChange={(e) => props.onChange(e.target.value)}
						value={props.value}
						disabled={props.disabled || props.isLoading}
						style={props.inputStyle}
						isError={!!props.errorText}
						type={props.type}
					/>
				}
				{props.isLoading && 
					<LoaderContainer>
						{/* <ReactLoading color={currentTheme.primaryColor} type={"spin"} height={"80%"} width={"80%"} /> */}
					</LoaderContainer>
				}
			</RowContainer>
			{props.errorText && <span>{props.errorText}</span>}

		</StackContainer>
	);
};

export default MainInput;