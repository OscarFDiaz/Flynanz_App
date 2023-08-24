function makeSaving() {
  /* OBETENER VARIABLES */
  let mainAmount = document.getElementById('savingMainAmount').value;
  let rangeDays = document.getElementById('rangeDays').value;
  let rangePercent = document.getElementById('rangePercent').value;
  let lang = getLang('saving');

  if (mainAmount === null || mainAmount == '') {
    ons.notification.toast(lang.noAmount, {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  let testMoney = Math.sign(mainAmount);
  if (testMoney === -1 || testMoney === -0) {
    ons.notification.toast(lang.noNegative, {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  let storage = JSON.parse(localStorage.getItem('savingStorage'));

  if (storage) {
    ons.notification.confirm({
      message: lang.exist,
      title: lang.notice,
      buttonLabels: [lang.confirmDelete, lang.cancel],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          rangeDays = returnDays(rangeDays);
          let equivalentAmount = (parseInt(rangePercent) * parseFloat(mainAmount)) / 100;
          let toExpend = (parseFloat(equivalentAmount) / parseInt(rangeDays)).toFixed(2);
          let daysLeft = rangeDays;
          let moneyLeft = toExpend;

          let saving = {
            mainAmount,
            rangeDays,
            rangePercent,
            equivalentAmount,
            toExpend,
            daysLeft,
            moneyLeft,
          };

          localStorage.setItem('savingStorage', JSON.stringify(saving));
          updateLastSaving();
          functionPopPage();
          loadSaving();

          ons.notification.toast(lang.updated, {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          });
        } else {
          ons.notification.toast(lang.noAction, {
            title: 'Aviso!',
            timeout: 1000,
            animation: 'ascend',
          });
        }
      },
    });
  } else {
    rangeDays = returnDays(rangeDays);
    let equivalentAmount = (parseInt(rangePercent) * parseFloat(mainAmount)) / 100;
    let toExpend = (parseFloat(equivalentAmount) / parseInt(rangeDays)).toFixed(2);
    let daysLeft = rangeDays;
    let moneyLeft = toExpend;

    let saving = {
      mainAmount,
      rangeDays,
      rangePercent,
      equivalentAmount,
      toExpend,
      daysLeft,
      moneyLeft,
    };

    localStorage.setItem('savingStorage', JSON.stringify(saving));
    updateLastSaving();
    functionPopPage();
    loadSaving();

    ons.notification.toast(lang.finished, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
}
