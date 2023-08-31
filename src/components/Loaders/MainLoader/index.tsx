import React from "react";
import ReactLoading from "react-loading";
import { useAppTheme } from "../../../contexts/Theme";


const MainLoader = () => {

	const { currentTheme } = useAppTheme();

	return (
		<ReactLoading color={currentTheme.primary} type={"bubbles"} />
	);
};

export default MainLoader;