import React from "react";
import { Navigate } from "react-router-dom";
import CONSTANTS from "../../constants";
interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	// debugger;
	// const { currentUser } = useAdminUser();
	// const isLoggedIn = Auth.isLoggedIn() && currentUser?.email != null;
	const isLoggedIn = true;

	// if(isLoggedIn){
	// 	setToken(Auth.getToken() ?? "");
	// }

	return isLoggedIn ? <>{children}</> : <Navigate to={"/" + CONSTANTS.ROUTES.POST_LOGIN + `?redirect_url=${window.location.pathname}`} replace/>;
};

export default PrivateRoute;