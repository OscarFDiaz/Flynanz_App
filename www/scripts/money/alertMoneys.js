function createAlertDialogToEditMoneyMoney() {
  let retrievedMoney = sessionStorage.getItem('sessionFindMoney');
  let parseMoney = JSON.parse(retrievedMoney);
  let optionsContainer = document.getElementById('alertEditMoneyMoneyOptionsAlert');
  let lang = getLang('money');

  //Guardo el nombre por si el usuario lo edita
  localStorage.setItem('nameSaved', parseMoney.moneyName);

  let dialog = document.getElementById('alertEditMoneyMoney');

  if (dialog) {
    optionsContainer.innerHTML = `<ons-button
        class="moneyButtonAdd"
        onclick="insertActionEditMoney('add')"
        style="margin-bottom: 16px; margin-left: 0px; width: 90%;"
        id="newMoneyCancelButton"
      >
        <i class="icon ion-md-add" style="font-size: 14px; margin-right: 16px;"></i>
        ${lang.addMoney}
      </ons-button>

      <ons-button
        class="moneyButtonAdd"
        onclick="insertActionEditMoney('remove')"
        style="margin-bottom: 16px; margin-left: 0px; width: 90%;"
        id="newMoneyCancelButton"
      >
        <i class="icon ion-md-remove" style="font-size: 14px; margin-right: 16px;"></i>
        ${lang.subMoney}
      </ons-button>

      <ons-button
        class="moneyButtonAdd"
        onclick="insertActionEditMoney('transfer')"
        style="margin-bottom: 16px; margin-left: 0px; width: 90%;"
        id="newMoneyCancelButton"
      >
        <i class="icon ion-md-swap" style="font-size: 14px; margin-right: 16px;"></i>
        ${lang.transMoney}
      </ons-button>`;

    document.getElementById('hideAlertMoneyButtons').innerHTML = `<ons-alert-dialog-button
        onclick="hideAlertNoChangeMoneys()"
        id="moneyEditAlertCancel"
        >${lang.cancel}</ons-alert-dialog-button
      >
      <ons-alert-dialog-button onclick="hideAlertMoneys()" id="moneyEditAlertFinished"
        >${lang.ready}</ons-alert-dialog-button
      >`;

    document.getElementById('editMoneyEndMoney').innerHTML = '';
    dialog.show();
    document.getElementById('editMoneyActualMoney').innerHTML = parseMoney.moneyCurrent;
  } else {
    ons.notification.toast('Ups! contact support', {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
}

function hideAlertMoneys() {
  let lang = getLang('money');

  if (document.getElementById('editOnlyMoneyMoney') === null) {
    ons.notification.toast(lang.select, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }
  let element = document.getElementById('editOnlyMoneyMoney').value;

  if (element === null || element === '') {
    ons.notification.toast(lang.howMuch, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  let newMoney = sessionStorage.getItem('addNewMoney'); // Se hace la suma del dinero en cuanto se ingresan datos

  let testMoney = Math.sign(newMoney);
  if (testMoney === -1) {
    ons.notification.toast(lang.noNegative, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  let moneys = JSON.parse(localStorage.getItem('moneyStorage'));

  let indexGoal;

  let sName = localStorage.getItem('nameSaved');

  for (let i = 0; i < moneys.length; i++) {
    if (moneys[i].moneyName == sName) {
      indexGoal = i; //Pongo la posición donde esta mi objeto que modificare

      updateMoneyObject = {
        moneyName: moneys[i].moneyName,
        moneyCurrent: newMoney,
        moneyGradient: moneys[i].moneyGradient,
      };

      // Modifico los elementos para mostrar la cantidad de dinero actualizada
      document.getElementById(sName + '-money').innerHTML = '';
      document.getElementById(sName + '-money').innerHTML = '$ ' + newMoney;

      if (localStorage.getItem('moneyStorage') === null) {
        let moneysArray = [];
        moneysArray.push(updateMoneyObject);
        localStorage.setItem('moneyStorage', JSON.stringify(moneysArray));
      } else {
        moneys[indexGoal] = updateMoneyObject;
        localStorage.setItem('moneyStorage', JSON.stringify(moneys));
      }
      localStorage.removeItem('nameSaved');
      break;
    }
  }

  document.getElementById('editOnlyMoneyMoney').value = null;
  document.getElementById('alertEditMoneyMoney').hide();

  ons.notification.toast(lang.successMoney, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

  sessionStorage.clear();
  getMoneys();

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

// Botón para cuando se hace una transferencia
function hideAlertMoneysOnTransfer() {
  let lang = getLang('money');

  let element = document.getElementById('editOnlyMoneyMoney').value;

  if (element === null || element === '') {
    ons.notification.toast(lang.noAmount, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  let newMoney = sessionStorage.getItem('addNewMoney'); // Se hace la suma del dinero en cuanto se ingresan datos
  let moneyToTransfer = element;

  let testMoney = Math.sign(newMoney);
  if (testMoney === -1) {
    ons.notification.toast(lang.noNegative, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  let moneys = JSON.parse(localStorage.getItem('moneyStorage'));

  let indexGoal;

  const selectTag = document.getElementById('selectOptioToTransferMoney');
  const options = selectTag.options;
  let destName = options[selectTag.selectedIndex].value;

  let sName = localStorage.getItem('nameSaved'); // Nombre de la cartera

  if (sName == destName) {
    ons.notification.toast(lang.noTransfer, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (destName == 'SELECT THE DESTINATION' || destName == 'SELECCIONA EL DESTINO') {
    ons.notification.toast(lang.noWhere, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  // Busco la cartera a donde voy a transferir el dinero
  for (let i = 0; i < moneys.length; i++) {
    if (moneys[i].moneyName == destName) {
      indexGoal = i; //Pongo la posición donde esta mi objeto que modificare

      let transferredMoney = parseFloat(
        parseFloat(moneys[i].moneyCurrent) + parseFloat(moneyToTransfer),
      ).toFixed(2);

      updateMoneyObject = {
        moneyName: moneys[i].moneyName,
        moneyCurrent: transferredMoney,
        moneyGradient: moneys[i].moneyGradient,
      };

      if (localStorage.getItem('moneyStorage') === null) {
        let moneysArray = [];
        moneysArray.push(updateMoneyObject);
        localStorage.setItem('moneyStorage', JSON.stringify(moneysArray));
      } else {
        moneys[indexGoal] = updateMoneyObject;
        localStorage.setItem('moneyStorage', JSON.stringify(moneys));
      }
      break;
    }
  }

  // Busco la cartera en el arreglo y modifico el dinero
  for (let i = 0; i < moneys.length; i++) {
    if (moneys[i].moneyName == sName) {
      indexGoal = i; //Pongo la posición donde esta mi objeto que modificare

      updateMoneyObject = {
        moneyName: moneys[i].moneyName,
        moneyCurrent: newMoney,
        moneyGradient: moneys[i].moneyGradient,
      };

      // Modifico los elementos para mostrar la cantidad de dinero actualizada
      document.getElementById(sName + '-money').innerHTML = '';
      document.getElementById(sName + '-money').innerHTML = '$ ' + newMoney;

      if (localStorage.getItem('moneyStorage') === null) {
        let moneysArray = [];
        moneysArray.push(updateMoneyObject);
        localStorage.setItem('moneyStorage', JSON.stringify(moneysArray));
      } else {
        moneys[indexGoal] = updateMoneyObject;
        localStorage.setItem('moneyStorage', JSON.stringify(moneys));
      }
      localStorage.removeItem('nameSaved');
      break;
    }
  }

  document.getElementById('editOnlyMoneyMoney').value = null;
  document.getElementById('alertEditMoneyMoney').hide();

  ons.notification.toast(`${lang.successTrans} ${sName} -> ${destName}!`, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

  sessionStorage.clear();
  getMoneys();

  // Actualizo el carrusel
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

function hideAlertNoChangeMoneys() {
  let lang = getLang('money');

  ons.notification.toast(lang.noModify, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

  sessionStorage.clear();
  document.getElementById('alertEditMoneyMoney').hide();
}

function insertActionEditMoney(option) {
  let optionsContainer = document.getElementById('alertEditMoneyMoneyOptionsAlert');
  let lang = getLang('money');

  if (option === 'add') {
    optionsContainer.innerHTML = `<p
        style="margin: 0px auto -16px 0px; text-align: center;"
      >
        ${lang.wantAdd}
      </p>
      <ons-input
        onchange="makeSumMoney()"
        onkeypress="this.onchange()"
        oninput="this.onchange()"
        id="editOnlyMoneyMoney"
        modifier="underbar"
        placeholder=""
        type="number"
        style="display: block; margin: -10px auto 16px;"
      ></ons-input>`;
  } else if (option === 'remove') {
    optionsContainer.innerHTML = `<p
        style="margin: 0px auto -16px 0px; text-align: center;"
      >
        ${lang.wantRemove}
      </p>
      <ons-input
        onchange="makeResMoney()"
        onkeypress="this.onchange()"
        oninput="this.onchange()"
        id="editOnlyMoneyMoney"
        modifier="underbar"
        placeholder=""
        type="number"
        style="display: block; margin: -10px auto 16px;"
      ></ons-input>`;
  } else if (option === 'transfer') {
    let buttonOptions = document.getElementById('hideAlertMoneyButtons');
    optionsContainer.innerHTML = `<p
        style="margin: 0px auto -16px 0px; text-align: center;"
      >
        ${lang.toTrans}
      </p>
      <ons-input
        onchange="makeResMoney()"
        onkeypress="this.onchange()"
        oninput="this.onchange()"
        id="editOnlyMoneyMoney"
        modifier="underbar"
        placeholder=""
        type="number"
        style="display: block; margin: -10px auto 16px;"
      ></ons-input>

      <p style="margin: 0px auto 0px 0px; text-align: center;">Transferir a</p>
      <select id="selectOptioToTransferMoney" style="margin-bottom: 16px">
        <!--AQUI SE CARGAN LOS POSIBLES GASTOS-->
      </select>`;
    loadOptionsToTransferMoney();
    buttonOptions.innerHTML = `<ons-alert-dialog-button
        onclick="hideAlertNoChangeMoneys()"
        id="moneyEditAlertCancel"
      >
        ${lang.cancel}
      </ons-alert-dialog-button>
      <ons-alert-dialog-button
        onclick="hideAlertMoneysOnTransfer()"
        id="moneyEditAlertFinished"
      >
        ${lang.ready}
      </ons-alert-dialog-button>`;
  }
}

function loadOptionsToTransferMoney() {
  let moneyStorage = JSON.parse(localStorage.getItem('moneyStorage'));
  let lang = getLang('money');

  let container = document.getElementById('selectOptioToTransferMoney');
  container.innerHTML = '';

  const option = document.createElement('option');

  option.innerText = lang.toWhere;

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
