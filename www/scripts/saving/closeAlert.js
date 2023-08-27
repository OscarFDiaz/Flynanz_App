/* ALERT PRINCIPAL */
function closeAlertSaving() {
  let lang = getLang('saving');

  if (document.getElementById('alertInputSaving') === null) {
    ons.notification.toast(lang.selectSomething, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  let element = document.getElementById('alertInputSaving').value;
  if (element === null || element === '') {
    ons.notification.toast(lang.enterAmount, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  let actualMoney = parseFloat(document.getElementById('alertAddSaving').textContent);
  let endMoney = parseFloat(document.getElementById('alertAddSavingEnd').textContent);

  let testMoney = Math.sign(endMoney);
  if (testMoney === -1) {
    ons.notification.toast(lang.noNegative1, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  /* Se hizo una resta */
  if (actualMoney > endMoney) {
    let storage = JSON.parse(localStorage.getItem('savingStorage'));

    storage.moneyLeft = endMoney;

    localStorage.setItem('savingStorage', JSON.stringify(storage));
    document.getElementById('alertEditSavingMoney').hide();

    /* Preguntar si deseo añadir eso como gasto */
    ons.notification.confirm({
      message: lang.reducedMoney,
      title: lang.notice,
      buttonLabels: [lang.confirmAdd, lang.no],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          /* ABRIR VENTANA PARA AÑADIR UN GASTO A ALGUNA CATEGORÍA DE GASTO */
          let dialog = document.getElementById('alertToAddExpenseSaving');

          document.getElementById('alertExpenseNoteSaving').value = '';
          document.getElementById('alertExpenseMoneySaving').value = Math.abs(element);
          document.getElementById('alertExpenseDateSaving').value = '';

          if (dialog) {
            dialog.show();
            //CARGAR CATEGORÍAS DISPONIBLES Y CARGAR DONDE SE PUEDE RESTAR EL DINERO
            loadDialogCategoryAndMoney();
          } else {
            ons.notification.toast('Ups! contact support!', {
              title: 'Error!',
              timeout: 2000,
              animation: 'ascend',
            });
          }
          loadSaving();
        } else {
          ons.notification.toast(lang.justReduced, {
            title: 'Aviso!',
            timeout: 1000,
            animation: 'ascend',
          });
          loadSaving();
        }
      },
    });
  } else if (actualMoney < endMoney) {
    // Se hizo una suma
    let storage = JSON.parse(localStorage.getItem('savingStorage'));
    storage.moneyLeft = endMoney;
    localStorage.setItem('savingStorage', JSON.stringify(storage));

    ons.notification.toast(lang.moreAdded, {
      title: 'Aviso!',
      timeout: 1000,
      animation: 'ascend',
    });

    document.getElementById('alertEditSavingMoney').hide();
    loadSaving();
  }
}
