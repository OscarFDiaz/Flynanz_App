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
        buttonLabels: ['Yes', 'Cancel'],
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
        buttonLabels: ['Sí', 'Cancelar'],
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
  document.getElementById('entryAmount').innerHTML = parseFloat(mainAmount).toFixed(2);
  document.getElementById('entryDays').innerHTML = rangeDays;
  document.getElementById('entryPercent').innerHTML =
    rangePercent +
    `<span style="color: var(--card-text-title-color)"> % </span> | <span style="color: var(--card-text-title-color)">$</span> ` +
    parseFloat(equivalentAmount).toFixed(2);
  let toExpend = (parseFloat(equivalentAmount) / parseInt(rangeDays)).toFixed(2);
  document.getElementById('entryExpend').innerHTML = toExpend;

  /*Update de los range*/
  document.getElementById('rangeSelectDays').innerHTML = rangeDays;
  document.getElementById('rangeSelectPercent').innerHTML =
    rangePercent + ` <span style="color: var(--card-text-title-color)">%</span>`;

  /*Fondo ahorrado*/
  let amountSaved = localStorage.getItem('savedMoneySaving');
  if (amountSaved == null || amountSaved == '') {
    amountSaved = 0;
  }
  document.getElementById('totalSavingAmount').innerHTML =
    `<span style="color: var(--card-text-title-color)">$</span> ` + amountSaved;
}

