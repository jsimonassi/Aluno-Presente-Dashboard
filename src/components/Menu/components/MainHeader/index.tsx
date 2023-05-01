import React from "react";
import { useLocation } from "react-router-dom";
import { HeaderStyled } from "./styles";
import ROUTES from "../../../../constants/routes";
import MESSAGES from "../../../../constants/messages";
import { ConfigDropdown, ProfileDropdown } from "./components";
import { useWindowDimensions } from "../../../../hooks";
import CONSTANTS from "../../../../constants";

interface Props {
    open: boolean;
}

const PROFILE_LIST: string[] = [ MESSAGES.HEADER.PROFILE_OPTION, MESSAGES.HEADER.LOGOUT_OPTION];
const CONFIG_LIST: string[] = [ MESSAGES.HEADER.COOKIES_OPTION ];

const MainHeader = (props: Props) => {

	const location = useLocation();
	const { width } = useWindowDimensions();

	const getPageTitle = () => {
		const path = location.pathname;
		if (path.includes(ROUTES.OPTIONS.MY_CLASSES)) {
			return MESSAGES.SIDEBAR.OPTIONS.MY_CLASSES;
		} else if (path.includes(ROUTES.OPTIONS.OLD_CLASSES)) {
			return MESSAGES.SIDEBAR.OPTIONS.OLD_CLASSES;
		} else {
			return MESSAGES.SIDEBAR.OPTIONS.ABOUT;
		}
	};

	const onConfigOptionClick = (option: string) => {
		console.log("Config clicked", option);
	};

	return (
		<HeaderStyled sideBarOpen={props.open}>
			<h1>{width > CONSTANTS.SCREEN_SIZE.DESKTOP && getPageTitle()}</h1>
			<ConfigDropdown
				title={MESSAGES.HEADER.CONFIG_TITLE}
				items={CONFIG_LIST}
				onClick={(newConfig) => { onConfigOptionClick(newConfig); }}
			/>
			<ProfileDropdown
				items={PROFILE_LIST}
			/>
		</HeaderStyled>
	);
};

export default MainHeader;