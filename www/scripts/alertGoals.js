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

  let dialog = document.getElementById('my-alert-dialog');

  if (dialog) {
    dialog.show();
  } else {
    ons.notification.toast('No se ha podido cargar la ventana para modificar!', {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
}

/* CUANDO SE FINALIZA DE MODIFICAR UNA META*/
function hideAlertDialog() {
  let name = document.getElementById('editGoalName').value;
  let description = document.getElementById('editGoalDescription').value;
  let actualMoney = parseFloat(document.getElementById('editActualGoalMoney').value).toFixed(2);
  let goalMoney = parseFloat(document.getElementById('editGoalMoney').value).toFixed(2);
  let goalDate = document.getElementById('editGoalDate').value;

  let goals = JSON.parse(localStorage.getItem('goalStorage'));

  let languaje = localStorage.getItem('storageSwitchLanguage');

  let indexGoal;

  let sName = localStorage.getItem('nameSaved');
  let testMoney = Math.sign(goalMoney);
  let testGMoney = Math.sign(actualMoney);

  if (languaje == 'false') {
    if (name === '') {
      ons.notification.toast('Wait, a goal needs a good name!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    if (goalMoney == '' || goalMoney == null || goalMoney == 'NaN') {
      ons.notification.toast('Wait, how much money does your goal need ?!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    if (testMoney == '-1' || testMoney === '-0' || testMoney == '0') {
      ons.notification.toast('It is not possible to leave a goal in negative numbers, sorry.', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    if (testGMoney == '-1' || testGMoney === '-0') {
      ons.notification.toast('It is not possible to leave a goal in negative numbers, sorry.', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    if (goalDate === '') {
      goalDate = 'NO DATE DATA';
    }
  } else {
    if (name === '') {
      ons.notification.toast('Wait, a goal needs a good name!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    if (goalMoney == '' || goalMoney == null || goalMoney == 'NaN') {
      ons.notification.toast('Un momento, cuanto dinero necesita tu meta?!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    if (testMoney == '-1' || testMoney === '-0' || testMoney == '0') {
      ons.notification.toast('No es posible dejar una meta en numeros negativos, lo siento.', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    if (testGMoney == '-1' || testGMoney === '-0') {
      ons.notification.toast('No es posible dejar una meta en numeros negativos, lo siento.', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    if (goalDate === '') {
      goalDate = 'SIN DATOS DE FECHA';
    }
  }

  if (actualMoney == '' || actualMoney == 'NaN') {
    actualMoney = '0.00';
  }

  for (let i = 0; i < goals.length; i++) {
    if (goals[i].goalName == sName) {
      indexGoal = i; //Pongo la posición donde esta mi objeto que modificare

      let updateGoalObject = {
        goalName: name,
        goalDescription: description,
        goalActualMoney: actualMoney,
        goalMoney: goalMoney,
        goalDate: goalDate,
      };

      if (localStorage.getItem('goalStorage') === null) {
        let goalsArray = [];
        goalsArray.push(updateGoalObject);
        localStorage.setItem('goalStorage', JSON.stringify(goalsArray));
      } else {
        goals[indexGoal] = updateGoalObject;
        localStorage.setItem('goalStorage', JSON.stringify(goals));
      }
      localStorage.removeItem('nameSaved');
      sessionStorage.clear();
      break;
    }
  }

  document.getElementById('my-alert-dialog').hide();

  if (languaje == 'false') {
    ons.notification.toast(`Goal ${name} sucecessfully modified!`, {
      title: 'Notice!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast(`Meta ${name} modificada exitosamente!`, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }

  functionPopPage();
  getGoals();
}

/* SE INTENTA MODIFICAR UNA META PERO SE CANCELA */
function hideAlertNoChange() {
  document.getElementById('my-alert-dialog').hide();
  let languaje = localStorage.getItem('storageSwitchLanguage');
  if (languaje == 'false') {
    ons.notification.toast('Goal has not been changed!', {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast('No se ha modificado la meta!', {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }

  localStorage.removeItem('nameSaved');
  sessionStorage.clear();
}

/*********************************************************/
// ALERT DIALOG PARA EDITAR UNICAMENTE EL DINERO DE LA META

function makeSum() {
  let actualAmount = document.getElementById('editOnlyMoneyActualMoney').textContent;
  let newAmount = document.getElementById('editOnlyGoalMoney').value;

  let sumResult = parseFloat(parseFloat(actualAmount) + parseFloat(newAmount)).toFixed(2);

  document.getElementById('editOnlyEndMoney').innerHTML = sumResult;
  sessionStorage.setItem('addNewMoney', sumResult);
}

function createAlertDialogToEditGoalMoney() {
  let retrievedGoal = sessionStorage.getItem('sessionFindGoal');
  let parseGoal = JSON.parse(retrievedGoal);

  //Guardo el nombre por si el usuario lo edita
  localStorage.setItem('nameSaved', parseGoal.name);
  document.getElementById('editOnlyMoneyActualMoney').innerHTML = parseGoal.actualMoney;

  var dialog = document.getElementById('alertEditGoalMoney');

  if (dialog) {
    document.getElementById('editOnlyGoalMoney').value = '';
    document.getElementById('editOnlyEndMoney').innerHTML = '';
    dialog.show();
  } else {
    ons.notification.toast('Ups! No se ha podido cargar la ventana para modificar!', {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
}

function hideAlertDialogMoney() {
  let element = document.getElementById('editOnlyGoalMoney').value;
  let languaje = localStorage.getItem('storageSwitchLanguage');

  let newMoney = sessionStorage.getItem('addNewMoney');
  let testMoney = Math.sign(newMoney);
  if (languaje == 'false') {
    if (element === null || element === '' || element == '') {
      ons.notification.toast('Enter how much money you want to add, please!', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }
    if (testMoney == '-1' || testMoney === '-0') {
      ons.notification.toast('It is not possible to leave a goal in negative numbers, sorry.', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }
  } else {
    if (element === null || element === '' || element == '') {
      ons.notification.toast('Ingresa cuanto dinero deseas añadir, por favor!', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }
    if (testMoney == '-1' || testMoney === '-0') {
      ons.notification.toast('No es posible dejar una meta en numeros negativos, lo siento.', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }
  }

  let goals = JSON.parse(localStorage.getItem('goalStorage'));

  let indexGoal, updateGoalObject;

  let sName = localStorage.getItem('nameSaved');

  for (let i = 0; i < goals.length; i++) {
    if (goals[i].goalName == sName) {
      indexGoal = i; //Pongo la posición donde esta mi objeto que modificare

      updateGoalObject = {
        goalName: sName,
        goalDescription: goals[i].goalDescription,
        goalActualMoney: newMoney,
        goalMoney: goals[i].goalMoney,
        goalDate: goals[i].goalDate,
      };

      // Modifico los elementos para actualizar el dinero y % mostrado
      let calculatedPercent = getPercent(updateGoalObject.goalMoney, newMoney);
      document.getElementById(sName + '-pnumber').innerHTML = '';
      document.getElementById(sName + '-pnumber').innerHTML = calculatedPercent + '%';

      document.getElementById('pbarDetail').style.setProperty('--width', calculatedPercent);

      // Modifico los elementos para mostrar la cantidad de dinero actualizada
      document.getElementById('detailMoneyActualMoney').innerHTML = '';
      document.getElementById('detailMoneyActualMoney').innerHTML = newMoney;

      document.getElementById('detailMoneyGoalGoalMoney').innerHTML = '';
      document.getElementById('detailMoneyGoalGoalMoney').innerHTML = updateGoalObject.goalMoney;

      if (localStorage.getItem('goalStorage') === null) {
        let goalsArray = [];
        goalsArray.push(updateGoalObject);
        localStorage.setItem('goalStorage', JSON.stringify(goalsArray));
      } else {
        goals[indexGoal] = updateGoalObject;
        localStorage.setItem('goalStorage', JSON.stringify(goals));
      }

      // Checo como voy de dinero conforme a lo requerido en la meta.
      let testElement = Math.sign(element);
      if (languaje == 'false') {
        if (testElement == '-1') {
          ons.notification.toast(`Goal ${sName} successfully modified! We went back a bit, but that's okay!`, {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          });
        } else if (newMoney < updateGoalObject.goalMoney) {
          ons.notification.toast(`Goal ${sName} successfully modified! We are approaching the goal!`, {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          });
        } else if (newMoney === updateGoalObject.goalMoney) {
          ons.notification.toast(`Goal ${sName} successfully modified! We have reached the goal!`, {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          });
        } else {
          ons.notification.toast(`Goal ${sName} modified successfully!`, {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          });
        }
      } else {
        if (testElement == '-1') {
          ons.notification.toast(`Meta ${sName} modificada exitosamente!, retrocedimos un poco, pero esta bien!`, {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          });
        } else if (newMoney < updateGoalObject.goalMoney) {
          ons.notification.toast(`Meta ${sName} modificada exitosamente!, nos acercamos a la meta!`, {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          });
        } else if (newMoney === updateGoalObject.goalMoney) {
          ons.notification.toast(`Meta ${sName} modificada exitosamente!, hemos llegado a la meta!`, {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          });
        } else {
          ons.notification.toast(`Meta ${sName} modificada exitosamente!`, {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          });
        }
      }
      localStorage.removeItem('nameSaved');
      break;
    }
  }

  document.getElementById('editOnlyGoalMoney').value = null;
  document.getElementById('alertEditGoalMoney').hide();

  sessionStorage.clear();
  getGoals();
}

function hideAlertNoChangeMoney() {
  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (languaje == 'false') {
    ons.notification.toast('The goal has not been modified!', {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast('No se ha modificado la meta!', {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
  sessionStorage.clear();
  document.getElementById('alertEditGoalMoney').hide();
}
