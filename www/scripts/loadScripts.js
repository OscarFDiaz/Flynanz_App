// Cargar todos los scripts necesarios
const scriptsToLoad = [
  'locales/locales.js',
  'scripts/chart/loadChart.js',
  'scripts/chart/makeChart.js',
  'scripts/checkUpdates/checkUpdates.js',
  'scripts/expenses/addExpenseToExpense.js',
  'scripts/expenses/alertExpense.js',
  'scripts/expenses/deleteExpense.js',
  'scripts/expenses/findExpense.js',
  'scripts/expenses/getExpense.js',
  'scripts/expenses/helper.js',
  'scripts/expenses/loadDetail.js',
  'scripts/expenses/loadIcons.js',
  'scripts/expenses/newExpense.js',
  'scripts/expenses/resetExpense.js',
  'scripts/expenses/updateTotalMoney.js',
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
  'scripts/home.js',
  'scripts/money/addMoneyTo.js',
  'scripts/money/alertMoneys.js',
  'scripts/money/deleteMoney.js',
  'scripts/money/getMoneys.js',
  'scripts/money/helpers.js',
  'scripts/money/modifyMoney.js',
  'scripts/money/newMoney.js',
  'scripts/money/saveEditMoney.js',
  'scripts/money/showExpense.js',
  'scripts/push.js',
  'scripts/saving/addToMoneyLeft.js',
  'scripts/saving/alertSaving.js',
  'scripts/saving/checkRadio.js',
  'scripts/saving/closeAlert.js',
  'scripts/saving/endDay.js',
  'scripts/saving/helpers.js',
  'scripts/saving/hideAlertAddExpense.js',
  'scripts/saving/insertAction.js',
  'scripts/saving/loadSaving.js',
  'scripts/saving/makeSaving.js',
  'scripts/saving/resetMoney.js',
  'scripts/saving/updateExpense.js',
  'scripts/saving/updateLast.js',
  'scripts/saving/updateSavingPreview.js',
  'scripts/splitter.js',
  'scripts/startApp.js',
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
