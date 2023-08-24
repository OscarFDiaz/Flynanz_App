function updateLastSaving() {
  let savingStorage = JSON.parse(localStorage.getItem('savingStorage'));
  let cSavingView = document.getElementById('actualSavingContainer');
  let lang = getLang('saving');

  if (savingStorage === null) {
    cSavingView.innerHTML = `<label class="cardHomeTitle" style="margin-top: 0px">${lang.nothing}</label>`;
    return;
  } else {
    cSavingView.innerHTML = `<label
        class="entryAmountText"
        id="modifyFundActualAmount"
        >${lang.entryAmount}:
        <div style="display: block;">
          <span class="entryAmountDetail" style="color: var(--card-text-title-color)"
            >$
          </span>
          <span id="entryCurrentAmount" class="entryAmountDetail">0</span>
        </div>
      </label>

      <label class="entryAmountText" id="modifyFundActualDays"
        >${lang.selectedDays}:
        <div style="display: block;">
          <span id="entryCurrentDays" class="entryAmountDetail"></span>
        </div>
      </label>

      <label class="entryAmountText"
        >${lang.leftDays}:
        <div style="display: block;">
          <span id="entryCurrentDaysLeft" class="entryAmountDetail"></span>
        </div>
      </label>

      <label class="entryAmountText" id="modifyFundActualPercentage"
        >${lang.percentOnly}:
        <div style="display: block;">
          <span id="entryCurrentPercent" class="entryAmountDetail"></span>
        </div>
      </label>

      <label class="entryAmountText" id="modifyFundActualToExpend"
        >${lang.toExpend}:
        <div style="display: block;">
          <span class="entryAmountDetail" style="color: var(--card-text-title-color)"
            >$
          </span>
          <span id="entryCurrentExpend" class="entryAmountDetail">0</span>
        </div>
      </label>

      <label class="entryAmountText" style="margin-bottom: 0px;"
        >${lang.available}:
        <div style="display: block;">
          <span class="entryAmountDetail" style="color: var(--card-text-title-color)"
            >$
          </span>
          <span id="entryCurrentExpendLeft" class="entryAmountDetail">0</span>
        </div>
      </label>`;
  }

  let sInnerAmount = savingStorage.mainAmount;
  let sDaysSelected = savingStorage.rangeDays;
  let sPercent = savingStorage.rangePercent;
  let sTakedAmount = savingStorage.equivalentAmount;
  let sMoneyDay = savingStorage.toExpend;
  let sDaysLeft = savingStorage.daysLeft;
  let sMoneyDayLeft = savingStorage.moneyLeft;

  document.getElementById('entryCurrentAmount').innerHTML = formatMoney(
    parseFloat(sInnerAmount).toFixed(2),
  );
  document.getElementById('entryCurrentDays').innerHTML = sDaysSelected;
  document.getElementById('entryCurrentDaysLeft').innerHTML = sDaysLeft;
  document.getElementById('entryCurrentPercent').innerHTML =
    sPercent +
    `<span style="color: var(--card-text-title-color)"> % </span> | <span style="color: var(--card-text-title-color)">$</span> ` +
    formatMoney(sTakedAmount);
  document.getElementById('entryCurrentExpend').innerHTML = formatMoney(sMoneyDay);
  document.getElementById('entryCurrentExpendLeft').innerHTML = formatMoney(
    parseFloat(sMoneyDayLeft).toFixed(2),
  );
}
