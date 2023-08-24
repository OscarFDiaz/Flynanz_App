function findGoal(sendGoalName) {
  let goals = JSON.parse(localStorage.getItem('goalStorage'));

  for (let i = 0; i < goals.length; i++) {
    let { goalName } = goals[i];

    if (goalName == sendGoalName) {
      let {
        goalName,
        goalDescription,
        goalActualMoney,
        goalMoney,
        goalDate,
        goalGradient,
        iconName,
        iconUrl,
      } = goals[i];

      let findGoalObject = {
        goalName,
        goalDescription,
        goalActualMoney,
        goalMoney,
        goalDate,
        goalGradient,
        iconName,
        iconUrl,
      };

      if (sessionStorage.getItem('sessionFindGoal') === null) {
        sessionStorage.setItem('sessionFindGoal', JSON.stringify(findGoalObject));
      } else {
        sessionStorage.removeItem('sessionFindGoal');
        sessionStorage.setItem('sessionFindGoal', JSON.stringify(findGoalObject));
      }

      const navigator = document.querySelector('#navigator');
      navigator.pushPage('pages/goalPage/detailGoal.html');
      break;
    }
  }
}
