/* Muestra los gastos de cada cartera*/
function showExpensesPerWallet(walletName) {
  let lang = getLang('money');

  let detailDetailExpenseView = document.getElementById('moneyListOfExpenses');
  if (detailDetailExpenseView == null) return;
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
