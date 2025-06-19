// Configuración de internacionalización

export const SUPPORTED_LANGUAGES = {
  es: {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    direction: 'ltr' as const,
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    direction: 'ltr' as const,
  },
  pt: {
    code: 'pt',
    name: 'Português',
    flag: '🇧🇷',
    direction: 'ltr' as const,
  },
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

export const DEFAULT_LANGUAGE: SupportedLanguage = 'es';

// Traducciones
export const TRANSLATIONS = {
  es: {
    // Navegación
    nav: {
      home: 'Inicio',
      fields: 'Canchas',
      bookings: 'Reservas',
      profile: 'Perfil',
      login: 'Iniciar sesión',
      register: 'Registrarse',
      logout: 'Cerrar sesión',
      admin: 'Administración',
    },

    // Formularios
    forms: {
      email: 'Email',
      password: 'Contraseña',
      confirmPassword: 'Confirmar contraseña',
      firstName: 'Nombre',
      lastName: 'Apellido',
      phone: 'Teléfono',
      address: 'Dirección',
      submit: 'Enviar',
      cancel: 'Cancelar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      add: 'Agregar',
      search: 'Buscar',
      filter: 'Filtrar',
      clear: 'Limpiar',
    },

    // Validación
    validation: {
      required: 'Este campo es requerido',
      email: 'El email debe tener un formato válido',
      minLength: 'Debe tener al menos {min} caracteres',
      maxLength: 'No puede tener más de {max} caracteres',
      passwordMatch: 'Las contraseñas deben coincidir',
      invalidFormat: 'Formato inválido',
      invalidPhone: 'Número de teléfono inválido',
      invalidUrl: 'URL inválida',
      invalidDate: 'Fecha inválida',
      invalidTime: 'Hora inválida',
      positiveNumber: 'Debe ser un número positivo',
      minValue: 'El valor mínimo es {min}',
      maxValue: 'El valor máximo es {max}',
    },

    // Mensajes
    messages: {
      success: 'Operación exitosa',
      error: 'Ha ocurrido un error',
      loading: 'Cargando...',
      noData: 'No hay datos disponibles',
      noResults: 'No se encontraron resultados',
      confirmDelete: '¿Estás seguro de que quieres eliminar este elemento?',
      confirmAction: '¿Estás seguro de que quieres realizar esta acción?',
      changesSaved: 'Cambios guardados exitosamente',
      changesDiscarded: 'Cambios descartados',
      sessionExpired:
        'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
      networkError: 'Error de conexión. Verifica tu conexión a internet.',
      serverError: 'Error del servidor. Intenta nuevamente más tarde.',
    },

    // Fechas y horas
    dateTime: {
      today: 'Hoy',
      yesterday: 'Ayer',
      tomorrow: 'Mañana',
      thisWeek: 'Esta semana',
      lastWeek: 'La semana pasada',
      nextWeek: 'La próxima semana',
      thisMonth: 'Este mes',
      lastMonth: 'El mes pasado',
      nextMonth: 'El próximo mes',
      months: {
        january: 'Enero',
        february: 'Febrero',
        march: 'Marzo',
        april: 'Abril',
        may: 'Mayo',
        june: 'Junio',
        july: 'Julio',
        august: 'Agosto',
        september: 'Septiembre',
        october: 'Octubre',
        november: 'Noviembre',
        december: 'Diciembre',
      },
      days: {
        monday: 'Lunes',
        tuesday: 'Martes',
        wednesday: 'Miércoles',
        thursday: 'Jueves',
        friday: 'Viernes',
        saturday: 'Sábado',
        sunday: 'Domingo',
      },
    },

    // Deportes
    sports: {
      football: 'Fútbol',
      basketball: 'Básquetbol',
      tennis: 'Tenis',
      volleyball: 'Voleibol',
      baseball: 'Béisbol',
      soccer: 'Fútbol',
    },

    // Estados de reserva
    booking: {
      status: {
        pending: 'Pendiente',
        confirmed: 'Confirmada',
        cancelled: 'Cancelada',
        completed: 'Completada',
        expired: 'Expirada',
      },
      actions: {
        book: 'Reservar',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        reschedule: 'Reprogramar',
        view: 'Ver detalles',
      },
    },

    // Accesibilidad
    a11y: {
      skipToContent: 'Saltar al contenido principal',
      skipToNavigation: 'Saltar a la navegación',
      accessibilityControls: 'Controles de accesibilidad',
      highContrast: 'Alto contraste',
      increaseFontSize: 'Aumentar tamaño de fuente',
      decreaseFontSize: 'Reducir tamaño de fuente',
      keyboardNavigation: 'Navegación por teclado',
      screenReaderAnnouncement: 'Anuncio para lectores de pantalla',
    },

    // Errores
    errors: {
      notFound: 'Página no encontrada',
      unauthorized: 'No autorizado',
      forbidden: 'Acceso prohibido',
      serverError: 'Error del servidor',
      networkError: 'Error de red',
      validationError: 'Error de validación',
      unknownError: 'Error desconocido',
    },
  },

  en: {
    // Navigation
    nav: {
      home: 'Home',
      fields: 'Fields',
      bookings: 'Bookings',
      profile: 'Profile',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      admin: 'Admin',
    },

    // Forms
    forms: {
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      firstName: 'First name',
      lastName: 'Last name',
      phone: 'Phone',
      address: 'Address',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      search: 'Search',
      filter: 'Filter',
      clear: 'Clear',
    },

    // Validation
    validation: {
      required: 'This field is required',
      email: 'Email must have a valid format',
      minLength: 'Must have at least {min} characters',
      maxLength: 'Cannot have more than {max} characters',
      passwordMatch: 'Passwords must match',
      invalidFormat: 'Invalid format',
      invalidPhone: 'Invalid phone number',
      invalidUrl: 'Invalid URL',
      invalidDate: 'Invalid date',
      invalidTime: 'Invalid time',
      positiveNumber: 'Must be a positive number',
      minValue: 'Minimum value is {min}',
      maxValue: 'Maximum value is {max}',
    },

    // Messages
    messages: {
      success: 'Operation successful',
      error: 'An error has occurred',
      loading: 'Loading...',
      noData: 'No data available',
      noResults: 'No results found',
      confirmDelete: 'Are you sure you want to delete this item?',
      confirmAction: 'Are you sure you want to perform this action?',
      changesSaved: 'Changes saved successfully',
      changesDiscarded: 'Changes discarded',
      sessionExpired: 'Your session has expired. Please log in again.',
      networkError: 'Connection error. Check your internet connection.',
      serverError: 'Server error. Try again later.',
    },

    // Date and time
    dateTime: {
      today: 'Today',
      yesterday: 'Yesterday',
      tomorrow: 'Tomorrow',
      thisWeek: 'This week',
      lastWeek: 'Last week',
      nextWeek: 'Next week',
      thisMonth: 'This month',
      lastMonth: 'Last month',
      nextMonth: 'Next month',
      months: {
        january: 'January',
        february: 'February',
        march: 'March',
        april: 'April',
        may: 'May',
        june: 'June',
        july: 'July',
        august: 'August',
        september: 'September',
        october: 'October',
        november: 'November',
        december: 'December',
      },
      days: {
        monday: 'Monday',
        tuesday: 'Tuesday',
        wednesday: 'Wednesday',
        thursday: 'Thursday',
        friday: 'Friday',
        saturday: 'Saturday',
        sunday: 'Sunday',
      },
    },

    // Sports
    sports: {
      football: 'Football',
      basketball: 'Basketball',
      tennis: 'Tennis',
      volleyball: 'Volleyball',
      baseball: 'Baseball',
      soccer: 'Soccer',
    },

    // Booking status
    booking: {
      status: {
        pending: 'Pending',
        confirmed: 'Confirmed',
        cancelled: 'Cancelled',
        completed: 'Completed',
        expired: 'Expired',
      },
      actions: {
        book: 'Book',
        cancel: 'Cancel',
        confirm: 'Confirm',
        reschedule: 'Reschedule',
        view: 'View details',
      },
    },

    // Accessibility
    a11y: {
      skipToContent: 'Skip to main content',
      skipToNavigation: 'Skip to navigation',
      accessibilityControls: 'Accessibility controls',
      highContrast: 'High contrast',
      increaseFontSize: 'Increase font size',
      decreaseFontSize: 'Decrease font size',
      keyboardNavigation: 'Keyboard navigation',
      screenReaderAnnouncement: 'Screen reader announcement',
    },

    // Errors
    errors: {
      notFound: 'Page not found',
      unauthorized: 'Unauthorized',
      forbidden: 'Forbidden',
      serverError: 'Server error',
      networkError: 'Network error',
      validationError: 'Validation error',
      unknownError: 'Unknown error',
    },
  },

  pt: {
    // Navegação
    nav: {
      home: 'Início',
      fields: 'Campos',
      bookings: 'Reservas',
      profile: 'Perfil',
      login: 'Entrar',
      register: 'Registrar',
      logout: 'Sair',
      admin: 'Administração',
    },

    // Formulários
    forms: {
      email: 'Email',
      password: 'Senha',
      confirmPassword: 'Confirmar senha',
      firstName: 'Nome',
      lastName: 'Sobrenome',
      phone: 'Telefone',
      address: 'Endereço',
      submit: 'Enviar',
      cancel: 'Cancelar',
      save: 'Salvar',
      delete: 'Excluir',
      edit: 'Editar',
      add: 'Adicionar',
      search: 'Buscar',
      filter: 'Filtrar',
      clear: 'Limpar',
    },

    // Validação
    validation: {
      required: 'Este campo é obrigatório',
      email: 'O email deve ter um formato válido',
      minLength: 'Deve ter pelo menos {min} caracteres',
      maxLength: 'Não pode ter mais de {max} caracteres',
      passwordMatch: 'As senhas devem coincidir',
      invalidFormat: 'Formato inválido',
      invalidPhone: 'Número de telefone inválido',
      invalidUrl: 'URL inválida',
      invalidDate: 'Data inválida',
      invalidTime: 'Hora inválida',
      positiveNumber: 'Deve ser um número positivo',
      minValue: 'O valor mínimo é {min}',
      maxValue: 'O valor máximo é {max}',
    },

    // Mensagens
    messages: {
      success: 'Operação bem-sucedida',
      error: 'Ocorreu um erro',
      loading: 'Carregando...',
      noData: 'Nenhum dado disponível',
      noResults: 'Nenhum resultado encontrado',
      confirmDelete: 'Tem certeza de que deseja excluir este item?',
      confirmAction: 'Tem certeza de que deseja realizar esta ação?',
      changesSaved: 'Alterações salvas com sucesso',
      changesDiscarded: 'Alterações descartadas',
      sessionExpired: 'Sua sessão expirou. Por favor, faça login novamente.',
      networkError: 'Erro de conexão. Verifique sua conexão com a internet.',
      serverError: 'Erro do servidor. Tente novamente mais tarde.',
    },

    // Datas e horas
    dateTime: {
      today: 'Hoje',
      yesterday: 'Ontem',
      tomorrow: 'Amanhã',
      thisWeek: 'Esta semana',
      lastWeek: 'Semana passada',
      nextWeek: 'Próxima semana',
      thisMonth: 'Este mês',
      lastMonth: 'Mês passado',
      nextMonth: 'Próximo mês',
      months: {
        january: 'Janeiro',
        february: 'Fevereiro',
        march: 'Março',
        april: 'Abril',
        may: 'Maio',
        june: 'Junho',
        july: 'Julho',
        august: 'Agosto',
        september: 'Setembro',
        october: 'Outubro',
        november: 'Novembro',
        december: 'Dezembro',
      },
      days: {
        monday: 'Segunda-feira',
        tuesday: 'Terça-feira',
        wednesday: 'Quarta-feira',
        thursday: 'Quinta-feira',
        friday: 'Sexta-feira',
        saturday: 'Sábado',
        sunday: 'Domingo',
      },
    },

    // Esportes
    sports: {
      football: 'Futebol',
      basketball: 'Basquete',
      tennis: 'Tênis',
      volleyball: 'Vôlei',
      baseball: 'Beisebol',
      soccer: 'Futebol',
    },

    // Status de reserva
    booking: {
      status: {
        pending: 'Pendente',
        confirmed: 'Confirmada',
        cancelled: 'Cancelada',
        completed: 'Concluída',
        expired: 'Expirada',
      },
      actions: {
        book: 'Reservar',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        reschedule: 'Reagendar',
        view: 'Ver detalhes',
      },
    },

    // Acessibilidade
    a11y: {
      skipToContent: 'Pular para o conteúdo principal',
      skipToNavigation: 'Pular para a navegação',
      accessibilityControls: 'Controles de acessibilidade',
      highContrast: 'Alto contraste',
      increaseFontSize: 'Aumentar tamanho da fonte',
      decreaseFontSize: 'Diminuir tamanho da fonte',
      keyboardNavigation: 'Navegação por teclado',
      screenReaderAnnouncement: 'Anúncio para leitores de tela',
    },

    // Erros
    errors: {
      notFound: 'Página não encontrada',
      unauthorized: 'Não autorizado',
      forbidden: 'Acesso proibido',
      serverError: 'Erro do servidor',
      networkError: 'Erro de rede',
      validationError: 'Erro de validação',
      unknownError: 'Erro desconhecido',
    },
  },
} as const;

export type TranslationKey = keyof typeof TRANSLATIONS.es;
