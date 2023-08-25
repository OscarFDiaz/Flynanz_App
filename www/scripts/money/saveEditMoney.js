function saveEditMoney() {
  let sName = localStorage.getItem('nameSaved');

  let name = document.getElementById('editMoneyName').value;
  let actualMoney = parseFloat(document.getElementById('editMoneyMoney').value).toFixed(
    2,
  );

  let moneyGradient = sessionStorage.getItem('tempGradient');

  let moneys = JSON.parse(localStorage.getItem('moneyStorage'));

  let lang = getLang('money');

  let testMoney = Math.sign(actualMoney);

  if (name === '') {
    ons.notification.toast(lang.noName, {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (actualMoney == '' || actualMoney == null || actualMoney == 'NaN') {
    actualMoney = '0.00';
  }

  if (testMoney === -1 || testMoney === -0) {
    ons.notification.toast(lang.noNegative, {
      title: 'Notice!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (moneyGradient == null || moneyGradient == '') {
    moneyGradient = '--gradient_1';
  }

  for (let i = 0; i < moneys.length; i++) {
    if (moneys[i].moneyName == sName) {
      indexGoal = i; //Pongo la posición donde esta mi objeto que modificare

      let updateMoneyObject = {
        moneyName: name,
        moneyCurrent: actualMoney,
        moneyGradient: moneyGradient,
      };

      if (localStorage.getItem('moneyStorage') === null) {
        let moneysArray = [];
        moneysArray.push(updateMoneyObject);
        localStorage.setItem('moneyStorage', JSON.stringify(moneysArray));
      } else {
        moneys[indexGoal] = updateMoneyObject;
        localStorage.setItem('moneyStorage', JSON.stringify(moneys));
      }
      localStorage.removeItem('nameSaved');
      sessionStorage.clear();
      break;
    }
  }

  ons.notification.toast(`${lang.money} ${name} ${lang.modified}`, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

  try {
    functionPopPage();
    getMoneys();
  } catch (error) {
    functionPopPage();
    return;
  }
}
