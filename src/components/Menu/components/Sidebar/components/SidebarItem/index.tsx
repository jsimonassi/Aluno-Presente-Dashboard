import React from "react";
import {IconType} from "react-icons";
import { SidebarItemStyled } from "./styles";
import { IoIosArrowForward } from "react-icons/io";


interface Props {
    title: string;
    icon: IconType;
    selected?: boolean;
	onClick: () => void;
	notificationsCount?: number;
}

const SidebarItem = (props: Props) => {

	return (
		<SidebarItemStyled selected = {props.selected} onClick={() => props.onClick()}>
			<div>
				<props.icon fontSize="1.5em"/>
				<span>{props.title}</span>
				{
					props.notificationsCount && props.notificationsCount > 0 &&
					<p>{props.notificationsCount}</p>
				}
			</div>
			<IoIosArrowForward fontSize="1.5em"/>
		</SidebarItemStyled>
	);
};

export default SidebarItem;