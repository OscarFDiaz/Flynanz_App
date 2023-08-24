function addExpenseToExpense(sendName) {
  let expenses = JSON.parse(localStorage.getItem('expenseStorage'));

  for (let i = 0; i < expenses.length; i++) {
    let eName = expenses[i].expenseName;

    if (eName == sendName) {
      let objectFinded = expenses[i].expenseName;

      if (sessionStorage.getItem('sessionFindExpense') === null) {
        sessionStorage.setItem('sessionFindExpense', objectFinded);
      } else {
        sessionStorage.removeItem('sessionFindExpense');
        sessionStorage.setItem('sessionFindExpense', objectFinded);
      }
      createAlertDialogToAddExpense();
      break;
    }
  }
}
