import React from "react";
import { BannerContainer, PageContainer } from "./styles";
import whiteLogo from "../../../assets/images/whiteLogo.png";


const Privacy = () => {

	return (
		<PageContainer>
			<BannerContainer>
				<img src={whiteLogo} alt="Logo" />
				<h1>Política de Privacidade</h1>
			</BannerContainer>
			<p>Nossa política de privacidade descreve como coletamos, usamos e protegemos suas informações quando você utiliza o Alunos Presente. Leia atentamente as seguintes informações:</p>
			<p><b>Informações Coletadas:</b> Coletamos informações pessoais como seu nome, e-mail, matrícula na universidade e nome do professor para fornecer o serviço de registro de presença de alunos. Essas informações são fornecidas voluntariamente por você ao utilizar a aplicação.</p>
			<p><b>Uso das Informações:</b> As informações coletadas são utilizadas para identificar os usuários e registrar sua presença nas atividades acadêmicas. Elas não serão compartilhadas com terceiros sem o seu consentimento, exceto quando exigido por lei.</p>
			<p><b>Segurança das Informações:</b> Empregamos medidas de segurança adequadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição não autorizada.</p>
			<p><b>Exclusão de Informações:</b> Você pode solicitar a exclusão das suas informações a qualquer momento. Faremos todos os esforços razoáveis para atender a essas solicitações, a menos que haja uma razão legal para reter tais informações.</p>
			<p><b>Retenção de Dados:</b> Manteremos suas informações apenas pelo tempo necessário para fornecer o serviço ou conforme exigido por lei. Após esse período, suas informações serão excluídas de forma segura.</p>
			<p><b>Consentimento:</b> Ao utilizar o Alunos Presente, você consente com a coleta, armazenamento e uso das suas informações de acordo com esta política de privacidade.</p>
			<p><b>Alterações na Política de Privacidade:</b> Reservamo-nos o direito de modificar esta política de privacidade a qualquer momento. As alterações entrarão em vigor assim que forem publicadas na aplicação.</p>
			<p><b>Contato:</b> Se tiver alguma dúvida sobre nossa política de privacidade ou sobre suas informações pessoais, entre em contato conosco através do e-mail jsimonassi@id.uff.br ou lucassl@id.uff.br.</p>
			<p>Ao utilizar o Alunos Presente, você concorda com nossa política de privacidade e com o tratamento das suas informações pessoais conforme descrito aqui.</p>
			<h3>Att, Equipe Aluno Presente</h3>
		</PageContainer>
	);
};

export default Privacy;