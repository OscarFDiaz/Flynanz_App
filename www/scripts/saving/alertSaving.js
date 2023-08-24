/* ABRE EL ALERT PARA EDITAR EL SAVING*/
function editMoneySaving() {
  let dialog = document.getElementById('alertEditSavingMoney');
  let storage = JSON.parse(localStorage.getItem('savingStorage'));
  let optionsContainer = document.getElementById('alertEditSavingMoneyOptionsAlert');
  const lang = getLang('saving');

  document.getElementById('alertAddSaving').innerHTML = storage.moneyLeft;
  document.getElementById('alertAddSavingEnd').innerHTML = '';

  if (dialog) {
    optionsContainer.innerHTML = `<ons-button
        class="moneyButtonAdd"
        onclick="insertActionEditFund('add')"
        style="margin-bottom: 16px; margin-left: 0px; width: 90%"
        id="newMoneyCancelButton"
      >
        <i class="icon ion-md-add" style="font-size: 14px; margin-right: 16px"></i>
        ${lang.addMoney}
      </ons-button>

      <ons-button
        class="moneyButtonAdd"
        onclick="insertActionEditFund('remove')"
        style="margin-bottom: 16px; margin-left: 0px; width: 90%"
        id="newMoneyCancelButton"
      >
        <i class="icon ion-md-remove" style="font-size: 14px; margin-right: 16px"></i>
        ${lang.takeMoney}
      </ons-button>`;

    dialog.show();
  } else {
    ons.notification.toast('Ups! contact support', {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
}

function cancelAddLeftMoney() {
  document.getElementById('alertMoneyLeft').hide();
  let lang = getLang('saving');

  ons.notification.toast(lang.allNormal, {
    title: 'Aviso!',
    timeout: 1000,
    animation: 'ascend',
  });
}

function closeAlertSavingNoChange() {
  let lang = getLang('saving');

  ons.notification.toast(lang.noModify, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

  sessionStorage.clear();
  document.getElementById('alertEditSavingMoney').hide();
}

// Añado las categorías de gastos que tengo y a donde quiero restar
function loadDialogCategoryAndMoney() {
  // CATEGORY
  let categoryStorage = JSON.parse(localStorage.getItem('expenseStorage'));

  let catContainer = document.getElementById('selectOptioCa');
  catContainer.innerHTML = '';

  const nOption = document.createElement('option');
  nOption.innerText = getLang('saving').noCategory;

  catContainer.appendChild(nOption);
  if (categoryStorage !== null) {
    for (let i = 0; i < categoryStorage.length; i++) {
      const nOption = document.createElement('option');
      let nText = categoryStorage[i].expenseName;
      nOption.innerText = nText;

      catContainer.appendChild(nOption);
    }
  }

  // MONEY
  let moneyStorage = JSON.parse(localStorage.getItem('moneyStorage'));

  let container = document.getElementById('selectOption');
  container.innerHTML = '';

  const option = document.createElement('option');
  option.innerText = getLang('saving').noSubtract;

  container.appendChild(option);
  if (moneyStorage !== null) {
    for (let i = 0; i < moneyStorage.length; i++) {
      const option = document.createElement('option');
      let text = moneyStorage[i].moneyName;
      option.innerText = text;

      container.appendChild(option);
    }
  }
}
