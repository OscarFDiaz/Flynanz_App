function insertActionEditFund(option) {
  let optionsContainer = document.getElementById('alertEditSavingMoneyOptionsAlert');
  let lang = getLang('saving');

  if (option === 'add') {
    optionsContainer.innerHTML = `<p
        style="margin: 0px auto -16px 0px; text-align: center;"
      >
        ${lang.wantAdd}
      </p>
      <ons-input
        onchange="makeSavingOperation()"
        onkeypress="this.onchange()"
        oninput="this.onchange()"
        id="alertInputSaving"
        modifier="underbar"
        placeholder=""
        type="number"
        style="display: block; margin: -10px auto 16px"
      ></ons-input>`;
  } else if (option === 'remove') {
    optionsContainer.innerHTML = `<p
        style="margin: 0px auto -16px 0px; text-align: center;"
      >
        ${lang.wantSub}
      </p>
      <ons-input
        onchange="makeSavingResOperation()"
        onkeypress="this.onchange()"
        oninput="this.onchange()"
        id="alertInputSaving"
        modifier="underbar"
        placeholder=""
        type="number"
        style="display: block; margin: -10px auto 16px"
      ></ons-input>`;
  }
}
