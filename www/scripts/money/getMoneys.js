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

  let tutorial = localStorage.getItem('storageSwitchTutorial');
  if (moneys === null) {
    if (Boolean(tutorial) === true) {
      tutorialView.innerHTML = `${moneyTutorial}`;
    }
    totalMoneyContainer.innerHTML = '';
    return;
  } else if (moneys.length == 0) {
    if (Boolean(tutorial) === true) {
      tutorialView.innerHTML = `${moneyTutorial}`;
    }
    totalMoneyContainer.innerHTML = '';
    cardExpenses.innerHTML = '';
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

  cardExpenses.innerHTML = `<ons-card
      ><ons-list style="background: none;" id="expenseListOfExpensesContainer">
        <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
          <label class="iconExpenseLabel" style="margin-left: 16px;">
            ${lang.seeExpenses}
          </label>
          <div
            class="expandable-content"
            id="moneyListOfExpenses"
            style="grid-template-columns: 1fr;"
          >
            <!-- AQUI SE CARGAN LOS GASTOS -->
          </div>
        </ons-list-item>
      </ons-list></ons-card
    >`;

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
