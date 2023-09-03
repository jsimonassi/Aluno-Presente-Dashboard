import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "./styles";
import { MainLoader } from "../../components/Loaders";
import logo from "../../assets/images/logoSmall.png";
import { useSession } from "../../contexts/Session";
import axios from "axios";


/**
 * Esta página é usada parada validacao de autenticacao do usuario.
 * Caso o usuario nao esteja autenticado, ele sera redirecionado para a pagina de login.
 * Caso o usuario esteja autenticado, ele sera redirecionado para a pagina de dashboard após recuperar as informacoes da API.
 */

const PostLogin = () => {

	// const {getCurrentUser, updateCurrentToken, setCurrentUser} = useAdminUser();
	const session = useSession();
	const navigate = useNavigate();
	const params = new URLSearchParams(window.location.search);

	// const doLogin = async () => {
	// 	// https://authorization-server-d6ca554d3cbd.herokuapp.com/v1/auth/oauth2/authorize?response_type=code&client_id=public&scope=openid%20read%20profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fpost-login&code_challenge=UN725HT7Gk1JSw2tBHFL_tSTIc3oPTTyTX3D83rIxxs&code_challenge_method=S256
	// 	window.location.href = "http://0.tcp.sa.ngrok.io:10720/v1/auth/oauth2/authorize?response_type=code&client_id=public&scope=openid%20read%20profile&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fpost-login&code_challenge=UN725HT7Gk1JSw2tBHFL_tSTIc3oPTTyTX3D83rIxxs&code_challenge_method=S256";
	// };

	// useEffect(() => {

	// 	console.log("Chegou com esses parâmetros: ", params.get("code"), params.get("state"), params.get("code_verifier"));

	// 	const verifyAuth = async () => {

	// 	};

	// 	verifyAuth();

	// }, []);

	return (
		<Container>
			<Card>
				<img src={logo} />
				<MainLoader />
			</Card>
		</Container>
	);
};

export default PostLogin;