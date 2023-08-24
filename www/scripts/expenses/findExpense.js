function findExpense(sendName) {
  let expenses = JSON.parse(localStorage.getItem('expenseStorage'));

  for (let i = 0; i < expenses.length; i++) {
    let eName = expenses[i].expenseName;

    if (eName == sendName) {
      let findExpenseObject = expenses[i];

      if (sessionStorage.getItem('sessionFindGoal') === null) {
        sessionStorage.setItem('sessionFindGoal', JSON.stringify(findExpenseObject));
      } else {
        sessionStorage.removeItem('sessionFindGoal');
        sessionStorage.setItem('sessionFindGoal', JSON.stringify(findExpenseObject));
      }

      const navigator = document.querySelector('#navigator');
      navigator.pushPage('pages/expensePage/detailExpense.html');
      break;
    }
  }
}
