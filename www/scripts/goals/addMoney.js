const addMoneyGoal = (sendGoalName) => {
  let goals = JSON.parse(localStorage.getItem('goalStorage'));

  for (let i = 0; i < goals.length; i++) {
    let gName = goals[i].goalName;

    if (gName == sendGoalName) {
      let gDescription = goals[i].goalDescription;
      let gAMoney = goals[i].goalActualMoney;
      let gMoney = goals[i].goalMoney;
      let gDate = goals[i].goalDate;
      let gGradient = goals[i].goalGradient;

      let eicon = goals[i].iconName;
      let eiconUrl = goals[i].iconUrl;

      let findGoalObject = {
        name: gName,
        description: gDescription,
        actualMoney: gAMoney,
        goalMoney: gMoney,
        date: gDate,
        gradient: gGradient,
        iconName: eicon,
        iconUrl: eiconUrl,
      };

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
};
