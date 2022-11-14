function makeSaving() {
  /* OBETENER VARIABLES */
  let mainAmount = document.getElementById('savingMainAmount').value;
  let rangeDays = document.getElementById('rangeDays').value;
  let rangePercent = document.getElementById('rangePercent').value;
  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (languaje == 'false') {
    if (mainAmount == null || mainAmount == 'null' || mainAmount == '') {
      ons.notification.toast('Wait, you have to enter an amount before!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    let testMoney = Math.sign(mainAmount);
    if (testMoney == '-1' || testMoney === '-0') {
      ons.notification.toast('You cannot add a negative number', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }
  } else {
    if (mainAmount == null || mainAmount == 'null' || mainAmount == '') {
      ons.notification.toast('Un momento, tienes que ingresar una cantidad antes!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    let testMoney = Math.sign(mainAmount);
    if (testMoney == '-1' || testMoney === '-0') {
      ons.notification.toast('No puedes añadir un fondo negativo.', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }
  }

  let storage = JSON.parse(localStorage.getItem('savingStorage'));

  if (storage) {
    if (languaje == 'false') {
      ons.notification.confirm({
        message: 'A fund already exists, do you want to delete the current one and enter this new one?',
        title: 'Notice!',
        buttonLabels: ['Yes, delete', 'Cancel'],
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

            ons.notification.toast('It has been updated successfully!!', {
              title: 'Notice!',
              timeout: 2000,
              animation: 'ascend',
            });
          } else {
            ons.notification.toast('Okay, everything flows as normal!', {
              title: 'Notice!',
              timeout: 1000,
              animation: 'ascend',
            });
          }
        },
      });
    } else {
      ons.notification.confirm({
        message: 'Ya existe un fondo, ¿quieres borrar el actual e ingresar este nuevo?',
        title: 'Aviso!',
        buttonLabels: ['Sí, borrar', 'Cancelar'],
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

            ons.notification.toast('Se ha actualizado el fondo!', {
              title: 'Aviso!',
              timeout: 2000,
              animation: 'ascend',
            });
          } else {
            ons.notification.toast('De acuerdo, todo fluye como normalmente!', {
              title: 'Aviso!',
              timeout: 1000,
              animation: 'ascend',
            });
          }
        },
      });
    }
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

    if (languaje == 'false') {
      ons.notification.toast('The fund has been entered!', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('Se ha ingresado el fondo!', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
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
  document.getElementById('entryAmount').innerHTML = formatMoney(parseFloat(mainAmount).toFixed(2));
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
  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (savingStorage == null || savingStorage == 'null') {
    if (languaje == 'false') {
      cSavingView.innerHTML = `<label class="cardHomeTitle" style="margin-top: 0px">There is no active fund...</label>`;
    } else {
      cSavingView.innerHTML = `<label class="cardHomeTitle" style="margin-top: 0px">No hay un fondo activo...</label>`;
    }
    return;
  } else {
    if (languaje == 'false') {
      cSavingView.innerHTML = `<label class="entryAmountText" id="modifyFundActualAmount"
        >Entered amount: 
        <div style="display: block;">
          <span class="entryAmountDetail" style="color: var(--card-text-title-color)">$ </span>
          <span id="entryCurrentAmount" class="entryAmountDetail">0</span>
        </div>
      </label>

        <label class="entryAmountText" id="modifyFundActualDays"
        >Selected days:
          <div style="display: block;">
            <span id="entryCurrentDays" class="entryAmountDetail"></span>
          </div>
        </label
        >

        <label class="entryAmountText"
        >Remaining days:
          <div style="display: block;">
            <span id="entryCurrentDaysLeft" class="entryAmountDetail"></span>
          </div>
        </label>

        <label class="entryAmountText" id="modifyFundActualPercentage"
        >Percentage:
          <div style="display: block;">
            <span id="entryCurrentPercent" class="entryAmountDetail"></span>
          </div>
        </label>

        <label class="entryAmountText" id="modifyFundActualToExpend"
        >To spend: 
          <div style="display: block;">
            <span class="entryAmountDetail" style="color: var(--card-text-title-color)">$ </span>
            <span id="entryCurrentExpend" class="entryAmountDetail">0</span>
          </div>
        </label>
        
        <label class="entryAmountText" style="margin-bottom: 0px;"
        >Current available: 
          <div style="display: block;">
            <span class="entryAmountDetail" style="color: var(--card-text-title-color)">$ </span>
            <span id="entryCurrentExpendLeft" class="entryAmountDetail">0</span>
          </div>
        </label>`;
    } else {
      cSavingView.innerHTML = `<label class="entryAmountText" id="modifyFundActualAmount"
        >Cantidad ingresada: 
        <div style="display: block;">
          <span class="entryAmountDetail" style="color: var(--card-text-title-color)">$ </span>
          <span id="entryCurrentAmount" class="entryAmountDetail">0</span>
        </div>
      </label>

        <label class="entryAmountText" id="modifyFundActualDays"
        >Días seleccionados:
          <div style="display: block;">
            <span id="entryCurrentDays" class="entryAmountDetail"></span>
          </div>
        </label
        >

        <label class="entryAmountText"
        >Días restantes:
          <div style="display: block;">
            <span id="entryCurrentDaysLeft" class="entryAmountDetail"></span>
          </div>
        </label>

        <label class="entryAmountText" id="modifyFundActualPercentage"
        >Porcentaje:
          <div style="display: block;">
            <span id="entryCurrentPercent" class="entryAmountDetail"></span>
          </div>
        </label>

        <label class="entryAmountText" id="modifyFundActualToExpend"
        >Para gastar: 
          <div style="display: block;">
            <span class="entryAmountDetail" style="color: var(--card-text-title-color)">$ </span>
            <span id="entryCurrentExpend" class="entryAmountDetail">0</span>
          </div>
        </label>
        
        <label class="entryAmountText" style="margin-bottom: 0px;"
        >Disponible actual: 
          <div style="display: block;">
            <span class="entryAmountDetail" style="color: var(--card-text-title-color)">$ </span>
            <span id="entryCurrentExpendLeft" class="entryAmountDetail">0</span>
          </div>
        </label>`;
    }
  }

  let sInnerAmount = savingStorage.mainAmount;
  let sDaysSelected = savingStorage.rangeDays;
  let sPercent = savingStorage.rangePercent;
  let sTakedAmount = savingStorage.equivalentAmount;
  let sMoneyDay = savingStorage.toExpend;
  let sDaysLeft = savingStorage.daysLeft;
  let sMoneyDayLeft = savingStorage.moneyLeft;

  document.getElementById('entryCurrentAmount').innerHTML = formatMoney(parseFloat(sInnerAmount).toFixed(2));
  document.getElementById('entryCurrentDays').innerHTML = sDaysSelected;
  document.getElementById('entryCurrentDaysLeft').innerHTML = sDaysLeft;
  document.getElementById('entryCurrentPercent').innerHTML =
    sPercent +
    `<span style="color: var(--card-text-title-color)"> % </span> | <span style="color: var(--card-text-title-color)">$</span> ` +
    formatMoney(sTakedAmount);
  document.getElementById('entryCurrentExpend').innerHTML = formatMoney(sMoneyDay);
  document.getElementById('entryCurrentExpendLeft').innerHTML = formatMoney(parseFloat(sMoneyDayLeft).toFixed(2));
}

function loadSaving() {
  let sView = document.getElementById('savingMainContainer');
  let savingStorage = JSON.parse(localStorage.getItem('savingStorage'));
  let languaje = localStorage.getItem('storageSwitchLanguage');

  sView.innerHTML = '';

  if (languaje == 'false') {
    savingTutorial = `<ons-card>
      <ons-list style="background: none;" id="expenseListOfExpensesContainer">
        <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
          <label class="iconExpenseLabel" style="margin-left: 32px;">
            See tutorial
          </label>
          <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr;">
            <p class="paraTutorial">
              Fund will be the option that will help you control your expenses,
              you can choose how much money you want to spend and in how many days, 
              by means of a percentage you can select how much money you can spend day by day.
            </p>
            <p class="paraTutorial">
              Example, if you have $ 3000 and you want to spend 50% of that amount in the next 15 days, 
              the application will tell you how much money you can spend during each day for those selected days.
            </p>
            <p class="paraTutorial">
              You will be able to increase the daily expense that you will have, you will also be able to reduce it, 
              if you want to reduce it you will be asked if you want to create an expense, 
              if you accept you must select in which category you want to create that expense, yes, 
              you must already have the expense created in "EXPENSES" You can also reduce it to your money, 
              and obviously you must have that money created in "MY MONEY".
            </p>
            <p class="paraTutorial">
              The point is that you subtract the days as they end, to finish it you must give on "End day", 
              it is not necessary that you finish all your available money on the day to move on to the next, 
              if there was any money left you will be asked what you want do with it, add it the next day if there is one or save it in "MY MONEY".
            </p>
            <p class="paraTutorial">
              The money that you save when you have excess is the one that will be seen on the home screen in “SAVED FUND”.
            </p>
            <p class="paraTutorial">
              To restart that amount, enter "MY FUND", click on the pencil and where your saved fund appears in "RESET"
            </p>
            <p class="paraTutorial">
              To modify / enter a new fund click on the pencil
            </p>
          </div>
        </ons-list-item>
      </ons-list>
    </ons-card>`;
  } else {
    savingTutorial = `<ons-card>
      <ons-list style="background: none;" id="expenseListOfExpensesContainer">
        <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
          <label class="iconExpenseLabel" style="margin-left: 32px;">
            Leer tutorial
          </label>
          <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr;">
            <p class="paraTutorial">
              Fondo será la opción que te ayudará a controlar tus gastos, 
              podrás elegir que cantidad de dinero quieres gastar y en cuantos días, 
              mediante un porcentaje podrás seleccionar cuanto dinero podrás gastar día con día.
            </p>
            <p class="paraTutorial">
              Ejemplo, sí tienes $3000 y quieres gastar el 50% de esa cantidad en los próximos 15 días, 
              la aplicación te dirá cuanto dinero puedes gastar durante cada día por esos días seleccionados.
            </p>
            <p class="paraTutorial">
              Podrás aumentar el gasto diario que tendrás, también podrás reducirlo,
              si lo quieres reducir se te preguntara si deseas crear un gasto, 
              de aceptar deberás seleccionar en que categoría quieres crear ese gasto, eso sí, 
              deberás tener ya el gasto creado en “GASTOS”, también podrás reducirlo a tu dinero, y obvio deberás tener ese dinero creado en “MI DINERO”.
            </p>
            <p class="paraTutorial">
              El punto es que vayas restando los días conforme estos terminen, para terminarlo deberás dar sobre “Terminar día”, 
              no es necesario que te termines todo tu dinero disponible en el día para pasar al siguiente, 
              si quedó algo de dinero se te preguntara que quieres hacer con el, 
              añadirlo al día siguiente en caso de haberlo o guardarlo en "MI DINERO".
            </p>
            <p class="paraTutorial">
              El dinero que guardes cuando te sobre es el que se verá en la pantalla de inicio en “FONDO GUARDADO”.
            </p>
            <p class="paraTutorial">
              Para reiniciar esa cantidad ingresa en "MI FONDO", da click en "MODIFICAR" y en donde sale tu fondo ahorrado en "REINICIAR"
            </p>
            <p class="paraTutorial">
              Para modificar/ingresar un nuevo fondo da click en “Modificar”.
            </p>
          </div>
        </ons-list-item>
      </ons-list>
    </ons-card>`;
  }

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

  if (languaje == 'false') {
    sView.innerHTML = `<div style="margin: 20px">
      <div class="title mainTitle">
          Saved
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
        Available
      </div>
      <div class="content">
          <label id="savingsDailyInfo" class="savingDaily">
            <span style="color: var(--card-text-title-color)">$</span> 
            ${sMoneyDayLeft}
          </label>
          <ons-button class="flatButton" onclick="editMoneySaving()" style="margin-left: 0px; margin-right: 0px">Modify money</ons-button>
      </div>
    </ons-card>

    <ons-card>
      <div class="title daysTitle">
        Remaining days | <span id="savingsDays" class="leftDays">${sDaysLeft}</span>
      </div>
      <div class="content">
          <ons-button class="flatButtonLight" onclick="endSavingDay()" style="margin-left: 0px; margin-right: 0px">End day</ons-button>
      </div>
    </ons-card>
    
    <ons-card>
        <label class="cardHomeTitle" style="margin-top: 16px; text-align: left; color: var(--saving-title);">Saved money</label> 
        <div style="display: flex; align-items: center;">
          <div class="iconSavedMoney" style="display: flex; justify-content: space-around;">
            <img src="/www/assets/icons/savingOption.svg" alt="saving icon" style="width: 24px">
          </div>
          <div class="title totalMoneyTitle" style="color: var(--card-text-title-color);">$
            <span class="totalMoneyTitle" style="margin-left:0" id="savingMainAmount"> ${savedMoney} </span>
          </div>
        </div>
        <ons-button class="flatButton" onclick="resetSavingMoney()" style="margin-bottom:16px">RESET</ons-button>
      </ons-card>`;
  } else {
    sView.innerHTML = `<div style="margin: 20px">
        <div class="title mainTitle">
            Fondo
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
            Disponible
        </div>
        <div class="content">
            <label id="savingsDailyInfo" class="savingDaily">
              <span style="color: var(--card-text-title-color)">$</span> 
              ${sMoneyDayLeft}
            </label>
            <ons-button class="flatButton" onclick="editMoneySaving()" style="margin-left: 0px; margin-right: 0px">Modificar dinero</ons-button>
        </div>
      </ons-card>
  
      <ons-card>
        <div class="title daysTitle">
            Días restantes | <span id="savingsDays" class="leftDays">${sDaysLeft}</span>
        </div>
        <div class="content">
            <ons-button class="flatButtonLight" onclick="endSavingDay()" style="margin-left: 0px; margin-right: 0px">Terminar día</ons-button>
        </div>
      </ons-card>


      <ons-card>
        <label class="cardHomeTitle" style="margin-top: 16px; text-align: left; color: var(--saving-title);">Dinero ahorrado</label> 
        <div style="display: flex; align-items: center;">
          <div class="iconSavedMoney" style="display: flex; justify-content: space-around;">
            <img src="/www/assets/icons/savingOption.svg" alt="saving icon" style="width: 24px">
          </div>
          <div class="title totalMoneyTitle" style="color: var(--card-text-title-color);">$
            <span class="totalMoneyTitle" style="margin-left:0" id="savingMainAmountCard"> ${savedMoney} </span>
          </div>
        </div>
        <ons-button class="flatButton" onclick="resetSavingMoney()" style="margin-bottom:16px">REINICIAR</ons-button>
      </ons-card>`;
  }
}

function loadDetailSaving() {
  updateSavingPreview();
  updateLastSaving();
}

function resetSavingMoney() {
  let languaje = localStorage.getItem('storageSwitchLanguage');
  let savedMoney = document.getElementById('savingMainAmountCard');
  if (languaje == 'false') {
    ons.notification.confirm({
      message: 'Are you sure to reset the saved fund?',
      title: 'Notice!',
      buttonLabels: ['Yes, reset', 'Cancel'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let storageS = localStorage.getItem('savedMoneySaving');
          if (storageS) {
            localStorage.setItem('savedMoneySaving', 0);
            savedMoney.innerHTML = 0;
            ons.notification.toast('The saved fund has been reset!', {
              title: 'Notice!',
              timeout: 1000,
              animation: 'ascend',
            });
          } else {
            ons.notification.toast(`You don't have a fund saved to eliminate.`, {
              title: 'Notice!',
              timeout: 1000,
              animation: 'ascend',
            });
          }
        } else {
          ons.notification.toast('Okay, everything flows as normal!', {
            title: 'Notice!',
            timeout: 1000,
            animation: 'ascend',
          });
        }
      },
    });
  } else {
    ons.notification.confirm({
      message: '¿Estas seguro de reiniciar el fondo ahorrado?',
      title: 'Aviso!',
      buttonLabels: ['Sí, reiniciar', 'Cancelar'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let storageS = localStorage.getItem('savedMoneySaving');
          if (storageS) {
            localStorage.setItem('savedMoneySaving', 0);
            savedMoney.innerHTML = 0;
            ons.notification.toast('El fondo ahorrado se ha reiniciado!', {
              title: 'Aviso!',
              timeout: 1000,
              animation: 'ascend',
            });
          } else {
            ons.notification.toast('No tienes un fondo ahorrado para eliminar.', {
              title: 'Aviso!',
              timeout: 1000,
              animation: 'ascend',
            });
          }
        } else {
          ons.notification.toast('De acuerdo, todo fluye como normalmente!', {
            title: 'Aviso!',
            timeout: 1000,
            animation: 'ascend',
          });
        }
      },
    });
  }
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
  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (languaje == 'false') {
    ons.notification.confirm({
      message: 'Are you sure to finish the day?',
      title: 'Notice!',
      buttonLabels: ['Yes, finish', 'Cancel'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let storageS = JSON.parse(localStorage.getItem('savingStorage'));
          let moneyLeft = storageS.moneyLeft;

          if (storageS.daysLeft < 1) {
            ons.notification.toast(`There are no more days left in your fund, you can't finish the day anymore, I'm sorry!`, {
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
                ons.notification.toast('Ups! No se ha podido cargar la ventana para el dinero disponible!', {
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
              ons.notification.toast('Oops! Unable to load window for available money!', {
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

            ons.notification.toast('The day has changed!', {
              title: 'Notice!',
              timeout: 2500,
              animation: 'ascend',
            });
          }
        } else {
          ons.notification.toast('Okay, everything flows as normal!', {
            title: 'Notice!',
            timeout: 1000,
            animation: 'ascend',
          });
        }
      },
    });
  } else {
    ons.notification.confirm({
      message: '¿Estas seguro de terminar el día?',
      title: 'Aviso!',
      buttonLabels: ['Sí, terminar', 'Cancelar'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let storageS = JSON.parse(localStorage.getItem('savingStorage'));
          let moneyLeft = storageS.moneyLeft;

          //Si no hay más dias y quedá dinero disponible pregunto si lo quiere añadir a su dinero
          if (storageS.daysLeft < 1) {
            ons.notification.toast(`Ya no hay más días restantes en el fondo, ingresa un nuevo fondo!. Lo siento!`, {
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
                ons.notification.toast('Ups! No se ha podido cargar la ventana para el dinero disponible!', {
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
              ons.notification.toast('Ups! No se ha podido cargar la ventana para el dinero disponible!', {
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

            ons.notification.toast('Se ha cambiado de día!', {
              title: 'Aviso!',
              timeout: 2500,
              animation: 'ascend',
            });
          }
        } else {
          ons.notification.toast('De acuerdo, todo fluye como normalmente!', {
            title: 'Aviso!',
            timeout: 1000,
            animation: 'ascend',
          });
        }
      },
    });
  }
}

/* ABRE EL ALERT PARA EDITAR EL SAVING*/
function editMoneySaving() {
  var dialog = document.getElementById('alertEditSavingMoney');
  let storage = JSON.parse(localStorage.getItem('savingStorage'));
  let optionsContainer = document.getElementById('alertEditSavingMoneyOptionsAlert');
  let languaje = localStorage.getItem('storageSwitchLanguage');

  document.getElementById('alertAddSaving').innerHTML = storage.moneyLeft;
  document.getElementById('alertAddSavingEnd').innerHTML = '';

  if (dialog) {
    if (languaje == 'false') {
      optionsContainer.innerHTML = `<ons-button
        class="moneyButtonAdd"
        onclick="insertActionEditFund('add')"
        style="margin-bottom: 16px; margin-left: 0px; width: 90%"
        id="newMoneyCancelButton"
      >
        <i class="icon ion-md-add" style="font-size: 14px; margin-right: 16px"></i>
        Add money
      </ons-button>
    
      <ons-button
        class="moneyButtonAdd"
        onclick="insertActionEditFund('remove')"
        style="margin-bottom: 16px; margin-left: 0px; width: 90%"
        id="newMoneyCancelButton"
      >
        <i class="icon ion-md-remove" style="font-size: 14px; margin-right: 16px"></i>
        Remove money
      </ons-button>`;
    } else {
      optionsContainer.innerHTML = `<ons-button
        class="moneyButtonAdd"
        onclick="insertActionEditFund('add')"
        style="margin-bottom: 16px; margin-left: 0px; width: 90%"
        id="newMoneyCancelButton"
      >
        <i class="icon ion-md-add" style="font-size: 14px; margin-right: 16px"></i>
        Añadir dinero
      </ons-button>
    
      <ons-button
        class="moneyButtonAdd"
        onclick="insertActionEditFund('remove')"
        style="margin-bottom: 16px; margin-left: 0px; width: 90%"
        id="newMoneyCancelButton"
      >
        <i class="icon ion-md-remove" style="font-size: 14px; margin-right: 16px"></i>
        Restar dinero
      </ons-button>`;
    }

    dialog.show();
  } else {
    ons.notification.toast('Ups! No se ha podido cargar la ventana para modificar!', {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
}

function checkRadioSelect(id) {
  let container = document.getElementById('containerAlertAddMoneyLeft');
  sessionStorage.setItem('selectedRadioID', id);

  let languaje = localStorage.getItem('storageSwitchLanguage');

  // Si elige la opcion de mi dinero se cargan las opciones, de lo contrario se ocultan
  if (id == 'radio-2') {
    if (languaje == 'false') {
      container.innerHTML = `
      <label style="color: var(--alert-tile-color)">Add to: </label>
      <select id="selectOptionAddMoney">
        <!--AQUI SE CARGAN LOS POSIBLES GASTOS-->
      </select>`;
    } else {
      container.innerHTML = `
      <label style="color: var(--alert-tile-color)">Añadir a: </label>
      <select id="selectOptionAddMoney">
        <!--AQUI SE CARGAN LOS POSIBLES GASTOS-->
      </select>`;
    }

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
  let languaje = localStorage.getItem('storageSwitchLanguage');

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
      if (languaje == 'false') {
        ons.notification.toast(
          "There are no more days for the fund, you must select 'Add to MY MONEY' or modify the fund and add more days.",
          {
            title: 'Notice!',
            timeout: 2500,
            animation: 'ascend',
          }
        );
      } else {
        ons.notification.toast(
          "No hay más días para el fondo, debes seleccionar 'Añadir a MI DINERO' o modificar el fondo y agregar más días.",
          {
            title: 'Aviso!',
            timeout: 2500,
            animation: 'ascend',
          }
        );
      }
      return;
    } else {
      // Si dias restantes es mayor a 0 lo resto, para evitar el -1
      if (leftDays > 0) {
        // Resto el día y añado el dinero al día siguiente
        savingStorage.daysLeft = parseInt(savingStorage.daysLeft) - 1;
      }

      let newAmount = parseFloat(savingStorage.toExpend) + parseFloat(leftMoney);
      savingStorage.moneyLeft = newAmount.toFixed(2);

      localStorage.setItem('savingStorage', JSON.stringify(savingStorage));

      document.getElementById('alertMoneyLeft').hide();
      loadSaving();

      if (languaje == 'false') {
        ons.notification.toast('Remaining money added, today you can spend a little more!', {
          title: 'Notice!',
          timeout: 2500,
          animation: 'ascend',
        });
      } else {
        ons.notification.toast('Dinero restante añadido, hoy podrás gastar un poco más!', {
          title: 'Aviso!',
          timeout: 2500,
          animation: 'ascend',
        });
      }
    }
    // Si quiero añadir el dinero a alguna cartera
  } else if (selectedRadioID == 'radio-2') {
    const selMoney = document.getElementById('selectOptionAddMoney');
    const optMoney = selMoney.options;
    // Categoría seleccionada
    var choseMoney = optMoney[selMoney.selectedIndex].value;

    if (choseMoney == 'SELECCIONA OPCIÓN') {
      if (languaje == 'false') {
        ons.notification.toast(
          "Select an option where to save the money, if there is no place to save the money, add one in 'MY MONEY'",
          {
            title: 'Aviso!',
            timeout: 2500,
            animation: 'ascend',
          }
        );
      } else {
        ons.notification.toast(
          "Selecciona una opción donde guardar el dinero, si no existe un lugar donde guardar el dinero, añade uno en 'MI DINERO'",
          {
            title: 'Aviso!',
            timeout: 2500,
            animation: 'ascend',
          }
        );
      }
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

    if (languaje == 'false') {
      ons.notification.toast(`Remaining money added to: ${choseMoney}!`, {
        title: 'Aviso!',
        timeout: 2500,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast(`Dinero restante añadido a: ${choseMoney}!`, {
        title: 'Aviso!',
        timeout: 2500,
        animation: 'ascend',
      });
    }
  }
}

function cancelAddLeftMoney() {
  document.getElementById('alertMoneyLeft').hide();
  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (languaje == 'false') {
    ons.notification.toast('Okay, everything flows as normal!', {
      title: 'Notice!',
      timeout: 1000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast('De acuerdo, todo fluye como normalmente!', {
      title: 'Aviso!',
      timeout: 1000,
      animation: 'ascend',
    });
  }
}

// Suma
function makeSavingOperation() {
  let actualMoney = document.getElementById('alertAddSaving').textContent;
  let inputMoney = document.getElementById('alertInputSaving').value;
  let endMoney = document.getElementById('alertAddSavingEnd');

  let result = parseFloat(parseFloat(actualMoney) + Math.abs(parseFloat(inputMoney))).toFixed(2);

  endMoney.innerHTML = result;
}

//Resta
function makeSavingResOperation() {
  let actualMoney = document.getElementById('alertAddSaving').textContent;
  let inputMoney = document.getElementById('alertInputSaving').value;
  let endMoney = document.getElementById('alertAddSavingEnd');

  let result = parseFloat(parseFloat(actualMoney) - Math.abs(parseFloat(inputMoney))).toFixed(2);

  endMoney.innerHTML = result;
}

function closeAlertSavingNoChange() {
  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (languaje == 'false') {
    ons.notification.toast('Nothing is modified!', {
      title: 'Notice!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast('No se modifica nada!', {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }

  sessionStorage.clear();
  document.getElementById('alertEditSavingMoney').hide();
}

/* ALERT PRINCIPAL */
function closeAlertSaving() {
  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (document.getElementById('alertInputSaving') === null) {
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

  let element = document.getElementById('alertInputSaving').value;
  if (languaje == 'false') {
    if (element === null || element === '' || element == '') {
      ons.notification.toast('Enter how much money you want to add / remove, please!', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }
  } else {
    if (element === null || element === '' || element == '') {
      ons.notification.toast('Ingresa cuanto dinero deseas añadir/quitar, por favor!', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }
  }

  let actualMoney = parseFloat(document.getElementById('alertAddSaving').textContent);
  let endMoney = parseFloat(document.getElementById('alertAddSavingEnd').textContent);

  let testMoney = Math.sign(endMoney);
  if (testMoney == '-1' || testMoney === '-0') {
    if (languaje == 'false') {
      ons.notification.toast(`You can't leave your negative fund, sorry ...`, {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('No puedes dejar tu fondo negativo, lo siento...', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
    return;
  }

  /* Se hizo una resta */
  if (actualMoney > endMoney) {
    let storage = JSON.parse(localStorage.getItem('savingStorage'));

    storage.moneyLeft = endMoney;

    localStorage.setItem('savingStorage', JSON.stringify(storage));
    document.getElementById('alertEditSavingMoney').hide();

    /* Preguntar si deseo añadir eso como gasto */
    if (languaje == 'false') {
      ons.notification.confirm({
        message: 'You have reduced the money available. Do you want to add an expense?',
        title: 'Notice!',
        buttonLabels: ['Yes, add', 'No'],
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
              ons.notification.toast('Oops! Could not load window to modify!', {
                title: 'Error!',
                timeout: 2000,
                animation: 'ascend',
              });
            }
            loadSaving();
          } else {
            ons.notification.toast('Okay, only the money available has been reduced!', {
              title: 'Notice!',
              timeout: 1000,
              animation: 'ascend',
            });
            loadSaving();
          }
        },
      });
    } else {
      ons.notification.confirm({
        message: 'Has reducido el dinero disponible. ¿Quieres añadir un gasto?',
        title: 'Aviso!',
        buttonLabels: ['Sí, añadir', 'No'],
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
              ons.notification.toast('Ups! No se ha podido cargar la ventana para modificar!', {
                title: 'Error!',
                timeout: 2000,
                animation: 'ascend',
              });
            }
            loadSaving();
          } else {
            ons.notification.toast('De acuerdo, sólo se ha reducido el dinero disponible!', {
              title: 'Aviso!',
              timeout: 1000,
              animation: 'ascend',
            });
            loadSaving();
          }
        },
      });
    }
  } else if (actualMoney < endMoney) {
    // Se hizo una suma
    let storage = JSON.parse(localStorage.getItem('savingStorage'));
    storage.moneyLeft = endMoney;
    localStorage.setItem('savingStorage', JSON.stringify(storage));

    if (languaje == 'false') {
      ons.notification.toast('Available money has been increased!', {
        title: 'Notice!',
        timeout: 1000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('Se ha aumentado el dinero disponible!', {
        title: 'Aviso!',
        timeout: 1000,
        animation: 'ascend',
      });
    }

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

  let languaje = localStorage.getItem('storageSwitchLanguage');
  let ntext;
  if (languaje == 'false') {
    ntext = 'NO CATEGORY';
  } else {
    ntext = 'NINGUNA CATEGORÍA';
  }
  nOption.innerText = ntext;

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
  let eid = localStorage.getItem('detailExpenseCount'); //id unico de los gastos

  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (eid == null || eid == '') {
    localStorage.setItem('detailExpenseCount', '0');
    eid = 0;
  }

  eid = +eid + 1;
  localStorage.setItem('detailExpenseCount', eid);

  if (eName == null || eName == '') {
    if (languaje == 'false') {
      ons.notification.toast('You cannot add an expense without a name / note!', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('No puedes añadir un gasto sin un nombre/nota!', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
    return;
  }

  if (eDate == null || eDate == '') {
    eDate = new Date().toJSON().slice(0, 10);
  }

  if (choseCategory == 'NINGUNA CATEGORÍA' || choseCategory == 'NO CATEGORY') {
    if (languaje == 'false') {
      ons.notification.toast("You must select a category, if not, you must create one in 'EXPENSES'", {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast("Debes seleccionar una categoría, de no haber, debes crear una en 'GASTOS'", {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
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

  if (languaje == 'false') {
    ons.notification.toast('New expense added!', {
      title: 'Notice!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast('Nuevo gasto añadido!', {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }

  sessionStorage.clear();
  document.getElementById('alertToAddExpenseSaving').hide();
}

// Cuando da en cancelar en el alert para añadir un gasto
function hideAlertAddExpenseSavingNoChange() {
  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (languaje == 'false') {
    ons.notification.toast('Okay, no expense was added, but the money was reduced!', {
      title: 'Notice!',
      timeout: 2500,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast('De acuerdo, no se añadira ningún gasto, pero el dinero sí se redujo!', {
      title: 'Aviso!',
      timeout: 2500,
      animation: 'ascend',
    });
  }

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
  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (option === 'add') {
    if (languaje == 'false') {
      optionsContainer.innerHTML = `<p style="margin: 0px auto -16px 0px; text-align: center;" >
      I want to add
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
    } else {
      optionsContainer.innerHTML = `<p style="margin: 0px auto -16px 0px; text-align: center;">
      Quiero añadir
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
    }
  } else if (option === 'remove') {
    if (languaje == 'false') {
      optionsContainer.innerHTML = `<p style="margin: 0px auto -16px 0px; text-align: center;">
      I want to remove
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
    } else {
      optionsContainer.innerHTML = `<p style="margin: 0px auto -16px 0px; text-align: center;">
      Quiero quitar
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
}
