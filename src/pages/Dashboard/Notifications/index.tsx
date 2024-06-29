import React, { useMemo } from "react";
import { Container, FooterInfos, ScrollContainer, ShowMoreInfoStyled } from "./styles";
import { MainButton } from "../../../components/Buttons";
import MESSAGES from "../../../constants/messages";
import { useAddBatch } from "../../../contexts/AddBatch";
import { BatchCard } from "./components/BatchCard";
import toast from "react-hot-toast";
import moment from "moment";
import { CardLoader } from "./components/CardLoader";

const SLICE_SIZE = 5;

const Notifications = () => {

	const {currentAddBatchList, refreshAddBatchList, lastUpdate} = useAddBatch();
	const [listShowSize, setListShowSize] = React.useState<number>(SLICE_SIZE);
	const filteredBatchList = useMemo(() => currentAddBatchList?.slice(0, listShowSize), [currentAddBatchList, listShowSize]);

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
					filteredBatchList?.map((batch) => {
						return (
							<BatchCard key={batch.id} currentMainProcess={batch}/>
						);
					})
				}
				{filteredBatchList && currentAddBatchList && filteredBatchList.length <  currentAddBatchList.length && <ShowMoreInfoStyled onClick={() => setListShowSize(previous => previous + SLICE_SIZE)}>Mostrar mais</ShowMoreInfoStyled>}
			</ScrollContainer>
			<FooterInfos>
				<p><b>{MESSAGES.NOTIFICATIONS.LAST_UPDATE}</b>{moment(lastUpdate.toString()).format("DD/MM/YYYY - HH:mm")}</p>
				<MainButton onClick={handleRefreshList} text={MESSAGES.NOTIFICATIONS.UPDATE_BTN} enabled/>
			</FooterInfos>
		</Container>
	);
};

export default Notifications;