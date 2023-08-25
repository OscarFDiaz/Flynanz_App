function makeSumMoney() {
  let actualAmount = document.getElementById('editMoneyActualMoney').textContent;
  let newAmount = document.getElementById('editOnlyMoneyMoney').value;

  let sumResult = parseFloat(
    parseFloat(actualAmount) + Math.abs(parseFloat(newAmount)),
  ).toFixed(2);

  document.getElementById('editMoneyEndMoney').innerHTML = formatMoney(sumResult);
  sessionStorage.setItem('addNewMoney', sumResult);
}

function makeResMoney() {
  let actualAmount = document.getElementById('editMoneyActualMoney').textContent;
  let newAmount = document.getElementById('editOnlyMoneyMoney').value;

  let sumResult = parseFloat(
    parseFloat(actualAmount) - Math.abs(parseFloat(newAmount)),
  ).toFixed(2);

  document.getElementById('editMoneyEndMoney').innerHTML = formatMoney(sumResult);
  sessionStorage.setItem('addNewMoney', sumResult);
}

function formatMoney(amount, decimalCount = 2, decimal = '.', thousands = ',') {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)),
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    );
  } catch (e) {
    console.log(e);
  }
}

function searchWalletByIndex(index) {
  let expensesDetail = JSON.parse(localStorage.getItem('moneyStorage'));
  if (expensesDetail === null || expensesDetail.length < 1) {
    return 'NO NAME';
  }

  if (expensesDetail[index].moneyName == null || expensesDetail[index].moneyName == '') {
    return 'NO NAME';
  } else {
    return expensesDetail[index].moneyName;
  }
}

function loadDetailMoney() {
  let retrievedMoney = sessionStorage.getItem('sessionFindMoney');
  let parseMoney = JSON.parse(retrievedMoney);

  //Guardo el nombre por si el usuario lo edita
  localStorage.setItem('nameSaved', parseMoney.moneyName);

  document.getElementById('editMoneyName').value = parseMoney.moneyName;
  document.getElementById('editMoneyMoney').value = parseMoney.moneyCurrent;
}
