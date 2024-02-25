import React from "react";
import { Container, Item } from "./styles";
import { AVAILABLE_FREQUENCY_STATUS } from "../../../../../../../../../../../constants/frequency";

interface EditBtnGroupProps {
    status: string | undefined;
    onNewStatusSelected: (status: string) => void;
}

const EditBtnGroup = (props: EditBtnGroupProps) => {

	if (!props.status) {
		return null;
	}

	return (
		<Container>
			{Array.from(AVAILABLE_FREQUENCY_STATUS.values()).map((availableStatus) => (
				<Item
					selected={availableStatus.name === props.status}
					key={availableStatus.id}
					onClick={() => availableStatus.name !== props.status && props.onNewStatusSelected(availableStatus.name)}
				>
					{availableStatus.name}
				</Item>
			))}
		</Container>
	);

};

export default EditBtnGroup;