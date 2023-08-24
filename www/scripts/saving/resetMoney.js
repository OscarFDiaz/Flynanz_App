function resetSavingMoney() {
  let lang = getLang('saving');
  let savedMoney = document.getElementById('savingMainAmountCard');
  ons.notification.confirm({
    message: lang.sureToReset,
    title: lang.notice,
    buttonLabels: [lang.confirmReset, lang.cancel],
    animation: 'default',
    primaryButtonIndex: 1,
    cancelable: true,
    callback: function (index) {
      if (0 === index) {
        let storageS = localStorage.getItem('savedMoneySaving');
        if (storageS) {
          localStorage.setItem('savedMoneySaving', 0);
          savedMoney.innerHTML = 0;
          ons.notification.toast(lang.resetSaving, {
            title: 'Aviso!',
            timeout: 1000,
            animation: 'ascend',
          });
        } else {
          ons.notification.toast(lang.noSaving, {
            title: 'Aviso!',
            timeout: 1000,
            animation: 'ascend',
          });
        }
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
