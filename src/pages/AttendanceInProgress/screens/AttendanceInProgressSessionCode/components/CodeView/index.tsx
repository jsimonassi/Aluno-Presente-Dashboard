import React from "react";
import { CodeContainer, Container } from "./styles";

interface CodeViewProps {
    currentCodeValue: string;
}

export const CodeView = ({ currentCodeValue }: CodeViewProps) => {

	return (
		<div>
			<Container>
				{
					currentCodeValue.split("").map((char, index) => (
						<CodeContainer key={index}>
							<h1>{char}</h1>
						</CodeContainer>
					))
				}
			</Container>
		</div>
	);

};