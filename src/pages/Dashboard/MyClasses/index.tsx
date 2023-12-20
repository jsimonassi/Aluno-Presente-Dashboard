import React, { useEffect, useState } from "react";
import { Course } from "../../../types/Course";
import { AllClassContainer, Container, ContentContainer, EmptyContainer } from "./styles";
import { SvgLoader } from "../../../components/Loaders";
import emptyClassImg from "../../../assets/images/emptyClassImg.svg";
import plusIcon from "../../../assets/images/plusIcon.svg";
import MESSAGES from "../../../constants/messages";
import { MainButton } from "../../../components/Buttons";
import { ClassCard, DeleteClassModal, ManageClassPage, NewClassModal } from "./components";
import { FeedbackModal } from "../../../components/Modals";
import { Feedback } from "../../../types/Feedback";
import Api from "../../../services/api";
import toast from "react-hot-toast";

const MyClasses = () => {

	const [classes, setClasses] = useState<Course[] | null>(null);
	const [newClassModalOpen, setNewClassModalOpen] = useState<boolean>(false);
	const [deleteClassStatus, setDeleteClassStatus] = useState<{ isOpen: boolean, selectedClass: Course | null }>({ isOpen: false, selectedClass: null });
	const [feedbackStatus, setFeedbackStatus] = useState<Feedback>({ isOpen: false, success: false });
	const [selectedClass, setSelectedClass] = useState<Course | null>(null);

	useEffect(() => {
		refreshClasses();
	}, []);

	const refreshClasses = () => {
		Api.Classes.getClasses().then((response) => {
			setClasses(response);
		}).catch((error) => {
			console.log(error);
			setClasses([]);
		});
	};


	const onDeleteRequested = (id: string) => {
		setDeleteClassStatus({ isOpen: false, selectedClass: null });
		const toastReference = toast.loading(MESSAGES.MY_CLASSES.DELETE_CLASS_MODAL.DELETING);
		Api.Classes.deleteClass(id).then(() => {
			toast.success(MESSAGES.MY_CLASSES.DELETE_CLASS_MODAL.DELETED);
			setClasses(classes?.filter((currentClass) => currentClass.id !== id) ?? []);
		}).catch(() => {
			toast.error(MESSAGES.MY_CLASSES.DELETE_CLASS_MODAL.ERROR);
		}).finally(() => {
			toast.dismiss(toastReference);
		});
	};


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
							<ClassCard 
								currentClass={currentClass} 
								key={currentClass.id} 
								onClassSelected={() => setSelectedClass(currentClass)}
								onDeleteRequested={() => setDeleteClassStatus({ isOpen: true, selectedClass: currentClass })}
								onEditRequested={() => null}
							/>
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
		refreshClasses();
	};


	if(selectedClass !== null){
		return <ManageClassPage selectedClass={selectedClass} onBack={() => setSelectedClass(null)}/>;
	}

	return (	
		<Container>
			<FeedbackModal isOpen={feedbackStatus.isOpen} success={feedbackStatus.success} />
			<NewClassModal isOpen={newClassModalOpen} onCancel={() => setNewClassModalOpen(false)} onFeedback={(newClass) => onFeedbackReceived(newClass)} />
			<DeleteClassModal 
				isOpen={deleteClassStatus.isOpen} 
				onCancel={() => setDeleteClassStatus({isOpen: false, selectedClass: null})} 
				selectedClass={deleteClassStatus.selectedClass} 
				onDeleteRequested={onDeleteRequested}
			/>
			{getContent()}
		</Container>
	);
};

export default MyClasses;