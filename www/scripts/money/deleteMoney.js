function deleteMoney(sendMoneyName) {
  let lang = getLang('money');
  ons.notification.confirm({
    message: lang.sureDelete,
    title: lang.notice,
    buttonLabels: [lang.confirm, lang.cancel],
    animation: 'default',
    primaryButtonIndex: 1,
    cancelable: true,
    callback: function (index) {
      if (0 === index) {
        let moneys = JSON.parse(localStorage.getItem('moneyStorage'));

        for (let i = 0; i < moneys.length; i++) {
          if (moneys[i].moneyName == sendMoneyName) {
            moneys.splice(i, 1);
            break;
          }
        }
        localStorage.setItem('moneyStorage', JSON.stringify(moneys));

        localStorage.setItem('currentDot', 0);

        getMoneys();
        let cIndex = localStorage.getItem('currentDot');
        showExpensesPerWallet(searchWalletByIndex(cIndex));

        if (document.getElementById('carousel2') != null) {
          document
            .getElementById('carousel2')
            .addEventListener('postchange', function (event) {
              let cIndex = event.activeIndex;
              let laIndex = event.lastActiveIndex;

              localStorage.setItem('currentDot', cIndex);

              document.getElementById(`indicator${cIndex}`).innerHTML = ' ● ';
              if (document.getElementById(`indicator${laIndex}`) != null) {
                document.getElementById(`indicator${laIndex}`).innerHTML = ' ○ ';
              }
              showExpensesPerWallet(searchWalletByIndex(cIndex));
            });
        }

        ons.notification.toast(lang.deleted, {
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
