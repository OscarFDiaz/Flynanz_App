function makeNewMoney() {
  let lang = getLang('money');

  let moneyName = document.getElementById('newMoneyName').value;
  let moneyCurrent = document.getElementById('newMoneyMoney').value;
  let moneyGradient = sessionStorage.getItem('tempGradient');

  if (moneyName === '') {
    ons.notification.toast(lang.noName, {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (moneyCurrent === '') {
    moneyCurrent = '0.00';
  } else {
    moneyCurrent = parseFloat(moneyCurrent).toFixed(2);
  }

  let testMoney = Math.sign(moneyCurrent);
  if (testMoney === -1 || testMoney === -0) {
    ons.notification.toast(lang.noNegative1, {
      title: 'Error!',
      timeout: 3000,
      animation: 'ascend',
    });
    moneyCurrent = '0.00';
  }

  if (moneyGradient == null || moneyGradient == '') {
    ons.notification.toast(lang.noColor, {
      title: 'Error!',
      timeout: 3000,
      animation: 'ascend',
    });
    return;
  }

  let money = {
    moneyName,
    moneyCurrent,
    moneyGradient,
  };

  if (localStorage.getItem('moneyStorage') === null) {
    let moneyArray = [];
    moneyArray.push(money);
    localStorage.setItem('moneyStorage', JSON.stringify(moneyArray));
  } else {
    let moneyArray = JSON.parse(localStorage.getItem('moneyStorage'));
    moneyArray.push(money);
    localStorage.setItem('moneyStorage', JSON.stringify(moneyArray));
  }

  ons.notification.toast(`${lang.newMoney} ${moneyName} ${lang.added}`, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

  try {
    getMoneys();
    functionPopPage();
  } catch (error) {
    functionPopPage();
    return;
  }

  let cIndex = localStorage.getItem('currentDot');
  showExpensesPerWallet(searchWalletByIndex(cIndex));

  document.getElementById('carousel2').addEventListener('postchange', function (event) {
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
