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

    title_notice: 'Notice!',
  },
};

function getLang(key) {
  let language = localStorage.getItem('storageSwitchLanguage') || true;
  return lang[language === 'true' ? 'es' : 'en'][key];
}
