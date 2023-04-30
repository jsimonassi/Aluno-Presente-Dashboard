import React from "react";
import { CloseSidebarButton, ClosedSideBar, Container, LargeImgContainer, OpenSidebarButton, SidebarStyled, SmallImage, SmallImageContainer } from "./styles";
import logoBlue from "../../../assets/images/logoBlue.png";
import showLess from "../../../assets/images/showLess.png";
import showMore from "../../../assets/images/showMore.png";


// import { MESSAGES } from "../../constants/messages";
import { useNavigate, useLocation } from "react-router-dom";
import { SidebarItem, SidebarSmallItem } from "./components";
import CONSTANTS from "../../../constants";
import MESSAGES from "../../../constants/messages";

import { IoMdBook } from "react-icons/io";
import { AiFillFolderOpen } from "react-icons/ai";
import { BiInfoSquare } from "react-icons/bi";

interface Props {
	sideBarOpen: boolean;
	onOpen: (isOpen: boolean) => void;
}

const Sidebar = (props: Props) => {

	const navigate = useNavigate();
	const location = useLocation();

	const redirectTo = (route: string) => {
		navigate(route);
	};

	const isSelected = (route: string) => {
		return location.pathname.includes(route);
	};

	const closedSideBar = () => {
		return (
			<ClosedSideBar open={props.sideBarOpen}>
				<SmallImageContainer>
					<SmallImage src={logoBlue} alt={"Logo"} open={props.sideBarOpen} onClick={() => redirectTo("/")} />
				</SmallImageContainer>

				{<SidebarSmallItem icon={IoMdBook} selected={isSelected(CONSTANTS.ROUTES.OPTIONS.MY_CLASSES)} onClick={() => redirectTo(CONSTANTS.ROUTES.OPTIONS.MY_CLASSES)} />}
				{<SidebarSmallItem icon={AiFillFolderOpen} selected={isSelected(CONSTANTS.ROUTES.OPTIONS.OLD_CLASSES)} onClick={() => redirectTo(CONSTANTS.ROUTES.OPTIONS.OLD_CLASSES)} />}
				{<SidebarSmallItem icon={BiInfoSquare} selected={isSelected(CONSTANTS.ROUTES.OPTIONS.ABOUT)} onClick={() => redirectTo(CONSTANTS.ROUTES.OPTIONS.ABOUT)} />}

				<OpenSidebarButton onClick={() => props.onOpen(true)}>
					<div>
						<img src={showMore} alt="Expand Logo" onClick={() => props.onOpen(!props.sideBarOpen)} />
					</div>
				</OpenSidebarButton>
			</ClosedSideBar>
		);
	};

	const openSideBar = () => {
		return (
			<SidebarStyled open={props.sideBarOpen} >
				<LargeImgContainer src={logoBlue} alt={"Logo"} onClick={() => redirectTo("/")} />

				<SidebarItem icon={IoMdBook} title={MESSAGES.SIDEBAR.OPTIONS.MY_CLASSES} selected={isSelected(CONSTANTS.ROUTES.OPTIONS.MY_CLASSES)} onClick={() => redirectTo(CONSTANTS.ROUTES.OPTIONS.MY_CLASSES)} />
				<SidebarItem icon={AiFillFolderOpen} title={MESSAGES.SIDEBAR.OPTIONS.OLD_CLASSES} selected={isSelected(CONSTANTS.ROUTES.OPTIONS.OLD_CLASSES)} onClick={() => redirectTo(CONSTANTS.ROUTES.OPTIONS.OLD_CLASSES)} />
				<SidebarItem icon={BiInfoSquare} title={MESSAGES.SIDEBAR.OPTIONS.ABOUT} selected={isSelected(CONSTANTS.ROUTES.OPTIONS.ABOUT)} onClick={() => redirectTo(CONSTANTS.ROUTES.OPTIONS.ABOUT)} />

				<CloseSidebarButton
					onClick={() => props.onOpen(!props.sideBarOpen)}>
					<div>
						<p>{MESSAGES.SIDEBAR.SHOW_LESS}</p>
						<img src={showLess} alt="Expand Logo" onClick={() => props.onOpen(!props.sideBarOpen)} />
					</div>
				</CloseSidebarButton>
			</SidebarStyled>
		);
	};

	return (
		<Container>
			{openSideBar()}
			{closedSideBar()}
		</Container>
	);
};

export default Sidebar;