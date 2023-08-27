function endSavingDay() {
  let lang = getLang('saving');

  ons.notification.confirm({
    message: lang.endQuestion,
    title: lang.notice,
    buttonLabels: [lang.confirmEnd, lang.cancel],
    animation: 'default',
    primaryButtonIndex: 1,
    cancelable: true,
    callback: function (index) {
      if (0 === index) {
        let storageS = JSON.parse(localStorage.getItem('savingStorage'));
        let moneyLeft = storageS.moneyLeft;

        //Si no hay más días y queda dinero disponible pregunto si lo quiere añadir a su dinero
        if (storageS.daysLeft < 1) {
          ons.notification.toast(lang.noMoreDays, {
            title: 'Error!',
            timeout: 2000,
            animation: 'ascend',
          });
          if (moneyLeft > 0) {
            let dialog = document.getElementById('alertMoneyLeft');

            if (dialog) {
              dialog.show();
              document.getElementById('leftMoneyToAlert').innerHTML = moneyLeft;
            } else {
              ons.notification.toast('Ups! contact support!', {
                title: 'Error!',
                timeout: 2000,
                animation: 'ascend',
              });
            }
          }
          return;
        }

        // Si me quedo dinero
        if (moneyLeft > 0) {
          let dialog = document.getElementById('alertMoneyLeft');

          if (dialog) {
            dialog.show();
            document.getElementById('leftMoneyToAlert').innerHTML = moneyLeft;
          } else {
            ons.notification.toast('Ups! contact support!', {
              title: 'Error!',
              timeout: 2000,
              animation: 'ascend',
            });
          }
        } else {
          // Si no me quedó dinero
          let savingStorage = JSON.parse(localStorage.getItem('savingStorage'));

          if (savingStorage.daysLeft > 0) {
            savingStorage.daysLeft = parseInt(savingStorage.daysLeft) - 1;
            savingStorage.moneyLeft = savingStorage.toExpend;
          }

          localStorage.setItem('savingStorage', JSON.stringify(savingStorage));
          loadSaving();

          ons.notification.toast(lang.dayChanged, {
            title: 'Aviso!',
            timeout: 2500,
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
