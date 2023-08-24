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
}

/* CUANDO SE FINALIZA DE MODIFICAR UNA META*/
function hideAlertDialog() {
  let name = document.getElementById('editGoalName').value;
  let description = document.getElementById('editGoalDescription').value;
  let actualMoney = parseFloat(
    document.getElementById('editActualGoalMoney').value,
  ).toFixed(2);
  let goalMoney = parseFloat(document.getElementById('editGoalMoney').value).toFixed(2);
  let goalDate = document.getElementById('editGoalDate').value;

  let goalGradient = sessionStorage.getItem('tempGradient');
  //Nombre de expense para reciclar memoria
  let iconUrl = sessionStorage.getItem('expenseIconUrl');
  let iconName = sessionStorage.getItem('expenseIconName');

  let goals = JSON.parse(localStorage.getItem('goalStorage'));

  let indexGoal;

  let sName = localStorage.getItem('nameSaved');
  let testMoney = Math.sign(goalMoney);
  let testGMoney = Math.sign(actualMoney);

  const lang = getLang('goals');

  if (name === '') {
    ons.notification.toast(lang.noName, {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (goalMoney == '' || goalMoney == null || goalMoney == 'NaN') {
    ons.notification.toast(lang.noMoney, {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (testMoney === -1 || testMoney === -0 || testMoney === 0) {
    ons.notification.toast(lang.noPositive, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (testGMoney === -1 || testGMoney === -0) {
    ons.notification.toast(lang.noPositive, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (goalDate === '') {
    goalDate = lang.noDate;
  }

  if (actualMoney == '' || actualMoney == 'NaN') {
    actualMoney = '0.00';
  }

  if (goalGradient == null || goalGradient == '') {
    goalGradient = '--gradient_1';
  }

  if (iconName == '' || iconName == null) {
    iconName = 'format_paint.png';
  }

  if (iconUrl == '' || iconUrl == null) {
    iconUrl = './assets/icons/icons_list/art/';
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
        goalGradient: goalGradient,
        iconName: iconName,
        iconUrl: iconUrl,
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

  ons.notification.toast(`${lang.goal} ${name} ${lang.goalModified}`, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

  functionPopPage(2);
  getGoals();
}

/* SE INTENTA MODIFICAR UNA META PERO SE CANCELA */
function hideAlertNoChange() {
  functionPopPage(2);
  let lang = getLang('goals');
  ons.notification.toast(lang.goalNotModified, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

  localStorage.removeItem('nameSaved');
  sessionStorage.clear();
}

/*********************************************************/
// ALERT DIALOG PARA EDITAR UNICAMENTE EL DINERO DE LA META

function makeSum() {
  let actualAmount = document.getElementById('editOnlyMoneyActualMoney').textContent;
  let newAmount = document.getElementById('editOnlyGoalMoney').value;

  let sumResult = parseFloat(
    parseFloat(actualAmount) + Math.abs(parseFloat(newAmount)),
  ).toFixed(2);

  document.getElementById('editOnlyEndMoney').innerHTML = formatMoney(sumResult);
  sessionStorage.setItem('addNewMoney', sumResult);
}

function makeRes() {
  let actualAmount = document.getElementById('editOnlyMoneyActualMoney').textContent;
  let newAmount = document.getElementById('editOnlyGoalMoney').value;

  let sumResult = parseFloat(
    parseFloat(actualAmount) - Math.abs(parseFloat(newAmount)),
  ).toFixed(2);

  document.getElementById('editOnlyEndMoney').innerHTML = formatMoney(sumResult);
  sessionStorage.setItem('addNewMoney', sumResult);
}

function createAlertDialogToEditGoalMoney() {
  let retrievedGoal = sessionStorage.getItem('sessionFindGoal');
  let parseGoal = JSON.parse(retrievedGoal);
  let optionsContainer = document.getElementById('alertEditGoalMoneyOptionsAlert');
  const lang = getLang('goals');

  //Guardo el nombre por si el usuario lo edita
  localStorage.setItem('nameSaved', parseGoal.name);
  document.getElementById('editOnlyMoneyActualMoney').innerHTML = parseGoal.actualMoney;

  var dialog = document.getElementById('alertEditGoalMoney');

  if (dialog) {
    document.getElementById('editOnlyEndMoney').innerHTML = '';

    optionsContainer.innerHTML = `<ons-button
    class="moneyButtonAdd"
    onclick="insertActionEditGoal('add')"
    style="margin-bottom: 16px; margin-top: 16px; margin-left: 0px; width: 90%"
    id="newMoneyCancelButton"
    >
    ${lang.addMoney}
      <i class="icon ion-md-add" style="font-size: 14px; margin-right: 16px"></i>
    </ons-button>

    <ons-button
      class="moneyButtonAdd"
      onclick="insertActionEditGoal('remove')"
      style="margin-bottom: 16px; margin-left: 0px; width: 90%"
      id="newMoneyCancelButton"
    >
      <i class="icon ion-md-remove" style="font-size: 14px; margin-right: 16px"></i>
      ${lang.resMoney}
    </ons-button>`;

    dialog.show();
  } else {
    ons.notification.toast('Ups, contact an admin', {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
}

function hideAlertDialogMoney() {
  let lang = getLang('goals');

  if (document.getElementById('editOnlyGoalMoney') === null) {
    ons.notification.toast('Selecciona que deseas hacer, por favor!', {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  let element = document.getElementById('editOnlyGoalMoney').value;

  let newMoney = sessionStorage.getItem('addNewMoney');
  let testMoney = Math.sign(newMoney);
  if (element === null || element === '' || element == '') {
    ons.notification.toast(lang.noMoneyAdded, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }
  if (testMoney == '-1' || testMoney === '-0') {
    ons.notification.toast(lang.noPositive, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
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
        goalGradient: goals[i].goalGradient,
        iconName: goals[i].iconName,
        iconUrl: goals[i].iconUrl,
      };

      // Modifico los elementos para actualizar el dinero y % mostrado
      let calculatedPercent = getPercent(updateGoalObject.goalMoney, newMoney);
      document.getElementById(sName + '-pnumber').innerHTML = '';
      document.getElementById(sName + '-pnumber').innerHTML = calculatedPercent + '%';

      document
        .getElementById('pbarDetail')
        .style.setProperty('--width', calculatedPercent);

      // Modifico los elementos para mostrar la cantidad de dinero actualizada
      document.getElementById('detailMoneyActualMoney').innerHTML = '';
      document.getElementById('detailMoneyActualMoney').innerHTML = formatMoney(newMoney);

      document.getElementById('detailMoneyGoalGoalMoney').innerHTML = '';
      document.getElementById('detailMoneyGoalGoalMoney').innerHTML = formatMoney(
        updateGoalObject.goalMoney,
      );

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
      if (testElement === -1) {
        ons.notification.toast(
          `${lang.goal} ${sName} ${lang.goalModified}, ${lang.goalLessMoney}`,
          {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          },
        );
      } else if (newMoney < updateGoalObject.goalMoney) {
        ons.notification.toast(
          `${lang.goal} ${sName} ${lang.goalModified}, ${lang.goalMoreMoney}`,
          {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          },
        );
      } else if (newMoney === updateGoalObject.goalMoney) {
        ons.notification.toast(
          `${lang.goal}  ${sName} ${lang.goalModified}, ${lang.goalFinished}`,
          {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          },
        );
      } else {
        ons.notification.toast(`${lang.goal} ${sName} ${lang.goalModified}`, {
          title: 'Aviso!',
          timeout: 2000,
          animation: 'ascend',
        });
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
  let lang = getLang('goals');

  ons.notification.toast(lang.goalNotModified, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });
  sessionStorage.clear();
  document.getElementById('alertEditGoalMoney').hide();
}

function insertActionEditGoal(option) {
  let optionsContainer = document.getElementById('alertEditGoalMoneyOptionsAlert');
  let lang = getLang('goals');

  if (option === 'add') {
    optionsContainer.innerHTML = `<p style="margin: 0px auto -16px 0px; text-align: center; padding-top: 16px; color: var(--alert-custom-label);">
      ${lang.addMoney}
    </p>
    <ons-input
      onchange="makeSum()"
      onkeypress="this.onchange()"
      oninput="this.onchange()"
      id="editOnlyGoalMoney"
      modifier="underbar"
      placeholder=""
      type="number"
      style="display: block; margin: -10px auto 16px"
    ></ons-input>`;
  } else if (option === 'remove') {
    optionsContainer.innerHTML = `<p style="margin: 0px auto -16px 0px; text-align: center; padding-top: 16px; color: var(--alert-custom-label);">
      ${lang.resMoney}
    </p>
    <ons-input
      onchange="makeRes()"
      onkeypress="this.onchange()"
      oninput="this.onchange()"
      id="editOnlyGoalMoney"
      modifier="underbar"
      placeholder=""
      type="number"
      style="display: block; margin: -10px auto 16px"
    ></ons-input>`;
  }
}
