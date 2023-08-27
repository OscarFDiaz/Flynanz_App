function loadDetailExpense() {
  document.getElementById('detailExpenseContainer').innerHTML = '';

  let lang = getLang('expense');

  let retrievedExpense = sessionStorage.getItem('sessionFindGoal');
  let parseExpense = JSON.parse(retrievedExpense);

  let eName = parseExpense.expenseName;
  let eTotal = parseFloat(parseExpense.totalExpense).toFixed(2);
  let eTotalTS = formatMoney(eTotal);
  let mDate = parseExpense.mainDate;

  let lastFDays, lastTDays;

  if (eTotal == 0) {
    lastFDays = lastTDays = parseFloat(eTotal).toFixed(2);
  } else {
    lastFDays = formatMoney(getAmountFDays(eName));
    lastTDays = formatMoney(getAmountTDays(eName));
  }

  let expenseView = document.getElementById('detailExpenseContainer');
  expenseView.innerHTML = '';

  document.getElementById('titleDetailExpense').innerHTML = eName;

  expenseView.innerHTML += `
    <ons-card>
      <div class="content">
        <label class="labelDetailExpense"
          >${lang.totalExpenseSince} ${mDate}:
          <div style="display: block; font-size: 30px; font-weight: bold;">
            <span id="totalExpenseDetail" class="labelInfoDetailExpense"
              >$ ${eTotalTS}</span
            >
          </div>
        </label>

        <label class="labelDetailExpense"
          >${lang.last15}:
          <div style="display: block; font-size: 30px; font-weight: bold;">
            <span id="lastDaysDetail" class="labelInfoDetailExpense">$ ${lastFDays}</span>
          </div>
        </label>
        <label class="labelDetailExpense"
          >${lang.last30}:
          <div style="display: block; font-size: 30px; font-weight: bold;">
            <span id="lastMonthDetail" class="labelInfoDetailExpense"
              >$ ${lastTDays}</span
            >
          </div>
        </label>
      </div>
    </ons-card>

    <ons-card>
      <ons-list style="background: none;" id="expenseListOfExpensesContainer">
        <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
          <label class="iconExpenseLabel" style="margin-left: 16px;"> ${lang.seeExpenses} </label>
          <div
            class="expandable-content"
            id="expenseListOfExpenses"
            style="grid-template-columns: 1fr;"
          >
            <!-- AQUI SE CARGAN LOS GASTOS -->
          </div>
        </ons-list-item>
      </ons-list>
    </ons-card>

    <ons-button
      class="flatButtonLight"
      style="margin-bottom: 16px;"
      onclick="resetExpense('${eName}')"
      >${lang.reset}</ons-button
    >

    <ons-fab
      position="bottom right"
      onclick="editExpense('${eName}')"
      style="display: flex; justify-content: space-around"
    >
      <img
        src="./assets/icons/editButton.png"
        alt="saving icon"
        style="width: 32px; margin-top: 30%"
      />
    </ons-fab>
  `;

  let detailDetailExpenseView = document.getElementById('expenseListOfExpenses');
  detailDetailExpenseView.innerHTML = '';

  let expensesDetail = JSON.parse(localStorage.getItem('expenseDetailStorage'));

  let actualEx = 0;
  if (expensesDetail !== null) {
    for (let i = 0; i < expensesDetail.length; i++) {
      if (expensesDetail[i].expenseName == eName) {
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
      if (expensesDetail[i].expenseName == eName) {
        let { inName, inDate, inID, inAmount } = expensesDetail[i];
        let iAmount = formatMoney(inAmount);

        let today = new Date().toJSON().slice(0, 10);
        let days = dateDiff(today, inDate);

        if (inDate === '') {
          inDate = lang.noDate;
        } else {
          if (Math.sign(days) === 1) {
            inDate = `${lang.in} ${days} ${lang.days}`;
          } else if (Math.sign(days) === -1) {
            inDate = `${lang.ago} ${Math.abs(days)} ${lang.days}`;
          } else if (Math.sign(days) === 0) {
            inDate = lang.today;
          }
        }

        detailDetailExpenseView.innerHTML += `<ons-list-item
          expandable
          style="margin-top: -16px;"
          modifier="nodivider"
        >
          <div class="center" style="margin-right: 16px">
            <div >
              <label
                class="list-item__title labelDetailExpense"
                style="text-align:left; margin-left:16px; font-size:22px"
                >${inName}</label
              >
              <label
                class="list-item__subtitle labelDetailExpense"
                style="padding-top: 0px; font-size: 18px; text-align:left; margin-left:16px"
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

          <div class="expandable-content" style="grid-template-columns: 1fr 1fr;">
            <ons-button
              class="moneyButtonDe"
              style="margin-bottom: 16px; margin-left: 20px; margin-right: 8px; background: var(--flat-button-color); color: var(--flat-button-color-text)"
              onclick="editDetailExpense('${inID}')"
            >
              ${lang.edit}
            </ons-button>

            <ons-button
              class="moneyButtonDe"
              style="margin-bottom: 16px; margin-left: 8px; margin-right: 20px; background: var(--flat-button-light-color); color: var(--flat-button-light-color-text)"
              onclick="deleteDetailExpense('${inID}')"
            >
              ${lang.delete}
            </ons-button>
          </div>
        </ons-list-item>`;
      }
    }
  }
}
