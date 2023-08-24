// Cuando da en listo para añadir un gasto
function hideAlertAddExpenseSaving() {
  // Añadir el gasto a donde corresponde
  const selCategory = document.getElementById('selectOptioCa');
  const optCategory = selCategory.options;

  // Categoría seleccionada
  var choseCategory = optCategory[selCategory.selectedIndex].value;

  const selMoney = document.getElementById('selectOption');
  const optMoney = selMoney.options;

  // Dinero seleccionado
  var choseMoney = optMoney[selMoney.selectedIndex].value;

  let eName = document.getElementById('alertExpenseNoteSaving').value;
  let eMoney = document.getElementById('alertExpenseMoneySaving').value; //dinero del gasto
  let eDate = document.getElementById('alertExpenseDateSaving').value;
  let eid = localStorage.getItem('detailExpenseCount'); //id único de los gastos

  let lang = getLang('saving');

  //   Actualizo el id guardado en el storage
  if (eid === null) {
    localStorage.setItem('detailExpenseCount', '0');
    eid = 0;
  }

  eid = +eid + 1;
  localStorage.setItem('detailExpenseCount', eid);

  if (eName === null || eName.trim() === '') {
    ons.notification.toast(lang.noName, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (eDate === null || eDate === '') {
    eDate = new Date().toJSON().slice(0, 10);
  }

  if (choseCategory == 'NINGUNA CATEGORÍA' || choseCategory == 'NO CATEGORY') {
    ons.notification.toast(lang.selectCategory, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (choseMoney != 'NO RESTAR' || choseMoney != 'DO NOT SUBTRACT') {
    // Resto el dinero de donde se selecciono, me regreso sino se puede restar
    if (updateMoneyStorage(choseMoney, eMoney)) {
      return;
    }
  }

  let eMoneyFixed = parseFloat(eMoney).toFixed(2);

  let expenseDetail = {
    expenseName: choseCategory,
    inName: eName,
    inAmount: eMoneyFixed,
    inDate: eDate,
    inID: eid,
    inWallet: choseMoney,
  };

  /* Guardo los detalles del Expense*/
  if (localStorage.getItem('expenseDetailStorage') === null) {
    let expenseDetailArray = [];
    expenseDetailArray.unshift(expenseDetail);
    localStorage.setItem('expenseDetailStorage', JSON.stringify(expenseDetailArray));
  } else {
    let expenseDetailArray = JSON.parse(localStorage.getItem('expenseDetailStorage'));
    expenseDetailArray.unshift(expenseDetail);
    localStorage.setItem('expenseDetailStorage', JSON.stringify(expenseDetailArray));
  }

  updateExpenseTotalMoneySaving(choseCategory, eMoney);

  ons.notification.toast(lang.newExpense, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

  sessionStorage.clear();
  document.getElementById('alertToAddExpenseSaving').hide();
}

// Cuando da en cancelar en el alert para añadir un gasto
function hideAlertAddExpenseSavingNoChange() {
  let lang = getLang('saving');

  ons.notification.toast(lang.nothingButSubtract, {
    title: 'Aviso!',
    timeout: 2500,
    animation: 'ascend',
  });

  document.getElementById('alertToAddExpenseSaving').hide();
}
