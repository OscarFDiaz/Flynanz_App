//Inicializo el chart que estara en el menú inicio
function makeChart() {
  var config = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      },
    ],
  };

  loadChartData(config);
}

function loadChartData(expenseData) {
  let expenses = JSON.parse(localStorage.getItem('expenseStorage'));
  let language = localStorage.getItem('storageSwitchLanguage');
  let entry = false;
  if (expenseData.datasets.length > 0) {
    if (expenses == null || expenses == '') {
      if (language == 'false') {
        expenseData.labels.push('NO EXPENSES TO SHOW');
      } else {
        expenseData.labels.push('NO HAY GASTOS PARA MOSTRAR');
      }
      expenseData.datasets[0].data.push('000.01');
      expenseData.datasets[0].backgroundColor.push(
        getComputedStyle(document.documentElement).getPropertyValue('--home-total-money')
      );
    } else {
      for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].toShow == true) {
          // Si el usuario decide que se muestre en la dona
          let eName = expenses[i].expenseName;
          let eColor = expenses[i].expenseColor;
          let eExpense = expenses[i].totalExpense;

          expenseData.labels.push(eName);
          expenseData.datasets[0].data.push(eExpense);
          expenseData.datasets[0].backgroundColor.push(eColor);
          entry = true;
        }
      }
      if (!entry) {
        if (language == 'false') {
          expenseData.labels.push('NO EXPENSES ACTIVATED');
        } else {
          expenseData.labels.push('NO HAY GASTOS ACTIVADOS');
        }
        expenseData.datasets[0].data.push('100');
        expenseData.datasets[0].backgroundColor.push(
          getComputedStyle(document.documentElement).getPropertyValue('--home-total-money')
        );
      }
    }
  }

  let expenseCanvas = document.getElementById('oilChart');
  Chart.defaults.global.defaultFontColor = getComputedStyle(document.documentElement).getPropertyValue('--card-text-title-color');
  Chart.defaults.global.defaultFontSize = 16;
  Chart.defaults.RoundedDoughnut = Chart.helpers.clone(Chart.defaults.doughnut);

  Chart.defaults.global.tooltips.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--toolbar-color');
  Chart.defaults.global.tooltips.titleFontSize = 20;

  Chart.defaults.global.elements.arc.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(
    '--card-back-color'
  );
  Chart.defaults.global.elements.arc.borderColor = getComputedStyle(document.documentElement).getPropertyValue(
    '--card-back-color'
  );
  Chart.defaults.global.elements.arc.borderWidth = 0;

  Chart.defaults.RoundedDoughnut = Chart.helpers.clone(Chart.defaults.doughnut);
  Chart.controllers.RoundedDoughnut = Chart.controllers.doughnut.extend({
    draw: function (ease) {
      var ctx = this.chart.ctx;
      var easingDecimal = ease || 1;
      var arcs = this.getMeta().data;

      Chart.helpers.each(arcs, function (arc, i) {
        arc.transition(easingDecimal).draw();

        var pArc = arcs[i === 0 ? arcs.length - 1 : i - 1];
        var pColor = pArc._view.backgroundColor;

        var vm = arc._view;
        var radius = (vm.outerRadius + vm.innerRadius) / 2;
        var thickness = (vm.outerRadius - vm.innerRadius) / 2;
        var startAngle = Math.PI - vm.startAngle - Math.PI / 2;
        var angle = Math.PI - vm.endAngle - Math.PI / 2;

        ctx.save();
        ctx.translate(vm.x, vm.y);

        ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor;
        ctx.beginPath();
        ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = vm.backgroundColor;
        ctx.beginPath();
        ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI);
        ctx.fill();

        ctx.restore();
      });
    },
  });

  let pieChart = new Chart(expenseCanvas, {
    type: 'RoundedDoughnut',
    data: expenseData,
    options: {
      cutoutPercentage: 75,
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
      tooltips: {
        callbacks: {
          title: function (tooltipItem, data) {
            return data['labels'][tooltipItem[0]['index']];
          },
          label: function (tooltipItem, data) {
            return '$ ' + data['datasets'][0]['data'][tooltipItem['index']];
          },
        },
      },
    },
  });

  pieChart.update();
}
///////////////////////////////////////////////////

