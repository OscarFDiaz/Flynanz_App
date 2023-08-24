function updateExpenseTotalMoney(sendName, amountSend) {
  let exName = sendName;
  let newAmount = amountSend; //-323

  let expensesStorage = JSON.parse(localStorage.getItem('expenseStorage'));

  let expense, index;
  for (let i = 0; i < expensesStorage.length; i++) {
    if (expensesStorage[i].expenseName == exName) {
      expense = expensesStorage[i];
      index = i;
      break;
    }
  }

  expense.totalExpense = parseFloat(
    parseFloat(expense.totalExpense) + parseFloat(newAmount),
  ).toFixed(2);

  /* Guardo el expense original*/
  if (localStorage.getItem('expenseStorage') === null) {
    let expenseArray = [];
    expenseArray.push(expense);
    localStorage.setItem('expenseStorage', JSON.stringify(expenseArray));
  } else {
    let expenseArray = JSON.parse(localStorage.getItem('expenseStorage'));
    expenseArray[index] = expense;
    localStorage.setItem('expenseStorage', JSON.stringify(expenseArray));
  }

  getExpenses();
}
