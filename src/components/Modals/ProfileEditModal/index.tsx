import React, { useMemo, useState } from "react";
import { AddContactButtonContainer, CloseButtonContainer, ContactCardContainer, ModalBody, ModalContainer, ModalContent, ModalFooter, ModalHeader, NoneContactContainer, ProfileLetterContainer } from "./styles";
import MESSAGES from "../../../constants/messages";
import { ReactComponent as CloseIcon } from "../../../assets/images/closeIcon.svg";
import { useSession } from "../../../contexts/Session";
import { MainInput } from "../../Inputs";
import { AddContactCard, ContactCard } from "./components";
import { MainButton, OutlineButton } from "../../Buttons";
import { AVAILABLE_CONTACT_TYPES } from "../../../constants/user";


interface FeedbackModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const ProfileEditModal = (props: FeedbackModalProps) => {

	const { currentUser } = useSession();
	const [editingUser, setEditingUser] = useState(currentUser);
	const [isAddingContactWith, setIsAddingContactWith] = useState<{ type: string, value: string } | null>(null);
	const [isAddingError, setIsAddingError] = useState<string>("");
	const userContacts = useMemo(() => {
		if (editingUser?.info?.contacts && editingUser?.info.contacts.length > 0) {
			return editingUser?.info.contacts.map((contact) => {
				return { type: contact.type, value: contact.value };
			});
		}
		return [];
	}, [editingUser]);

	const availableContactTypesForThisUser = useMemo(() =>
		AVAILABLE_CONTACT_TYPES.filter((contactType) => {
			return !userContacts.find((contact) => contact.type === contactType.type);
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
			console.log("Cadastrando esse carinha: ", newUser);
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
							prettyTypeName={AVAILABLE_CONTACT_TYPES.find((item) => item.type === contact.type)?.prettyName ?? "Outros"}
							value={contact.value}
							onRemoveRequested={() => null}
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
							onChange={(type, value) => setIsAddingContactWith({ type, value })}
							errorText={isAddingError}
						/> : null
				}

			</>
		);
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
						onChange={() => null}
						disabled
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
					<ContactCardContainer>
						<h3>{MESSAGES.EDIT_PROFILE.CONTACTS}</h3>
						{getContacts()}
						<AddContactButtonContainer>
							{
								isAddingContactWith === null ?
									<OutlineButton
										enabled
										onClick={() => setIsAddingContactWith({ type: availableContactTypesForThisUser[0].type, value: "" })}
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
						onClick={() => null}
					/>
				</ModalFooter>
			</ModalContent>
		</ModalContainer >
	);

};

export default ProfileEditModal;