const lang = {
  // Carpeta - archivoJs - identificativo
  es: {
    home_chart_noexpenses: 'NO HAY GASTOS PARA MOSTRAR',
    home_chart_noexpenses_active: 'NO HAY GASTOS ACTIVADOS',
    home_theme_current: 'TEMA ACTUAL',
    home_theme_changed: 'Se cambio el tema correctamente, tienes buenos gustos!',
    home_load_balance: 'Dinero total',
    home_load_wallet: 'Mi dinero',
    home_load_expense: 'Gastos',
    home_load_saved: 'Dinero ahorrado',
    home_load_goals: 'Metas',
    home_load_nothing: 'Nada por aquí...',
    userpage_userhome_title: 'Inicio',
    userpage_userhome_leave: '¿Quieres salir de la aplicación?',
    userpage_userhome_confirm: 'Salir',
    userpage_userhome_cancel: 'Quedarme',

    userpage_splitter_home: 'Inicio',
    userpage_splitter_goals: 'Metas',
    userpage_splitter_saved: 'Fondo',
    userpage_splitter_expenses: 'Gastos',
    userpage_splitter_mymoney: 'Mi dinero',
    userpage_splitter_settings: 'Configuración',

    helpers_delete_message: '¿Estas seguro de borrar TODO?',
    helpers_delete_labelconfirm: 'Sí, borrar',
    helpers_delete_labelcancel: 'Cancelar',
    helpers_delete_cancel: 'De acuerdo, todo fluye como normalmente!',

    title_notice: 'Aviso!',
  },
  en: {
    home_chart_noexpenses: 'NO EXPENSES TO SHOW',
    home_chart_noexpenses_active: 'NO EXPENSES ACTIVATED',
    home_theme_current: 'CURRENT THEME',
    home_theme_changed: 'The theme was changed correctly, you have good tastes!',
    home_load_balance: 'Total balance',
    home_load_wallet: 'Wallets',
    home_load_expense: 'Expenses',
    home_load_saved: 'Saved money',
    home_load_goals: 'Goals',
    home_load_nothing: 'Nothing here...',
    userpage_userhome_title: 'Home',
    userpage_userhome_leave: 'Do you want to exit the application?',
    userpage_userhome_confirm: 'Exit',
    userpage_userhome_cancel: 'Cancel',

    userpage_splitter_home: 'Home',
    userpage_splitter_goals: 'Goals',
    userpage_splitter_saved: 'Saved',
    userpage_splitter_expenses: 'Expenses',
    userpage_splitter_mymoney: 'My money',
    userpage_splitter_settings: 'Configuration',

    helpers_delete_message: 'Are you sure to delete EVERYTHING?',
    helpers_delete_labelconfirm: 'Yes, delete',
    helpers_delete_labelcancel: 'Cancel',
    helpers_delete_cancel: 'Okay, everything flows as normal!',

    title_notice: 'Notice!',
  },
};

function getLang(key) {
  let language = localStorage.getItem('storageSwitchLanguage') || 'true';
  return lang[language === 'true' ? 'es' : 'en'][key];
}
