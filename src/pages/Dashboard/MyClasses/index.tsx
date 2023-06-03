import React, { useEffect, useState } from "react";
import { StudentsClass } from "../../../types/StudentsClass";
import { AllClassContainer, Container, ContentContainer, EmptyContainer } from "./styles";
import { SvgLoader } from "../../../components/Loaders";
import emptyClassImg from "../../../assets/images/emptyClassImg.svg";
import plusIcon from "../../../assets/images/plusIcon.svg";
import MESSAGES from "../../../constants/messages";
import { MainButton } from "../../../components/Buttons";
import { ClassCard, ManageClassPage, NewClassModal } from "./components";
import { FeedbackModal } from "../../../components/Modals";
import { Feedback } from "../../../types/Feedback";
import Api from "../../../services/api";

const MyClasses = () => {

	const [classes, setClasses] = useState<StudentsClass[] | null>(null);
	const [newClassModalOpen, setNewClassModalOpen] = useState<boolean>(false);
	const [feedbackStatus, setFeedbackStatus] = useState<Feedback>({ isOpen: false, success: false });
	const [selectedClass, setSelectedClass] = useState<StudentsClass | null>(null);

	useEffect(() => {
		Api.Classes.getClasses().then((response) => {
			setClasses(response);
		}).catch((error) => {
			console.log(error);
			setClasses([]);
		});
	}, []);


	const EmptyClassListLayout = () => {
		return (
			<EmptyContainer>
				<img src={emptyClassImg} alt={"Empty Class List"} />
				<h1>{MESSAGES.MY_CLASSES.EMPTY_LIST_MESSAGE}</h1>
				<p>{MESSAGES.MY_CLASSES.EMPTY_LIST_DESCRIPTION}</p>
				<MainButton
					onClick={() => setNewClassModalOpen(true)}
					text={MESSAGES.MY_CLASSES.NEW_CLASS_BTN}
					styles={{ width: "30%", borderRadius: "24px", minWidth: "200px", maxWidth: "350px" }}
					enabled
					leftIcon={plusIcon}
				/>
			</EmptyContainer>
		);
	};

	const getContent = () => {
		if (classes === null) {
			return (
				<ContentContainer >
					{
						[...Array(4)].map((_, index) => (
							<SvgLoader key={index} />
						))
					}
				</ContentContainer>
			);
		} else if (classes.length === 0) {
			return <EmptyClassListLayout />;
		} else {
			return (
				<AllClassContainer>
					<ContentContainer>
						{classes.map((currentClass) => (
							<ClassCard currentClass={currentClass} key={currentClass.id} onClassSelected={(cClass) => setSelectedClass(cClass)}/>
						))}
					</ContentContainer>
					<MainButton
						onClick={() => setNewClassModalOpen(true)}
						text={MESSAGES.MY_CLASSES.NEW_CLASS_BTN}
						styles={{ width: "30%", borderRadius: "24px", minWidth: "200px", maxWidth: "350px" }}
						enabled
						leftIcon={plusIcon}
					/>
				</AllClassContainer>
			);
		}
	};

	const onFeedbackReceived = (feedbackStatus: Feedback) => {
		setNewClassModalOpen(false);
		setFeedbackStatus(feedbackStatus);
		setTimeout(() => {
			setFeedbackStatus({ isOpen: false, success: false });
		}, 3000);
	};


	if(selectedClass !== null){
		return <ManageClassPage selectedClass={selectedClass} onBack={() => setSelectedClass(null)}/>;
	}

	return (	
		<Container>
			<FeedbackModal isOpen={feedbackStatus.isOpen} success={feedbackStatus.success} />
			<NewClassModal isOpen={newClassModalOpen} onCancel={() => setNewClassModalOpen(false)} onFeedback={(newClass) => onFeedbackReceived(newClass)} />
			{getContent()}
		</Container>
	);
};

export default MyClasses;