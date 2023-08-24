function updateSavingPreview() {
  let mainAmount = document.getElementById('savingMainAmount').value;
  let rangeDays = document.getElementById('rangeDays').value;
  let rangePercent = document.getElementById('rangePercent').value;

  if (mainAmount === null || mainAmount == '') {
    mainAmount = 0;
  }

  // el range llega al 100 la función me regresa un numero entre 1 y 31
  rangeDays = returnDays(rangeDays);

  let equivalentAmount = (parseInt(rangePercent) * parseFloat(mainAmount)) / 100;

  /* Update del preview */
  document.getElementById('entryAmount').innerHTML = formatMoney(
    parseFloat(mainAmount).toFixed(2),
  );
  document.getElementById('entryDays').innerHTML = rangeDays;
  document.getElementById('entryPercent').innerHTML =
    rangePercent +
    `<span style="color: var(--card-text-title-color)"> % </span> |
      <span style="color: var(--card-text-title-color)">$</span> ` +
    formatMoney(parseFloat(equivalentAmount).toFixed(2));
  let toExpend = (parseFloat(equivalentAmount) / parseInt(rangeDays)).toFixed(2);
  document.getElementById('entryExpend').innerHTML = formatMoney(toExpend);

  /*Update de los range*/
  document.getElementById('rangeSelectDays').innerHTML = rangeDays;
  document.getElementById('rangeSelectPercent').innerHTML =
    rangePercent + ` <span style="color: var(--card-text-title-color)">%</span>`;
}
