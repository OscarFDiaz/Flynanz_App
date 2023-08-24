function deleteExpense(sendName) {
  let lang = getLang('expense');
  ons.notification.confirm({
    message: lang.confirmDelete,
    title: lang.notice,
    buttonLabels: [lang.confirm, lang.cancel],
    animation: 'default',
    primaryButtonIndex: 1,
    cancelable: true,
    callback: function (index) {
      if (0 === index) {
        let expenses = JSON.parse(localStorage.getItem('expenseStorage'));
        let detailExpenses = JSON.parse(localStorage.getItem('expenseDetailStorage'));

        for (let i = 0; i < expenses.length; i++) {
          if (expenses[i].expenseName == sendName) {
            expenses.splice(i, 1);
            break;
          }
        }
        localStorage.setItem('expenseStorage', JSON.stringify(expenses));

        if (detailExpenses !== null) {
          for (let i = 0; i < detailExpenses.length; i++) {
            if (detailExpenses[i].expenseName == sendName) {
              detailExpenses.splice(i, 1);
              i--;
            }
          }
          localStorage.setItem('expenseDetailStorage', JSON.stringify(detailExpenses));
        }

        getExpenses();

        ons.notification.toast(lang.success, {
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
