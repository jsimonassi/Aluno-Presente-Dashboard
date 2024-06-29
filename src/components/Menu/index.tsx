import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { LocalStorage } from "../../services/storage";
import { Content, MenuStyled } from "./styles";
import { useWindowDimensions } from "../../hooks";
import CONSTANTS from "../../constants";
import { MainHeader, Sidebar, MobileHeader } from "./components";
import { ProfileEditModal } from "../Modals";
const IS_OPEN_KEY = "isOpenKey";

interface MenuProps {
	renderAsPartial?: boolean;
}

const getSideBarPosition = () => {
	const lastSelectedOption = LocalStorage.getLocalData(IS_OPEN_KEY);
	if (lastSelectedOption) {
		return (JSON.parse(lastSelectedOption));
	}
	return true;
};

const Menu = (props: MenuProps) => {


	const [sidebarOpen, setSidebarOpen] = useState<boolean>(getSideBarPosition());
	const [editProfileModalOpen, setEditProfileModalOpen] = useState<boolean>(false);
	const { width } = useWindowDimensions();

	const getFixedComponents = () => {

		if (width < CONSTANTS.SCREEN_SIZE.TABLET) {
			return <MobileHeader/>;
		}

		return (
			<>
				<Sidebar
					sideBarOpen={sidebarOpen}
					onOpen={(isOpen) => {
						setSidebarOpen(isOpen);
						LocalStorage.storeLocalData(IS_OPEN_KEY, JSON.stringify(isOpen));
					}}
				/>
				<MainHeader
					open={sidebarOpen}
					onRequestEditProfile={() => {
						setEditProfileModalOpen(true);
					}}
				/>
				<ProfileEditModal isOpen={editProfileModalOpen} onClose={() => setEditProfileModalOpen(false)} />
			</>
		);
	};

	return (
		<MenuStyled>
			{getFixedComponents()}
			<Content sidebarOpen={sidebarOpen} width={width}>
				{props.renderAsPartial ? <Outlet /> : null}
			</Content>
		</MenuStyled>
	);
};

export default Menu;