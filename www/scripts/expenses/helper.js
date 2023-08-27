function gradientButtonExpenseClick(gradient, color, color1) {
  // Defino el gradiente al que le da click
  sessionStorage.setItem('tempGradient', gradient);
  sessionStorage.setItem('colorExpense', color);
  sessionStorage.setItem('colorExpense1', color1);
}

function toggleBorder(expenseGradient) {
  let id = expenseGradient.slice(-1);
  const gradient = document.getElementById(`gd-${id}`);
  gradient.tabIndex = -1;
  gradient.focus();
}

function selectIcon(iconName, url) {
  sessionStorage.setItem('expenseIconName', iconName);
  sessionStorage.setItem('expenseIconUrl', url);
  // Oculto los iconos, ya tengo uno seleccionado
  document.getElementById('expandableListContainerExpense').hideExpansion();
  document.getElementById('imageNewExpenseIcon').src = `${url}${iconName}`;
}

function getAmountFDays(sendName) {
  let storage = JSON.parse(localStorage.getItem('expenseDetailStorage'));

  let today = new Date().toJSON().slice(0, 10);
  let total = 0;
  for (let i = 0; i < storage.length; i++) {
    if (storage[i].expenseName == sendName) {
      let dateD = dateDiff(storage[i].inDate, today);
      if (dateD < 16 && dateD >= 0) {
        total = +total + +storage[i].inAmount;
      }
    }
  }
  return parseFloat(total).toFixed(2);
}

function getAmountTDays(sendName) {
  let storage = JSON.parse(localStorage.getItem('expenseDetailStorage'));

  let today = new Date().toJSON().slice(0, 10);
  let total = 0;
  for (let i = 0; i < storage.length; i++) {
    if (storage[i].expenseName == sendName) {
      let dateD = dateDiff(storage[i].inDate, today);
      if (dateD < 32 && dateD >= 0) {
        total = +total + +storage[i].inAmount;
      }
    }
  }
  return parseFloat(total).toFixed(2);
}

function dateDiff(date1, date2) {
  dt1 = new Date(date1);
  dt2 = new Date(date2);
  return Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
      Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24),
  );
}

function getTotalExpenses() {
  let total = 0;
  let expenses = JSON.parse(localStorage.getItem('expenseStorage'));

  for (let i = 0; i < expenses.length; i++) {
    total = +total + +expenses[i].totalExpense;
  }

  return parseFloat(total).toFixed(2);
}

function getAmountFDaysN() {
  let storage = JSON.parse(localStorage.getItem('expenseDetailStorage'));

  let total = 0;
  if (storage == null || storage == '') {
    return parseFloat(total).toFixed(2);
  }

  let today = new Date().toJSON().slice(0, 10);
  for (let i = 0; i < storage.length; i++) {
    let dateD = dateDiff(storage[i].inDate, today);
    if (dateD < 16 && dateD >= 0) {
      total = +total + +storage[i].inAmount;
    }
  }

  return parseFloat(total).toFixed(2);
}

function getAmountTDaysN() {
  let storage = JSON.parse(localStorage.getItem('expenseDetailStorage'));

  let total = 0;
  if (storage == null || storage == '') {
    return parseFloat(total).toFixed(2);
  }

  let today = new Date().toJSON().slice(0, 10);
  for (let i = 0; i < storage.length; i++) {
    let dateD = dateDiff(storage[i].inDate, today);
    if (dateD < 32 && dateD >= 0) {
      total = +total + +storage[i].inAmount;
    }
  }
  return parseFloat(total).toFixed(2);
}
