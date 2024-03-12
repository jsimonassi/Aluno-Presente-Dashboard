import React, { useState } from "react";
import { Container, DropdownItem, OpenContainer, SpacingContainer, StackContainer } from "./styles";
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { useAppTheme } from "../../../../../../contexts/Theme";
import { useSession } from "../../../../../../contexts/Session";


interface ProfileProps {
	items: string[];
	onClick: (option: string) => void;
}

const ProfileDropdown = (props: ProfileProps) => {

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const {currentUser} = useSession();
	const {currentTheme} = useAppTheme();

	return (
		<StackContainer onMouseLeave={() => setIsOpen(false)}>
			<Container onClick={() => setIsOpen(!isOpen)} >
				{
					currentUser?.photo ?
						<img src={currentUser.photo} /> :
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
										props.onClick(props.items[index]);
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