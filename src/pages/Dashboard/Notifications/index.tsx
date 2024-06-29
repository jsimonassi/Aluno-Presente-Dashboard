import React, { useEffect, useMemo } from "react";
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
	const [intervalRef, setIntervalRef] = React.useState<NodeJS.Timer | null>(null);

	useEffect(() => {
		console.log("currentAddBatchList", currentAddBatchList?.some(batch => !batch.isFinished));
		if(currentAddBatchList && currentAddBatchList.some(batch => !batch.isFinished)){
			if(intervalRef === null) {
				startAutoRefresh();
			}
		}else {
			stopAutoRefresh();
		}

		return () => {
			stopAutoRefresh();
		};
	}, [currentAddBatchList]);

	const startAutoRefresh = () => {
		const interval = setInterval(() => {
			handleRefreshList();
		}, 5000);
		setIntervalRef(interval);
	};

	const stopAutoRefresh = () => {
		if (intervalRef) clearInterval(intervalRef);
		setIntervalRef(null);
	};

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
							<BatchCard key={batch.id} currentMainProcess={batch} />
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