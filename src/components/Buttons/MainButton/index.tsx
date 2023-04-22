import React from "react";
import { ButtonStyled } from "./styles";

interface MainButtonProps {
    text: string;
    onClick: () => void;
	enabled?: boolean;
	styles: React.CSSProperties;
}

const MainButton = (props: MainButtonProps) => {

	return (
		<ButtonStyled
			onClick={() => props.enabled ? props.onClick() : null}
			enabled={props.enabled}
			style={props.styles}
		>
			{props.text}
		</ButtonStyled>
	);
};

export default MainButton;