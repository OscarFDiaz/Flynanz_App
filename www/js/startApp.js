function startApp() {
  //Cargo los scripts
  loadOnStartScripts();

  // Cargo los css
  // loadOnStartCSS();

  // Busco el tema del usuario o defino uno, entre el claro y el oscuro
  let themeSelected = getFromStorage('userTheme');
  const docElement = document.documentElement;

  if (themeSelected !== 'theme-default' && themeSelected !== 'theme-dark') {
    saveToStorage('userTheme', 'theme-default');
    themeSelected = 'theme-default';
    docElement.className = 'theme-default';
  }

  if (!themeSelected) {
    saveToStorage('userTheme', 'theme-default');
    docElement.className = 'theme-default';
  } else {
    docElement.className = themeSelected;
  }

  /**
   * CHECA LA VERSIÓN DE LA APP
   * Si la versión es anterior a esta es necesario hacer comprobaciones para evitar
   * que los datos se dañen por las nuevas configuraciones
   */
  let currentVersion = 3; // Versión actual de la app
  let appVersion = getFromStorage('appVersion');

  if (!appVersion) {
    // Si entra la aplicación es posterior a la nueva actualización
    saveToStorage('appVersion', '3');

    updateGolsOnUpdate();
    updateMoneyOnUpdate();
    updateExpensesOnUpdate();
  } else if (currentVersion > appVersion) {
    saveToStorage('appVersion', '3');

    updateGolsOnUpdate();
    updateMoneyOnUpdate();
    updateExpensesOnUpdate();
  } else {
    // Sino entra, la aplicación es posterior a la actualización
    saveToStorage('appVersion', currentVersion); // Actualizo la versión del storage
  }

  setTimeout(function () {
    const navigator = document.querySelector('#navigator');
    navigator.resetToPage('./pages/userPage/splitterUser.html');
  }, 500);
}

// Funciones para actualizar la app a la nueva versión
function updateGolsOnUpdate() {
  let goals = JSON.parse(localStorage.getItem('goalStorage'));

  if (!goals || goals.length < 1) return;

  for (let i = 0; i < goals.length; i++) {
    // Valores default cuando se actualice de una versión vieja
    goals[i].goalGradient = '--gradient_0';

    goals[i].iconName = 'format_paint.png';
    goals[i].iconUrl = './assets/icons/icons_list/art/';

    goals[i].iconName = 'format_paint.png';
    goals[i].iconUrl = './assets/icons/icons_list/art/';
  }

  saveToStorage('goalStorage', JSON.stringify(goals));
}

function updateMoneyOnUpdate() {
  let moneys = JSON.parse(getFromStorage('moneyStorage'));

  if (!moneys || moneys.length < 1) return;

  let mGradient;

  for (let i = 0; i < moneys.length; i++) {
    mGradient = moneys[i].moneyGradient;

    if (!mGradient) {
      moneys[i].moneyGradient = '--gradient_0';
      saveToStorage('moneyStorage', JSON.stringify(moneys));
    }
  }
}

function updateExpensesOnUpdate() {
  let expenses = JSON.parse(getFromStorage('expenseStorage'));

  if (!expenses || expenses.length < 1) return;

  for (let i = 0; i < expenses.length; i++) {
    //Gradient and color donut
    expenses[i].expenseGradient = '--gradient_0';
    expenses[i].expenseColor = '#bfdff8';
    expenses[i].expenseColor1 = '#f4dcf5';

    //Icon
    expenses[i].iconName = 'construction.png';
    expenses[i].iconUrl = './assets/icons/icons_list/fix/';

    saveToStorage('expenseStorage', JSON.stringify(expenses));
  }
}

function loadScripts(src) {
  const script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.body.append(script);
}

function loadOnStartScripts() {
  loadScripts('./js/alerts/alertExpense.js');
  loadScripts('./js/alerts/alertGoals.js');
  loadScripts('./js/alerts/alertMoneys.js');

  loadScripts('./js/expense/expense.js');

  // <!-- GOALS -->
  loadScripts('./js/goals/deleteGoal.js');
  loadScripts('./js/goals/editGoal.js');
  loadScripts('./js/goals/getGoals.js');
  loadScripts('./js/goals/loadDetailGoal.js');
  loadScripts('./js/goals/loadIconsGoal.js');
  loadScripts('./js/goals/makeNewGoal.js');
  loadScripts('./js/goals/helpers/addMoneyGoal.js');
  loadScripts('./js/goals/helpers/deleteGoalInsta.js');
  loadScripts('./js/goals/helpers/findGoal.js');
  loadScripts('./js/goals/helpers/gradientButtonClick.js');
  loadScripts('./js/goals/helpers/selectIconGoal.js');

  // <!-- HOME -->
  loadScripts('./js/home/chartStart.js');
  loadScripts('./js/home/checkOptions.js');
  loadScripts('./js/home/loadOptions.js');
  loadScripts('./js/home/themeSelect.js');
  loadScripts('./js/home/helpers/getTotalMoney.js');
  loadScripts('./js/home/helpers/getTotalSavings.js');
  loadScripts('./js/home/helpers/getTotalGoals.js');

  loadScripts('./js/menu/splitter.js');
  loadScripts('./js/money/money.js');
  loadScripts('./js/navigator/push.js');
  loadScripts('./js/saving/saving.js');

  // <!-- GENERAL HELPERS -->
  loadScripts('./js/helpers/manageStorage.js');
  loadScripts('./js/helpers/getPercent.js');
  loadScripts('./js/helpers/deleteAllData.js');

  // <!-- LANG -->
  loadScripts('./languages/getLang.js');
}
