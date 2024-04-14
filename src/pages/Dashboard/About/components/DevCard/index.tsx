import React from "react";
import { CardBackground } from "./styles";

interface DevCardProps {
    name: string;
    role: string;
    photo: string;
    profileUrl: string;
}

export const DevCard = ({ name, role, photo, profileUrl }: DevCardProps) => {

	const redirectToProfile = () => {
		window.location.href = profileUrl;
	};

	return (
		<CardBackground onClick={redirectToProfile}>
			<img src={photo} alt={name} />
			<div>
				<h2>{name}</h2>
				<p>{role}</p>
			</div>
		</CardBackground>
	);
};