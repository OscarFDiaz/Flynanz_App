function findGoal(sendGoalName) {
  let goals = JSON.parse(getFromStorage('goalStorage'));

  for (let i = 0; i < goals.length; i++) {
    let {
      goalName,
      goalDescription,
      goalMoney,
      goalActualMoney,
      goalDate,
      goalGradient,
      iconName,
      iconUrl,
    } = goals[i];

    if (goalName == sendGoalName) {
      let gDescription = goals[i].goalDescription;
      let gAMoney = goals[i].goalActualMoney;
      let gMoney = goals[i].goalMoney;
      let gDate = goals[i].goalDate;
      let gGradient = goals[i].goalGradient;
      let eicon = goals[i].iconName;
      let eiconUrl = goals[i].iconUrl;

      //   let findGoalObject = {
      //     name: goalName,
      //     description: gDescription,
      //     actualMoney: gAMoney,
      //     goalMoney: gMoney,
      //     date: gDate,
      //     gradient: gGradient,
      //     iconName: eicon,
      //     iconUrl: eiconUrl,
      //   };

      let findGoalObject = { ...goals[i] };

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
