import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "./styles";
import { MainLoader } from "../../components/Loaders";
import logo from "../../assets/images/logoSmall.png";
import { useSession } from "../../contexts/Session";


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

	useEffect(() => {

		console.log("Chegou com esses parâmetros: ", params);

		const verifyAuth = async () => {
			
			if(!session.login) {
				console.log("Não está logado. Redirecionando para a página de login...");
			}
		};

		verifyAuth();

	}, []);

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