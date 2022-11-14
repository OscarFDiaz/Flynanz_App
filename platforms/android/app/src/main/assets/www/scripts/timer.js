function startTime() {
  let themeSelected = localStorage.getItem('userTheme');

  if (themeSelected != 'theme-default' && themeSelected != 'theme-dark') {
    localStorage.setItem('userTheme', 'theme-default');
    themeSelected = 'theme-default';
    document.documentElement.className = 'theme-default';
  }

  if (themeSelected == null || themeSelected == '') {
    localStorage.setItem('userTheme', 'theme-default');
    document.documentElement.className = 'theme-default';
  } else {
    document.documentElement.className = themeSelected;
  }

  /**
   * CHECA LA VERSIÓN DE LA APP
   * Si la versión es anterior a esta es necesario hacer comprobaciones para evitar
   * que los datos se dañen por las nuevas configuraciones
   */
  let currentVersion = 1; // Versión actual de la app
  let appVersion = localStorage.getItem('appVersion');

  if (appVersion == null || appVersion == '') {
    // Si entra la aplicación es posterior a la nueva actualización
    localStorage.setItem('appVersion', '1');

    updateGolsOnUpdate();
    updateMoneyOnUpdate();
    updateExpensesOnUpdate();
  } else if (currentVersion > appVersion) {
    localStorage.setItem('appVersion', '1');

    updateGolsOnUpdate();
    updateMoneyOnUpdate();
    updateExpensesOnUpdate();
  } else {
    // Sino entra, la aplicación es posterior a la actualización
    localStorage.setItem('appVersion', `${currentVersion}`); // Actualizo la versión del storage
  }

  setTimeout(function () {
    const navigator = document.querySelector('#navigator');
    navigator.resetToPage('splitterUser.html');
  }, 1000);
}

function updateGolsOnUpdate() {
  let goals = JSON.parse(localStorage.getItem('goalStorage'));

  if (goals == null || goals == 'null' || goals.length == 0 || goals.length < 1) {
    return;
  }

  for (let i = 0; i < goals.length; i++) {
    let gGradient = goals[i].goalGradient;
    let gIconName = goals[i].iconName;

    if (gGradient == null || gGradient == '') {
      goals[i].goalGradient = '--gradient_0';
    }

    if (gIconName == null || gIconName == '') {
      goals[i].iconName = 'format_paint.svg';
      goals[i].iconUrl = '/www/assets/icons/icons_list/art/';
    }
  }

  localStorage.setItem('goalStorage', JSON.stringify(goals));
}

function updateMoneyOnUpdate() {
  let moneys = JSON.parse(localStorage.getItem('moneyStorage'));

  if (moneys == null || moneys == 'null' || moneys.length == 0 || moneys.length < 1) {
    return;
  }

  for (let i = 0; i < moneys.length; i++) {
    let mGradient = moneys[i].moneyGradient;

    if (mGradient == null || mGradient == '') {
      moneys[i].moneyGradient = '--gradient_0';
      localStorage.setItem('moneyStorage', JSON.stringify(moneys));
    }
  }
}

function updateExpensesOnUpdate() {
  let expenses = JSON.parse(localStorage.getItem('expenseStorage'));

  if (expenses == null || expenses == 'null' || expenses.length == 0 || expenses.length < 1) {
    return;
  }

  for (let i = 0; i < expenses.length; i++) {
    //Gradient and color donut
    expenses[i].expenseGradient = '--gradient_0';
    expenses[i].expenseColor = '#bfdff8';
    expenses[i].expenseColor1 = '#f4dcf5';

    //Icon
    expenses[i].iconName = 'construction.svg';
    expenses[i].iconUrl = '/www/assets/icons/icons_list/fix/';

    localStorage.setItem('expenseStorage', JSON.stringify(expenses));
  }
}
