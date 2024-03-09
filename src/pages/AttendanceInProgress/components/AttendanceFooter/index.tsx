import React from "react";
import { PageFooter } from "./styles";
import MESSAGES from "../../../../constants/messages";


export const AttendanceFooter = () => {

	return (
		<PageFooter>
			<span>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_PAGE.TIPS}</span>
			<a onClick={() => window.location.reload()}>{MESSAGES.MY_CLASSES.NEW_FREQUENCY_PAGE.TIPS_REFRESH}.</a>
		</PageFooter>
	);
};