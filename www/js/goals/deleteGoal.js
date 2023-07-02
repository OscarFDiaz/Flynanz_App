function deleteGoal(sendGoalName) {
  ons.notification.confirm({
    message: getLang('goals_delete_confirm'),
    title: getLang('title_notice'),
    buttonLabels: [
      getLang('helpers_delete_labelconfirm'),
      getLang('helpers_delete_labelcancel'),
    ],
    animation: 'default',
    primaryButtonIndex: 1,
    cancelable: true,
    callback: function (index) {
      if (0 === index) {
        let goals = JSON.parse(localStorage.getItem('goalStorage'));

        for (let i = 0; i < goals.length; i++) {
          if (goals[i].goalName == sendGoalNamec) {
            goals.splice(i, 1);
            break;
          }
        }
        saveToStorage('goalStorage', JSON.stringify(goals));

        getGoals();
        functionPopPage();

        ons.notification.toast(`${getLang('goals_delete_feedback')} ${sendGoalName}`, {
          title: getLang('title_notice'),
          timeout: 2000,
          animation: 'ascend',
        });
      } else {
        ons.notification.toast(getLang('helpers_delete_cancel'), {
          title: getLang('title_notice'),
          timeout: 1000,
          animation: 'ascend',
        });
      }
    },
  });
}