function updateLastSaving() {
  let savingStorage = JSON.parse(localStorage.getItem('savingStorage'));
  let cSavingView = document.getElementById('actualSavingContainer');
  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (savingStorage == null || savingStorage == 'null') {
    if (languaje == 'false') {
      cSavingView.innerHTML = `<label class="cardHomeTitle" style="margin-top: 0px">THERE IS NO ACTIVE FUND...</label>`;
    } else {
      cSavingView.innerHTML = `<label class="cardHomeTitle" style="margin-top: 0px">NO HAY UN FONDO ACTIVO...</label>`;
    }
    return;
  } else {
    if (languaje == 'false') {
      cSavingView.innerHTML = `<label class="entryAmountText"
        >ENTERED AMOUNT: 
        <div style="display: block;">
          <span class="entryAmountDetail" style="color: var(--card-text-title-color)">$ </span>
          <span id="entryCurrentAmount" class="entryAmountDetail">0</span>
        </div>
      </label>

        <label class="entryAmountText"
        >SELECTED DAYS:
          <div style="display: block;">
            <span id="entryCurrentDays" class="entryAmountDetail"></span>
          </div>
        </label
        >

        <label class="entryAmountText"
        >REMAINING DAYS:
          <div style="display: block;">
            <span id="entryCurrentDaysLeft" class="entryAmountDetail"></span>
          </div>
        </label>

        <label class="entryAmountText"
        >PERCENTAGE:
          <div style="display: block;">
            <span id="entryCurrentPercent" class="entryAmountDetail"></span>
          </div>
        </label>

        <label class="entryAmountText"
        >TO SPEND: 
          <div style="display: block;">
            <span class="entryAmountDetail" style="color: var(--card-text-title-color)">$ </span>
            <span id="entryCurrentExpend" class="entryAmountDetail">0</span>
          </div>
        </label>
        
        <label class="entryAmountText" style="margin-bottom: 0px;"
        >CURRENT AVAILABLE: 
          <div style="display: block;">
            <span class="entryAmountDetail" style="color: var(--card-text-title-color)">$ </span>
            <span id="entryCurrentExpendLeft" class="entryAmountDetail">0</span>
          </div>
        </label>`;
    } else {
      cSavingView.innerHTML = `<label class="entryAmountText"
        >CANTIDAD INGRESADA: 
        <div style="display: block;">
          <span class="entryAmountDetail" style="color: var(--card-text-title-color)">$ </span>
          <span id="entryCurrentAmount" class="entryAmountDetail">0</span>
        </div>
      </label>

        <label class="entryAmountText"
        >DÍAS SELECCIONADOS:
          <div style="display: block;">
            <span id="entryCurrentDays" class="entryAmountDetail"></span>
          </div>
        </label
        >

        <label class="entryAmountText"
        >DÍAS RESTANTES:
          <div style="display: block;">
            <span id="entryCurrentDaysLeft" class="entryAmountDetail"></span>
          </div>
        </label>

        <label class="entryAmountText"
        >PORCENTAJE:
          <div style="display: block;">
            <span id="entryCurrentPercent" class="entryAmountDetail"></span>
          </div>
        </label>

        <label class="entryAmountText"
        >PARA GASTAR: 
          <div style="display: block;">
            <span class="entryAmountDetail" style="color: var(--card-text-title-color)">$ </span>
            <span id="entryCurrentExpend" class="entryAmountDetail">0</span>
          </div>
        </label>
        
        <label class="entryAmountText" style="margin-bottom: 0px;"
        >DISPONIBLE ACTUAL: 
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

  document.getElementById('entryCurrentAmount').innerHTML = parseFloat(sInnerAmount).toFixed(2);
  document.getElementById('entryCurrentDays').innerHTML = sDaysSelected;
  document.getElementById('entryCurrentDaysLeft').innerHTML = sDaysLeft;
  document.getElementById('entryCurrentPercent').innerHTML =
    sPercent +
    `<span style="color: var(--card-text-title-color)"> % </span> | <span style="color: var(--card-text-title-color)">$</span> ` +
    sTakedAmount;
  document.getElementById('entryCurrentExpend').innerHTML = sMoneyDay;
  document.getElementById('entryCurrentExpendLeft').innerHTML = parseFloat(sMoneyDayLeft).toFixed(2);
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
          <label class="iconExpenseLabel" style="margin-left: 50px;">
            SEE TUTORIAL
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
    </ons-card>

    <ons-card>
      <ons-list style="background: none;" id="expenseListOfExpensesContainer">
        <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
          <label class="iconExpenseLabel" style="margin-left: 50px;">
            SEE TUTORIAL (REQUIRES INTERNET)
          </label>
          <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr; padding: 0px; height: 400px">
          <iframe style="width: 100%; height: 100%; border-radius: 15px; border: none"
            src="https://www.youtube.com/embed/0LAKMfvSSKU">
          </iframe>
          </div>
        </ons-list-item>
      </ons-list>
    </ons-card>`;
  } else {
    savingTutorial = `<ons-card>
      <ons-list style="background: none;" id="expenseListOfExpensesContainer">
        <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
          <label class="iconExpenseLabel" style="margin-left: 50px;">
            LEER TUTORIAL
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
    </ons-card>
    
    <ons-card>
      <ons-list style="background: none;" id="expenseListOfExpensesContainer">
        <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
          <label class="iconExpenseLabel" style="margin-left: 50px;">
            VER TUTORIAL (REQUIERE INTERNET)
          </label>
          <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr; padding: 0px; height: 400px">
          <iframe style="width: 100%; height: 100%; border-radius: 15px; border: none"
            src="https://www.youtube.com/embed/rE4JM89tnd0">
          </iframe>
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

  let sTakedAmount = parseFloat(savingStorage.equivalentAmount).toFixed(2);
  let sMoneyDay = savingStorage.toExpend;
  let sDaysLeft = savingStorage.daysLeft;
  let sMoneyDayLeft = savingStorage.moneyLeft;

  if (languaje == 'false') {
    sView.innerHTML = `<ons-card>
      <div class="title mainTitle">
          SAVED
      </div>
      <div class="content">
          <label id="savingsInfo" class="savingInfo">
            <span style="color: var(--card-text-title-color)">$</span> ${sTakedAmount} / 
            <span style="color: var(--card-text-title-color)">$</span> ${sMoneyDay}</label>
      </div>
    </ons-card>

    <ons-card>
      <div class="title savingTitle">
        AVAILABLE
      </div>
      <div class="content">
          <label id="savingsDailyInfo" class="savingDaily">
            <span style="color: var(--card-text-title-color)">$</span> 
            ${sMoneyDayLeft}
          </label>
          <ons-button class="flatButton" onclick="editMoneySaving()" style="margin-left: 0px; margin-right: 0px">MODIFY MONEY</ons-button>
      </div>
    </ons-card>

    <ons-card>
      <div class="title daysTitle">
        REMAINING DAYS | <span id="savingsDays" class="leftDays">${sDaysLeft}</span>
      </div>
      <div class="content">
          <ons-button class="flatButtonLight" onclick="endSavingDay()" style="margin-left: 0px; margin-right: 0px">END DAY</ons-button>
      </div>
    </ons-card>`;
  } else {
    sView.innerHTML = `<ons-card>
        <div class="title mainTitle">
            FONDO
        </div>
        <div class="content">
            <label id="savingsInfo" class="savingInfo">
              <span style="color: var(--card-text-title-color)">$</span> ${sTakedAmount} / 
              <span style="color: var(--card-text-title-color)">$</span> ${sMoneyDay}</label>
        </div>
      </ons-card>
  
      <ons-card>
        <div class="title savingTitle">
            DISPONIBLE
        </div>
        <div class="content">
            <label id="savingsDailyInfo" class="savingDaily">
              <span style="color: var(--card-text-title-color)">$</span> 
              ${sMoneyDayLeft}
            </label>
            <ons-button class="flatButton" onclick="editMoneySaving()" style="margin-left: 0px; margin-right: 0px">MODIFICAR DINERO</ons-button>
        </div>
      </ons-card>
  
      <ons-card>
        <div class="title daysTitle">
            DÍAS RESTANTES | <span id="savingsDays" class="leftDays">${sDaysLeft}</span>
        </div>
        <div class="content">
            <ons-button class="flatButtonLight" onclick="endSavingDay()" style="margin-left: 0px; margin-right: 0px">TERMINAR DÍA</ons-button>
        </div>
      </ons-card>`;
  }
}

function loadDetailSaving() {
  updateSavingPreview();
  updateLastSaving();
}

function resetSavingMoney() {
  let languaje = localStorage.getItem('storageSwitchLanguage');
  if (languaje == 'false') {
    ons.notification.confirm({
      message: 'Are you sure to reset the saved fund?',
      title: 'Notice!',
      buttonLabels: ['Yes', 'Cancel'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let storageS = localStorage.getItem('savedMoneySaving');
          if (storageS) {
            localStorage.setItem('savedMoneySaving', 0);
            ons.notification.toast('The saved fund has been reset!', {
              title: 'Notice!',
              timeout: 1000,
              animation: 'ascend',
            });
            loadDetailSaving();
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
      buttonLabels: ['Sí', 'Cancelar'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let storageS = localStorage.getItem('savedMoneySaving');
          if (storageS) {
            localStorage.setItem('savedMoneySaving', 0);
            ons.notification.toast('El fondo ahorrado se ha reiniciado!', {
              title: 'Aviso!',
              timeout: 1000,
              animation: 'ascend',
            });
            loadDetailSaving();
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
    return 15; ////
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
    return 30; ///
  } else if (dd > 94 && dd < 101) {
    return 31; ///
  }
}

function endSavingDay() {
  let languaje = localStorage.getItem('storageSwitchLanguage');
  if (languaje == 'false') {
    ons.notification.confirm({
      message: 'Are you sure to finish the day?',
      title: 'Notice!',
      buttonLabels: ['Yes', 'Cancel'],
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
            savingStorage.moneyLeft = savingStorage.toExpend;

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
      buttonLabels: ['Sí', 'Cancelar'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let storageS = JSON.parse(localStorage.getItem('savingStorage'));
          let moneyLeft = storageS.moneyLeft;

          if (storageS.daysLeft < 1) {
            ons.notification.toast('No quedan más días en tu fondo, ya no puedes terminar el día, lo siento!', {
              title: 'Error!',
              timeout: 2000,
              animation: 'ascend',
            });
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
            savingStorage.moneyLeft = savingStorage.toExpend;

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

  document.getElementById('alertAddSaving').innerHTML = storage.moneyLeft;
  document.getElementById('alertInputSaving').value = '';
  document.getElementById('alertAddSavingEnd').innerHTML = '';

  if (dialog) {
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
      <label style="color: var(--alert-tile-color)">ADD TO: </label>
      <select id="selectOptionAddMoney">
        <!--AQUI SE CARGAN LOS POSIBLES GASTOS-->
      </select>`;
    } else {
      container.innerHTML = `
      <label style="color: var(--alert-tile-color)">AÑADIR A: </label>
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
      // Resto el día y añado el dinero al día siguiente
      savingStorage.daysLeft = parseInt(savingStorage.daysLeft) - 1;

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
  } else if (selectedRadioID == 'radio-2') {
    // Si quiero añadir el dinero a alguna cartera

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
    if (parseInt(savingStorage.daysLeft) === 0) {
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

function makeSavingOperation() {
  let actualMoney = document.getElementById('alertAddSaving').textContent;
  let inputMoney = document.getElementById('alertInputSaving').value;
  let endMoney = document.getElementById('alertAddSavingEnd');

  let testAmoney = Math.sign(parseFloat(actualMoney));
  let result;

  // Si el dinero actual es negativo
  if (testAmoney == '-1' || testAmoney === '-0') {
    result = parseFloat(actualMoney) - parseFloat(inputMoney);
    endMoney.innerHTML = result.toFixed(2);
  } else {
    result = parseFloat(actualMoney) + parseFloat(inputMoney);
    endMoney.innerHTML = result.toFixed(2);
  }
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
  let element = document.getElementById('alertInputSaving').value;
  let languaje = localStorage.getItem('storageSwitchLanguage');

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
        buttonLabels: ['Yes', 'No'],
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
        buttonLabels: ['Sí', 'No'],
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
  let ntext = 'NINGUNA CATEGORÍA';
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
  let text = 'NO RESTAR';
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
  let eMoney = document.getElementById('alertExpenseMoneySaving').value;
  let eDate = document.getElementById('alertExpenseDateSaving').value;
  let eid = localStorage.getItem('detailExpenseCount');

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

  if (choseCategory == 'NINGUNA CATEGORÍA') {
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

  if (choseMoney == 'NO RESTAR') {
  } else {
    // Resto el dinero de donde se selecciono, me regreso sino se puede restar
    if (updateMoneyStorage(choseMoney, eMoney)) {
      return;
    }
  }

  let expenseDetail = {
    expenseName: choseCategory,
    inName: eName,
    inAmount: eMoney,
    inDate: eDate,
    inID: eid,
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
    ons.notification.toast('New added expense!', {
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

  expense.totalExpense += +newAmount;

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
