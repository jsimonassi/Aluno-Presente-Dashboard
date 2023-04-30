import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { LocalStorage } from "../../services/storage";
import { Content, MenuStyled } from "./styles";
import Sidebar from "../Sidebar";
const IS_OPEN_KEY = "isOpenKey";

interface MenuProps {
	renderAsPartial?: boolean;
	isMainPage?: boolean;
}

const getSideBarPosition = (isMainPage: boolean) => {
	const lastSelectedOption = LocalStorage.getLocalData(IS_OPEN_KEY);
	if (lastSelectedOption) {
		return (JSON.parse(lastSelectedOption));
	}else{
		return isMainPage ?? false;
	}
};

const Menu = (props: MenuProps) => {
	

	const [sidebarOpen, setSidebarOpen] = useState<boolean>(getSideBarPosition(props.isMainPage ?? false));
	// const navigate = useNavigate();

	const getFixedComponents = () => {
		if (props.isMainPage) {
			return (
				<>
					<Sidebar
						sideBarOpen={sidebarOpen}
						onOpen={(isOpen) => {
							setSidebarOpen(isOpen);
							LocalStorage.storeLocalData(IS_OPEN_KEY, JSON.stringify(isOpen));
						}}
					/>
					{/* <MainHeader
						open={sidebarOpen}
					/> */}
				</>
			);
		}

		return (
			// <SecondaryHeader />
			<></>
		);
	};

	return (
		<MenuStyled>
			{getFixedComponents()}
			<Toaster
				toastOptions={{
					style: {
						fontFamily: "Light"
					},
					success: {
						iconTheme: {
							primary: "green",
							secondary: "white",
						},
					},
				}}
			/>
			<Content sidebarOpen={sidebarOpen} isMainPage={props.isMainPage ?? false}>
				{props.renderAsPartial ? <Outlet /> : null}
			</Content>
		</MenuStyled>
	);
};

export default Menu;