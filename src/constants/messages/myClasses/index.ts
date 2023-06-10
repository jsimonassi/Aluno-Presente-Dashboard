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
	}
};

export default MY_CLASSES;