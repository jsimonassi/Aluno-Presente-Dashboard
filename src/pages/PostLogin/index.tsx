import React, { useCallback, useEffect } from "react";
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

	
	const redirectOrGetTokenIfNeeded = useCallback(() => {
		const code = params.get("code");
		const redirectUrl = params.get("redirect_url");
		const currentSession = session.currentSession;
	
		const redirectToLogin = () => {
			const postLoginUrl = `${window.location.origin}/${ROUTES.POST_LOGIN}`;
			session.redirectToLogin(postLoginUrl);
		};
	
		const getAuthToken = async () => {
			try {
				const postLoginUrl = `${window.location.origin}/${ROUTES.POST_LOGIN}`;
				await session.getAuthToken(code ?? "", postLoginUrl);
				const defaultRoute = `/${ROUTES.DASHBOARD}/${ROUTES.OPTIONS.MY_CLASSES}`;
				const targetRoute = redirectUrl ?? defaultRoute;
				navigate(targetRoute, { replace: true });
			} catch (error) {
				console.error("Error authenticating user:", error);
				redirectToLogin();
			}
		};
	
		if (!code) {
			redirectToLogin();
		} else if (!currentSession?.accessToken) {
			getAuthToken();
		}
	}, [params, session, navigate]);
	
	useEffect(() => {
		redirectOrGetTokenIfNeeded();
	}, [redirectOrGetTokenIfNeeded]);
	

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