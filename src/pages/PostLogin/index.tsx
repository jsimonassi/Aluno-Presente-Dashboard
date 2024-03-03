import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "./styles";
import { MainLoader } from "../../components/Loaders";
import logo from "../../assets/images/logoSmall.png";
import { useSession } from "../../contexts/Session";
import ROUTES from "../../constants/routes";


/**
 * Esta página é usada parada validacao de autenticacao do usuario.
 * Caso o usuario nao esteja autenticado, ele sera redirecionado para a pagina de login.
 * Caso o usuario esteja autenticado, ele sera redirecionado para a pagina de dashboard após recuperar as informacoes da API.
 */

const PostLogin = () => {

	const session = useSession();
	const navigate = useNavigate();
	const params = new URLSearchParams(window.location.search);

	useEffect(() => {
		if(!params.get("code")) {
			console.log("location", window.location);
			session.redirectToLogin(window.location.origin + "/" + ROUTES.POST_LOGIN);
		} else if(!session.currentSession?.accessToken) {
			session.getAuthToken(params.get("code") ?? "", window.location.origin + "/" + ROUTES.POST_LOGIN)
				.then(() => {
					const defaultRoute = "/" + ROUTES.DASHBOARD + "/" +ROUTES.OPTIONS.MY_CLASSES;
					navigate(params.get("redirect_url") ?? defaultRoute, {replace: true});
				}).catch(() => {
					navigate("/");
				});
		}
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