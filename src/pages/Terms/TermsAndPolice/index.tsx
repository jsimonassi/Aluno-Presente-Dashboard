import React from "react";
import { BannerContainer, PageContainer } from "./styles";
import whiteLogo from "../../../assets/images/whiteLogo.png";


const TermsAndPolice = () => {

	return (
		<PageContainer>
			<BannerContainer>
				<img src={whiteLogo} alt="Logo" />
				<h1>Termos de Uso</h1>
			</BannerContainer>
			<p>Ao utilizar nossa aplicação, você concorda com os seguintes termos e condições:</p>
			<p><b>Descrição do Serviço:</b> O Alunos Presente é uma aplicação desenvolvida para registrar a presença dos alunos na universidade. Ela permite aos professores e alunos registrar sua presença em aulas e atividades acadêmicas.</p>
			<p><b>Informações Coletadas:</b> Para utilizar o Alunos Presente, coletamos informações como seu nome, e-mail, matrícula na universidade e nome do professor. Essas informações são necessárias para identificar os usuários e registrar sua presença de forma adequada.</p>
			<p><b>Uso das Informações:</b> As informações coletadas serão utilizadas exclusivamente para os propósitos do Alunos Presente. Elas não serão compartilhadas com terceiros sem o seu consentimento, exceto quando exigido por lei.</p>
			<p><b>Privacidade e Segurança:</b> Comprometemo-nos a proteger a privacidade e segurança das suas informações. Empregamos medidas técnicas e organizacionais adequadas para garantir que suas informações sejam tratadas de forma segura e para evitar acesso não autorizado</p>
			<p><b>Exclusão de Informações: </b>Você tem o direito de solicitar a exclusão das suas informações a qualquer momento. Faremos todos os esforços razoáveis para atender a essas solicitações, a menos que haja uma razão legal para reter tais informações.</p>
			<p><b>Consentimento de Uso: </b> Ao utilizar o Alunos Presente, você consente com a coleta, armazenamento e uso das suas informações conforme descrito nestes termos de uso e na nossa política de privacidade.</p>
			<p><b>Alterações nos Termos:</b> Reservamo-nos o direito de modificar estes termos de uso a qualquer momento. As alterações entrarão em vigor assim que forem publicadas na aplicação. É responsabilidade do usuário revisar periodicamente estes termos para estar ciente de quaisquer alterações.</p>
			<p><b>Contato:</b> Se tiver alguma dúvida sobre estes termos de uso ou sobre a nossa aplicação, entre em contato conosco através do e-mail jsimonassi@id.uff.br ou lucassl@id.uff.br.</p>
			<p>Ao utilizar o Alunos Presente, você concorda em cumprir estes termos de uso. O não cumprimento destes termos pode resultar na suspensão ou término do seu acesso à aplicação.</p>
			<h3>Att, Equipe Aluno Presente</h3>
		</PageContainer>
	);
};

export default TermsAndPolice;