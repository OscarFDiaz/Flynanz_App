const makeNewGoal = () => {
  let goalName = document.getElementById('newGoalName').value;
  let goalDescription = document.getElementById('newGoalDescription').value;
  let goalMoney = document.getElementById('newGoalMoney').value;
  let goalActualMoney = 0.0;
  let goalDate = document.getElementById('newGoalDate').value;
  let goalGradient = sessionStorage.getItem('tempGradient');

  let iconUrl = sessionStorage.getItem('expenseIconUrl');
  let iconName = sessionStorage.getItem('expenseIconName');

  let languaje = localStorage.getItem('storageSwitchLanguage');

  //Compruebo que no hay campos vacios, en su defecto los lleno
  if (languaje == 'false') {
    if (goalDescription === '') {
      goalDescription =
        "There is no description for this amazing goal. You can add one in the 'EDIT GOAL' button";
    }

    if (goalDate === '') {
      goalDate = 'No date goal';
    }

    if (goalName === '') {
      ons.notification.toast('Wait, a goal needs a good name!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    if (goalMoney === '') {
      ons.notification.toast('Wait, how much money does your goal need?!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    } else {
      goalMoney = parseFloat(goalMoney).toFixed(2);
    }

    if (goalGradient == null || goalGradient == '') {
      ons.notification.toast('Wait, you have to select a color for the goal!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    let goalTest = Math.sign(goalMoney);
    if (goalTest == '-1' || goalTest == '-0' || goalTest == '0') {
      ons.notification.toast(
        'Wait, it is not possible to add a negative goal, it would be impossible to achieve.',
        {
          title: 'Error!',
          timeout: 2000,
          animation: 'ascend',
        },
      );
      return;
    }
  } else {
    /* SI EL IDIOMA SELECCIONADO ESTA EN ESPANOL */
    if (goalDescription === '') {
      if (languaje == 'false') {
        goalDescription =
          "There is no description for this amazing goal. You can add one in the 'EDIT GOAL' button";
      } else {
        goalDescription =
          "No existe una descripción para esta asombrosa meta. Puedes añadir una en el botón 'EDITAR META'";
      }
    }

    if (goalDate === '') {
      goalDate = 'Sin datos de fecha';
    }

    if (goalName === '') {
      ons.notification.toast('Un momento, una meta necesita un buen nombre!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    if (goalMoney === '') {
      ons.notification.toast('Un momento, cuanto dinero necesita tu meta?!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    } else {
      goalMoney = parseFloat(goalMoney).toFixed(2);
    }

    if (goalGradient == null || goalGradient == '') {
      ons.notification.toast('Un momento, debes seleccionar un color!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    if (iconName == '' || iconName == null) {
      iconName = 'construction.png';
    }

    if (iconUrl == '' || iconUrl == null) {
      iconUrl = './assets/icons/icons_list/fix/';
    }

    let goalTest = Math.sign(goalMoney);
    if (goalTest == '-1' || goalTest == '-0' || goalTest == '0') {
      ons.notification.toast(
        'Un momento, no es posible añadir una meta en negativo, seria imposible de lograr.',
        {
          title: 'Error!',
          timeout: 2000,
          animation: 'ascend',
        },
      );
      return;
    }
  } /* TERMINA IDIOMA */

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

  if (languaje == 'false') {
    ons.notification.toast(`New goal ${goalName} added!`, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast(`Nueva meta ${goalName} añadida!`, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }

  sessionStorage.removeItem('tempGradient');
  try {
    getGoals();
    functionPopPage();
  } catch (error) {
    functionPopPage();
  }
};
