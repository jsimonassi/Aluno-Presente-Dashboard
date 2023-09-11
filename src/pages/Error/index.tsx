import React from "react";
import { Container, InfoContainer } from "./styles";
import errorImg from "../../assets/images/error.svg";
import { ERROR_DESCRIPTION_PARAM, ERROR_TYPE_PARAM } from "../../constants/error";
import { DEFAULT_ERROR_MESSAGE, MAPPED_ERROR_MESSAGES } from "../../constants/messages/error";

const ErrorPage = () => {

	const params = new URLSearchParams(window.location.search);   

	return (
		<Container>
			<InfoContainer>
				<h1>{params.get(ERROR_TYPE_PARAM) ?? 404}</h1>
				<p>{MAPPED_ERROR_MESSAGES[params.get(ERROR_DESCRIPTION_PARAM) ?? ""] ?? DEFAULT_ERROR_MESSAGE}</p>
				<img src={errorImg} alt="Error" />
			</InfoContainer>
		</Container>
	);
};

export default ErrorPage;