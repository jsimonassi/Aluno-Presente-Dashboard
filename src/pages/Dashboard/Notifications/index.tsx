import React from "react";
import { Container, FooterInfos, ScrollContainer } from "./styles";
import { MainButton } from "../../../components/Buttons";
import MESSAGES from "../../../constants/messages";
import { useAddBatch } from "../../../contexts/AddBatch";
import { BatchCard } from "./components/BatchCard";
import toast from "react-hot-toast";
import moment from "moment";
import { CardLoader } from "./components/CardLoader";

const Notifications = () => {

	const {currentAddBatchList, refreshAddBatchList, lastUpdate} = useAddBatch();

	const handleRefreshList = () => {
		toast.loading("Atualizando...");
		refreshAddBatchList().finally(() => {
			toast.dismiss();
		});
	};

	return (
		<Container>
			<ScrollContainer>

				{	currentAddBatchList === null ?
					<>
						<CardLoader />
					</> :
					currentAddBatchList.map((batch) => {
						return (
							<BatchCard key={batch.id} currentMainProcess={batch}/>
						);
					})
				}
			</ScrollContainer>
			<FooterInfos>
				<p><b>{MESSAGES.NOTIFICATIONS.LAST_UPDATE}</b>{moment(lastUpdate.toString()).format("DD/MM/YYYY - HH:mm")}</p>
				<MainButton onClick={handleRefreshList} text={MESSAGES.NOTIFICATIONS.UPDATE_BTN} enabled/>
			</FooterInfos>
		</Container>
	);
};

export default Notifications;