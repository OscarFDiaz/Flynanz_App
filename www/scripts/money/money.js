function makeNewMoney() {
  let lang = getLang('money');

  let moneyName = document.getElementById('newMoneyName').value;
  let moneyCurrent = document.getElementById('newMoneyMoney').value;
  let moneyGradient = sessionStorage.getItem('tempGradient');

  if (moneyName === '') {
    ons.notification.toast(lang.noName, {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (moneyCurrent === '') {
    moneyCurrent = '0.00';
  } else {
    moneyCurrent = parseFloat(moneyCurrent).toFixed(2);
  }

  let testMoney = Math.sign(moneyCurrent);
  if (testMoney === -1 || testMoney === -0) {
    ons.notification.toast(lang.noNegative1, {
      title: 'Error!',
      timeout: 3000,
      animation: 'ascend',
    });
    moneyCurrent = '0.00';
  }

  if (moneyGradient == null || moneyGradient == '') {
    ons.notification.toast(lang.noColor, {
      title: 'Error!',
      timeout: 3000,
      animation: 'ascend',
    });
    return;
  }

  let money = {
    moneyName,
    moneyCurrent,
    moneyGradient,
  };

  if (localStorage.getItem('moneyStorage') === null) {
    let moneyArray = [];
    moneyArray.push(money);
    localStorage.setItem('moneyStorage', JSON.stringify(moneyArray));
  } else {
    let moneyArray = JSON.parse(localStorage.getItem('moneyStorage'));
    moneyArray.push(money);
    localStorage.setItem('moneyStorage', JSON.stringify(moneyArray));
  }

  ons.notification.toast(`${lang.newMoney} ${moneyName} ${lang.added}`, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

  try {
    getMoneys();
    functionPopPage();
  } catch (error) {
    functionPopPage();
    return;
  }

  let cIndex = localStorage.getItem('currentDot');
  showExpensesPerWallet(searchWalletByIndex(cIndex));

  document.getElementById('carousel2').addEventListener('postchange', function (event) {
    let cIndex = event.activeIndex;
    let laIndex = event.lastActiveIndex;

    localStorage.setItem('currentDot', cIndex);

    document.getElementById(`indicator${cIndex}`).innerHTML = ' ● ';
    if (document.getElementById(`indicator${laIndex}`) != null) {
      document.getElementById(`indicator${laIndex}`).innerHTML = ' ○ ';
    }
    showExpensesPerWallet(searchWalletByIndex(cIndex));
  });
}

function getMoneys() {
  let moneys = JSON.parse(localStorage.getItem('moneyStorage'));
  let moneyView = document.getElementById('moneyContainer');
  let totalMoneyContainer = document.getElementById('totalMoneyContainer');
  let cardExpenses = document.getElementById('cardExpensesContainer');
  let tutorialView = document.getElementById('tutorialContainer');

  let lang = getLang('money');

  let toInner = '';

  moneyView.innerHTML = '';

  let moneyTutorial = '';
  moneyTutorial = `<ons-card>
    <ons-list style="background: none;" id="expenseListOfExpensesContainer">
      <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
        <label class="iconExpenseLabel" style="margin-left: 32px;"> ${lang.read} </label>
        <div
          class="expandable-content"
          id="expenseListOfExpenses"
          style="grid-template-columns: 1fr;"
        >
          <p class="paraTutorial">
            ${lang.read1}
          </p>
          <p class="paraTutorial">
            ${lang.read2}
          </p>
          <p class="paraTutorial">
            ${lang.read3}
          </p>
          <p class="paraTutorial">
            ${lang.read4}
          </p>
          <p class="paraTutorial">
            ${lang.read5}
          </p>
        </div>
      </ons-list-item>
    </ons-list>
  </ons-card>`;

  if (moneys === null) {
    let tutorial = localStorage.getItem('storageSwitchTutorial');
    if (Boolean(tutorial) === true) {
      tutorialView.innerHTML = `${moneyTutorial}`;
    }
    totalMoneyContainer.innerHTML = '';
    return;
  } else if (moneys.length == 0) {
    let tutorial = localStorage.getItem('storageSwitchTutorial');
    if (Boolean(tutorial) === true) {
      tutorialView.innerHTML = `${moneyTutorial}`;
    }
    totalMoneyContainer.innerHTML = '';
    return;
  } else {
    tutorialView.innerHTML = '';
  }

  let totalMoney = formatMoney(getTotalMoney());
  // CARGA DEL DINERO TOTAL
  totalMoneyContainer.innerHTML = ` <ons-card>
    <label
      style="color: var(--text-without-card); display: block; padding: 16px 0px 0px 16px;"
      >${lang.yourMoney}:</label
    >
    <div
      class="title totalMoneyTitle"
      style="color: var(--card-text-title-color); display: block; text-align:left; padding-top: 0;"
    >
      $
      <span class="totalMoneyTitle" id="totalMoneyMoney"> ${totalMoney} </span>
    </div>
  </ons-card>`;
  cardExpenses.innerHTML = `<ons-list
    style="background: none;"
    id="expenseListOfExpensesContainer"
  >
    <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
      <label class="iconExpenseLabel" style="margin-left: 16px;"> ${lang.seeExpenses} </label>
      <div
        class="expandable-content"
        id="moneyListOfExpenses"
        style="grid-template-columns: 1fr;"
      >
        <!-- AQUI SE CARGAN LOS GASTOS -->
      </div>
    </ons-list-item>
  </ons-list>`;

  let currentIndexStorage = localStorage.getItem('currentDot');
  if (currentIndexStorage == null) {
    localStorage.setItem('currentDot', 0);
    currentIndexStorage = 0;
  }

  toInner += `<ons-carousel fullscreen swipeable auto-scroll overscrollable id="carousel2" initial-index="${currentIndexStorage}">`;
  let cardsCounter = 0;
  for (let i = 0; i < moneys.length; i++) {
    let { moneyName, moneyGradient } = moneys[i];
    let mMoney = formatMoney(moneys[i].moneyCurrent);

    toInner += ` <ons-carousel-item
      class="moneyCard"
      style="background: var(${moneyGradient})"
    >
      <div class="title moneyTitle">
        ${moneyName}
        <img
          src="./assets/icons/editButtonBlack.png"
          alt="saving icon"
          style="width: 32px; position: absolute; right: 20px"
          onclick="modifyMoney('${moneyName}')"
        />
      </div>
      <div class="content">
        <div
          class="title totalMoneyTitle"
          style="display: block; text-align:left; padding-top: 0px; padding-bottom: 16px; font-weight: 500;"
        >
          <span class="moneyInfo" id="${moneyName}-money"> $ ${mMoney} </span>
        </div>
      </div>
      <ons-button
        class="moneyButtonAdd"
        style="margin-bottom: 16px; margin-left: 0px"
        onclick="addMoneyTo('${moneyName}')"
      >
        ${lang.modifyMoney}
      </ons-button>
      <ons-button
        class="moneyButtonDe"
        style="margin-bottom: 16px; background: none"
        onclick="deleteMoney('${moneyName}')"
      >
        ${lang.delete}
      </ons-button>
    </ons-carousel-item>`;
    cardsCounter++;
  }
  toInner += `</ons-carousel>`;

  // Pongo los puntos
  let indicatorsAmount = '';
  toInner += `<div class="cover-label" id="dotsContainer">`;
  for (let i = 0; i < cardsCounter; i++) {
    if (i == localStorage.getItem('currentDot')) {
      indicatorsAmount += `<span class="indicators" id="indicator${i}"> ● </span>`;
    } else {
      indicatorsAmount += `<span class="indicators" id="indicator${i}"> ○ </span>`;
    }
  }
  toInner += `${indicatorsAmount} </div>`;

  // INSERTO TODO
  moneyView.innerHTML = toInner;

  sessionStorage.clear();
}

function deleteMoney(sendMoneyName) {
  let lang = getLang('money');
  ons.notification.confirm({
    message: lang.sureDelete,
    title: lang.notice,
    buttonLabels: [lang.confirm, lang.cancel],
    animation: 'default',
    primaryButtonIndex: 1,
    cancelable: true,
    callback: function (index) {
      if (0 === index) {
        let moneys = JSON.parse(localStorage.getItem('moneyStorage'));

        for (let i = 0; i < moneys.length; i++) {
          if (moneys[i].moneyName == sendMoneyName) {
            moneys.splice(i, 1);
            break;
          }
        }
        localStorage.setItem('moneyStorage', JSON.stringify(moneys));

        localStorage.setItem('currentDot', 0);

        getMoneys();
        let cIndex = localStorage.getItem('currentDot');
        showExpensesPerWallet(searchWalletByIndex(cIndex));

        if (document.getElementById('carousel2') != null) {
          document
            .getElementById('carousel2')
            .addEventListener('postchange', function (event) {
              let cIndex = event.activeIndex;
              let laIndex = event.lastActiveIndex;

              localStorage.setItem('currentDot', cIndex);

              document.getElementById(`indicator${cIndex}`).innerHTML = ' ● ';
              if (document.getElementById(`indicator${laIndex}`) != null) {
                document.getElementById(`indicator${laIndex}`).innerHTML = ' ○ ';
              }
              showExpensesPerWallet(searchWalletByIndex(cIndex));
            });
        }

        ons.notification.toast(lang.deleted, {
          title: 'Aviso!',
          timeout: 2000,
          animation: 'ascend',
        });
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

function addMoneyTo(sendMoneyName) {
  let moneys = JSON.parse(localStorage.getItem('moneyStorage'));

  for (let i = 0; i < moneys.length; i++) {
    let mName = moneys[i].moneyName;

    if (mName == sendMoneyName) {
      let mMoney = moneys[i].moneyCurrent;
      let mGradient = moneys[i].moneyGradient;

      let findMoneyObject = {
        moneyName: mName,
        moneyCurrent: mMoney,
        moneyGradient: mGradient,
      };

      if (sessionStorage.getItem('sessionFindMoney') === null) {
        sessionStorage.setItem('sessionFindMoney', JSON.stringify(findMoneyObject));
      } else {
        sessionStorage.removeItem('sessionFindMoney');
        sessionStorage.setItem('sessionFindMoney', JSON.stringify(findMoneyObject));
      }
      createAlertDialogToEditMoneyMoney();
      break;
    }
  }
}

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

/* Muestra los gastos de cada cartera*/
function showExpensesPerWallet(walletName) {
  let lang = getLang('money');

  let detailDetailExpenseView = document.getElementById('moneyListOfExpenses');
  if (detailDetailExpenseView == null) {
    return;
  }
  detailDetailExpenseView.innerHTML = '';

  let expensesDetail = JSON.parse(localStorage.getItem('expenseDetailStorage'));

  let actualEx = 0;
  if (expensesDetail !== null) {
    //for para ver si existe la wallet
    for (let i = 0; i < expensesDetail.length; i++) {
      if (expensesDetail[i].inWallet == walletName) {
        actualEx = 1;
        break;
      }
    }
  }

  if (actualEx == 0) {
    detailDetailExpenseView.innerHTML = `<div style="margin-bottom: 30px;">
      <label class="labelDetailExpense" style="text-align:center"
        >${lang.nothing}</label
      >
    </div>`;
  } else {
    for (let i = 0; i < expensesDetail.length; i++) {
      if (expensesDetail[i].inWallet == walletName) {
        let { inName, inDate, inID } = expensesDetail[i];

        let iAmount = formatMoney(expensesDetail[i].inAmount);

        let today = new Date().toJSON().slice(0, 10);
        let days = dateDiff(today, inDate);

        if (inDate === '') {
          inDate = lang.noDate;
        } else {
          if (Math.sign(days) == 1 || Math.sign(days) == '1') {
            inDate = `${lang.in} ${days} ${lang.days}`;
          } else if (Math.sign(days) == '-1' || Math.sign(days) == -1) {
            inDate = `${lang.ago} ${Math.abs(days)} ${lang.days}`;
          } else if (Math.sign(days) == '0' || Math.sign(days) == 0) {
            inDate = lang.today;
          }
        }

        detailDetailExpenseView.innerHTML += `<ons-list-item
          style="margin-top: -16px;"
          modifier="nodivider"
        >
          <div class="center" style="margin-right: 16px">
            <div style="max-width: 50%;">
              <label
                class="list-item__title labelDetailExpense"
                style="text-align:left; margin-left:16px; font-size:22px"
                >${inName}</label
              >
              <label
                class="list-item__subtitle labelDetailExpense"
                style="padding-top: 0px; font-size: 16px; text-align:left; margin-left:16px"
                >${inDate}</label
              >
            </div>
            <div style="margin-left: auto; margin-right: 0px;">
              <span
                class="labelInfoDetailExpense"
                style="font-size:26px; color: var(--expense-detail)"
                >$</span
              >
              <span class="labelInfoDetailExpense" style="font-size:26px;"
                >${iAmount}</span
              >
            </div>
          </div>
        </ons-list-item>`;
      }
    }
  }
}

function modifyMoney(sendMoneyName) {
  let moneys = JSON.parse(localStorage.getItem('moneyStorage'));

  for (let i = 0; i < moneys.length; i++) {
    let mName = moneys[i].moneyName;

    if (mName == sendMoneyName) {
      let { moneyCurrent, moneyGradient, moneyName } = moneys[i];

      sessionStorage.setItem('tempGradient', moneyGradient);

      let findMoneyObject = {
        moneyName,
        moneyCurrent,
        moneyGradient,
      };

      if (sessionStorage.getItem('sessionFindMoney') === null) {
        sessionStorage.setItem('sessionFindMoney', JSON.stringify(findMoneyObject));
      } else {
        sessionStorage.removeItem('sessionFindMoney');
        sessionStorage.setItem('sessionFindMoney', JSON.stringify(findMoneyObject));
      }
      const navigator = document.querySelector('#navigator');
      navigator.pushPage('pages/moneyPage/editMoney.html');
      break;
    }
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

function saveEditMoney() {
  let sName = localStorage.getItem('nameSaved');

  let name = document.getElementById('editMoneyName').value;
  let actualMoney = parseFloat(document.getElementById('editMoneyMoney').value).toFixed(
    2,
  );

  let moneyGradient = sessionStorage.getItem('tempGradient');

  let moneys = JSON.parse(localStorage.getItem('moneyStorage'));

  let lang = getLang('money');

  let testMoney = Math.sign(actualMoney);

  if (name === '') {
    ons.notification.toast(lang.noName, {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (actualMoney == '' || actualMoney == null || actualMoney == 'NaN') {
    actualMoney = '0.00';
  }

  if (testMoney === -1 || testMoney === -0) {
    ons.notification.toast(lang.noNegative, {
      title: 'Notice!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (moneyGradient == null || moneyGradient == '') {
    moneyGradient = '--gradient_1';
  }

  for (let i = 0; i < moneys.length; i++) {
    if (moneys[i].moneyName == sName) {
      indexGoal = i; //Pongo la posición donde esta mi objeto que modificare

      let updateMoneyObject = {
        moneyName: name,
        moneyCurrent: actualMoney,
        moneyGradient: moneyGradient,
      };

      if (localStorage.getItem('moneyStorage') === null) {
        let moneysArray = [];
        moneysArray.push(updateMoneyObject);
        localStorage.setItem('moneyStorage', JSON.stringify(moneysArray));
      } else {
        moneys[indexGoal] = updateMoneyObject;
        localStorage.setItem('moneyStorage', JSON.stringify(moneys));
      }
      localStorage.removeItem('nameSaved');
      sessionStorage.clear();
      break;
    }
  }

  ons.notification.toast(`${lang.money} ${name} ${lang.modified}`, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

  try {
    functionPopPage();
    getMoneys();
  } catch (error) {
    functionPopPage();
    return;
  }
}
