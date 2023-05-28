import React, { useState } from "react";
import { Container, DropdownItem, ItemsContainer, Spacing, StackContainer } from "./styles";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface TextInputProps {
	items: (string | null)[] | undefined;
	selected: string;
	onChange: (value: string) => void;
	title?: string;
	style?: React.CSSProperties;
	disabled?: boolean;
}

const Dropdown = (props: TextInputProps) => {

	const [isOpen, setIsOpen] = useState(false);

	return (
		<StackContainer onMouseLeave={() => { setIsOpen(false); }} style={props?.style} disabled={props.disabled ?? false}>
			{props.title && <h5>{props.title}</h5>}
			<Container onClick={() => {!props.disabled && setIsOpen(!isOpen);}}>
				<div />
				<p>{props.selected}</p>
				<div>
					{isOpen ?
						<IoIosArrowUp fontSize="1.5em" /> :
						<IoIosArrowDown fontSize="1.5em" />
					}
				</div>
			</Container>
			{isOpen &&
				<Spacing>
					<ItemsContainer>
						{props.items?.map((item, index) => {
							return (
								<DropdownItem key={index} onClick={() => {
									props.onChange(item ?? "");
									setIsOpen(false);
								}} >
									<p>{item}</p>
								</DropdownItem>
							);
						})}
					</ItemsContainer>
				</Spacing>
			}
		</StackContainer>
	);
};

export default Dropdown;