// Cargar todos los scripts necesarios
const scriptsToLoad = [
  'scripts/startApp.js',
  'scripts/splitter.js',
  'scripts/push.js',
  'scripts/goals/addMoney.js',
  'scripts/goals/alertGoals.js',
  'scripts/goals/deleteGoal.js',
  'scripts/goals/editGoal.js',
  'scripts/goals/findGoal.js',
  'scripts/goals/getGoals.js',
  'scripts/goals/helpers.js',
  'scripts/goals/loadDetail.js',
  'scripts/goals/loadIcons.js',
  'scripts/goals/newGoal.js',
  'scripts/money.js',
  'scripts/alertMoneys.js',
  'scripts/home.js',
  'scripts/expenses/expense.js',
  'scripts/expenses/alertExpense.js',
  'scripts/saving/saving.js',
  'scripts/checkUpdates/checkUpdates.js',
  'locales/locales.js',
];

// Función para cargar scripts
const loadScripts = () => {
  scriptsToLoad.forEach((script) => {
    const scriptElement = document.createElement('script');
    scriptElement.src = `${script}`;
    document.body.appendChild(scriptElement);
  });
};

// Cargar los scripts cuando la página haya cargado
document.addEventListener('DOMContentLoaded', loadScripts);
