//Cargo la página principal con las opcines que el usuario selecciona
function loadOptions() {
  let userHomeView = document.getElementById('homeOptionsContainer');

  userHomeView.innerHTML = '';

  // DINERO TOTAL EN LAS CUENTAS
  let totalMoney = JSON.parse(getFromStorage('storageSwitchTotalMoney'));
  if (totalMoney) {
    userHomeView.innerHTML += `
    <div onclick="fn.load('./pages/moneyPage/money.html')" class="divTotalBalance">
    <label class="cardHomeTitle cardHomeTitleBalance" style="margin-left: 0px">
    ${getLang('home_load_balance')}
    </label>
    <div class="title totalMoneyTitle" style="color: var(--card-text-title-color); display: block;">$
    <span class="totalMoneyTitle" id="totalMoneyMoney" style="margin-left: 0px">
    </span>
    </div>
    </div>`;

    document.getElementById('totalMoneyMoney').innerHTML = formatMoney(getTotalMoney());
  }

  // CARTERAS
  let wallet = JSON.parse(getFromStorage('storageSwitchWallet'));
  if (wallet) {
    // CONSIGO LAS CARTERAS CREADAS
    let moneys = JSON.parse(localStorage.getItem('moneyStorage'));
    if (moneys != null) {
      userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder">
      ${getLang('home_load_wallet')}
      <span onclick="pushToNewMoney()" style="right: 20px;
      position: absolute;
      font-size: 14px;
      color: var(--text-without-card);
      font-weight: 500;">Add wallet +</span>
      </label>`;

      let toInner = '';
      toInner += `<div class="walletsContainer" onclick="fn.load('./pages/moneyPage/money.html')">`;

      for (let i = 0; i < moneys.length; i++) {
        let { moneyName, moneyCurrent, moneyGradient } = moneys[i];

        toInner += `
        <div class="wallet" style="background: var(${moneyGradient})">
        <div class="tittleWalletHome">
        ${moneyName}
        </div>
        <div class="walletMoneyAmount">$ 
        <span id="${moneyName}-money">
        ${formatMoney(moneyCurrent)}
        </span>
        </div>
        </div>`;
      }
      toInner += `</div>`;
      userHomeView.innerHTML += toInner;
    }
  }

  // DONA CON LOS GASTOS EN LAS DIFERENTES CATEGORIAS
  let expenses = JSON.parse(getFromStorage('storageSwitchExpenses'));
  if (expenses) {
    userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder">
    ${getLang('home_load_expense')}
    </label>
    <ons-card onclick="fn.load('./pages/expensePage/expenses.html')" style="padding-top: 16px;">
    <div class="content">
    <canvas id="expensesChart" width="400" height="400"></canvas>
    </div>
    </ons-card>`;
  }

  // DINERO AHORRADO
  let savings = JSON.parse(getFromStorage('storageSwitchSavings'));
  if (savings) {
    userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder">
    ${getLang('home_load_saved')}
    </label>
    <ons-card onclick="fn.load('./pages/savingPage/savings.html')">
    <div style="display: flex; align-items: center;">
    <div class="iconSavedMoney" style="display: flex; justify-content: space-around;">
    <img src="./assets/icons/savingOption.png" alt="saving icon">
    </div>
    <div class="title totalMoneyTitle" style="color: var(--card-text-title-color);">$
    <span class="totalMoneyTitle" id="totalSavingsAmount" style="margin-left:0">
    </span>
    </div>
    </div>
    </ons-card>`;

    document.getElementById('totalSavingsAmount').innerHTML = formatMoney(
      getTotalSavings(),
    );
  }

  // GOALS DEL USUARIO
  let goals = JSON.parse(getFromStorage('storageSwitchGoals'));
  if (goals) {
    userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder">
    ${getLang('home_load_goals')}
    <span onclick="pushToNewGoal()" style="right: 20px;
    position: absolute;
    font-size: 14px;
    color: var(--text-without-card);
    font-weight: 500;">Add goal +</span>
    </label>`;

    userHomeView.innerHTML += `
    <div class="content" id="homeGoalsContainer" onclick="fn.load('./pages/goalPage/goals.html')" style="margin-bottom: 40px"> 
    </div>`;

    document.getElementById('homeGoalsContainer').innerHTML = getTotalGoals();
  }

  // SI EL USUARIO NO DECIDE MOSTRAR NADA
  if (!totalMoney && !expenses && !savings && !goals) {
    userHomeView.innerHTML = '';

    // TODO
    // * AÑADIR IMAGEN DE QUE NO HAY NADA Y BOTON PARA IR A LOS AJUSTES
    userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder">Nothing here...</label>`;
  }

  // El chart es creado el final, no funciona si se carga antes
  makeChart();
}
