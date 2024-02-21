import React from "react";
import { BigButtonStyled } from "./styles";

interface BigButtonProps {
    onClick: () => void;
    title: string;
    description: string;
	boxStyle?: React.CSSProperties;
	selected?: boolean;
}

const BigButton = (props: BigButtonProps) => {

	return (
		<BigButtonStyled 
			selected={props.selected}
			style={{...props.boxStyle}} 
			onClick={() => props.onClick()}
		>
			<h3>{props.title}</h3>
			<p>{props.description}</p>
		</BigButtonStyled>
	);
};


export default BigButton;