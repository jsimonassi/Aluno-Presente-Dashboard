/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useCallback, useState } from "react";
import { CloseIconContainer, DataContainer, ImageContainer, InfoContainer, LocationBoxContainer, LocationCardContainer, MapAddressInput, OptionLabel } from "./styles";
import { GoogleMap, Libraries, LoadScript, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import { ReactComponent as CloseIcon } from "../../assets/images/closeIcon.svg";


const center = {
	lat: -13.786216987547695,
	lng: -57.151096281418745
};

const libraries: Libraries = ["places"];

interface LocationBoxProps {
    boxStyle?: React.CSSProperties;
	onLocationSelected: ({lat, lng}: {lat: number, lng: number}) => void;
	onLocationReset: () => void;
}

export const LocationBox = ({ boxStyle, onLocationSelected, onLocationReset }: LocationBoxProps) => {

	const [map, setMap] = useState<google.maps.Map | null>(null);
	const [searchBoxA, setSearchBoxA] = useState<google.maps.places.SearchBox>();
	const [selectedPosition, setSelectedPosition] = useState<google.maps.places.PlaceResult | null>(null);

	const onLoad = useCallback(function callback(map: google.maps.Map | undefined) {
		if (map)
			setMap(map);
	}, [map]);

	const onLoadA = (ref: google.maps.places.SearchBox) => {
		setSearchBoxA(ref);
	};

	const onUnmount = React.useCallback(function callback() {
		setMap(null);
	}, []);

	const updateSelectedPosition = (place: google.maps.places.PlaceResult | undefined) => {
		if (place && place.geometry && place.geometry.location) {
			setSelectedPosition(place);
			map?.setCenter(place.geometry.location);
			map?.setZoom(16);
			onLocationSelected({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
		}
	};

	const resetSelectedPosition = () => {
		setSelectedPosition(null);
		map?.setCenter(center);
		map?.setZoom(4);
		onLocationReset();
	};


	return (
		<LocationBoxContainer style={{ ...boxStyle }}>
			{
				<LoadScript
					googleMapsApiKey={process.env.REACT_APP_MAPS_API_KEY || ""}
					libraries={libraries}
				>
					<GoogleMap
						mapContainerStyle={{
							width: "100%",
							height: "300px",
							borderRadius: "16px"
						}}
						center={center}
						zoom={4}
						onLoad={onLoad}
						onUnmount={onUnmount}
						options={{
							streetViewControl: false,
							fullscreenControl: false,
							mapTypeControl: false,
							rotateControl: false,
							scaleControl: false,
							zoomControl: false,
							panControl: false,
							keyboardShortcuts: false							
						}}
					>
						<StandaloneSearchBox
							onLoad={onLoadA}
							bounds={map ? map.getBounds() : undefined}
							onPlacesChanged={() => {
								const firstPlace = searchBoxA?.getPlaces()?.[0];
								updateSelectedPosition(firstPlace);
							}}
						>
							<MapAddressInput
								type="text"
								placeholder="Onde a aula será ministrada?"
							/>
						</StandaloneSearchBox>
						{
							selectedPosition?.geometry?.location &&
                                <Marker
                                	position={{
                                		lat: selectedPosition.geometry.location.lat(),
                                		lng: selectedPosition.geometry.location.lng()
                                	}}
                                	icon={{
                                		url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                                	}}
                                />
						}
					</GoogleMap>
				</LoadScript>
			}
			{
				selectedPosition && (
					<>
						<OptionLabel>Local selecionado:</OptionLabel>
						<LocationCardContainer>
							<InfoContainer>
								<DataContainer>
									{selectedPosition?.name && <h3>{selectedPosition.name}</h3>}
									{selectedPosition?.formatted_address && <span>{selectedPosition.formatted_address}</span>}
								</DataContainer>
								<CloseIconContainer onClick={resetSelectedPosition}>
									<CloseIcon />
								</CloseIconContainer>
							</InfoContainer>
							{
								selectedPosition.photos && selectedPosition.photos.length > 0 &&
                            <ImageContainer>
                            	{
                            		selectedPosition.photos.map((photo, index) => {
                            			return (
                            				<img key={index} src={photo.getUrl()} alt="Location" />
                            			);
                            		})
                            	}
                            </ImageContainer>
							}
						</LocationCardContainer>
					</>
				)
			}
		</LocationBoxContainer>
	);
};