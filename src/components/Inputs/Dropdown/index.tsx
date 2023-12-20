import React, { useState } from "react";
import { Container, DropdownItem, ItemsContainer, Spacing, StackContainer, ValueStyled } from "./styles";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface TextInputProps {
	items: (string | null)[] | undefined;
	selected: string | undefined;
	onChange: (value: string) => void;
	title?: string;
	style?: React.CSSProperties;
	containerItemsStyle?: React.CSSProperties;
	disabled?: boolean;
	placeholder?: string;
	errorText?: string;
}

const Dropdown = (props: TextInputProps) => {

	const [isOpen, setIsOpen] = useState(false);

	return (
		<StackContainer onMouseLeave={() => { setIsOpen(false); }} style={props?.style} disabled={props.disabled ?? false}>
			{props.title && <h5>{props.title}</h5>}
			<Container 
				onClick={() => {!props.disabled && setIsOpen(!isOpen);}}
				isError={props.errorText !== undefined && props.errorText !== ""}
			>
				<div />
				<ValueStyled hasValue={props.selected !== undefined} >{props.selected ?? props.placeholder}</ValueStyled>
				<div>
					{isOpen ?
						<IoIosArrowUp fontSize="1.5em" /> :
						<IoIosArrowDown fontSize="1.5em" />
					}
				</div>
			</Container>
			{
				props.errorText &&
				<span>{props.errorText}</span>
			}
			{isOpen &&
				<Spacing>
					<ItemsContainer style={props.containerItemsStyle}>
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