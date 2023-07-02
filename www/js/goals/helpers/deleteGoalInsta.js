function deleteGoalInsta(sendGoalName) {
  let goals = JSON.parse(getFromStorage('goalStorage'));

  for (let i = 0; i < goals.length; i++) {
    if (goals[i].goalName == sendGoalName) {
      goals.splice(i, 1);
      break;
    }
  }
  saveToStorage('goalStorage', JSON.stringify(goals));
}
