import React, { useEffect, useState } from "react";
import { StudentsClass } from "../../../types/StudentsClass";
import { Container, EmptyContainer, LoaderContainer } from "./styles";
import { SvgLoader } from "../../../components/Loaders";
import emptyClassImg from "../../../assets/images/emptyClassImg.svg";
import plusIcon from "../../../assets/images/plusIcon.svg";
import MESSAGES from "../../../constants/messages";
import { MainButton } from "../../../components/Buttons";

const MyClasses = () => {

	const [classes, setClasses] = useState<StudentsClass[] | null>(null);

	useEffect(() => {
		setTimeout(() => {
			setClasses([]);
		}, 2000);
	}, []);

	const EmptyClassListLayout = () => {
		return (
			<EmptyContainer>
				<img src={emptyClassImg} alt={"Empty Class List"} />
				<h1>{MESSAGES.MY_CLASSES.EMPTY_LIST_MESSAGE}</h1>
				<p>{MESSAGES.MY_CLASSES.EMPTY_LIST_DESCRIPTION}</p>
				<MainButton 
					onClick={() => null} 
					text={MESSAGES.MY_CLASSES.NEW_CLASS_BTN} 
					styles={{width: "30%", borderRadius: "24px", minWidth: "200px", maxWidth: "350px"}} 
					enabled
					leftIcon={plusIcon}
				/>
			</EmptyContainer>
		);
	};

	const getContent = () => {
		if (classes === null) {
			return (
				<LoaderContainer >
					{
						[...Array(4)].map((_, index) => (
							<SvgLoader key={index} />
						))
					}
				</LoaderContainer>
			);
		} else if (classes.length === 0) {
			return <EmptyClassListLayout />;
		} else {
			return (
				<></>
			);
		}
	};

	return (
		<Container>
			{getContent()}
		</Container>
	);
};

export default MyClasses;