function makeNewGoal() {
  let goalName = document.getElementById('newGoalName').value;
  let goalDescription = document.getElementById('newGoalDescription').value;
  let goalMoney = document.getElementById('newGoalMoney').value;
  let goalActualMoney = 0.0;
  let goalDate = document.getElementById('newGoalDate').value;
  let goalGradient = sessionStorage.getItem('tempGradient');

  let iconUrl =
    sessionStorage.getItem('expenseIconUrl') || './assets/icons/icons_list/fix/';
  let iconName = sessionStorage.getItem('expenseIconName') || 'construction.png';

  //Compruebo que no hay campos vacios, en su defecto los lleno
  if (goalDescription === '') {
    goalDescription = getLang('goals_makenew_gdesc');
  }

  if (goalDate === '') {
    goalDate = getLang('goals_makenew_gdate');
  }

  if (goalName === '') {
    ons.notification.toast(getLang('goals_makenew_gname'), {
      title: getLang('title_error'),
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (goalMoney === '') {
    ons.notification.toast(getLang('goals_makenew_gmoney'), {
      title: getLang('title_error'),
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  } else {
    goalMoney = parseFloat(goalMoney).toFixed(2);
  }

  if (!goalGradient) {
    ons.notification.toast(getLang('goals_makenew_ggradient'), {
      title: getLang('title_error'),
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  let goalTest = Math.sign(goalMoney);
  if (goalTest == '-1' || goalTest == '-0' || goalTest == '0') {
    ons.notification.toast(getLang('goals_makenew_gmoneytest'), {
      title: getLang('title_error'),
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

  if (getFromStorage('goalStorage') === null) {
    let goalsArray = [];
    goalsArray.push(goal);
    saveToStorage('goalStorage', JSON.stringify(goalsArray));
  } else {
    let goalsArray = JSON.parse(getFromStorage('goalStorage'));
    goalsArray.push(goal);
    saveToStorage('goalStorage', JSON.stringify(goalsArray));
  }

  ons.notification.toast(`${getLang('goals_makenew_success')} ${goalName}`, {
    title: getLang('title_notice'),
    timeout: 2000,
    animation: 'ascend',
  });

  sessionStorage.removeItem('tempGradient');

  try {
    getGoals();
    functionPopPage();
  } catch (error) {
    functionPopPage();
  }
}
