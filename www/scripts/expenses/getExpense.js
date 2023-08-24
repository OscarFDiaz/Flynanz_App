function getExpenses() {
  let expenses = JSON.parse(localStorage.getItem('expenseStorage'));
  let expensesView = document.getElementById('expensesContainer');

  let lang = getLang('expense');

  document.getElementById('expensesContainer').innerHTML = '';
  let expenseTutorial = '';
  expenseTutorial = ` <ons-card>
    <ons-list style="background: none;" id="expenseListOfExpensesContainer">
      <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
        <label class="iconExpenseLabel" style="margin-left: 32px;">${lang.read}</label>
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
          <p class="paraTutorial">${lang.read5}</p>
        </div>
      </ons-list-item>
    </ons-list>
  </ons-card>`;

  if (expenses === null) {
    let tutorial = localStorage.getItem('storageSwitchTutorial');
    if (Boolean(tutorial) === true) {
      expensesView.innerHTML += `${expenseTutorial}`;
    }
    return;
  } else if (expenses.length === 0) {
    let tutorial = localStorage.getItem('storageSwitchTutorial');
    if (Boolean(tutorial) === true) {
      expensesView.innerHTML += `${expenseTutorial}`;
    }
    return;
  }

  let totalExpenses = formatMoney(getTotalExpenses());
  let totalFDays = formatMoney(getAmountFDaysN());
  let totalTDays = formatMoney(getAmountTDaysN());

  // Datos de los gastos totales
  expensesView.innerHTML += `<ons-card>
    <div class="content">
      <label class="labelDetailExpense"
        >${lang.totalExpense}:
        <div style="display: block; font-size: 30px; font-weight: bold;">
          <span id="totalExpenseDetailMain" class="labelInfoDetailExpense"
            >$ ${totalExpenses}</span
          >
        </div>
      </label>

      <label class="labelDetailExpense"
        >${lang.last15}:
        <div style="display: block; font-size: 30px; font-weight: bold;">
          <span id="lastDaysDetailMain" class="labelInfoDetailExpense"
            >$ ${totalFDays}</span
          >
        </div>
      </label>
      <label class="labelDetailExpense"
        >${lang.last30}:
        <div style="display: block; font-size: 30px; font-weight: bold;">
          <span id="lastMonthDetailMain" class="labelInfoDetailExpense"
            >$ ${totalTDays}</span
          >
        </div>
      </label>
    </div>
  </ons-card>`;

  for (let i = 0; i < expenses.length; i++) {
    let { expenseName, iconName, iconUrl, expenseGradient, totalExpense } = expenses[i];
    let eExpense = formatMoney(parseFloat(totalExpense).toFixed(2));

    expensesView.innerHTML += `<ons-card
      class="expenseCard"
      style="background: var(${expenseGradient}); border: none"
    >
      <div
        class="title expenseTitle"
        onclick="findExpense('${expenseName}')"
        style="padding: 16px 16px 0px 16px"
      >
        ${expenseName}
      </div>
      <div class="iconSavedMoney expenseIconContainer">
        <img src="${iconUrl}${iconName}" alt="saving icon" style="width: 100%" />
      </div>
      <div class="content">
        <label class="expenseInfo">$ ${eExpense} ${lang.expensed}</label>
      </div>
      <ons-button
        class="moneyButtonAdd"
        style="margin-bottom: 16px;"
        onclick="addExpenseToExpense('${expenseName}')"
      >
        ${lang.addExpense}
      </ons-button>
      <ons-button
        class="moneyButtonDe"
        style="margin-bottom: 16px; background: none"
        onclick="deleteExpense('${expenseName}')"
      >
        ${lang.delete}
      </ons-button>
    </ons-card>`;
  }
}
