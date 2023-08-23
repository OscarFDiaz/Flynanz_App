const deleteGoal = (sendGoalName) => {
  let languaje = localStorage.getItem('storageSwitchLanguage');
  if (languaje == 'false') {
    ons.notification.confirm({
      message: 'Are you sure you delete the goal?',
      title: 'Notice!',
      buttonLabels: ['Yes, delete', 'Cancel'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let goals = JSON.parse(localStorage.getItem('goalStorage'));

          for (let i = 0; i < goals.length; i++) {
            if (goals[i].goalName == sendGoalName) {
              goals.splice(i, 1);
              break;
            }
          }
          localStorage.setItem('goalStorage', JSON.stringify(goals));

          getGoals();
          functionPopPage();

          ons.notification.toast(`The goal ${sendGoalName} has been removed!`, {
            title: 'Notice!',
            timeout: 2000,
            animation: 'ascend',
          });
        } else {
          ons.notification.toast('Okay, everything flows as normal!', {
            title: 'Notice!',
            timeout: 1000,
            animation: 'ascend',
          });
        }
      },
    });
  } else {
    ons.notification.confirm({
      message: 'Estas seguro de borrar la meta?',
      title: 'Aviso!',
      buttonLabels: ['Sí, borrar', 'Cancelar'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let goals = JSON.parse(localStorage.getItem('goalStorage'));

          for (let i = 0; i < goals.length; i++) {
            if (goals[i].goalName == sendGoalName) {
              goals.splice(i, 1);
              break;
            }
          }
          localStorage.setItem('goalStorage', JSON.stringify(goals));

          getGoals();
          functionPopPage();

          ons.notification.toast(`La meta ${sendGoalName} ha sido eliminada!`, {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          });
        } else {
          ons.notification.toast('De acuerdo, todo fluye como normalmente!', {
            title: 'Aviso!',
            timeout: 1000,
            animation: 'ascend',
          });
        }
      },
    });
  }
};

const deleteGoalInsta = (sendGoalName) => {
  let goals = JSON.parse(localStorage.getItem('goalStorage'));

  for (let i = 0; i < goals.length; i++) {
    if (goals[i].goalName == sendGoalName) {
      goals.splice(i, 1);
      break;
    }
  }
  localStorage.setItem('goalStorage', JSON.stringify(goals));
};
