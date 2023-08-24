// Actualizo los gastos
function updateExpenseTotalMoneySaving(sendName, amountSend) {
  let exName = sendName;
  let newAmount = amountSend;

  let expensesStorage = JSON.parse(localStorage.getItem('expenseStorage'));

  let expense, index;
  for (let i = 0; i < expensesStorage.length; i++) {
    if (expensesStorage[i].expenseName == exName) {
      expense = expensesStorage[i];
      index = i;
      break;
    }
  }

  let totalExpense = parseFloat(expense.totalExpense) + parseFloat(newAmount);
  expense.totalExpense = totalExpense;

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
}
