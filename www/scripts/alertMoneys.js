function createAlertDialogToEditMoneyMoney() {
  let retrievedMoney = sessionStorage.getItem('sessionFindMoney');
  let parseMoney = JSON.parse(retrievedMoney);
  let optionsContainer = document.getElementById('alertEditMoneyMoneyOptionsAlert');
  let languaje = localStorage.getItem('storageSwitchLanguage');

  //Guardo el nombre por si el usuario lo edita
  localStorage.setItem('nameSaved', parseMoney.moneyName);

  var dialog = document.getElementById('alertEditMoneyMoney');

  if (dialog) {
    // document.getElementById('editOnlyMoneyMoney').value = '';

    if (languaje == 'false') {
      optionsContainer.innerHTML = `<ons-button
        class="moneyButtonAdd"
        onclick="insertActionEditMoney('add')"
        style="margin-bottom: 16px; margin-left: 0px; width: 90%;"
        id="newMoneyCancelButton"
      >
      <i class="icon ion-md-add" style="font-size: 14px; margin-right: 16px;"></i>
        ADD MONEY
      </ons-button>
  
      <ons-button
        class="moneyButtonAdd"
        onclick="insertActionEditMoney('remove')"
        style="margin-bottom: 16px; margin-left: 0px; width: 90%;"
        id="newMoneyCancelButton"
      >
      <i class="icon ion-md-remove" style="font-size: 14px; margin-right: 16px;"></i>
        REMOVE MONEY
      </ons-button>
  
      <ons-button
        class="moneyButtonAdd"
        onclick="insertActionEditMoney('transfer')"
        style="margin-bottom: 16px; margin-left: 0px; width: 90%;"
        id="newMoneyCancelButton"
      >
      <i class="icon ion-md-swap" style="font-size: 14px; margin-right: 16px;"></i>
        TRANSFER MONEY
      </ons-button>`;
    } else {
      optionsContainer.innerHTML = `<ons-button
        class="moneyButtonAdd"
        onclick="insertActionEditMoney('add')"
        style="margin-bottom: 16px; margin-left: 0px; width: 90%;"
        id="newMoneyCancelButton"
      >
      <i class="icon ion-md-add" style="font-size: 14px; margin-right: 16px;"></i>
        AÑADIR DINERO
      </ons-button>
  
      <ons-button
        class="moneyButtonAdd"
        onclick="insertActionEditMoney('remove')"
        style="margin-bottom: 16px; margin-left: 0px; width: 90%;"
        id="newMoneyCancelButton"
      >
      <i class="icon ion-md-remove" style="font-size: 14px; margin-right: 16px;"></i>
        RESTAR DINERO
      </ons-button>
  
      <ons-button
        class="moneyButtonAdd"
        onclick="insertActionEditMoney('transfer')"
        style="margin-bottom: 16px; margin-left: 0px; width: 90%;"
        id="newMoneyCancelButton"
      >
      <i class="icon ion-md-swap" style="font-size: 14px; margin-right: 16px;"></i>
        TRANSFERIR DINERO
      </ons-button>`;
    }

    document.getElementById('editMoneyEndMoney').innerHTML = '';
    dialog.show();
    document.getElementById('editMoneyActualMoney').innerHTML = parseMoney.moneyCurrent;
  } else {
    ons.notification.toast('Ups! No se ha podido cargar la ventana para modificar!', {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
}

function hideAlertMoneys() {
  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (document.getElementById('editOnlyMoneyMoney') === null) {
    if (languaje == 'false') {
      ons.notification.toast('Please, select what you want to do!', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('Selecciona que deseas hacer, por favor!', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
    return;
  }
  let element = document.getElementById('editOnlyMoneyMoney').value;

  if (element === null || element === '' || element == '') {
    if (languaje == 'false') {
      ons.notification.toast('Enter how much money you want to add/remove, please!', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('Ingresa cuanto dinero deseas añadir/quitar, por favor!', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
    return;
  }

  let newMoney = sessionStorage.getItem('addNewMoney'); // Se hace la suma del dinero en cuanto se ingresan datos

  let testMoney = Math.sign(newMoney);
  if (testMoney == '-1' || testMoney === '-0') {
    if (languaje == 'false') {
      ons.notification.toast('You cannot leave a wallet in negative numbers, sorry...', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('No puedes dejar una cartera en numeros negativos, lo siento...', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
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

  if (languaje == 'false') {
    ons.notification.toast('Money modified successfully!', {
      title: 'Notice!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast('Dinero modificado satisfactoriamente!', {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }

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

// Boton para cuando se hace una transferencia
function hideAlertMoneysOnTransfer() {
  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (document.getElementById('editOnlyMoneyMoney') === null) {
    if (languaje == 'false') {
      ons.notification.toast('Please, select what you want to do!', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('Selecciona que deseas hacer, por favor!', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
    return;
  }
  let element = document.getElementById('editOnlyMoneyMoney').value;

  if (element === null || element === '' || element == '') {
    if (languaje == 'false') {
      ons.notification.toast('Enter how much money you want to add/remove, please!', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('Ingresa cuanto dinero deseas añadir/quitar, por favor!', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
    return;
  }

  let newMoney = sessionStorage.getItem('addNewMoney'); // Se hace la suma del dinero en cuanto se ingresan datos

  let testMoney = Math.sign(newMoney);
  if (testMoney == '-1' || testMoney === '-0') {
    if (languaje == 'false') {
      ons.notification.toast('You cannot leave a wallet in negative numbers, sorry...', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('No puedes dejar una cartera en numeros negativos, lo siento...', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
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

  if (languaje == 'false') {
    ons.notification.toast('Money modified successfully!', {
      title: 'Notice!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast('Dinero modificado satisfactoriamente!', {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }

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

function hideAlertNoChangeMoneys() {
  let languaje = localStorage.getItem('storageSwitchLanguage');
  if (languaje == 'false') {
    ons.notification.toast('Money has not been modified!', {
      title: 'Notice!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast('No se ha modificado el dinero!', {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
  sessionStorage.clear();
  document.getElementById('alertEditMoneyMoney').hide();
}

function insertActionEditMoney(option) {
  let optionsContainer = document.getElementById('alertEditMoneyMoneyOptionsAlert');
  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (option === 'add') {
    if (languaje == 'false') {
      optionsContainer.innerHTML = `<p style="margin: 0px auto -16px 0px; text-align: center;" >I WANT TO ADD</p>
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
    } else {
      optionsContainer.innerHTML = `<p style="margin: 0px auto -16px 0px; text-align: center;">QUIERO AÑADIR</p>
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
    }
  } else if (option === 'remove') {
    if (languaje == 'false') {
      optionsContainer.innerHTML = `<p style="margin: 0px auto -16px 0px; text-align: center;">I WANT TO REMOVE</p>
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
    } else {
      optionsContainer.innerHTML = `<p style="margin: 0px auto -16px 0px; text-align: center;">QUIERO QUITAR</p>
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
    }
  } else if (option === 'transfer') {
    let buttonOptions = document.getElementById('hideAlertMoneyButtons');
    if (languaje == 'false') {
      optionsContainer.innerHTML = `
      <p style="margin: 0px auto -16px 0px; text-align: center;">AMOUNT TO TRANSFER</p>
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

      <p style="margin: 0px auto 0px 0px; text-align: center;">TRANSFER TO</p>
      <select id="selectOptioToTransferMoney" style="margin-bottom: 16px">
        <!--AQUI SE CARGAN LOS POSIBLES GASTOS-->
      </select>`;
      loadOptionsToTransferMoney();
      buttonOptions.innerHTML = `<ons-alert-dialog-button onclick="hideAlertNoChangeMoneys()" id="moneyEditAlertCancel">
          CANCELAR
        </ons-alert-dialog-button>
        <ons-alert-dialog-button onclick="hideAlertMoneysOnTransfer()" id="moneyEditAlertFinished">
          LISTO!
        </ons-alert-dialog-button>`;
    } else {
      optionsContainer.innerHTML = `<p style="margin: 0px auto -16px 0px; text-align: center;">TRANSFERIR A</p>
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
        
        <p style="margin: 0px auto 0px 0px; text-align: center;">TRANSFERIR A</p>
        <select id="selectOptioToTransferMoney" style="margin-bottom: 16px">
          <!--AQUI SE CARGAN LOS POSIBLES GASTOS-->
        </select>`;
      loadOptionsToTransferMoney();
      buttonOptions.innerHTML = `<ons-alert-dialog-button onclick="hideAlertNoChangeMoneys()" id="moneyEditAlertCancel">
          CANCELAR
        </ons-alert-dialog-button>
        <ons-alert-dialog-button onclick="hideAlertMoneysOnTransfer()" id="moneyEditAlertFinished">
          LISTO!
        </ons-alert-dialog-button>`;
    }
  }
}

function loadOptionsToTransferMoney() {
  let moneyStorage = JSON.parse(localStorage.getItem('moneyStorage'));
  let languaje = localStorage.getItem('storageSwitchLanguage');

  let container = document.getElementById('selectOptioToTransferMoney');
  container.innerHTML = '';

  const option = document.createElement('option');

  let text;
  if (languaje == 'false') {
    text = 'DO NOT SUBTRACT';
  } else {
    text = 'NO RESTAR';
  }
  option.innerText = text;

  container.appendChild(option);
  if (moneyStorage == null || moneyStorage == 'null') {
  } else {
    for (let i = 0; i < moneyStorage.length; i++) {
      const option = document.createElement('option');
      let text = moneyStorage[i].moneyName;
      option.innerText = text;

      container.appendChild(option);
    }
  }
}
