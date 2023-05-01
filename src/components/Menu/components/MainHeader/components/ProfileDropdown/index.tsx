import React, { useState } from "react";
import { Container, DropdownItem, OpenContainer, SpacingContainer, StackContainer } from "./styles";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { useTeacher } from "../../../../../../contexts/Teacher";
import { useAppTheme } from "../../../../../../contexts/Theme";


interface TextInputProps {
	items: string[];
}

const ProfileDropdown = (props: TextInputProps) => {

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const {loggedTeacher} = useTeacher();
	const {currentTheme} = useAppTheme();

	const onProfileOptionClick = (option: string) => {
		console.log("Touch Profile", option);
	};

	// const onEditProfileRequested = (newName: string, newPhoto: string) => {
	// 	console.log("Edit profile selected", newName, newPhoto);
	// };

	// const onEditPasswordRequested = (oldPassword: string, newPassword: string) => {
	// 	console.log("Edit password selected", oldPassword, newPassword);
	// };

	return (
		<StackContainer onMouseLeave={() => setIsOpen(false)}>
			{/* <StatusModal isOpen={modalStatus.isOpen} description={modalStatus.description} success={modalStatus.success} title={modalStatus.title} /> */}
			{/* <EditProfileModal
				user={currentUser}
				isOpen={editModalVisible}
				onCancel={() => setEditModalVisible(false)}
				onEditPassword={() => setEditPasswordModal(true)}
				onEditProfileRequested={onEditProfileRequested}
			/> */}
			{/* <EditPasswordModal isOpen={editPasswordModal} onCancel={() => setEditPasswordModal(false)} onEditPasswordRequested={onEditPasswordRequested} /> */}
			<Container onClick={() => setIsOpen(!isOpen)} >
				{
					loggedTeacher.photo ?
						<img src={loggedTeacher.photo} /> :
						<BiUserCircle color={currentTheme.primary} fontSize="3.2em" />
				}
				<div>
					{isOpen ?
						<IoIosArrowUp color={currentTheme.primary} fontSize="2.0em" /> :
						<IoIosArrowDown color={currentTheme.primary} fontSize="2.0em" />
					}
				</div>
			</Container>
			{isOpen &&
				<SpacingContainer>
					<OpenContainer theme={currentTheme}>
						{props.items.map((item, index) => {
							return (
								<DropdownItem
									key={index}
									theme={currentTheme}
									onClick={() => {
										setIsOpen(false);
										onProfileOptionClick(props.items[index]);
									}}>
									<div>
										<p>{item}</p>
										<IoIosArrowForward color={currentTheme.primary} fontSize="1.5em" />
									</div>
								</DropdownItem>
							);
						})}
					</OpenContainer>
				</SpacingContainer>
			}
		</StackContainer>
	);
};

export default ProfileDropdown;