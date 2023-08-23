const checkUpdates = () => {
  console.log('Checkupdates');
  updateGolsOnUpdate();
  updateMoneyOnUpdate();
  updateExpensesOnUpdate();
};

// Funciones para actualizar la app a la nueva versión
const updateGolsOnUpdate = () => {
  let goals = JSON.parse(localStorage.getItem('goalStorage'));

  if (goals == null || goals == 'null' || goals.length == 0 || goals.length < 1) {
    return;
  }

  for (let i = 0; i < goals.length; i++) {
    goals[i].goalGradient = '--gradient_0';

    goals[i].iconName = 'format_paint.png';
    goals[i].iconUrl = './assets/icons/icons_list/art/';

    goals[i].iconName = 'format_paint.png';
    goals[i].iconUrl = './assets/icons/icons_list/art/';
  }

  localStorage.setItem('goalStorage', JSON.stringify(goals));
};

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

const updateExpensesOnUpdate = () => {
  let expenses = JSON.parse(localStorage.getItem('expenseStorage'));

  if (
    expenses == null ||
    expenses == 'null' ||
    expenses.length == 0 ||
    expenses.length < 1
  ) {
    return;
  }

  for (let i = 0; i < expenses.length; i++) {
    //Gradient and color donut
    expenses[i].expenseGradient = '--gradient_0';
    expenses[i].expenseColor = '#bfdff8';
    expenses[i].expenseColor1 = '#f4dcf5';

    //Icon
    expenses[i].iconName = 'construction.png';
    expenses[i].iconUrl = './assets/icons/icons_list/fix/';

    localStorage.setItem('expenseStorage', JSON.stringify(expenses));
  }
};
