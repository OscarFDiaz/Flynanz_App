function addMoneyGoal(sendGoalName) {
  let goals = JSON.parse(getFromStorage('goalStorage'));

  for (let i = 0; i < goals.length; i++) {
    let gName = goals[i].goalName;

    if (gName == sendGoalName) {
      let findGoalObject = { ...goals[i] };

      if (sessionStorage.getItem('sessionFindGoal') === null) {
        sessionStorage.setItem('sessionFindGoal', JSON.stringify(findGoalObject));
      } else {
        sessionStorage.removeItem('sessionFindGoal');
        sessionStorage.setItem('sessionFindGoal', JSON.stringify(findGoalObject));
      }
      createAlertDialogToEditGoalMoney();
      break;
    }
  }
}
