function makeSaving() {
  /* OBETENER VARIABLES */
  let mainAmount = document.getElementById('savingMainAmount').value;
  let rangeDays = document.getElementById('rangeDays').value;
  let rangePercent = document.getElementById('rangePercent').value;
  let lang = getLang('saving');

  if (mainAmount == null || mainAmount == 'null' || mainAmount == '') {
    ons.notification.toast(lang.noAmount, {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  let testMoney = Math.sign(mainAmount);
  if (testMoney === -1 || testMoney === -0) {
    ons.notification.toast(lang.noNegative, {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  let storage = JSON.parse(localStorage.getItem('savingStorage'));

  if (storage) {
    ons.notification.confirm({
      message: lang.exist,
      title: lang.notice,
      buttonLabels: [lang.confirmDelete, lang.cancel],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          rangeDays = returnDays(rangeDays);
          let equivalentAmount = (parseInt(rangePercent) * parseFloat(mainAmount)) / 100;
          let toExpend = (parseFloat(equivalentAmount) / parseInt(rangeDays)).toFixed(2);
          let daysLeft = rangeDays;
          let moneyLeft = toExpend;

          let saving = {
            mainAmount,
            rangeDays,
            rangePercent,
            equivalentAmount,
            toExpend,
            daysLeft,
            moneyLeft,
          };

          localStorage.setItem('savingStorage', JSON.stringify(saving));
          updateLastSaving();
          functionPopPage();
          loadSaving();

          ons.notification.toast(lang.updated, {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          });
        } else {
          ons.notification.toast(lang.noAction, {
            title: 'Aviso!',
            timeout: 1000,
            animation: 'ascend',
          });
        }
      },
    });
  } else {
    rangeDays = returnDays(rangeDays);
    let equivalentAmount = (parseInt(rangePercent) * parseFloat(mainAmount)) / 100;
    let toExpend = (parseFloat(equivalentAmount) / parseInt(rangeDays)).toFixed(2);
    let daysLeft = rangeDays;
    let moneyLeft = toExpend;

    let saving = {
      mainAmount,
      rangeDays,
      rangePercent,
      equivalentAmount,
      toExpend,
      daysLeft,
      moneyLeft,
    };

    localStorage.setItem('savingStorage', JSON.stringify(saving));
    updateLastSaving();
    functionPopPage();
    loadSaving();

    ons.notification.toast(lang.finished, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
}

function updateSavingPreview() {
  let mainAmount = document.getElementById('savingMainAmount').value;
  let rangeDays = document.getElementById('rangeDays').value;
  let rangePercent = document.getElementById('rangePercent').value;

  if (mainAmount == null || mainAmount == 'null' || mainAmount == '') {
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
    `<span style="color: var(--card-text-title-color)"> % </span> | <span style="color: var(--card-text-title-color)">$</span> ` +
    formatMoney(parseFloat(equivalentAmount).toFixed(2));
  let toExpend = (parseFloat(equivalentAmount) / parseInt(rangeDays)).toFixed(2);
  document.getElementById('entryExpend').innerHTML = formatMoney(toExpend);

  /*Update de los range*/
  document.getElementById('rangeSelectDays').innerHTML = rangeDays;
  document.getElementById('rangeSelectPercent').innerHTML =
    rangePercent + ` <span style="color: var(--card-text-title-color)">%</span>`;
}

function updateLastSaving() {
  let savingStorage = JSON.parse(localStorage.getItem('savingStorage'));
  let cSavingView = document.getElementById('actualSavingContainer');
  let lang = getLang('saving');

  if (savingStorage == null || savingStorage == 'null') {
    cSavingView.innerHTML = `<label class="cardHomeTitle" style="margin-top: 0px">${lang.nothing}</label>`;
    return;
  } else {
    cSavingView.innerHTML = `<label class="entryAmountText" id="modifyFundActualAmount"
        >${lang.entryAmount}: 
        <div style="display: block;">
          <span class="entryAmountDetail" style="color: var(--card-text-title-color)">$ </span>
          <span id="entryCurrentAmount" class="entryAmountDetail">0</span>
        </div>
      </label>

        <label class="entryAmountText" id="modifyFundActualDays"
        >${lang.selectedDays}:
          <div style="display: block;">
            <span id="entryCurrentDays" class="entryAmountDetail"></span>
          </div>
        </label
        >

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
            <span class="entryAmountDetail" style="color: var(--card-text-title-color)">$ </span>
            <span id="entryCurrentExpend" class="entryAmountDetail">0</span>
          </div>
        </label>
        
        <label class="entryAmountText" style="margin-bottom: 0px;"
        >${lang.available}: 
          <div style="display: block;">
            <span class="entryAmountDetail" style="color: var(--card-text-title-color)">$ </span>
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

function loadSaving() {
  let sView = document.getElementById('savingMainContainer');
  let savingStorage = JSON.parse(localStorage.getItem('savingStorage'));
  let lang = getLang('saving');

  sView.innerHTML = '';

  savingTutorial = `<ons-card>
      <ons-list style="background: none;" id="expenseListOfExpensesContainer">
        <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
          <label class="iconExpenseLabel" style="margin-left: 32px;">
            ${lang.read}
          </label>
          <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr;">
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
            <p class="paraTutorial">
              ${lang.read5}
            </p>
            <p class="paraTutorial">
              ${lang.read6}
            </p>
            <p class="paraTutorial">
              ${lang.read7}
            </p>
          </div>
        </ons-list-item>
      </ons-list>
    </ons-card>`;

  if (savingStorage == null || savingStorage == 'null') {
    let tutorial = localStorage.getItem('storageSwitchTutorial');
    if (tutorial == true || tutorial == 'true') {
      sView.innerHTML += `${savingTutorial}`;
    }
    return;
  }

  let sTakedAmount = formatMoney(parseFloat(savingStorage.equivalentAmount).toFixed(2));
  let sMoneyDay = formatMoney(savingStorage.toExpend);
  let sDaysLeft = savingStorage.daysLeft;
  let sMoneyDayLeft = formatMoney(savingStorage.moneyLeft);
  let savedMoney = localStorage.getItem('savedMoneySaving');

  if (savedMoney == null || savedMoney == '0') {
    savedMoney = 0.0;
  }

  sView.innerHTML = `<div style="margin: 20px">
        <div class="title mainTitle">
            ${getLang('menuOptions').saved}
        </div>
        <div class="content">
            <label id="savingsInfo" class="savingInfo">
              <span style="color: var(--card-text-title-color)">$</span> ${sTakedAmount}
              <span style="color: var(--saving-title); font-size: 20px; font-weight: normal"> / $ ${sMoneyDay}</span> 
            </label>
        </div>
      </div>
  
      <ons-card>
        <div class="title savingTitle">
            ${lang.onHand}
        </div>
        <div class="content">
            <label id="savingsDailyInfo" class="savingDaily">
              <span style="color: var(--card-text-title-color)">$</span> 
              ${sMoneyDayLeft}
            </label>
            <ons-button class="flatButton" onclick="editMoneySaving()" style="margin-left: 0px; margin-right: 0px">${
              lang.modifyMoney
            }</ons-button>
        </div>
      </ons-card>
  
      <ons-card>
        <div class="title daysTitle">
            ${lang.leftDays} | <span id="savingsDays" class="leftDays">${sDaysLeft}</span>
        </div>
        <div class="content">
            <ons-button class="flatButtonLight" onclick="endSavingDay()" style="margin-left: 0px; margin-right: 0px">${
              lang.endDay
            }</ons-button>
        </div>
      </ons-card>


      <ons-card>
        <label class="cardHomeTitle" style="margin-top: 16px; text-align: left; color: var(--saving-title);">${
          lang.savedAmount
        }</label> 
        <div style="display: flex; align-items: center;">
          <div class="iconSavedMoney" style="display: flex; justify-content: space-around;">
            <img src="./assets/icons/savingOption.png" alt="saving icon">
          </div>
          <div class="title totalMoneyTitle" style="color: var(--card-text-title-color);">$
            <span class="totalMoneyTitle" style="margin-left:0" id="savingMainAmountCard"> ${savedMoney} </span>
          </div>
        </div>
        <ons-button class="flatButton" onclick="resetSavingMoney()" style="margin-bottom:16px">${
          lang.reset
        }</ons-button>
      </ons-card>`;
}

function loadDetailSaving() {
  updateSavingPreview();
  updateLastSaving();
}

function resetSavingMoney() {
  let lang = getLang('saving');
  let savedMoney = document.getElementById('savingMainAmountCard');
  ons.notification.confirm({
    message: lang.sureToReset,
    title: lang.notice,
    buttonLabels: [lang.confirmReset, lang.cancel],
    animation: 'default',
    primaryButtonIndex: 1,
    cancelable: true,
    callback: function (index) {
      if (0 === index) {
        let storageS = localStorage.getItem('savedMoneySaving');
        if (storageS) {
          localStorage.setItem('savedMoneySaving', 0);
          savedMoney.innerHTML = 0;
          ons.notification.toast(lang.resetSaving, {
            title: 'Aviso!',
            timeout: 1000,
            animation: 'ascend',
          });
        } else {
          ons.notification.toast(lang.noSaving, {
            title: 'Aviso!',
            timeout: 1000,
            animation: 'ascend',
          });
        }
      } else {
        ons.notification.toast(lang.allNormal, {
          title: 'Aviso!',
          timeout: 1000,
          animation: 'ascend',
        });
      }
    },
  });
}

function returnDays(days) {
  let dd = parseInt(days);
  if (dd < 4) {
    return 1;
  } else if (dd > 3 && dd < 7) {
    return 2;
  } else if (dd > 6 && dd < 10) {
    return 3;
  } else if (dd > 9 && dd < 13) {
    return 4;
  } else if (dd > 12 && dd < 16) {
    return 5;
  } else if (dd > 15 && dd < 19) {
    return 6;
  } else if (dd > 18 && dd < 22) {
    return 7;
  } else if (dd > 21 && dd < 25) {
    return 8;
  } else if (dd > 24 && dd < 28) {
    return 9;
  } else if (dd > 27 && dd < 31) {
    return 10;
  } else if (dd > 30 && dd < 34) {
    return 11;
  } else if (dd > 33 && dd < 37) {
    return 12;
  } else if (dd > 36 && dd < 40) {
    return 13;
  } else if (dd > 39 && dd < 43) {
    return 14;
  } else if (dd > 42 && dd < 48) {
    return 15;
  } else if (dd > 47 && dd < 51) {
    return 16;
  } else if (dd > 50 && dd < 54) {
    return 17;
  } else if (dd > 53 && dd < 57) {
    return 18;
  } else if (dd > 56 && dd < 60) {
    return 19;
  } else if (dd > 59 && dd < 63) {
    return 20;
  } else if (dd > 62 && dd < 66) {
    return 21;
  } else if (dd > 65 && dd < 69) {
    return 22;
  } else if (dd > 68 && dd < 72) {
    return 23;
  } else if (dd > 71 && dd < 75) {
    return 24;
  } else if (dd > 74 && dd < 78) {
    return 25;
  } else if (dd > 77 && dd < 81) {
    return 26;
  } else if (dd > 80 && dd < 84) {
    return 27;
  } else if (dd > 83 && dd < 87) {
    return 28;
  } else if (dd > 86 && dd < 90) {
    return 29;
  } else if (dd > 89 && dd < 95) {
    return 30;
  } else if (dd > 94 && dd < 101) {
    return 31;
  }
}

function endSavingDay() {
  let lang = getLang('saving');

  ons.notification.confirm({
    message: lang.endQuestion,
    title: lang.notice,
    buttonLabels: [lang.confirmEnd, lang.cancel],
    animation: 'default',
    primaryButtonIndex: 1,
    cancelable: true,
    callback: function (index) {
      if (0 === index) {
        let storageS = JSON.parse(localStorage.getItem('savingStorage'));
        let moneyLeft = storageS.moneyLeft;

        //Si no hay más días y queda dinero disponible pregunto si lo quiere añadir a su dinero
        if (storageS.daysLeft < 1) {
          ons.notification.toast(lang.noMoreDays, {
            title: 'Error!',
            timeout: 2000,
            animation: 'ascend',
          });
          if (moneyLeft > 0) {
            let dialog = document.getElementById('alertMoneyLeft');

            if (dialog) {
              dialog.show();
              document.getElementById('leftMoneyToAlert').innerHTML = moneyLeft;
            } else {
              ons.notification.toast('Ups! contact support!', {
                title: 'Error!',
                timeout: 2000,
                animation: 'ascend',
              });
            }
          }
          return;
        }

        // Si me quedo dinero
        if (moneyLeft > 0) {
          let dialog = document.getElementById('alertMoneyLeft');

          if (dialog) {
            dialog.show();
            document.getElementById('leftMoneyToAlert').innerHTML = moneyLeft;
          } else {
            ons.notification.toast('Ups! contact support!', {
              title: 'Error!',
              timeout: 2000,
              animation: 'ascend',
            });
          }
        } else {
          // Si no me quedó dinero
          let savingStorage = JSON.parse(localStorage.getItem('savingStorage'));

          savingStorage.daysLeft = parseInt(savingStorage.daysLeft) - 1;
          if (savingStorage.daysLeft > 0) {
            savingStorage.moneyLeft = savingStorage.toExpend;
          }

          localStorage.setItem('savingStorage', JSON.stringify(savingStorage));
          loadSaving();

          ons.notification.toast(lang.dayChanged, {
            title: 'Aviso!',
            timeout: 2500,
            animation: 'ascend',
          });
        }
      } else {
        ons.notification.toast(lang.allNormal, {
          title: 'Aviso!',
          timeout: 1000,
          animation: 'ascend',
        });
      }
    },
  });
}

/* ABRE EL ALERT PARA EDITAR EL SAVING*/
function editMoneySaving() {
  var dialog = document.getElementById('alertEditSavingMoney');
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

function checkRadioSelect(id) {
  let container = document.getElementById('containerAlertAddMoneyLeft');
  sessionStorage.setItem('selectedRadioID', id);

  let lang = getLang('saving');

  // Si elige la opcion de mi dinero se cargan las opciones, de lo contrario se ocultan
  if (id == 'radio-2') {
    container.innerHTML = `
      <label style="color: var(--alert-tile-color)">${lang.addTo}: </label>
      <select id="selectOptionAddMoney">
        <!--AQUÍ SE CARGAN LOS POSIBLES GASTOS-->
      </select>`;

    // CARGO EL DINERO DISPONIBLE
    let moneyStorage = JSON.parse(localStorage.getItem('moneyStorage'));

    let containerMoney = document.getElementById('selectOptionAddMoney');
    containerMoney.innerHTML = '';

    const option = document.createElement('option');
    let text = 'SELECCIONA OPCIÓN';
    option.innerText = text;

    containerMoney.appendChild(option);
    if (moneyStorage == null || moneyStorage == 'null') {
    } else {
      for (let i = 0; i < moneyStorage.length; i++) {
        const option = document.createElement('option');
        let text = moneyStorage[i].moneyName;
        option.innerText = text;

        containerMoney.appendChild(option);
      }
    }
  } else {
    container.innerHTML = '';
  }
}

//alertMoneyLeft
function addToMoneyLeftMoney() {
  let leftMoney = document.getElementById('leftMoneyToAlert').textContent;
  let selectedRadioID = sessionStorage.getItem('selectedRadioID');
  let savingStorage = JSON.parse(localStorage.getItem('savingStorage'));
  let lang = getLang('saving');

  if (selectedRadioID == null || selectedRadioID == '') {
    selectedRadioID = 'radio-1';
    sessionStorage.setItem('selectedRadioID', 'radio-1');
  }

  // Si quiero añadir al día siguiente
  if (selectedRadioID == 'radio-1') {
    let days = savingStorage.daysLeft;
    let leftDays = parseInt(days) - 1;

    // No hay más días para el fondo
    if (leftDays < 1) {
      ons.notification.toast(lang.noMore, {
        title: 'Aviso!',
        timeout: 2500,
        animation: 'ascend',
      });
      return;
    } else {
      // Si días restantes es mayor a 0 lo resto, para evitar el -1
      if (leftDays > 0) {
        // Resto el día y añado el dinero al día siguiente
        savingStorage.daysLeft = parseInt(savingStorage.daysLeft) - 1;
      }

      let newAmount = parseFloat(savingStorage.toExpend) + parseFloat(leftMoney);
      savingStorage.moneyLeft = newAmount.toFixed(2);

      localStorage.setItem('savingStorage', JSON.stringify(savingStorage));

      document.getElementById('alertMoneyLeft').hide();
      loadSaving();

      ons.notification.toast(lang.moneyAdded, {
        title: 'Aviso!',
        timeout: 2500,
        animation: 'ascend',
      });
    }
    // Si quiero añadir el dinero a alguna cartera
  } else if (selectedRadioID == 'radio-2') {
    const selMoney = document.getElementById('selectOptionAddMoney');
    const optMoney = selMoney.options;
    // Categoría seleccionada
    var choseMoney = optMoney[selMoney.selectedIndex].value;

    if (choseMoney == 'SELECCIONA OPCIÓN') {
      ons.notification.toast(lang.selectOption, {
        title: 'Aviso!',
        timeout: 2500,
        animation: 'ascend',
      });
      return;
    }

    savingStorage.daysLeft = parseInt(savingStorage.daysLeft) - 1;
    localStorage.setItem('savingStorage', JSON.stringify(savingStorage));

    let moneys = JSON.parse(localStorage.getItem('moneyStorage'));

    // Añado el dinero a la cartera
    for (let i = 0; i < moneys.length; i++) {
      if (moneys[i].moneyName == choseMoney) {
        let newMoney = parseFloat(moneys[i].moneyCurrent) + parseFloat(leftMoney);
        moneys[i].moneyCurrent = newMoney.toFixed(2);

        localStorage.setItem('moneyStorage', JSON.stringify(moneys));

        // Actualizo el dinero ahorrado
        let savedMoney = localStorage.getItem('savedMoneySaving');
        if (savedMoney == null || savedMoney == '') {
          savedMoney = 0;
        }
        savedMoney = (parseFloat(savedMoney) + parseFloat(leftMoney)).toFixed(2);
        localStorage.setItem('savedMoneySaving', savedMoney);
        break;
      }
    }

    // Pongo el nuevo dinero
    savingStorage.moneyLeft = savingStorage.toExpend;
    localStorage.setItem('savingStorage', JSON.stringify(savingStorage));

    // Pongo el dinero disponible en 0 dado que no quedan días restantes del fondo
    if (parseInt(savingStorage.daysLeft) < 1) {
      savingStorage.moneyLeft = 0;
      localStorage.setItem('savingStorage', JSON.stringify(savingStorage));
    }

    document.getElementById('alertMoneyLeft').hide();
    loadSaving();

    ons.notification.toast(`${lang.leftAmountAdd}: ${choseMoney}!`, {
      title: 'Aviso!',
      timeout: 2500,
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

// Suma
function makeSavingOperation() {
  let actualMoney = document.getElementById('alertAddSaving').textContent;
  let inputMoney = document.getElementById('alertInputSaving').value;
  let endMoney = document.getElementById('alertAddSavingEnd');

  let result = parseFloat(
    parseFloat(actualMoney) + Math.abs(parseFloat(inputMoney)),
  ).toFixed(2);

  endMoney.innerHTML = result;
}

//Resta
function makeSavingResOperation() {
  let actualMoney = document.getElementById('alertAddSaving').textContent;
  let inputMoney = document.getElementById('alertInputSaving').value;
  let endMoney = document.getElementById('alertAddSavingEnd');

  let result = parseFloat(
    parseFloat(actualMoney) - Math.abs(parseFloat(inputMoney)),
  ).toFixed(2);

  endMoney.innerHTML = result;
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

/* ALERT PRINCIPAL */
function closeAlertSaving() {
  let lang = getLang('saving');

  if (document.getElementById('alertInputSaving') === null) {
    ons.notification.toast(lang.selectSomething, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  let element = document.getElementById('alertInputSaving').value;
  if (element === null || element === '' || element == '') {
    ons.notification.toast(lang.enterAmount, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  let actualMoney = parseFloat(document.getElementById('alertAddSaving').textContent);
  let endMoney = parseFloat(document.getElementById('alertAddSavingEnd').textContent);

  let testMoney = Math.sign(endMoney);
  if (testMoney === -1 || testMoney === -0) {
    ons.notification.toast(lang.noNegative1, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  /* Se hizo una resta */
  if (actualMoney > endMoney) {
    let storage = JSON.parse(localStorage.getItem('savingStorage'));

    storage.moneyLeft = endMoney;

    localStorage.setItem('savingStorage', JSON.stringify(storage));
    document.getElementById('alertEditSavingMoney').hide();

    /* Preguntar si deseo añadir eso como gasto */
    ons.notification.confirm({
      message: lang.reducedMoney,
      title: lang.notice,
      buttonLabels: [lang.confirmAdd, lang.no],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          /* ABRIR VENTANA PARA AÑADIR UN GASTO A ALGUNA CATEGORÍA DE GASTO */
          var dialog = document.getElementById('alertToAddExpenseSaving');

          document.getElementById('alertExpenseNoteSaving').value = '';
          document.getElementById('alertExpenseMoneySaving').value = Math.abs(element);
          document.getElementById('alertExpenseDateSaving').value = '';

          if (dialog) {
            dialog.show();
            //CARGAR CATEGORÍAS DISPONIBLES Y CARGAR DONDE SE PUEDE RESTAR EL DINERO
            loadDialogCategoryAndMoney();
          } else {
            ons.notification.toast('Ups! contact support!', {
              title: 'Error!',
              timeout: 2000,
              animation: 'ascend',
            });
          }
          loadSaving();
        } else {
          ons.notification.toast(lang.justReduced, {
            title: 'Aviso!',
            timeout: 1000,
            animation: 'ascend',
          });
          loadSaving();
        }
      },
    });
  } else if (actualMoney < endMoney) {
    // Se hizo una suma
    let storage = JSON.parse(localStorage.getItem('savingStorage'));
    storage.moneyLeft = endMoney;
    localStorage.setItem('savingStorage', JSON.stringify(storage));

    ons.notification.toast(lang.moreAdded, {
      title: 'Aviso!',
      timeout: 1000,
      animation: 'ascend',
    });

    document.getElementById('alertEditSavingMoney').hide();
    loadSaving();
  }
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
  if (categoryStorage == null || categoryStorage == 'null') {
  } else {
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

// Cuando da en listo para añadir un gasto
function hideAlertAddExpenseSaving() {
  // Añadir el gasto a donde corresponde

  const selCategory = document.getElementById('selectOptioCa');
  const optCategory = selCategory.options;
  // Categoría seleccionada
  var choseCategory = optCategory[selCategory.selectedIndex].value;

  const selMoney = document.getElementById('selectOption');
  const optMoney = selMoney.options;
  // Dinero seleccionado
  var choseMoney = optMoney[selMoney.selectedIndex].value;

  let eName = document.getElementById('alertExpenseNoteSaving').value;
  let eMoney = document.getElementById('alertExpenseMoneySaving').value; //dinero del gasto
  let eDate = document.getElementById('alertExpenseDateSaving').value;
  let eid = localStorage.getItem('detailExpenseCount'); //id único de los gastos

  let lang = getLang('saving');

  if (eid == null || eid == '') {
    localStorage.setItem('detailExpenseCount', '0');
    eid = 0;
  }

  eid = +eid + 1;
  localStorage.setItem('detailExpenseCount', eid);

  if (eName == null || eName == '') {
    ons.notification.toast(lang.noName, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (eDate == null || eDate == '') {
    eDate = new Date().toJSON().slice(0, 10);
  }

  if (choseCategory == 'NINGUNA CATEGORÍA' || choseCategory == 'NO CATEGORY') {
    ons.notification.toast(lang.selectCategory, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (choseMoney == 'NO RESTAR' || choseMoney == 'DO NOT SUBTRACT') {
  } else {
    // Resto el dinero de donde se selecciono, me regreso sino se puede restar
    if (updateMoneyStorage(choseMoney, eMoney)) {
      return;
    }
  }
  let eMoneyFixed = parseFloat(eMoney).toFixed(2);

  let expenseDetail = {
    expenseName: choseCategory,
    inName: eName,
    inAmount: eMoneyFixed,
    inDate: eDate,
    inID: eid,
    inWallet: choseMoney,
  };

  /* Guardo los detalles del Expense*/
  if (localStorage.getItem('expenseDetailStorage') === null) {
    let expenseDetailArray = [];
    expenseDetailArray.unshift(expenseDetail);
    localStorage.setItem('expenseDetailStorage', JSON.stringify(expenseDetailArray));
  } else {
    let expenseDetailArray = JSON.parse(localStorage.getItem('expenseDetailStorage'));
    expenseDetailArray.unshift(expenseDetail);
    localStorage.setItem('expenseDetailStorage', JSON.stringify(expenseDetailArray));
  }

  updateExpenseTotalMoneySaving(choseCategory, eMoney);

  ons.notification.toast(lang.newExpense, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

  sessionStorage.clear();
  document.getElementById('alertToAddExpenseSaving').hide();
}

// Cuando da en cancelar en el alert para añadir un gasto
function hideAlertAddExpenseSavingNoChange() {
  let lang = getLang('saving');

  ons.notification.toast(lang.nothingButSubtract, {
    title: 'Aviso!',
    timeout: 2500,
    animation: 'ascend',
  });

  document.getElementById('alertToAddExpenseSaving').hide();
}

// Actualizo los gastos
function updateExpenseTotalMoneySaving(sendName, amountSend) {
  let exName = sendName;
  let newAmount = amountSend;

  let expensesStorage = JSON.parse(localStorage.getItem('expenseStorage'));

  let expense;
  let index;
  for (let i = 0; i < expensesStorage.length; i++) {
    if (expensesStorage[i].expenseName == exName) {
      expense = expensesStorage[i];
      index = i;
      break;
    }
  }

  let totalExpense = parseFloat(expense.totalExpense) + parseFloat(newAmount);
  expense.totalExpense = totalExpense;

  /* Guardo el expense original*/
  if (localStorage.getItem('expenseStorage') === null) {
    let expenseArray = [];
    expenseArray.push(expense);
    localStorage.setItem('expenseStorage', JSON.stringify(expenseArray));
  } else {
    let expenseArray = JSON.parse(localStorage.getItem('expenseStorage'));
    expenseArray[index] = expense;
    localStorage.setItem('expenseStorage', JSON.stringify(expenseArray));
  }
}

function insertActionEditFund(option) {
  let optionsContainer = document.getElementById('alertEditSavingMoneyOptionsAlert');
  let lang = getLang('saving');

  if (option === 'add') {
    optionsContainer.innerHTML = `<p style="margin: 0px auto -16px 0px; text-align: center;">
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
    optionsContainer.innerHTML = `<p style="margin: 0px auto -16px 0px; text-align: center;">
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
