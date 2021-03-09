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

  getMoneys();
  functionPopPage();
}

function getMoneys() {
  let moneys = JSON.parse(localStorage.getItem('moneyStorage'));
  let moneyView = document.getElementById('moneyContainer');

  let languaje = localStorage.getItem('storageSwitchLanguage');

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
      moneyView.innerHTML += `${moneyTutorial}`;
    }
    return;
  } else if (moneys.length == 0) {
    let tutorial = localStorage.getItem('storageSwitchTutorial');
    if (tutorial == true || tutorial == 'true') {
      moneyView.innerHTML += `${moneyTutorial}`;
    }
    return;
  }

  let totalMoney = getTotalMoney();

  if (languaje == 'false') {
    moneyView.innerHTML += `
    <ons-card>
      <label style="color: var(--text-without-card); display: block; padding: 16px 0px 0px 16px;">YOUR TOTAL MONEY:</label>
      <div class="title totalMoneyTitle" style="color: var(--card-text-title-color); display: block; text-align:left; padding-top: 0;">$ 
        <span class="totalMoneyTitle" id="totalMoneyMoney">
          ${totalMoney}
        </span>
      </div>
    </ons-card>`;
  } else {
    moneyView.innerHTML += `
    <ons-card>
    <label style="color: var(--text-without-card); display: block; padding: 16px 0px 0px 16px;">TU DINERO TOTAL:</label>
    <div class="title totalMoneyTitle" style="color: var(--card-text-title-color); display: block; text-align:left; padding-top: 0;">$ 
      <span class="totalMoneyTitle" id="totalMoneyMoney">
        ${totalMoney}
      </span>
    </div>
  </ons-card>`;
  }

  for (let i = 0; i < moneys.length; i++) {
    let mName = moneys[i].moneyName;
    let mMoney = moneys[i].moneyCurrent;

    if (languaje == 'false') {
      moneyView.innerHTML += `
      <ons-carousel-item style="background-color: #085078;">
        <ons-card>
          <div class="title moneyTitle">
            ${mName}
          </div>
          <div class="content">
            <div class="title totalMoneyTitle" style="color: var(--card-text-title-color); display: block; text-align:left; padding-top: 0px; padding-bottom: 0px">$ 
              <span class="moneyInfo" id="${mName}-money">
                ${mMoney}
              </span>
            </div>
          </div>
          <ons-button class="moneyButtonAdd" style="margin-bottom: 16px;" onclick="addMoneyTo('${mName}')" > 
            MODIFY MONEY
          </ons-button>
          <ons-button class="moneyButtonDe" style="margin-bottom: 16px;" onclick="deleteMoney('${mName}')" >
            DELETE
          </ons-button>
        </ons-card>
      </ons-carousel-item>`;
    } else {
      moneyView.innerHTML += `
      <ons-card>
        <div class="title moneyTitle">
          ${mName}
        </div>
        <div class="content">
          <div class="title totalMoneyTitle" style="color: var(--card-text-title-color); display: block; text-align:left; padding-top: 0px; padding-bottom: 0px">$ 
            <span class="moneyInfo" id="${mName}-money">
              ${mMoney}
            </span>
          </div>
        </div>
        <ons-button class="moneyButtonAdd" style="margin-bottom: 16px;" onclick="addMoneyTo('${mName}')" > 
          MODIFICAR DINERO
        </ons-button>
        <ons-button class="moneyButtonDe" style="margin-bottom: 16px;" onclick="deleteMoney('${mName}')" >
          ELIMINAR
        </ons-button>
      </ons-card>`;
    }
  }
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

          getMoneys();

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

  document.getElementById('editMoneyEndMoney').innerHTML = sumResult;
  sessionStorage.setItem('addNewMoney', sumResult);
}
