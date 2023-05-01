import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderStyled, OptionList, StackContainer } from "./styles";
import ROUTES from "../../../../constants/routes";
import MESSAGES from "../../../../constants/messages";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAppTheme } from "../../../../contexts/Theme";
import CONSTANTS from "../../../../constants";

const PROFILE_LIST: string[] = [MESSAGES.HEADER.PROFILE_OPTION, MESSAGES.HEADER.LOGOUT_OPTION];
const CONFIG_LIST: string[] = [MESSAGES.HEADER.COOKIES_OPTION];

const MobileHeader = () => {

	const location = useLocation();
	const { currentTheme } = useAppTheme();
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

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

	const redirectTo = (route: string) => {
		navigate(route);
	};

	return (
		<StackContainer open={menuOpen}>
			<HeaderStyled >
				<div onClick={() => setMenuOpen(!menuOpen)}>
					<GiHamburgerMenu color={currentTheme.primary} size={30} />
				</div>
				<h1>{getPageTitle()}</h1>
			</HeaderStyled>
			<OptionList open={menuOpen}>
				<p onClick={() => redirectTo(CONSTANTS.ROUTES.OPTIONS.MY_CLASSES)}> {MESSAGES.SIDEBAR.OPTIONS.MY_CLASSES}</p>
				<p onClick={() => redirectTo(CONSTANTS.ROUTES.OPTIONS.OLD_CLASSES)}> {MESSAGES.SIDEBAR.OPTIONS.OLD_CLASSES}</p>
				<p onClick={() => redirectTo(CONSTANTS.ROUTES.OPTIONS.ABOUT)}> {MESSAGES.SIDEBAR.OPTIONS.ABOUT}</p>
			</OptionList>
		</StackContainer>
	);
};

export default MobileHeader;