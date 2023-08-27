// Tema seleccionado por el usuario
function changeTheme() {
  let actualThemeIndex = sessionStorage.getItem('themeIndex');
  let lang = getLang('home');

  if (actualThemeIndex == '0') {
    deleteProperty();
    setTheme('theme-default');
    document.getElementById('buttonSelectTheme').innerHTML = lang.currentTheme;
  } else if (actualThemeIndex == '1') {
    deleteProperty();
    setTheme('theme-dark');
    document.getElementById('buttonSelectTheme').innerHTML = lang.currentTheme;
  }
}

function getTheme(themeName) {
  let actualTheme = localStorage.getItem('userTheme');
  if (actualTheme == themeName || actualTheme === themeName) {
    return true;
  } else {
    return false;
  }
}

function setTheme(themeName) {
  let lang = getLang('home');
  if (getTheme(themeName)) {
    //EL TEMA SELECCIONADO YA ESTA PUESTO

    ons.notification.toast(lang.currentMessage, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    //Si no es el mismo tema lo cambio
    localStorage.setItem('userTheme', themeName);
    document.documentElement.className = themeName;

    ons.notification.toast(lang.themeChangedSuccess, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
}

//Compruebo las opciones del menú en el storage
function checkOptions() {
  let totalMoney = localStorage.getItem('storageSwitchTotalMoney');
  if (totalMoney == 'null' || totalMoney == null) {
    localStorage.setItem('storageSwitchTotalMoney', true);
  }

  let expenses = localStorage.getItem('storageSwitchExpenses');
  if (expenses == 'null' || expenses == null) {
    localStorage.setItem('storageSwitchExpenses', true);
  }

  let savings = localStorage.getItem('storageSwitchSavings');
  if (savings == 'null' || savings == null) {
    localStorage.setItem('storageSwitchSavings', true);
  }

  let goals = localStorage.getItem('storageSwitchGoals');
  if (goals == 'null' || goals == null) {
    localStorage.setItem('storageSwitchGoals', true);
  }

  let tutorial = localStorage.getItem('storageSwitchTutorial');
  if (tutorial == 'null' || tutorial == null) {
    localStorage.setItem('storageSwitchTutorial', true);
  }

  //Nueva: Wallets
  let wallet = localStorage.getItem('storageSwitchWallet');
  if (wallet == 'null' || wallet == null) {
    localStorage.setItem('storageSwitchWallet', true);
  }

  loadOptions();
}

//Cargo la página principal con las opcines que el usuario selecciona
function loadOptions() {
  let userHomeView = document.getElementById('homeOptionsContainer');
  let lang = getLang('home');

  userHomeView.innerHTML = '';

  // DINERO TOTAL EN LAS CUENTAS
  let totalMoney = localStorage.getItem('storageSwitchTotalMoney');
  if (Boolean(totalMoney) === true) {
    userHomeView.innerHTML += ` <div
      onclick="fn.load('pages/moneyPage/money.html')"
      class="divTotalBalance"
    >
      <label class="cardHomeTitle cardHomeTitleBalance" style="margin-left: 0px"
        >${lang.totalBalance}</label
      >
      <div
        class="title totalMoneyTitle"
        style="color: var(--card-text-title-color); display: block"
      >
        $
        <span class="totalMoneyTitle" id="totalMoneyMoney" style="margin-left: 0px">
        </span>
      </div>
    </div>`;
  }

  // CARTERAS
  let wallet = localStorage.getItem('storageSwitchWallet');
  if (Boolean(wallet) === true) {
    // CONSIGO LAS CARTERAS CREADAS
    let moneys = JSON.parse(localStorage.getItem('moneyStorage'));
    if (moneys != null) {
      userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder"
        >${lang.myMoney}
        <span
          onclick="pushToNewMoney()"
          style="right: 20px;
          position: absolute;
          font-size: 14px;
          color: var(--text-without-card);
          font-weight: 500;"
          >${lang.add} +</span
        >
      </label>`;

      // Cartera vacía
      if (moneys.length === 0) {
        userHomeView.innerHTML += `<div
          class="walletsContainer"
          onclick="fn.load('pages/moneyPage/money.html')"
        >
          <div
            class="wallet"
            style="display: grid; justify-content: center; align-items: center; border: 3px dotted var(--card-border-color); box-shadow: none;"
          >
            <div class="tittleWalletHome" style="color: var(--home-total-money)">${lang.add} +</div>
          </div>
        </div>`;
      } else {
        let toInner = '';
        toInner += `<div class="walletsContainer" onclick="fn.load('pages/moneyPage/money.html')">`;

        for (let i = 0; i < moneys.length; i++) {
          let mName = moneys[i].moneyName;
          let mMoney = formatMoney(moneys[i].moneyCurrent);
          let mGradient = moneys[i].moneyGradient;
          toInner += `<div class="wallet" style="background: var(${mGradient})">
            <div class="tittleWalletHome">${mName}</div>
            <div class="walletMoneyAmount">
              $
              <span id="${mName}-money"> ${mMoney} </span>
            </div>
          </div>`;
        }
        toInner += `</div>`;
        userHomeView.innerHTML += toInner;
      }
    } else {
      userHomeView.innerHTML += ` <label class="cardHomeTitle cardHomeTitleBolder"
          >${lang.myMoney}
          <span
            onclick="pushToNewMoney()"
            style="right: 20px;
          position: absolute;
          font-size: 14px;
          color: var(--text-without-card);
          font-weight: 500;"
            >${lang.add} +</span
          >
        </label>
        <div class="walletsContainer" onclick="fn.load('pages/moneyPage/money.html')">
          <div
            class="wallet"
            style="display: grid; justify-content: center; align-items: center; border: 3px dotted var(--card-border-color); box-shadow: none;"
          >
            <div class="tittleWalletHome" style="color: var(--home-total-money)">${lang.add} +</div>
          </div>
        </div>`;
    }
  }

  // DONA CON LOS GASTOS EN LAS DIFERENTES CATEGORÍAS
  let expenses = localStorage.getItem('storageSwitchExpenses');
  if (Boolean(expenses) === true) {
    userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder"
      >${lang.expenses}</label
    >`;
    userHomeView.innerHTML += `<ons-card
      onclick="fn.load('pages/expensePage/expenses.html')"
      style="padding-top: 16px;"
    >
      <div class="content">
        <canvas id="oilChart" width="400" height="400"></canvas>
      </div>
    </ons-card>`;
  }

  // DINERO AHORRADO
  let savings = localStorage.getItem('storageSwitchSavings');
  if (Boolean(savings) === true) {
    userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder">${lang.savedMoney}</label>`;
    userHomeView.innerHTML += `<ons-card
      onclick="fn.load('pages/savingPage/savings.html')"
    >
      <div style="display: flex; align-items: center;">
        <div class="iconSavedMoney" style="display: flex; justify-content: space-around;">
          <img src="./assets/icons/savingOption.png" alt="saving icon" />
        </div>
        <div class="title totalMoneyTitle" style="color: var(--card-text-title-color);">
          $
          <span class="totalMoneyTitle" id="totalSavingsAmount" style="margin-left:0">
          </span>
        </div>
      </div>
    </ons-card>`;
  }

  // GOALS DEL USUARIO
  let goals = localStorage.getItem('storageSwitchGoals');
  if (Boolean(goals) === true) {
    userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder"
      >${lang.goals}
      <span
        onclick="pushToNewGoal()"
        style="right: 20px;
          position: absolute;
          font-size: 14px;
          color: var(--text-without-card);
          font-weight: 500;"
        >${lang.add} +</span
      >
    </label>`;
    userHomeView.innerHTML += ` <div
      class="content"
      id="homeGoalsContainer"
      onclick="fn.load('pages/goalPage/goals.html')"
      style="margin-bottom: 40px"
    ></div>`;
  }

  // SI EL USUARIO NO DECIDE MOSTRAR NADA
  if (
    Boolean(totalMoney) === false &&
    Boolean(expenses) === false &&
    Boolean(savings) === false &&
    Boolean(goals) === false
  ) {
    userHomeView.innerHTML = '';
    userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder">${lang.nothingHere}</label>`;
  }

  // FORMATO AL DINERO TOTAL
  if (Boolean(totalMoney) === true) {
    let amount = formatMoney(getTotalMoney());
    document.getElementById('totalMoneyMoney').innerHTML = amount;
  }

  // CREO LA DONA
  if (Boolean(expenses) === true) {
    makeChart();
  }

  // FORMATO AL DINERO AHORRADO
  if (Boolean(savings) === true) {
    let amount = formatMoney(getTotalSavings());
    document.getElementById('totalSavingsAmount').innerHTML = amount;
  }

  // CARGO LAS METAS UNA VEZ BUSCADAS
  if (Boolean(goals) === true) {
    let goals = getTotalGoals();
    document.getElementById('homeGoalsContainer').innerHTML = goals;
  }
}

// SUMO EL DINERO DE TODAS LAS CARTERAS
function getTotalMoney() {
  let arrayMoney = JSON.parse(localStorage.getItem('moneyStorage'));
  let amount = 0;
  if (arrayMoney === null) {
    return amount;
  }
  for (let i = 0; i < arrayMoney.length; i++) {
    amount += +arrayMoney[i].moneyCurrent;
  }
  return amount.toFixed(2);
}

// CONSIGO LA CANTIDAD AHORRADA DEL STORAGE
function getTotalSavings() {
  let storage = localStorage.getItem('savedMoneySaving');
  if (storage == null || storage == '') {
    storage = 0;
  }
  return storage;
}

// CONSIGO LAS METAS DEL USUARIO Y LAS HAGO UNA STRINGLIST
function getTotalGoals() {
  let goals = JSON.parse(localStorage.getItem('goalStorage'));
  let lang = getLang('home');
  let goalsView = '';

  if (goals === null || goals.length == 0 || goals.length < 1) {
    goalsView += `<p
      class="homeGoalLabel"
      style="text-align:center; margin-bottom:0px"
    >
      ${lang.nothingHere}
    </p>`;

    return goalsView;
  }

  for (let i = 0; i < goals.length; i++) {
    let { goalName, goalMoney, goalActualMoney, goalGradient, iconName, iconUrl } =
      goals[i];

    let gMoneyTS = formatMoney(goalMoney);
    let gAMoneyTS = formatMoney(goalActualMoney);

    let gPercent = getPercent(goalMoney, goalActualMoney);

    goalsView += `<div
      onclick="findGoal('${goalName}')"
      class="goalCard"
      style="background: var(${goalGradient})"
    >
      <div class="content">
        <span style="font-weight: 900; font-size: 24px"
          >$ ${gAMoneyTS}
          <span style="font-weight: 500; font-size: 16px">/ $ ${gMoneyTS}</span></span
        >
        <div class="progressBarContainer">
          <div
            class="progressBarPercent"
            style="--width: ${gPercent}"
            id="${goalName}-pbar"
          ></div>
        </div>
        <div class="goalInfo">
          <div>
            <img src="${iconUrl}${iconName}" alt="saving icon" style="width: 32px" />
          </div>
          <div class="title goalTitle" id="titleGoal">${goalName}</div>
        </div>
      </div>
    </div>`;
  }

  return goalsView;
}

//Borra todos los datos, se accede por la configuración
function deleteAllData() {
  let lang = getLang('home');
  ons.notification.confirm({
    message: lang.deleteAll,
    title: lang.notice,
    buttonLabels: [lang.confirm, lang.cancel],
    animation: 'default',
    primaryButtonIndex: 1,
    cancelable: true,
    callback: function (index) {
      if (0 === index) {
        //deleteProperty();
        setTheme('theme-default');
        localStorage.clear();
        sessionStorage.clear();

        const navigator = document.querySelector('#navigator');
        navigator.resetToPage('pages/userPage/splitterUser.html');
      } else {
        ons.notification.toast(lang.allNormal, {
          title: 'Aviso!',
          timeout: 1000,
          animation: 'ascend',
        });
      }
    },
  });
}
