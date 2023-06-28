//Compruebo las opciones del menú en el storage
// Fired: userHome.HTML
function checkOptions() {
  let totalMoney = getFromStorage('storageSwitchTotalMoney');
  if (!totalMoney) {
    saveToStorage('storageSwitchTotalMoney', true);
  }

  let expenses = getFromStorage('storageSwitchExpenses');
  if (!expenses) {
    saveToStorage('storageSwitchExpenses', true);
  }

  let savings = getFromStorage('storageSwitchSavings');
  if (!savings) {
    saveToStorage('storageSwitchSavings', true);
  }

  let goals = getFromStorage('storageSwitchGoals');
  if (!goals) {
    saveToStorage('storageSwitchGoals', true);
  }

  let tutorial = getFromStorage('storageSwitchTutorial');
  if (!tutorial) {
    saveToStorage('storageSwitchTutorial', true);
  }

  //Nueva: Wallets
  let wallet = getFromStorage('storageSwitchWallet');
  if (!wallet) {
    saveToStorage('storageSwitchWallet', true);
  }

  loadOptions();
}
