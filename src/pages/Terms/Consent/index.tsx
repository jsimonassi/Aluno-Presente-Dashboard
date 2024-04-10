import React from "react";
import { BannerContainer, PageContainer } from "./styles";
import whiteLogo from "../../../assets/images/whiteLogo.png";


const Consent = () => {

	return (
		<PageContainer>
			<BannerContainer>
				<img src={whiteLogo} alt="Logo" />
				<h1>Consentimento de Uso</h1>
			</BannerContainer>
			<p>Ao criar sua conta, você concorda em utilizar o Alunos Presente e fornecer voluntariamente as informações solicitadas, incluindo meu nome, e-mail, matrícula na universidade e nome do professor, para o propósito de registro de presença nas atividades acadêmicas. Entendo que posso solicitar a exclusão das minhas informações a qualquer momento, exceto quando houver uma turma vinculada ao meu e-mail, e que a continuidade do uso do e-mail está condicionada à existência de tal vínculo. Declaro que li e compreendi os termos de uso e a política de privacidade do Alunos Presente, e concordo com o tratamento das minhas informações pessoais conforme descrito nestes documentos.</p>
			<h3>Att, Equipe Aluno Presente</h3>

		</PageContainer>
	);
};

export default Consent;