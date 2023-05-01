import React from "react";
import {IconType} from "react-icons";
import { SidebarSmallItemStyled } from "./styles";


interface Props {
    icon: IconType;
    selected?: boolean;
    onClick: () => void;
}

const SidebarSmallItem = (props: Props) => {

	return (
		<SidebarSmallItemStyled selected = {props.selected}  onClick={() => props.onClick()}>
			<props.icon fontSize="1.5em"/>
		</SidebarSmallItemStyled>
	);
};

export default SidebarSmallItem;