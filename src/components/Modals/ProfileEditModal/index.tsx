import React, { useMemo, useState } from "react";
import { AddContactButtonContainer, CloseButtonContainer, ContactCardContainer, ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader, NoneContactContainer, ProfileLetterContainer, ScrollContainer } from "./styles";
import MESSAGES from "../../../constants/messages";
import { ReactComponent as CloseIcon } from "../../../assets/images/closeIcon.svg";
import { useSession } from "../../../contexts/Session";
import { MainInput } from "../../Inputs";
import { AddContactCard, ContactCard } from "./components";
import { MainButton, OutlineButton } from "../../Buttons";
import { AVAILABLE_CONTACT_TYPES } from "../../../constants/user";
import toast from "react-hot-toast";
import { User } from "../../../types/User";

interface FeedbackModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const ProfileEditModal = (props: FeedbackModalProps) => {

	const { currentUser, updateUser } = useSession();
	const [editingUser, setEditingUser] = useState<User | null>(currentUser);
	const [isAddingContactWith, setIsAddingContactWith] = useState<{ id: number, value: string } | null>(null);
	const [isAddingError, setIsAddingError] = useState<string>("");
	const userContacts = useMemo(() => {
		if (editingUser?.info?.contacts && editingUser?.info.contacts.length > 0) {
			return editingUser?.info.contacts.map((contact) => {
				return { id: contact.id, value: contact.value };
			});
		}
		return [];
	}, [editingUser]);

	const availableContactTypesForThisUser = useMemo(() =>
		AVAILABLE_CONTACT_TYPES.filter((contactType) => {
			return !userContacts.find((contact) => contact.id === contactType.id);
		}), [userContacts]);

	const handleAddContact = () => {
		if (isAddingContactWith?.value && isAddingContactWith?.value !== "") {
			const newUser = Object.assign({}, editingUser);
			newUser.info = {
				about: newUser?.info?.about ?? "",
				contacts: [isAddingContactWith]
			};
			if (editingUser?.info?.contacts && editingUser?.info?.contacts.length > 0) {
				newUser.info.contacts = [...newUser.info.contacts, ...editingUser.info.contacts];
			}
			setEditingUser(newUser);
			setIsAddingContactWith(null);
		} else {
			setIsAddingError(MESSAGES.EDIT_PROFILE.MANDATORY_FIELD);
		}
	};


	const getContacts = () => {

		if (userContacts.length <= 0 && isAddingContactWith === null) {
			return (
				<NoneContactContainer>
					<p>{MESSAGES.EDIT_PROFILE.NONE_CONTACT}</p>
				</NoneContactContainer>);
		}

		return (
			<>
				{
					userContacts.map((contact, index) => {
						return (<ContactCard
							key={index}
							prettyTypeName={AVAILABLE_CONTACT_TYPES.find((item) => item.id === contact.id)?.prettyName ?? "Outros"}
							value={contact.value}
							onRemoveRequested={() => {
								const newUser = Object.assign({}, editingUser);
								newUser.info.contacts = newUser.info.contacts.filter((item) => item.id !== contact.id);
								setEditingUser(newUser);
							}}
						/>);
					})
				}
				{
					isAddingContactWith !== null ?
						<AddContactCard
							onCancel={() => {
								setIsAddingContactWith(null);
								setIsAddingError("");
							}}
							availableType={availableContactTypesForThisUser}
							newContact={isAddingContactWith}
							onChange={(id, value) => setIsAddingContactWith({ id, value })}
							errorText={isAddingError}
						/> : null
				}

			</>
		);
	};

	const handleUpdateAbout = (newAbout: string) => {
		const newUser = Object.assign({}, editingUser);
		newUser.info = {
			about: newAbout,
			contacts: newUser?.info?.contacts ?? []
		};
		setEditingUser(newUser);
	};

	const handleUpdateName = (newName: string) => {
		const newUser = Object.assign({}, editingUser);
		newUser.name = newName;
		setEditingUser(newUser);
	};

	const handleUpdateUser = () => {
		props.onClose();
		if(editingUser){
			const toastRef = toast.loading(MESSAGES.EDIT_PROFILE.UPDATING);
			updateUser(editingUser)
				.then(() => {
					toast.success(MESSAGES.EDIT_PROFILE.UPDATE_SUCCESS);
				}).catch(() => {
					toast.error(MESSAGES.EDIT_PROFILE.UPDATE_ERROR);
				}).finally(() => {
					toast.dismiss(toastRef);
				});
		}
	};


	return (
		<ModalContainer isOpen={props.isOpen} >
			<ModalContent >
				<ModalHeader>
					<h1>{MESSAGES.EDIT_PROFILE.TITLE}</h1>
					<CloseButtonContainer onClick={props.onClose} >
						<CloseIcon />
					</CloseButtonContainer>
				</ModalHeader>
				<ModalBody>
					<ProfileLetterContainer>
						<h1>{editingUser?.name[0] ?? ""}</h1>
					</ProfileLetterContainer>
					<MainInput
						onChange={(newName) => handleUpdateName(newName)}
						value={editingUser?.name ?? ""}
						placeholder=""
						type=""
						title={MESSAGES.EDIT_PROFILE.NAME}
					/>
					<MainInput
						onChange={() => null}
						disabled
						value={editingUser?.email ?? ""}
						placeholder=""
						type=""
						title={MESSAGES.EDIT_PROFILE.EMAIL}
						titleStyle={{ marginTop: "10px" }}
					/>
					<MainInput
						onChange={(newAbout) => handleUpdateAbout(newAbout)}
						rowsNumber={3}
						value={editingUser?.info?.about ?? ""}
						placeholder={MESSAGES.EDIT_PROFILE.BIO_PLACEHOLDER}
						type=""
						title={MESSAGES.EDIT_PROFILE.ABOUT}
						titleStyle={{ marginTop: "10px" }}
						inputStyle={{borderRadius: "16px"}}
					/>
					<ContactCardContainer>
						<h3>{MESSAGES.EDIT_PROFILE.CONTACTS}</h3>
						<ScrollContainer>
							{getContacts()}
						</ScrollContainer>
						<AddContactButtonContainer>
							{
								isAddingContactWith === null ?
									<OutlineButton
										enabled
										onClick={() => setIsAddingContactWith({ id: availableContactTypesForThisUser[0].id, value: "" })}
										text={MESSAGES.EDIT_PROFILE.ADD_NEW_CONTACT}
									/> :
									<OutlineButton
										enabled
										onClick={handleAddContact}
										text={MESSAGES.EDIT_PROFILE.ADD_FINISHED}
									/>
							}
						</AddContactButtonContainer>
					</ContactCardContainer>
				</ModalBody>
				<ModalFooter>
					<MainButton
						text={MESSAGES.EDIT_PROFILE.SAVE_BTN}
						enabled
						onClick={handleUpdateUser}
					/>
				</ModalFooter>
			</ModalContent>
		</ModalContainer >
	);

};

export default ProfileEditModal;