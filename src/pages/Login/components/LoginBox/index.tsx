import React, {useState} from "react";
import { Box, Container, RegisterBox } from "./styles";
import logoBlue from "../../../../assets/images/logoBlue.png";
import MESSAGES from "../../../../constants/messages";
import { MainInput } from "../../../../components/Inputs";
import { MainButton } from "../../../../components/Buttons";


const LoginBox = () => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<Container>
			<Box>
				<img src={logoBlue} alt="logo" />
				<h2>{MESSAGES.LOGIN.DO_LOGIN}</h2>
				<MainInput
					onChange={setEmail}
					placeholder={MESSAGES.LOGIN.EMAIL_PLACEHOLDER} 
					type="text" 
					value={email}
					title={MESSAGES.LOGIN.EMAIL}
				/>
				<MainInput
					onChange={setPassword}
					placeholder={MESSAGES.LOGIN.PASSWORD_PLACEHOLDER} 
					type="password" 
					value={password}
					title={MESSAGES.LOGIN.PASSWORD}
					style={{marginTop: "8px"}}
				/>
				<MainButton enabled onClick={() => null} text={MESSAGES.LOGIN.LOGIN_BTN} styles={{width: "80%"}} />

				<p>{MESSAGES.LOGIN.FORGOT_PASSWORD}</p>
				
				<RegisterBox>
					<p>{MESSAGES.LOGIN.NEW_HERE}</p>
					<p style={{textDecoration: "underline", marginLeft: "5px"}}>{MESSAGES.LOGIN.REGISTER}</p>
				</RegisterBox>
			</Box>
		</Container>
	);
};

export default LoginBox;