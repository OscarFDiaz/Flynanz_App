// SUMO EL DINERO DE TODAS LAS CARTERAS
function getTotalMoney() {
  let arrayMoney = JSON.parse(getFromStorage('moneyStorage'));
  let amount = 0;

  if (!arrayMoney) return amount;

  for (let i = 0; i < arrayMoney.length; i++) {
    amount += +arrayMoney[i].moneyCurrent;
  }

  return amount.toFixed(2);
}
