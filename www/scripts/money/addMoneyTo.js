function addMoneyTo(sendMoneyName) {
  let moneys = JSON.parse(localStorage.getItem('moneyStorage'));

  for (let i = 0; i < moneys.length; i++) {
    let mName = moneys[i].moneyName;

    if (mName == sendMoneyName) {
      let mMoney = moneys[i].moneyCurrent;
      let mGradient = moneys[i].moneyGradient;

      let findMoneyObject = {
        moneyName: mName,
        moneyCurrent: mMoney,
        moneyGradient: mGradient,
      };

      if (sessionStorage.getItem('sessionFindMoney') === null) {
        sessionStorage.setItem('sessionFindMoney', JSON.stringify(findMoneyObject));
      } else {
        sessionStorage.removeItem('sessionFindMoney');
        sessionStorage.setItem('sessionFindMoney', JSON.stringify(findMoneyObject));
      }
      createAlertDialogToEditMoneyMoney();
      break;
    }
  }
}
