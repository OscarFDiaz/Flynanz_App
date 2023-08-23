const gradientButtonClick = (gradient) => {
  // Defino el gradiento al que le da click
  sessionStorage.setItem('tempGradient', gradient);
};

const selectIconGoal = (iconName, url) => {
  sessionStorage.setItem('expenseIconName', iconName);
  sessionStorage.setItem('expenseIconUrl', url);
  // Oculto los iconos, ya tengo uno seleccionado
  document.getElementById('expandableListContainerGoal').hideExpansion();
};

const getPercent = (goalMoney, actualMoney) => {
  return Math.round((actualMoney * 100) / goalMoney);
};
