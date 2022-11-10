function editGoal(sendGoalName) {
  let goals = JSON.parse(localStorage.getItem('goalStorage'));

  for (let i = 0; i < goals.length; i++) {
    let gName = goals[i].goalName;

    if (gName == sendGoalName) {
      let gDescription = goals[i].goalDescription;
      let gAMoney = goals[i].goalActualMoney;
      let gMoney = goals[i].goalMoney;
      let gDate = goals[i].goalDate;
      let gGradient = goals[i].goalGradient;
      sessionStorage.setItem('tempGradient', gGradient);

      let findGoalObject = {
        name: gName,
        description: gDescription,
        actualMoney: gAMoney,
        goalMoney: gMoney,
        date: gDate,
        gradient: gGradient,
      };

      if (sessionStorage.getItem('sessionFindGoal') === null) {
        sessionStorage.setItem('sessionFindGoal', JSON.stringify(findGoalObject));
      } else {
        sessionStorage.removeItem('sessionFindGoal');
        sessionStorage.setItem('sessionFindGoal', JSON.stringify(findGoalObject));
      }

      const navigator = document.querySelector('#navigator');
      navigator.pushPage('editGoal.html');
      //createAlertDialogToEditGoal();
      break;
    }
  }
}

/*********************************************************/
// ALERT DIALOG PARA EDITAR UNA META COMPLETAMENTE
function createAlertDialogToEditGoal() {
  let retrievedGoal = sessionStorage.getItem('sessionFindGoal');
  let parseGoal = JSON.parse(retrievedGoal);

  //Guardo el nombre por si el usuario lo edita
  localStorage.setItem('nameSaved', parseGoal.name);

  document.getElementById('editGoalName').value = parseGoal.name;
  document.getElementById('editGoalDescription').value = parseGoal.description;
  document.getElementById('editGoalMoney').value = parseGoal.goalMoney;
  document.getElementById('editActualGoalMoney').value = parseGoal.actualMoney;
  document.getElementById('editGoalDate').value = parseGoal.date;

  /*let dialog = document.getElementById('my-alert-dialog');
  
    if (dialog) {
      dialog.show();
    } else {
      ons.notification.toast('No se ha podido cargar la ventana para modificar!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
    }*/
}
