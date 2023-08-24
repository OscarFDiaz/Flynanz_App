function deleteGoal(sendGoalName) {
  const lang = getLang('goals');

  ons.notification.confirm({
    message: lang.confirmDelete,
    title: lang.notice,
    buttonLabels: [lang.deleteOption, lang.cancel],
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

        try {
          functionPopPage();
          getGoals();
        } catch (error) {
          functionPopPage();
        }

        ons.notification.toast(
          `${lang.goalDeleted} ${sendGoalName} ${lang.goalDeleted1}`,
          {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          },
        );
      } else {
        ons.notification.toast(lang.cancelDelete, {
          title: 'Aviso!',
          timeout: 1000,
          animation: 'ascend',
        });
      }
    },
  });
}

function deleteGoalInsta(sendGoalName) {
  let goals = JSON.parse(localStorage.getItem('goalStorage'));

  for (let i = 0; i < goals.length; i++) {
    if (goals[i].goalName == sendGoalName) {
      goals.splice(i, 1);
      break;
    }
  }
  localStorage.setItem('goalStorage', JSON.stringify(goals));
}
