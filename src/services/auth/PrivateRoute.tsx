import React from "react";
import { Navigate } from "react-router-dom";
import CONSTANTS from "../../constants";
import { useSession } from "../../contexts/Session";
interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {

	const {currentSession} = useSession();
	return currentSession?.accessToken ? <>{children}</> : <Navigate to={"/" + CONSTANTS.ROUTES.POST_LOGIN } replace/>;
};

export default PrivateRoute;