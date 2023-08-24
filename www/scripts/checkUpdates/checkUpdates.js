const checkUpdates = () => {
  updateGoalsOnUpdate();
  updateMoneyOnUpdate();
  updateExpensesOnUpdate();
};

// Funciones para actualizar la app a la nueva versión
const updateGoalsOnUpdate = () => {
  const goals = JSON.parse(localStorage.getItem('goalStorage'));

  if (goals === null) return;

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
  const moneys = JSON.parse(localStorage.getItem('moneyStorage'));

  if (moneys === null) return;

  for (let i = 0; i < moneys.length; i++) {
    let moneyGradient = moneys[i].moneyGradient;

    if (moneyGradient === null) {
      moneys[i].moneyGradient = '--gradient_0';
      localStorage.setItem('moneyStorage', JSON.stringify(moneys));
    }
  }
}

const updateExpensesOnUpdate = () => {
  const expenses = JSON.parse(localStorage.getItem('expenseStorage'));

  if (expenses === null) return;

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
