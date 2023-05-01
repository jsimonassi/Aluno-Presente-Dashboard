import React, { useState } from "react";
import { Container, DropdownItem, OpenContainer, SpacingContainer, StackContainer } from "./styles";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import { MdOutlineSettings } from "react-icons/md";
import { useAppTheme } from "../../../../../../contexts/Theme";

interface TextInputProps {
	items: string[];
	title: string;
	onClick: (value: string) => void;
}

const ConfigDropdown = (props: TextInputProps) => {

	const [isOpen, setIsOpen] = useState(false);
	const {currentTheme} = useAppTheme();

	return (
		<StackContainer onMouseLeave={() => { setIsOpen(false); }}>
			<Container onClick={() => setIsOpen(!isOpen)}>
				<div>
					<MdOutlineSettings color={currentTheme.primary} fontSize="2.5em" />
				</div>
				<p>{props.title}</p>
				<div>
					{isOpen ?
						<IoIosArrowUp color={currentTheme.primary} fontSize="2.0em" /> :
						<IoIosArrowDown color={currentTheme.primary} fontSize="2.0em" />
					}
				</div>
			</Container>
			{isOpen &&
				<SpacingContainer>
					<OpenContainer theme={currentTheme}>
						{props.items.map((item, index) => {
							return (
								<DropdownItem
									key={index}
									theme={currentTheme}
									onClick={() => {
										setIsOpen(false);
										props.onClick(props.items[index]);
									}}>
									<div>
										<p>{item}</p>
										<IoIosArrowForward color={currentTheme.primary} fontSize="1.5em" />
									</div>
								</DropdownItem>
							);
						})}
					</OpenContainer>
				</SpacingContainer>
			}
		</StackContainer>
	);
};

export default ConfigDropdown;