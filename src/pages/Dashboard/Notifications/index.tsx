import React from "react";
import { Container, FooterInfos, ScrollContainer } from "./styles";
import { MainButton } from "../../../components/Buttons";
import MESSAGES from "../../../constants/messages";
import { useAddBatch } from "../../../contexts/AddBatch";
import { BatchCard } from "./components/BatchCard";

const Notifications = () => {

	const {currentAddBatchList} = useAddBatch();

	return (
		<Container>
			<ScrollContainer>
				{
					currentAddBatchList.map((batch) => {
						return (
							<BatchCard key={batch.id} currentMainProcess={batch}/>
						);
					})
				}
			</ScrollContainer>
			<FooterInfos>
				<MainButton onClick={() => null} text={MESSAGES.NOTIFICATIONS.UPDATE_BTN} enabled/>
			</FooterInfos>
		</Container>
	);
};

export default Notifications;