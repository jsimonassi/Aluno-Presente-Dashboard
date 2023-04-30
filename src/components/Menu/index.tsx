import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { LocalStorage } from "../../services/storage";
import { Content, MenuStyled } from "./styles";
import Sidebar from "./Sidebar";
import MainHeader from "./MainHeader";
const IS_OPEN_KEY = "isOpenKey";

interface MenuProps {
	renderAsPartial?: boolean;
}

const getSideBarPosition = () => {
	const lastSelectedOption = LocalStorage.getLocalData(IS_OPEN_KEY);
	if (lastSelectedOption) {
		return (JSON.parse(lastSelectedOption));
	} else {
		return false;
	}
};

const Menu = (props: MenuProps) => {


	const [sidebarOpen, setSidebarOpen] = useState<boolean>(getSideBarPosition());
	// const navigate = useNavigate();

	const getFixedComponents = () => {
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
				/>
			</>
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
			<Content sidebarOpen={sidebarOpen} >
				{props.renderAsPartial ? <Outlet /> : null}
			</Content>
		</MenuStyled>
	);
};

export default Menu;