import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { HeaderStyled } from "./styles";
import ROUTES from "../../../../constants/routes";
import MESSAGES from "../../../../constants/messages";
import { ConfigDropdown, ProfileDropdown } from "./components";
import { useWindowDimensions } from "../../../../hooks";
import CONSTANTS from "../../../../constants";
import { useSession } from "../../../../contexts/Session";
import { toast } from "react-hot-toast";
import { ProfileEditModal } from "../../../Modals";

interface Props {
    open: boolean;
}

const PROFILE_LIST: string[] = [ MESSAGES.HEADER.PROFILE_OPTION, MESSAGES.HEADER.LOGOUT_OPTION];
const CONFIG_LIST: string[] = [ MESSAGES.HEADER.COOKIES_OPTION ];

const MainHeader = (props: Props) => {

	const location = useLocation();
	const {logout} = useSession();
	const { width } = useWindowDimensions();
	const [profileEditModalOpen, setProfileEditModalOpen] = useState(false);

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

	const onProfileClick = (option: string) => {
		switch (option) {
		case MESSAGES.HEADER.LOGOUT_OPTION:
			toast.loading(MESSAGES.GENERAL.LOGOUT);
			logout();
			break;
		case MESSAGES.HEADER.PROFILE_OPTION:
			setProfileEditModalOpen(true);
			break;
		default:
			console.log("Not implemented yet");
		}
	};

	return (
		<HeaderStyled sideBarOpen={props.open}>
			<h1>{width > CONSTANTS.SCREEN_SIZE.DESKTOP && getPageTitle()}</h1>
			<ConfigDropdown
				title={MESSAGES.HEADER.CONFIG_TITLE}
				items={CONFIG_LIST}
				onClick={onConfigOptionClick}
			/>
			<ProfileDropdown
				items={PROFILE_LIST}
				onClick={onProfileClick}
			/>
			<ProfileEditModal isOpen={profileEditModalOpen} onClose={() => setProfileEditModalOpen(false)} />
		</HeaderStyled>
	);
};

export default MainHeader;