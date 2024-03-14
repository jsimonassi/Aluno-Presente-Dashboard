import React, { useEffect, useState } from "react";
import { Course } from "../../../types/Course";
import { AllClassContainer, Container, ContentContainer, EmptyContainer } from "./styles";
import { SvgLoader } from "../../../components/Loaders";
import emptyClassImg from "../../../assets/images/emptyClassImg.svg";
import plusIcon from "../../../assets/images/plusIcon.svg";
import MESSAGES from "../../../constants/messages";
import { MainButton } from "../../../components/Buttons";
import { ClassCard, DeleteClassModal, EditClassModal, ManageClassPage, NewClassModal } from "./components";
import Api from "../../../services/api";
import toast from "react-hot-toast";

const MyClasses = () => {

	const [classes, setClasses] = useState<Course[] | null>(null);
	const [newClassModalOpen, setNewClassModalOpen] = useState<boolean>(false);
	const [editClassModalStatus, setEditClassModalStatus] = useState<{ isOpen: boolean, selectedClass: Course | null }>({ isOpen: false, selectedClass: null });
	const [deleteClassStatus, setDeleteClassStatus] = useState<{ isOpen: boolean, selectedClass: Course | null }>({ isOpen: false, selectedClass: null });
	const [selectedClass, setSelectedClass] = useState<Course | null>(null);

	useEffect(() => {
		refreshClasses();
	}, []);

	const refreshClasses = () => {
		Api.Classes.getClasses().then((response) => {
			setClasses(response);
			if(selectedClass !== null) {
				response.forEach((currentClass) => {
					if(currentClass.id === selectedClass.id) {
						setSelectedClass(currentClass);
					}
				});
			}
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

	const onCreateRequested = (newClass: Course) => {
		setNewClassModalOpen(false);
		const toastReference = toast.loading(MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.CREATING_CLASS);
		Api.Classes.addClass(newClass).then(() => {
			toast.success(MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.SUCCESSFULLY_CREATED);
			refreshClasses();
		}).catch((error) => {
			console.log(error);
			toast.error(MESSAGES.MY_CLASSES.NEW_CLASS_MODAL.ERROR);
		}).finally(() => {
			toast.dismiss(toastReference);
		});

	};

	const onEditRequested = (editedClass: Course) => {
		setEditClassModalStatus({ isOpen: false, selectedClass: null });
		const toastReference = toast.loading(MESSAGES.MY_CLASSES.EDIT_CLASS_MODAL.EDITING_CLASS);
		Api.Classes.editClass(editedClass).then(() => {
			toast.success(MESSAGES.MY_CLASSES.EDIT_CLASS_MODAL.SUCCESSFULLY_EDITED);
			refreshClasses();
		}).catch((error) => {
			console.log(error);
			toast.error(MESSAGES.MY_CLASSES.EDIT_CLASS_MODAL.ERROR);
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

	const getGridStyle = () => {
		if(classes === null) {
			return 2;
		}

		if(classes.length % 2 == 0) {
			return 2;
		} else if(classes.length % 3 == 0) {
			return 3;
		} else {
			return 1;
		}
	};

	const getContent = () => {
		if (classes === null) {
			return (
				<AllClassContainer>
					<ContentContainer gridStyle={getGridStyle()}>
						{
							[...Array(4)].map((_, index) => (
								<SvgLoader key={index} />
							))
						}
					</ContentContainer>
				</AllClassContainer>
			);
		} else if (classes.length === 0) {
			return <EmptyClassListLayout />;
		} else {
			return (
				<AllClassContainer>
					<ContentContainer gridStyle={getGridStyle()}>
						{classes.map((currentClass) => (
							<ClassCard
								currentClass={currentClass}
								key={currentClass.id}
								onClassSelected={() => setSelectedClass(currentClass)}
								onDeleteRequested={() => setDeleteClassStatus({ isOpen: true, selectedClass: currentClass })}
								onEditRequested={() => setEditClassModalStatus({ isOpen: true, selectedClass: currentClass })}
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

	if (selectedClass !== null) {
		return <ManageClassPage 
			selectedClass={selectedClass} 
			onBack={() => setSelectedClass(null)}
			onRefreshClassRequested={() => refreshClasses()}
		/>;
	}

	return (
		<Container>
			<NewClassModal
				isOpen={newClassModalOpen}
				onCancel={() => setNewClassModalOpen(false)}
				onCreateRequested={onCreateRequested}
			/>
			<EditClassModal
				isOpen={editClassModalStatus.isOpen}
				onCancel={() => setEditClassModalStatus({ isOpen: false, selectedClass: null })}
				currentClass={editClassModalStatus.selectedClass}
				onEditRequested={onEditRequested}
			/>
			<DeleteClassModal
				isOpen={deleteClassStatus.isOpen}
				onCancel={() => setDeleteClassStatus({ isOpen: false, selectedClass: null })}
				selectedClass={deleteClassStatus.selectedClass}
				onDeleteRequested={onDeleteRequested}
			/>
			{getContent()}
		</Container>
	);
};

export default MyClasses;