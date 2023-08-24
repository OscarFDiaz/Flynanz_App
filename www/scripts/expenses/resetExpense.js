function resetExpense(sendName) {
  let lang = getLang('expense');
  ons.notification.confirm({
    message: lang.confirmDeleteExpenses,
    title: lang.notice,
    buttonLabels: [lang.confirm, lang.cancel],
    animation: 'default',
    primaryButtonIndex: 1,
    cancelable: true,
    callback: function (index) {
      if (0 === index) {
        let detailExpenses = JSON.parse(localStorage.getItem('expenseDetailStorage'));

        if (detailExpenses === null) {
          ons.notification.toast(lang.nothingDelete, {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          });
          return;
        }

        if (detailExpenses.length === 0) {
          ons.notification.toast(lang.nothingDelete, {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          });
          return;
        }

        for (let i = 0; i < detailExpenses.length; i++) {
          let name = detailExpenses[i].expenseName;
          if (name === sendName || name == sendName) {
            detailExpenses.splice(i, 1);
            i--;
          }
        }
        localStorage.setItem('expenseDetailStorage', JSON.stringify(detailExpenses));

        /* RESETEO LOS CONTADORES DEL EXPENSE A 0*/
        let exName = sendName;

        let expensesStorage = JSON.parse(localStorage.getItem('expenseStorage'));

        let expense, index;
        for (let i = 0; i < expensesStorage.length; i++) {
          if (expensesStorage[i].expenseName == exName) {
            expense = expensesStorage[i];
            index = i;
            break;
          }
        }

        expense.totalExpense = 0.0;

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

        try {
          functionPopPage();
          getExpenses();
        } catch (error) {
          console.log(error);
          functionPopPage();
          getExpenses();
        }

        ons.notification.toast(lang.expensesDeleted, {
          title: 'Aviso!',
          timeout: 2000,
          animation: 'ascend',
        });
      } else {
        ons.notification.toast(lang.allNormal, {
          title: 'Aviso!',
          timeout: 1000,
          animation: 'ascend',
        });
      }
    },
  });
}
