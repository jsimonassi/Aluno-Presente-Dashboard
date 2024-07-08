import React from "react";
import { ButtonGroup, Container, DevsContainer, VersionContainer } from "./styles";
import logo from "../../../assets/images/logoBlue.png";
import { DevCard } from "./components/DevCard";
import { OutlineButton } from "../../../components/Buttons";

const About = () => {
	return (
		<Container>
			<img src={logo} alt="Logo" />
			<VersionContainer>
				<p>Versão: 1.6</p>
				<p>Desenvolvido por João Victor Simonassi e Lucas Lima como parte do trabalho final do curso de Ciência da Computação da Universidade Federal Fluminense - UFF. Orientador: Lauro Eduardo Kozovits.</p>
			</VersionContainer>
			<DevsContainer>
				<h1>Desenvolvedores:</h1>
				<DevCard
					name="João Victor Simonassi"
					photo="https://avatars.githubusercontent.com/u/33124078?v=4"
					profileUrl="https://github.com/jsimonassi"
					role="Desenvolvedor FullStack"
				/>
				<DevCard
					name="Lucas da Silva Lima"
					photo="https://avatars.githubusercontent.com/u/31750882?v=4"
					profileUrl="https://github.com/Lucasark"
					role="Desenvolvedor FullStack"
				/>
			</DevsContainer>
			<ButtonGroup>
				<OutlineButton 
					onClick={() => window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSfYKhphzzWkTFJHU3I-V3fZGV6ifysvsBQfg-YGLe01zvaluQ/viewform?usp=sf_link"}
					text="Reportar um problema"
					enabled
				/>
			</ButtonGroup>
		</Container>
	);
};

export default About;