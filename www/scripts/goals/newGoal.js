function makeNewGoal() {
  let goalName = document.getElementById('newGoalName').value;
  let goalDescription = document.getElementById('newGoalDescription').value;
  let goalMoney = document.getElementById('newGoalMoney').value;
  let goalActualMoney = 0.0;
  let goalDate = document.getElementById('newGoalDate').value;
  let goalGradient = sessionStorage.getItem('tempGradient');

  let iconUrl = sessionStorage.getItem('expenseIconUrl');
  let iconName = sessionStorage.getItem('expenseIconName');

  const lang = getLang('goals');

  //Compruebo que no hay campos vacíos, en su defecto los lleno
  if (goalDescription.trim() === '') {
    goalDescription = lang.goalDesc;
  }

  if (goalDate.trim() === '') {
    goalDate = lang.noDate;
  }

  if (goalName.trim() === '') {
    ons.notification.toast(lang.noName, {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (goalMoney.trim() === '') {
    ons.notification.toast(lang.noMoney, {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  } else {
    goalMoney = parseFloat(goalMoney).toFixed(2);
  }

  if (!goalGradient) {
    ons.notification.toast(lang.noColor, {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (!iconName) {
    iconName = 'construction.png';
  }

  if (!iconUrl) {
    iconUrl = './assets/icons/icons_list/fix/';
  }

  let goalTest = Math.sign(goalMoney);
  if (goalTest === -1 || goalTest === NaN) {
    ons.notification.toast(lang.noPositive, {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  let goal = {
    goalName,
    goalDescription,
    goalMoney,
    goalActualMoney,
    goalDate,
    goalGradient,
    iconName,
    iconUrl,
  };

  if (localStorage.getItem('goalStorage') === null) {
    let goalsArray = [];
    goalsArray.push(goal);
    localStorage.setItem('goalStorage', JSON.stringify(goalsArray));
  } else {
    let goalsArray = JSON.parse(localStorage.getItem('goalStorage'));
    goalsArray.push(goal);
    localStorage.setItem('goalStorage', JSON.stringify(goalsArray));
  }

  ons.notification.toast(`${lang.new} ${goalName} ${lang.added}`, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

  sessionStorage.removeItem('tempGradient');

  try {
    functionPopPage();
    getGoals();
  } catch (error) {
    functionPopPage();
  }
}
