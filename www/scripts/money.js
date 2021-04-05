function makeNewMoney() {
  let languaje = localStorage.getItem('storageSwitchLanguage');

  let moneyName = document.getElementById('newMoneyName').value;
  let moneyCurrent = document.getElementById('newMoneyMoney').value;

  if (moneyName === '') {
    if (languaje == 'false') {
      ons.notification.toast('Wait, it need a good name!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('Un momento, se necesita un buen nombre!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
    return;
  }

  if (moneyCurrent === '') {
    moneyCurrent = '0.00';
  } else {
    moneyCurrent = parseFloat(moneyCurrent).toFixed(2);
  }

  let testMoney = Math.sign(moneyCurrent);
  if (testMoney == '-1' || testMoney === '-0') {
    if (languaje == 'false') {
      ons.notification.toast('I cannot add a wallet with negative money, I will assume that the wallet is empty.', {
        title: 'Error!',
        timeout: 3000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('No puedo añadir una cartera con dinero negativo, supondre que la cartera esta vacia.', {
        title: 'Error!',
        timeout: 3000,
        animation: 'ascend',
      });
    }
    moneyCurrent = '0.00';
  }

  let money = {
    moneyName,
    moneyCurrent,
  };

  if (localStorage.getItem('moneyStorage') === null) {
    let moneyArray = [];
    moneyArray.push(money);
    localStorage.setItem('moneyStorage', JSON.stringify(moneyArray));
  } else {
    let moneyArray = JSON.parse(localStorage.getItem('moneyStorage'));
    moneyArray.push(money);
    localStorage.setItem('moneyStorage', JSON.stringify(moneyArray));
  }

  if (languaje == 'false') {
    ons.notification.toast(`New money ${moneyName} added!`, {
      title: 'Notice!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast(`Nuevo dinero ${moneyName} añadido!`, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
  localStorage.setItem('currentDot', 0);
  getMoneys();
  functionPopPage();

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

function getMoneys() {
  let moneys = JSON.parse(localStorage.getItem('moneyStorage'));
  let moneyView = document.getElementById('moneyContainer');
  let totalMoneyContainer = document.getElementById('totalMoneyContainer');
  let tutorialView = document.getElementById('tutorialContainer');

  let languaje = localStorage.getItem('storageSwitchLanguage');

  let toInner = '';

  moneyView.innerHTML = '';

  let moneyTutorial = '';
  if (languaje == 'false') {
    moneyTutorial = `<ons-card>
      <ons-list style="background: none;" id="expenseListOfExpensesContainer">
        <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
          <label class="iconExpenseLabel" style="margin-left: 50px;">
            SEE TUTORIAL
          </label>
          <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr;">
            <p class="paraTutorial">
              Here you can add the money that you have saved in some other place, for example; a piggy bank, your wallet or a payroll card.
            </p>
            <p class="paraTutorial">
              You will be asked to enter a name and the current amount of money that you keep in that piggy bank, wallet, card, etc.
            </p>
            <p class="paraTutorial">
              You can make any changes that are necessary and even eliminate it, but remember that you cannot leave a piggy bank in negative numbers. 
            </p>
            <p class="paraTutorial">
              On the main screen "TOTAL MONEY" is a sum of the amount of money you have in your piggy banks. "
            </p>
            <p class="paraTutorial">
              To create one press "+".
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
            src="https://www.youtube.com/embed/5qdrtKrzpUE">
          </iframe>
          </div>
        </ons-list-item>
      </ons-list>
    </ons-card>`;
  } else {
    moneyTutorial = `<ons-card>
      <ons-list style="background: none;" id="expenseListOfExpensesContainer">
        <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
          <label class="iconExpenseLabel" style="margin-left: 50px;">
            LEER TUTORIAL
          </label>
          <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr;">
            <p class="paraTutorial">
              Aquí podrás añadir el dinero que tienes guardado en algún otro lugar, por ejemplo; una alcancía, tu cartera o alguna tarjeta de nómina. 
            </p>
            <p class="paraTutorial">
              Se te pedirá ingresar un nombre y la cantidad actual del dinero que guardas en esa alcancía, cartera, tarjeta, etc.
            </p>
            <p class="paraTutorial">
              Se podrá realizar cualquier modificación que sea necesaria e incluso eliminarlo, pero recuerda que no puedes dejar una alcancía en números negativos. 
            </p>
            <p class="paraTutorial">
             En la pantalla principal "DINERO TOTAL" es una suma de la cantidad de dinero que tienes en tus alcancías.
            </p>
            <p class="paraTutorial">
              Para crear una pulsa "+".
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
            src="https://www.youtube.com/embed/RowmPiWl_OU">
          </iframe>
          </div>
        </ons-list-item>
      </ons-list>
    </ons-card>`;
  }

  if (moneys == null || moneys == 'null') {
    let tutorial = localStorage.getItem('storageSwitchTutorial');
    if (tutorial == true || tutorial == 'true') {
      tutorialView.innerHTML = `${moneyTutorial}`;
    }
    totalMoneyContainer.innerHTML = '';
    return;
  } else if (moneys.length == 0) {
    let tutorial = localStorage.getItem('storageSwitchTutorial');
    if (tutorial == true || tutorial == 'true') {
      tutorialView.innerHTML = `${moneyTutorial}`;
    }
    totalMoneyContainer.innerHTML = '';
    return;
  } else {
    tutorialView.innerHTML = '';
  }

  let totalMoney = formatMoney(getTotalMoney());
  // CARGA DEL DINERO TOTAL
  if (languaje == 'false') {
    totalMoneyContainer.innerHTML = `
    <ons-card>
      <label style="color: var(--text-without-card); display: block; padding: 16px 0px 0px 16px;">YOUR TOTAL MONEY:</label>
      <div class="title totalMoneyTitle" style="color: var(--card-text-title-color); display: block; text-align:left; padding-top: 0;">$ 
        <span class="totalMoneyTitle" id="totalMoneyMoney">
        ${totalMoney}
        </span>
      </div>
    </ons-card>`;
  } else {
    totalMoneyContainer.innerHTML = `
    <ons-card>
      <label style="color: var(--text-without-card); display: block; padding: 16px 0px 0px 16px;">TU DINERO TOTAL:</label>
      <div class="title totalMoneyTitle" style="color: var(--card-text-title-color); display: block; text-align:left; padding-top: 0;">$ 
        <span class="totalMoneyTitle" id="totalMoneyMoney">
        ${totalMoney}
        </span>
      </div>
    </ons-card>`;
  }

  let currentIndexStorage = localStorage.getItem('currentDot');
  if (currentIndexStorage == null) {
    localStorage.setItem('currentDot', 0);
    currentIndexStorage = 0;
  }

  toInner += `<ons-carousel fullscreen swipeable auto-scroll overscrollable id="carousel2" initial-index="${currentIndexStorage}">`;
  let cardsCounter = 0;
  for (let i = 0; i < moneys.length; i++) {
    let mName = moneys[i].moneyName;
    let mMoney = formatMoney(moneys[i].moneyCurrent);

    if (languaje == 'false') {
      toInner += `
      <ons-carousel-item style="background-color: var(--card-back-color); padding: 16px 16px 0px 16px; border-radius: 15px; margin-bottom: 10px">
        <div class="title moneyTitle">
          ${mName}
        </div>
        <div class="content">
          <div class="title totalMoneyTitle" style="color: var(--card-text-title-color); display: block; text-align:left; padding-top: 0px; padding-bottom: 16px">$ 
            <span class="moneyInfo" id="${mName}-money">
              ${mMoney}
            </span>
          </div>
        </div>
        <ons-button class="moneyButtonAdd" style="margin-bottom: 16px; margin-left: 0px" onclick="addMoneyTo('${mName}')" > 
          MODIFY MONEY
        </ons-button>
        <ons-button class="moneyButtonDe" style="margin-bottom: 16px;" onclick="deleteMoney('${mName}')" >
          DELETE
        </ons-button>
      </ons-carousel-item>`;
      cardsCounter++;
    } else {
      toInner += `
      <ons-carousel-item style="background-color: var(--card-back-color); padding: 16px 16px 0px 16px; border-radius: 15px; margin-bottom: 10px">
        <div class="title moneyTitle">
          ${mName}
        </div>
        <div class="content">
          <div class="title totalMoneyTitle" style="color: var(--card-text-title-color); display: block; text-align:left; padding-top: 0px; padding-bottom: 16px">$ 
            <span class="moneyInfo" id="${mName}-money">
              ${mMoney}
            </span>
          </div>
        </div>
        <ons-button class="moneyButtonAdd" style="margin-bottom: 16px; margin-left: 0px" onclick="addMoneyTo('${mName}')" > 
          MODIFICAR DINERO
        </ons-button>
        <ons-button class="moneyButtonDe" style="margin-bottom: 16px;" onclick="deleteMoney('${mName}')" >
          ELIMINAR
        </ons-button>
      </ons-carousel-item>`;
      cardsCounter++;
    }
  }
  toInner += `</ons-carousel>`;

  // Pongo los puntos
  let indicatorsAmount = '';
  toInner += `<div class="cover-label" id="dotsContainer">`;
  for (let i = 0; i < cardsCounter; i++) {
    if (i == localStorage.getItem('currentDot')) {
      indicatorsAmount += `<span class="indicators" id="indicator${i}"> ● </span>`;
    } else {
      indicatorsAmount += `<span class="indicators" id="indicator${i}"> ○ </span>`;
    }
  }
  toInner += `${indicatorsAmount} </div>`;

  // INSERTO TODO
  moneyView.innerHTML = toInner;
}

function deleteMoney(sendMoneyName) {
  let languaje = localStorage.getItem('storageSwitchLanguage');
  if (languaje == 'false') {
    ons.notification.confirm({
      message: 'Are you sure to erase that money?',
      title: 'Notice!',
      buttonLabels: ['YES', 'CANCEL'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let moneys = JSON.parse(localStorage.getItem('moneyStorage'));

          for (let i = 0; i < moneys.length; i++) {
            if (moneys[i].moneyName == sendMoneyName) {
              moneys.splice(i, 1);
              break;
            }
          }
          localStorage.setItem('moneyStorage', JSON.stringify(moneys));

          getMoneys();

          if (document.getElementById('carousel2') != null) {
            document.getElementById('carousel2').addEventListener('postchange', function (event) {
              let cIndex = event.activeIndex;
              let laIndex = event.lastActiveIndex;

              localStorage.setItem('currentDot', cIndex);

              document.getElementById(`indicator${cIndex}`).innerHTML = ' ● ';
              if (document.getElementById(`indicator${laIndex}`) != null) {
                document.getElementById(`indicator${laIndex}`).innerHTML = ' ○ ';
              }
            });
          }

          ons.notification.toast('The selected money has been removed!', {
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
      message: 'Estas seguro de borrar ese dinero?',
      title: 'Aviso!',
      buttonLabels: ['Sí', 'Cancelar'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let moneys = JSON.parse(localStorage.getItem('moneyStorage'));

          for (let i = 0; i < moneys.length; i++) {
            if (moneys[i].moneyName == sendMoneyName) {
              moneys.splice(i, 1);
              break;
            }
          }
          localStorage.setItem('moneyStorage', JSON.stringify(moneys));

          localStorage.setItem('currentDot', 0);

          getMoneys();

          if (document.getElementById('carousel2') != null) {
            document.getElementById('carousel2').addEventListener('postchange', function (event) {
              let cIndex = event.activeIndex;
              let laIndex = event.lastActiveIndex;

              localStorage.setItem('currentDot', cIndex);

              document.getElementById(`indicator${cIndex}`).innerHTML = ' ● ';
              if (document.getElementById(`indicator${laIndex}`) != null) {
                document.getElementById(`indicator${laIndex}`).innerHTML = ' ○ ';
              }
            });
          }

          ons.notification.toast('Se ha eliminado el dinero seleccionado!', {
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
}

function addMoneyTo(sendMoneyName) {
  let moneys = JSON.parse(localStorage.getItem('moneyStorage'));

  for (let i = 0; i < moneys.length; i++) {
    let mName = moneys[i].moneyName;

    if (mName == sendMoneyName) {
      let mMoney = moneys[i].moneyCurrent;

      let findMoneyObject = {
        moneyName: mName,
        moneyCurrent: mMoney,
      };

      if (sessionStorage.getItem('sessionFindMoney') === null) {
        sessionStorage.setItem('sessionFindMoney', JSON.stringify(findMoneyObject));
      } else {
        sessionStorage.removeItem('sessionFindMoney');
        sessionStorage.setItem('sessionFindMoney', JSON.stringify(findMoneyObject));
      }
      createAlertDialogToEditMoneyMoney();
      break;
    }
  }
}

function makeSumMoney() {
  let actualAmount = document.getElementById('editMoneyActualMoney').textContent;
  let newAmount = document.getElementById('editOnlyMoneyMoney').value;

  let sumResult = parseFloat(parseFloat(actualAmount) + parseFloat(newAmount)).toFixed(2);

  document.getElementById('editMoneyEndMoney').innerHTML = formatMoney(sumResult);
  sessionStorage.setItem('addNewMoney', sumResult);
}

function formatMoney(amount, decimalCount = 2, decimal = '.', thousands = ',') {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    );
  } catch (e) {
    console.log(e);
  }
}

function searchWalletByIndex(index) {
  let expensesDetail = JSON.parse(localStorage.getItem('expenseDetailStorage'));
  if (expensesDetail == null || expensesDetail == 'null' || expensesDetail.length < 1) {
    return;
  }

  if (expensesDetail[index].inWallet == null) {
    return;
  } else {
    return expensesDetail[index].inWallet;
  }
}

/* Muestra los gastos de cada cartera*/
function showExpensesPerWallet(walletName) {
  let languaje = localStorage.getItem('storageSwitchLanguage');

  let detailDetailExpenseView = document.getElementById('moneyListOfExpenses');
  detailDetailExpenseView.innerHTML = '';

  let expensesDetail = JSON.parse(localStorage.getItem('expenseDetailStorage'));

  let actualEx = 0;
  if (expensesDetail == null || expensesDetail == 'null') {
  } else {
    //for para ver si existe la wallet
    for (let i = 0; i < expensesDetail.length; i++) {
      if (expensesDetail[i].inWallet == walletName) {
        actualEx = 1;
        break;
      }
    }
  }

  if (actualEx == 0) {
    if (languaje == 'false') {
      detailDetailExpenseView.innerHTML = `<div style="margin-bottom: 30px;">
        <label class="labelDetailExpense" style="text-align:center">Nothing to show, you are doing well with the savings...</label>
      </div>`;
    } else {
      detailDetailExpenseView.innerHTML = `<div style="margin-bottom: 30px;">
        <label class="labelDetailExpense" style="text-align:center">Nada por mostrar, vas bien con los ahorros...</label>
      </div>`;
    }
  } else {
    for (let i = 0; i < expensesDetail.length; i++) {
      if (expensesDetail[i].inWallet == walletName) {
        let iName = expensesDetail[i].inName;
        let iAmount = formatMoney(expensesDetail[i].inAmount);
        let iDate = expensesDetail[i].inDate;
        let iD = expensesDetail[i].inID;

        let today = new Date().toJSON().slice(0, 10);
        let days = dateDiff(today, iDate);

        if (languaje == 'false') {
          if (iDate === '') {
            iDate = 'NO DATE DATA';
          } else {
            if (Math.sign(days) == 1 || Math.sign(days) == '1') {
              iDate = 'IN ' + days + ' DAYS';
            } else if (Math.sign(days) == '-1' || Math.sign(days) == -1) {
              iDate = Math.abs(days) + ' DAYS AGO';
            } else if (Math.sign(days) == '0' || Math.sign(days) == 0) {
              iDate = 'TODAY';
            }
          }

          detailDetailExpenseView.innerHTML += `<ons-list-item style="margin-top: -16px;" modifier="nodivider">
            <div class="center" style="margin-right: 16px">
              <div style="max-width: 50%;">
                <label class="list-item__title labelDetailExpense" style="text-align:left; margin-left:16px; font-size:22px">${iName}</label> 
                <label class="list-item__subtitle labelDetailExpense" style="padding-top: 0px; font-size: 18px; text-align:left; margin-left:16px">${iDate}</label>
              </div>
              <div style="margin-left: auto; margin-right: 0px;">
                <span class="labelInfoDetailExpense" style="font-size:26px; color: var(--expense-detail)">$</span> 
                <span class="labelInfoDetailExpense" style="font-size:26px;">${iAmount}</span>
              </div>
            </div>
          </ons-list-item>`;
        } else {
          if (iDate === '') {
            iDate = 'SIN DATOS DE FECHA';
          } else {
            if (Math.sign(days) == 1 || Math.sign(days) == '1') {
              iDate = 'EN ' + days + ' DÍAS';
            } else if (Math.sign(days) == '-1' || Math.sign(days) == -1) {
              iDate = 'HACE ' + Math.abs(days) + ' DÍAS';
            } else if (Math.sign(days) == '0' || Math.sign(days) == 0) {
              iDate = 'HOY';
            }
          }

          detailDetailExpenseView.innerHTML += `<ons-list-item style="margin-top: -16px;" modifier="nodivider">
            <div class="center" style="margin-right: 16px">
              <div style="max-width: 50%;">
                <label class="list-item__title labelDetailExpense" style="text-align:left; margin-left:16px; font-size:22px">${iName}</label> 
                <label class="list-item__subtitle labelDetailExpense" style="padding-top: 0px; font-size: 18px; text-align:left; margin-left:16px">${iDate}</label>
              </div>
              <div style="margin-left: auto; margin-right: 0px;">
                <span class="labelInfoDetailExpense" style="font-size:26px; color: var(--expense-detail)">$</span> 
                <span class="labelInfoDetailExpense" style="font-size:26px;">${iAmount}</span>
              </div>
            </div>
          </ons-list-item>`;
        }
      }
    }
  }
}
