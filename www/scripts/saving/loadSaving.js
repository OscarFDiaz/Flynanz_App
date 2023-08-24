function loadSaving() {
  let sView = document.getElementById('savingMainContainer');
  let savingStorage = JSON.parse(localStorage.getItem('savingStorage'));
  let lang = getLang('saving');

  sView.innerHTML = '';

  savingTutorial = `<ons-card>
    <ons-list style="background: none;" id="expenseListOfExpensesContainer">
      <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
        <label class="iconExpenseLabel" style="margin-left: 32px;"> ${lang.read} </label>
        <div
          class="expandable-content"
          id="expenseListOfExpenses"
          style="grid-template-columns: 1fr;"
        >
          <p class="paraTutorial">${lang.read1}</p>
          <p class="paraTutorial">${lang.read2}</p>
          <p class="paraTutorial">${lang.read3}</p>
          <p class="paraTutorial">${lang.read4}</p>
          <p class="paraTutorial">${lang.read5}</p>
          <p class="paraTutorial">${lang.read6}</p>
          <p class="paraTutorial">${lang.read7}</p>
        </div>
      </ons-list-item>
    </ons-list>
  </ons-card>`;

  if (savingStorage === null) {
    let tutorial = localStorage.getItem('storageSwitchTutorial');
    if (Boolean(tutorial) === true) {
      sView.innerHTML += `${savingTutorial}`;
    }
    return;
  }

  let sTakedAmount = formatMoney(parseFloat(savingStorage.equivalentAmount).toFixed(2));
  let sMoneyDay = formatMoney(savingStorage.toExpend);
  let sDaysLeft = savingStorage.daysLeft;
  let sMoneyDayLeft = formatMoney(savingStorage.moneyLeft);
  let savedMoney = localStorage.getItem('savedMoneySaving');

  if (savedMoney === null || savedMoney === '0') {
    savedMoney = 0.0;
  }

  sView.innerHTML = `<div style="margin: 20px">
      <div class="title mainTitle">${getLang('menuOptions').saved}</div>
      <div class="content">
        <label id="savingsInfo" class="savingInfo">
          <span style="color: var(--card-text-title-color)">$</span> ${sTakedAmount}
          <span style="color: var(--saving-title); font-size: 20px; font-weight: normal">
            / $ ${sMoneyDay}</span
          >
        </label>
      </div>
    </div>

    <ons-card>
      <div class="title savingTitle">${lang.onHand}</div>
      <div class="content">
        <label id="savingsDailyInfo" class="savingDaily">
          <span style="color: var(--card-text-title-color)">$</span>
          ${sMoneyDayLeft}
        </label>
        <ons-button
          class="flatButton"
          onclick="editMoneySaving()"
          style="margin-left: 0px; margin-right: 0px"
          >${lang.modifyMoney}</ons-button
        >
      </div>
    </ons-card>

    <ons-card>
      <div class="title daysTitle">
        ${lang.leftDays} | <span id="savingsDays" class="leftDays">${sDaysLeft}</span>
      </div>
      <div class="content">
        <ons-button
          class="flatButtonLight"
          onclick="endSavingDay()"
          style="margin-left: 0px; margin-right: 0px"
          >${lang.endDay}</ons-button
        >
      </div>
    </ons-card>

    <ons-card>
      <label
        class="cardHomeTitle"
        style="margin-top: 16px; text-align: left; color: var(--saving-title);"
        >${lang.savedAmount}</label
      >
      <div style="display: flex; align-items: center;">
        <div class="iconSavedMoney" style="display: flex; justify-content: space-around;">
          <img src="./assets/icons/savingOption.png" alt="saving icon" />
        </div>
        <div class="title totalMoneyTitle" style="color: var(--card-text-title-color);">
          $
          <span class="totalMoneyTitle" style="margin-left:0" id="savingMainAmountCard">
            ${savedMoney}
          </span>
        </div>
      </div>
      <ons-button
        class="flatButton"
        onclick="resetSavingMoney()"
        style="margin-bottom:16px"
        >${lang.reset}</ons-button
      >
    </ons-card>`;
}
