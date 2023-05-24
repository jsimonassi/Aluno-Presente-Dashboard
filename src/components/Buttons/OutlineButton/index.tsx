import React from "react";
import { ButtonStyled } from "./styles";

interface MainButtonProps {
    text: string;
    onClick: () => void;
	enabled?: boolean;
	styles?: React.CSSProperties;
	leftIcon?: string;
	rightIcon?: string;
}

const OutlineButton = (props: MainButtonProps) => {

	return (
		<ButtonStyled
			onClick={() => props.enabled ? props.onClick() : null}
			enabled={props.enabled}
			style={props.styles}
		>
			{props.leftIcon && <img src={props.leftIcon} alt={"left icon"} />}
			{props.text}
			{props.rightIcon && <img src={props.rightIcon} alt={"left icon"} />}
		</ButtonStyled>
	);
};

export default OutlineButton;