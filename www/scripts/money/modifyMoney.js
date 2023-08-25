function modifyMoney(sendMoneyName) {
  let moneys = JSON.parse(localStorage.getItem('moneyStorage'));

  for (let i = 0; i < moneys.length; i++) {
    let mName = moneys[i].moneyName;

    if (mName == sendMoneyName) {
      let { moneyCurrent, moneyGradient, moneyName } = moneys[i];

      sessionStorage.setItem('tempGradient', moneyGradient);

      let findMoneyObject = {
        moneyName,
        moneyCurrent,
        moneyGradient,
      };

      if (sessionStorage.getItem('sessionFindMoney') === null) {
        sessionStorage.setItem('sessionFindMoney', JSON.stringify(findMoneyObject));
      } else {
        sessionStorage.removeItem('sessionFindMoney');
        sessionStorage.setItem('sessionFindMoney', JSON.stringify(findMoneyObject));
      }
      const navigator = document.querySelector('#navigator');
      navigator.pushPage('pages/moneyPage/editMoney.html');
      break;
    }
  }
}
