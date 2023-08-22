import React from "react";
import { BigButtonStyled } from "./styles";

interface BigButtonProps {
    onClick: () => void;
    title: string;
    description: string;
}

const BigButton = (props: BigButtonProps) => {

	return (
		<BigButtonStyled onClick={() => props.onClick()}>
			<h3>{props.title}</h3>
			<p>{props.description}</p>
		</BigButtonStyled>
	);
};


export default BigButton;