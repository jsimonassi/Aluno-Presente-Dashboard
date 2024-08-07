const MY_CLASSES = {
	EMPTY_LIST_MESSAGE: "Nenhuma turma encontrada",
	EMPTY_LIST_DESCRIPTION: "Para começar, crie uma nova turma",
	NEW_CLASS_BTN: "Nova turma",

	NEW_CLASS_MODAL: {
		TITLE: "Nova turma",
		COURSE: "Disciplina",
		COURSE_PLACEHOLDER: "Inteligência artificial",
		PERIOD: "Período letivo",
		PERIOD_PLACEHOLDER: "2024.1",
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

		MANDATORY_FIELD: "Campo obrigatório",
		CREATING_CLASS: "Criando turma...",
		SUCCESSFULLY_CREATED: "Turma criada com sucesso!",
		ERROR: "Erro ao criar turma. Tente novamente!",
	},

	EDIT_CLASS_MODAL: {
		TITLE: "Editar turma",
		EDITING_CLASS: "Editando turma...",
		SUCCESSFULLY_EDITED: "Turma editada com sucesso!",
		ERROR: "Erro ao editar turma. Tente novamente!",
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
		ERROR_LOADING_FREQUENCY: "Erro ao carregar frequência. Tente novamente!",

		ADDING_STUDENT: "Adicionando aluno...",
		ADDED_STUDENT: "Aluno adicionado com sucesso!",
		STUDENTS_ADDED: "Adição em andamento. Verifique o status na tela de notificações.",
		ERROR_ADDING_STUDENT: "Erro ao adicionar aluno. Tente novamente!",
		ADDING_STUDENTS: "Adicionando alunos...",

		CLASSROOM_FREQUENCY: {
			NOTHING_TO_SHOW: "Não existem dados para essa turma.",
			NOTHING_TO_SHOW_TIP: "Inicie uma nova chamada para visualizar a frequência.",
			PRESENT_STUDENTS: "Número de presenças: ",
			FAULT_STUDENTS: "Número de faltas: ",
			TOTAL_CLASSES: "Total de frequências realizadas: ",
			SEARCH_INTERVAL: "Intervalo de busca: ",
			PERIOD: "Período: ",
			LAST_UPDATE: "Última atualização: ",
			REQUEST_UPDATE: "Atualizar",
			NO_STUDENTS: "Nenhum aluno encontrado.",
			NO_STUDENTS_TIP: "Adicione alunos para começar a registrar a frequência.",
		},

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
		},

		FAIL_TO_ADD_MODAL: {
			TITLE: "Falha ao adicionar alunos",
			MESSAGE: "Os seguintes alunos não foram adicionados:",
			NAME: "Nome",
			REASON: "Motivo",
			OK_BTN: "Ok",
		},
	},

	ATTENDANCE_CONTROLLER: {
		STUDENTS: "Alunos",
		EDIT_BTN: "Editar",
		EXPORT_BTN: "Exportar",
		NEW_FREQUENCY: "Nova chamada",
		PRESENT_TIP: "Presente",
		ABSENT_TIP: "Faltou",
		JUSTIFIED_TIP: "Justificado",
		UNSUBSCRIBED_TIP: "Alunos não estava inscrito na data",
		ERROR_LOADING_ATTENDANCE: "Erro ao carregar chamada. Tente novamente!",
		HELP: "Ajuda",
		FINISH_EDITING: "Finalizar edição",
		EDIT_TIP: "Obs: Suas alterações são salvas automaticamente.",
		ERROR_UPDATING_ATTENDANCE: "Erro ao atualizar chamada. Tente novamente!",
		EXPORT_PROGRESS_DOWNLOADING: "Recuperando informações do período...",
		EXPORT_PROGRESS_CREATING: "Gerando arquivo...",
		EXPORT_ERROR: "Erro ao exportar chamada. Tente novamente!",
	},

	NEW_FREQUENCY_MODAL: {
		TITLE: "Nova chamada",
		ENABLE_LOCATION: "Utilizar localização do aluno para validar a presença",
		OBS: "Ao marcar essa opção, usaremos o GPS do aluno para validar sua posição e comparar com o endereço definido ao iniciar a frequência.",
		QR_CODE_TITLE: "Validação por QRCode (Recomendado)",
		QR_CODE_DESCRIPTION: "Um QR code é gerado e atualizado a cada 5 segundos. O professor deve apresentar a página com o QR code a turma. O aluno faz a validação da chamada lendo o QR code pelo aplicativo Aluno Presente.  É a opção mais segura devido a atualização do QR code, garantindo que apenas alunos em sala possam validar a presença.",
		SESSION_CODE_TITLE: "Validação por código de sessão",
		SESSION_CODE_DESCRIPTION: "Um código curto é gerado. O professor deve apresentar o código aos alunos. O aluno informa o código no aplicativo Aluno Presente e faz a validação da presença.",
		STOP_ATTENDANCE: "Encerrar chamada",
		QR_CODE_TIP: "Mostre o QR code ao seus alunos para que eles possam registrar a presença pelo app Aluno Presente.",
		CODE_TIP: "Mostre o código ao seus alunos para que eles possam registrar a presença pelo app Aluno Presente.",
		REGISTERED_STUDENTS: "Alunos registrados:",
		START_ATTENDANCE_ERROR: "Ocorreu um erro ao iniciar a chamada.",
		START_ATTENDANCE_REDIRECT_INFO: "Início",
		CHOOSE_OPTION: "Escolha uma opção:",
		LOCATION: "Localização:",
		START: "Iniciar chamada",
		TIP: "Mostre o código aos seus alunos para que eles possam registrar a presença pelo app Aluno Presente.",
	},

	NEW_FREQUENCY_PAGE: {
		TIPS: "Enfrentando problemas? Experimente ",
		TIPS_REFRESH: " atualizar a página",
	},

	DELETE_CLASS_MODAL: {
		TITLE: "Excluir turma",
		MESSAGE1: "Tem certeza que deseja excluir a turma?",
		MESSAGE2: "Essa ação não poderá ser desfeita.",
		MESSAGE3: "Todo o histórico da turma e as presenças registradas serão perdidas.",
		CANCEL_BTN: "Cancelar",
		CONFIRM_BTN: "Confirmar",
		DELETING: "Apagando...",
		DELETED: "Turma excluída com sucesso!",
		ERROR: "Erro ao excluir turma. Tente novamente!",
	},

	HELP_MODAL: {
		HELP: "Ajuda ",
		P_TITLE: "P (Presente): ",
		P_DESCRIPTION: "Aluno estava presente na aula.",
		F_TITLE: "F (Faltou): ",
		F_DESCRIPTION: "Aluno faltou a aula.",
		UNSUBSCRIBED_TITLE: "Não Inscrito: ",
		UNSUBSCRIBED_DESCRIPTION: "Aluno não estava matriculado quando \na chamada foi realizada."
	}
};

export default MY_CLASSES;