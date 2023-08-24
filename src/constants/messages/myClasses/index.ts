const MY_CLASSES = {
	EMPTY_LIST_MESSAGE: "Nenhuma turma encontrada",
	EMPTY_LIST_DESCRIPTION: "Para começar, crie uma nova turma",
	NEW_CLASS_BTN: "Nova turma",

	NEW_CLASS_MODAL: {
		TITLE: "Nova turma",
		COURSE: "Disciplina",
		COURSE_PLACEHOLDER: "Inteligência artificial",
		PERIOD: "Período letivo",
		PERIOD_PLACEHOLDER: "2023.1",
		WEEKDAY: "Dia da semana",
		WEEKDAY_PLACEHOLDER: "Segunda-feira",
		FROM: "De",
		FROM_PLACEHOLDER: "09:00",
		TO: "Até",
		TO_PLACEHOLDER: "11:00",
		ABOUT: "Sobre",
		ABOUT_PLACEHOLDER: "A disciplina de inteligência artificial explica os fundamentos teórico-conceituais da inteligência artificial de modo abrangente, porém coerente; atravessa os paradigmas da inteligência artificial e introduzir noções das diversas técnicas utilizadas na área.",
		NEW_TIME: "Novo horário",
		SAVE: "Salvar",
	},

	MANAGE_CLASS: {
		STUDENTS: "Alunos",
		AVAILABLE_OPTIONS: ["Chamada", "Adicionar alunos", "Frequência da turma"],
		EDIT_BTN: "Editar",
		EXPORT_BTN: "Exportar chamada",
		SELECT_OPTION: "Selecione uma opção:",
		IMPORT_STUDENTS: "Importar alunos de uma planilha .xlsx",
		MANUAL_ADD: "Adicionar alunos manualmente",
		IMPORT_STUDENTS_DESCRIPTION: "Escolha esta opção se você possui uma planilha listando nome e e-mail dos alunos. O sistema irá identificar e cadastrar automaticamente todos os alunos em sua turma.",
		MANUAL_ADD_DESCRIPTION: "Adicione manualmente a informação de novos alunos. O controle de presença só ficará válido para o aluno a partir da data de ingresso na disciplina. As aulas anteriores não terão falta ou presença a menos que o professor faça a edição.",
	
		FREQUENCY: "Frequência",
		FREQUENCY_DESCRIPTION: "A frequência da turma é de ",

		ADD_FROM_XLSX_MODAL: {
			TITLE: "Importar alunos",
			TABLE: "Planilha de alunos:",
			FINNED_STUDENTS: "Alunos encontrados:",
			OBS: "Obs: Alunos que já estão na lista (Com o mesmo e-mail) serão ignorados.",
			ADD_BTN: "Adicionar",
			NAME: "Nome",
			EMAIL: "E-mail",
			CPF: "CPF",
			NUMBER: "Matrícula",
			NULL_LIST: "Carregue um arquivo para ver a lista de alunos encontrados.",
			EMPTY_LIST: "Nenhum aluno encontrado.",
		},

		ADD_FROM_MANUAL_MODAL: {
			TITLE: "Adicionar aluno",
			NAME: "Nome",
			EMAIL: "E-mail",
			CPF: "CPF",
			NUMBER: "Matrícula",
			ADD_BTN: "Adicionar",
			NAME_PLACEHOLDER: "Fulano Pereira da Silva",
			EMAIL_PLACEHOLDER: "fulano@email.com",
			CPF_PLACEHOLDER: "000.000.000-00",
			NUMBER_PLACEHOLDER: "000000000",
			MANDATORY_FIELD: "Campo obrigatório",
		}
	},

	FREQUENCY_CONTROLLER: {
		STUDENTS: "Alunos",
		EDIT_BTN: "Editar",
		EXPORT_BTN: "Exportar",
		NEW_FREQUENCY: "Nova chamada",
	},

	NEW_FREQUENCY_MODAL: {
		TITLE: "Nova chamada",
		OBS: "Em ambos os casos utilizaremos o GPS do aluno para validar sua posição e comparar com o endereço da instituição onde a disciplina está sendo ministrada.",
		QR_CODE_TITLE: "Validação por QRCode (Recomendado)",
		QR_CODE_DESCRIPTION: "Um QR code é gerado e atualizado a cada 5 segundos. O professor deve apresentar a página com o QR code a turma. O aluno faz a validação da chamada lendo o QR code pelo aplicativo Aluno Presente.  É a opção mais segura devido a atualização do QR code, garantindo que apenas alunos em sala possam validar a presença.",
		SESSION_CODE_TITLE: "Validação por código de sessão",
		SESSION_CODE_DESCRIPTION: "Um código curto é gerado. O professor deve apresentar o código aos alunos. O aluno informa o código no aplicativo Aluno Presente e faz a validação da presença."
	},
};

export default MY_CLASSES;