function makeNewExpense() {
  let expenseName = document.getElementById('newExpenseName').value;
  let totalExpense = 0.0;
  let mainDate = new Date().toJSON().slice(0, 10);
  let iconName = sessionStorage.getItem('expenseIconName');
  let toShow = document.getElementById('switchNewGoal').checked;

  let expenseGradient = sessionStorage.getItem('tempGradient');
  let expenseColor = sessionStorage.getItem('colorExpense');
  let expenseColor1 = sessionStorage.getItem('colorExpense1');

  let iconUrl = sessionStorage.getItem('expenseIconUrl');

  let lang = getLang('expense');

  sessionStorage.removeItem('expenseIconName');

  if (expenseName === '' || expenseName === null) {
    ons.notification.toast(lang.noName, {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (expenseGradient === '' || expenseGradient === null) {
    ons.notification.toast(lang.noColor, {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (iconName === '' || iconName === null) {
    iconName = 'construction.png';
  }

  if (iconUrl === '' || iconUrl === null) {
    iconUrl = './assets/icons/icons_list/fix/';
  }

  let expense = {
    expenseName,
    totalExpense,
    mainDate,
    toShow,
    expenseGradient,
    expenseColor,
    expenseColor1,
    iconName,
    iconUrl,
  };

  /* Guardo el expense original*/
  if (localStorage.getItem('expenseStorage') === null) {
    let expenseArray = [];
    expenseArray.push(expense);
    localStorage.setItem('expenseStorage', JSON.stringify(expenseArray));
  } else {
    let expenseArray = JSON.parse(localStorage.getItem('expenseStorage'));
    expenseArray.push(expense);
    localStorage.setItem('expenseStorage', JSON.stringify(expenseArray));
  }

  ons.notification.toast(`${lang.newExpense} ${expenseName} ${lang.added}`, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

  try {
    functionPopPage();
    getExpenses();
  } catch (error) {
    console.log(error);
    functionPopPage();
  }

  sessionStorage.clear();
}
