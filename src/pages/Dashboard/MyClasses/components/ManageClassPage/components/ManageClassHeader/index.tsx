import React from "react";
import { Container, HeaderContainer, MenuButton, RowContainer } from "./styles";
import { IoIosArrowBack } from "react-icons/io";
import { useAppTheme } from "../../../../../../../contexts/Theme";

interface ManageClassHeaderProps {
    onBack: () => void;
    className: string;
    options: string[];
    selectedOption: string;
    onOptionSelected: (option: string) => void;
}

const ManageClassHeader = (props: ManageClassHeaderProps) => {

	const { currentTheme } = useAppTheme();

	return (
		<Container>
			<HeaderContainer>
				<div>
					<IoIosArrowBack color={currentTheme.primary} fontSize="1.5em" onClick={() => props.onBack()} />
				</div>
				<h1>{props.className}</h1>
			</HeaderContainer>
			<RowContainer>
				{props.options.map((option, index) => (
					<MenuButton
						key={index}
						selected={props.selectedOption === option}
						onClick={() => props.onOptionSelected(option)}>
						{option}
					</MenuButton>
				))}
			</RowContainer>
		</Container>
	);
};

export default ManageClassHeader;