// Tema seleccionado por el usuario
function changeTheme() {
  let actualThemeIndex = sessionStorage.getItem('themeIndex');
  let language = localStorage.getItem('storageSwitchLanguage');

  if (actualThemeIndex == '0') {
    deleteProperty();
    setTheme('theme-default');
    if (language == 'false') {
      document.getElementById('buttonSelectTheme').innerHTML = 'CURRENT THEME';
    } else {
      document.getElementById('buttonSelectTheme').innerHTML = 'TEMA ACTUAL';
    }
  } else if (actualThemeIndex == '1') {
    deleteProperty();
    setTheme('theme-dark');
    if (language == 'false') {
      document.getElementById('buttonSelectTheme').innerHTML = 'CURRENT THEME';
    } else {
      document.getElementById('buttonSelectTheme').innerHTML = 'TEMA ACTUAL';
    }
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
  let language = localStorage.getItem('storageSwitchLanguage');
  if (getTheme(themeName)) {
    //EL TEMA SELECCIONADO YA ESTA PUESTO

    if (language == 'false') {
      ons.notification.toast('You currently have this theme on, cool right?', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('Actualmente tienes este tema puesto, esta chevere, verdad?', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
  } else {
    //Si no es el mismo tema lo cambio
    localStorage.setItem('userTheme', themeName);
    document.documentElement.className = themeName;

    if (language == 'false') {
      ons.notification.toast('The theme was changed correctly, you have good tastes!', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('Se cambio el tema correctamente, tienes buenos gustos!', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
  }
}
/////////////////////////////////////

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
  let language = localStorage.getItem('storageSwitchLanguage');

  userHomeView.innerHTML = '';

  // DINERO TOTAL EN LAS CUENTAS
  let totalMoney = localStorage.getItem('storageSwitchTotalMoney');
  if (totalMoney == true || totalMoney == 'true') {
    if (language == 'false') {
      userHomeView.innerHTML += `
      <div onclick="fn.load('money.html')" class="divTotalBalance">
      <label class="cardHomeTitle cardHomeTitleBalance" style="margin-left: 0px">Total balance</label>
      <div class="title totalMoneyTitle" style="color: var(--card-text-title-color); display: block;">$ 
        <span class="totalMoneyTitle" id="totalMoneyMoney" style="margin-left: 0px">
        </span>
      </div>
    </div>`;
    } else {
      userHomeView.innerHTML += `
      <div onclick="fn.load('money.html')" class="divTotalBalance">
      <label class="cardHomeTitle cardHomeTitleBalance" style="margin-left: 0px">Dinero total</label>
      <div class="title totalMoneyTitle" style="color: var(--card-text-title-color); display: block">$ 
        <span class="totalMoneyTitle" id="totalMoneyMoney" style="margin-left: 0px">
        </span>
      </div>
    </div>`;
    }
  }

  // CARTERAS
  let wallet = localStorage.getItem('storageSwitchWallet');
  if (wallet == true || wallet == 'true') {
    // CONSIGO LAS CARTERAS CREADAS
    let moneys = JSON.parse(localStorage.getItem('moneyStorage'));
    if (moneys != null) {
      if (language == 'false') {
        userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder">Wallets</label>`;
      } else {
        userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder">Mi dinero</label>`;
      }

      let toInner = '';
      toInner += `<div class="walletsContainer" onclick="fn.load('money.html')">`;

      // TODO
      /**
       * Crear botón para que el usuario haga una nueva cartera Punteado
       */

      for (let i = 0; i < moneys.length; i++) {
        let mName = moneys[i].moneyName;
        let mMoney = formatMoney(moneys[i].moneyCurrent);
        toInner += `
          <div class="wallet">
            <div class="tittleWallet">
              ${mName}
            </div>
            <div class="walletMoneyAmount">$ 
              <span id="${mName}-money">
                ${mMoney}
              </span>
            </div>
          </div>`;
      }
      toInner += `</div>`;
      userHomeView.innerHTML += toInner;
    }
  }

  // DONA CON LOS GASTOS EN LAS DIFERENTES CATEGORIAS
  let expenses = localStorage.getItem('storageSwitchExpenses');
  if (expenses == true || expenses == 'true') {
    if (language == 'false') {
      userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder">Expenses</label>`;
    } else {
      userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder">Gastos</label>`;
    }
    userHomeView.innerHTML += `<ons-card onclick="fn.load('expenses.html')" style="padding-top: 16px;">
      <div class="content">
        <canvas id="oilChart" width="400" height="400"></canvas>
      </div>
    </ons-card>`;
  }

  // DINERO AHORRADO
  let savings = localStorage.getItem('storageSwitchSavings');
  if (savings == true || savings == 'true') {
    if (language == 'false') {
      userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder">Saved money</label>`;
    } else {
      userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder">Dinero ahorrado</label>`;
    }
    userHomeView.innerHTML += `<ons-card onclick="fn.load('savings.html')">
    <div style="display: flex; align-items: center;">
      <div class="iconSavedMoney">
      <ion-icon name="wallet" class="iconMoney" style="font-size: 32px"></ion-icon>
      </div>
      <div class="title totalMoneyTitle" style="color: var(--card-text-title-color);">$
        <span class="totalMoneyTitle" id="totalSavingsAmount" style="margin-left:0">
      </span>
      </div>
    </div>
    </ons-card>`;
  }

  // METAS DEL USUARIO
  let goals = localStorage.getItem('storageSwitchGoals');
  if (goals == true || goals == 'true') {
    if (language == 'false') {
      userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder">Goals</label>`;
    } else {
      userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder">Metas</label>`;
    }
    userHomeView.innerHTML += `<ons-card onclick="fn.load('goals.html')">
      <div class="content" id="homeGoalsContainer"> 
      </div>
    </ons-card>`;
  }

  // SI EL USUARIO NO DECIDE MOSTRAR NADA
  if (totalMoney == 'false' && expenses == 'false' && savings == 'false' && goals == 'false') {
    userHomeView.innerHTML = '';

    // ******* AÑADIR IMAGEN DE QUE NO HAY NADA Y BOTON PARA IR A LOS AJUSTES
    if (language == 'false') {
      userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder">Nothing here...</label>`;
    } else {
      userHomeView.innerHTML += `<label class="cardHomeTitle cardHomeTitleBolder">Nada por aquí...</label>`;
    }
  }

  // FORMATO AL DINERO TOTAL
  if (totalMoney == 'true') {
    let amount = formatMoney(getTotalMoney());
    document.getElementById('totalMoneyMoney').innerHTML = amount;
  }

  // CREO LA DONA
  if (expenses == 'true') {
    makeChart();
  }

  // FORMATO AL DINERO AHORRADO
  if (savings == 'true') {
    let amount = formatMoney(getTotalSavings());
    document.getElementById('totalSavingsAmount').innerHTML = amount;
  }

  // CARGO LAS METAS UNA VEZ BUSCADAS
  if (goals == 'true') {
    let goals = getTotalGoals();
    document.getElementById('homeGoalsContainer').innerHTML = goals;
  }
}

// SUMO EL DINERO DE TODAS LAS CARTERAS
function getTotalMoney() {
  let arrayMoney = JSON.parse(localStorage.getItem('moneyStorage'));
  let amount = 0;
  if (arrayMoney == null || arrayMoney == '') {
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

// FUNCION DESCONOCIDA
function getTotalExpenses() {
  return true;
}

// CONSIGO LAS METAS DEL USUARIO Y LAS HAGO UNA STRINGLIST
function getTotalGoals() {
  let goals = JSON.parse(localStorage.getItem('goalStorage'));
  let language = localStorage.getItem('storageSwitchLanguage');
  let goalsView = '';

  if (goals == null || goals == 'null' || goals.length == 0 || goals.length < 1) {
    if (language == 'false') {
      goalsView += `<p class="homeGoalLabel" style="text-align:center; margin-bottom:0px">Nothing here...</p>`;
    } else {
      goalsView += `<p class="homeGoalLabel" style="text-align:center; margin-bottom:0px">Nada por aquí...</p>`;
    }

    return goalsView;
  }

  for (let i = 0; i < goals.length; i++) {
    let gName = goals[i].goalName;
    let gMoney = goals[i].goalMoney;
    let gAMoney = goals[i].goalActualMoney;

    let gPercent = getPercent(gMoney, gAMoney);

    goalsView += `<label class="homeGoalLabel">${gName}</label>
    <div class="progressBarContainer">
      <div class="progressBarPercent" style="--width: ${gPercent};"></div>
    </div>`;
  }

  return goalsView;
}

//Borra todos los datos, se accede por la configuración
function deleteAllData() {
  let language = localStorage.getItem('storageSwitchLanguage');
  if (language == 'false') {
    ons.notification.confirm({
      message: 'Are you sure to delete EVERYTHING?',
      title: 'Notice!',
      buttonLabels: ['Yes', 'Cancel'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          deleteProperty();
          setTheme('theme-default');
          localStorage.clear();
          sessionStorage.clear();

          const navigator = document.querySelector('#navigator');
          navigator.resetToPage('splitterUser.html');
        } else {
          ons.notification.toast('Okay, everything flows as normal!', {
            title: 'Notice!',
            timeout: 1000,
            animation: 'ascend',
          });
        }
      },
    });
  } else {
    ons.notification.confirm({
      message: '¿Estas seguro de borrar TODO?',
      title: 'Aviso!',
      buttonLabels: ['Sí', 'Cancelar'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          deleteProperty();
          setTheme('theme-default');
          localStorage.clear();
          sessionStorage.clear();

          const navigator = document.querySelector('#navigator');
          navigator.resetToPage('splitterUser.html');
        } else {
          ons.notification.toast('De acuerdo, todo fluye como normalmente!', {
            title: 'Aviso!',
            timeout: 1000,
            animation: 'ascend',
          });
        }
      },
    });
  }
}
