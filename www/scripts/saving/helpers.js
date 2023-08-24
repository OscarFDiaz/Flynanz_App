function loadDetailSaving() {
  updateSavingPreview();
  updateLastSaving();
}

function returnDays(days) {
  const ranges = [
    { min: 0, max: 3, value: 1 },
    { min: 4, max: 6, value: 2 },
    { min: 7, max: 9, value: 3 },
    { min: 10, max: 12, value: 4 },
    { min: 13, max: 15, value: 5 },
    { min: 16, max: 18, value: 6 },
    { min: 19, max: 21, value: 7 },
    { min: 22, max: 24, value: 8 },
    { min: 25, max: 27, value: 9 },
    { min: 28, max: 30, value: 10 },
    { min: 31, max: 33, value: 11 },
    { min: 34, max: 36, value: 12 },
    { min: 37, max: 39, value: 13 },
    { min: 40, max: 42, value: 14 },
    { min: 43, max: 47, value: 15 },
    { min: 48, max: 50, value: 16 },
    { min: 51, max: 53, value: 17 },
    { min: 54, max: 56, value: 18 },
    { min: 57, max: 59, value: 19 },
    { min: 60, max: 62, value: 20 },
    { min: 63, max: 65, value: 21 },
    { min: 66, max: 68, value: 22 },
    { min: 69, max: 71, value: 23 },
    { min: 72, max: 74, value: 24 },
    { min: 75, max: 77, value: 25 },
    { min: 78, max: 80, value: 26 },
    { min: 81, max: 83, value: 27 },
    { min: 84, max: 86, value: 28 },
    { min: 87, max: 89, value: 29 },
    { min: 90, max: 94, value: 30 },
    { min: 95, max: 100, value: 31 },
  ];

  const dd = parseInt(days);

  for (const range of ranges) {
    if (dd >= range.min && dd <= range.max) {
      return range.value;
    }
  }
}

// Suma
function makeSavingOperation() {
  let actualMoney = document.getElementById('alertAddSaving').textContent;
  let inputMoney = document.getElementById('alertInputSaving').value;
  let endMoney = document.getElementById('alertAddSavingEnd');

  let result = parseFloat(
    parseFloat(actualMoney) + Math.abs(parseFloat(inputMoney)),
  ).toFixed(2);

  endMoney.innerHTML = result;
}

//Resta
function makeSavingResOperation() {
  let actualMoney = document.getElementById('alertAddSaving').textContent;
  let inputMoney = document.getElementById('alertInputSaving').value;
  let endMoney = document.getElementById('alertAddSavingEnd');

  let result = parseFloat(
    parseFloat(actualMoney) - Math.abs(parseFloat(inputMoney)),
  ).toFixed(2);

  endMoney.innerHTML = result;
}
