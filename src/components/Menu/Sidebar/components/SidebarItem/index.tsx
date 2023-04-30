import React from "react";
import {IconType} from "react-icons";
import { SidebarItemStyled } from "./styles";
import { IoIosArrowForward } from "react-icons/io";


interface Props {
    title: string;
    icon: IconType;
    selected?: boolean;
	onClick: () => void;
}

const SidebarItem = (props: Props) => {

	return (
		<SidebarItemStyled selected = {props.selected} onClick={() => props.onClick()}>
			<div>
				<props.icon fontSize="1.5em"/>
				<span>{props.title}</span>
			</div>
			<IoIosArrowForward fontSize="1.5em"/>
		</SidebarItemStyled>
	);
};

export default SidebarItem;