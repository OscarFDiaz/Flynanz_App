function gradientButtonClick(gradient) {
  // Defino el gradiente al que le da click
  sessionStorage.setItem('tempGradient', gradient);
}

function toggleBorder(goalGradient) {
  let id = goalGradient.slice(-1);
  const gradient = document.getElementById(`gd-${id}`);
  gradient.tabIndex = -1;
  gradient.focus();
}

function selectIconGoal(iconName, url) {
  sessionStorage.setItem('expenseIconName', iconName);
  sessionStorage.setItem('expenseIconUrl', url);
  // Oculto los iconos, ya tengo uno seleccionado
  document.getElementById('expandableListContainerGoal').hideExpansion();
  //Cambio el icono que se muestra en el preview
  document.getElementById('imageNewGoalIcon').src = `${url}${iconName}`;
}

function getPercent(goalMoney, actualMoney) {
  return Math.round((actualMoney * 100) / goalMoney);
}

function selectIconGoalEdit(iconName, url) {
  sessionStorage.setItem('expenseIconName', iconName);
  sessionStorage.setItem('expenseIconUrl', url);
  // Oculto los iconos, ya tengo uno seleccionado
  document.getElementById('expandableListContainerGoalEdit').hideExpansion();
  document.getElementById('imageEditGoalIcon').src = `${url}${iconName}`;
}

function makeSum() {
  let actualAmount = document.getElementById('editOnlyMoneyActualMoney').textContent;
  let newAmount = document.getElementById('editOnlyGoalMoney').value;

  let sumResult = parseFloat(
    parseFloat(actualAmount) + Math.abs(parseFloat(newAmount)),
  ).toFixed(2);

  document.getElementById('editOnlyEndMoney').innerHTML = formatMoney(sumResult);
  sessionStorage.setItem('addNewMoney', sumResult);
}

function makeRes() {
  let actualAmount = document.getElementById('editOnlyMoneyActualMoney').textContent;
  let newAmount = document.getElementById('editOnlyGoalMoney').value;

  let sumResult = parseFloat(
    parseFloat(actualAmount) - Math.abs(parseFloat(newAmount)),
  ).toFixed(2);

  document.getElementById('editOnlyEndMoney').innerHTML = formatMoney(sumResult);
  sessionStorage.setItem('addNewMoney', sumResult);
}
