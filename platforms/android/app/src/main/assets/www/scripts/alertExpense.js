/* PARA AÑADIR UN GASTO*/
function createAlertDialogToAddExpense() {
  var dialog = document.getElementById('alertToAddExpense');

  if (dialog) {
    loadSelectOptions();
    dialog.show();
  } else {
    ons.notification.toast('Ups! No se ha podido cargar la ventana para añadir!', {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
}

function loadSelectOptions() {
  let moneyStorage = JSON.parse(localStorage.getItem('moneyStorage'));

  let container = document.getElementById('selectOptio');
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

function hideAlertExpense() {
  let eName = document.getElementById('alertExpenseNote').value;
  let eMoney = document.getElementById('alertExpenseMoney').value;
  let eDate = document.getElementById('alertExpenseDate').value;
  let eid = localStorage.getItem('detailExpenseCount');

  let languaje = localStorage.getItem('storageSwitchLanguage');

  const selectTag = document.getElementById('selectOptio');
  const options = selectTag.options;
  var selectedOption = options[selectTag.selectedIndex].value;

  if (eid == null || eid == '') {
    localStorage.setItem('detailExpenseCount', '0');
    eid = 0;
  }

  eid = +eid + 1;
  localStorage.setItem('detailExpenseCount', eid);

  if (languaje == 'false') {
    if (eName == null || eName == '') {
      ons.notification.toast('I cannot add an expense without a name / note!', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    if (eMoney == null || eMoney == '') {
      ons.notification.toast('I can add that expense, but I need to know how much you spent.', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }
  } else {
    if (eName == null || eName == '') {
      ons.notification.toast('No puedo añadir un gasto sin un nombre/nota!', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    if (eMoney == null || eMoney == '') {
      ons.notification.toast('Puedo añadir ese gasto, pero necesito saber cuanto gastaste.', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }
  }
  // Convierto la cantidad después de ver que fue escrita
  eMoney = parseFloat(eMoney).toFixed(2);

  if (eDate == null || eDate == '') {
    eDate = new Date().toJSON().slice(0, 10);
  }

  let testSign = Math.sign(eMoney);
  if (languaje == 'false') {
    if (testSign == '-1' || testSign == '-0') {
      ons.notification.toast('You cannot add a negative expense, that would be very strange.', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }
  } else {
    if (testSign == '-1' || testSign == '-0') {
      ons.notification.toast('No puedes añadir un gasto negativo, eso seria muy extraño.', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }
  }

  if (selectedOption == 'NO RESTAR') {
  } else {
    // Resto el dinero de donde se selecciono, me regreso sino se puede restar
    if (updateMoneyStorage(selectedOption, eMoney)) {
      return;
    }
  }

  // Obtengo el nombre del item, pero es necesario modificar el contador
  let expenseObject = sessionStorage.getItem('sessionFindExpense');

  let expenseDetail = {
    expenseName: expenseObject,
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

  updateExpenseTotalMoney(expenseObject, eMoney);

  if (languaje == 'false') {
    ons.notification.toast(`New expense ${expenseObject} added!`, {
      title: 'Notice!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast(`Nuevo gasto ${expenseObject} añadido!`, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }

  sessionStorage.clear();
  document.getElementById('alertExpenseNote').value = null;
  document.getElementById('alertExpenseMoney').value = null;
  document.getElementById('alertExpenseDate').value = null;
  document.getElementById('alertToAddExpense').hide();
}

function updateMoneyStorage(sendName, amount) {
  let moneyStorage = JSON.parse(localStorage.getItem('moneyStorage'));

  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (moneyStorage == null || moneyStorage == 'null') {
  } else {
    for (let i = 0; i < moneyStorage.length; i++) {
      if (moneyStorage[i].moneyName == sendName) {
        let test = +moneyStorage[i].moneyCurrent + -amount;
        let testSign = Math.sign(test);
        if (testSign == '-1') {
          if (languaje == 'false') {
            ons.notification.toast('No more money can be subtracted from the selected location.', {
              title: 'Notice!',
              timeout: 2000,
              animation: 'ascend',
            });
          } else {
            ons.notification.toast('No se puede restar más dinero del lugar seleccionado.', {
              title: 'Aviso!',
              timeout: 2000,
              animation: 'ascend',
            });
          }
          return true;
        }

        moneyStorage[i].moneyCurrent = (parseFloat(moneyStorage[i].moneyCurrent) - parseFloat(amount)).toFixed(2);

        localStorage.setItem('moneyStorage', JSON.stringify(moneyStorage));
        break;
      }
    }
  }
}

function hideAlertExpenseNoChange() {
  let languaje = localStorage.getItem('storageSwitchLanguage');
  if (languaje == 'false') {
    ons.notification.toast('Nothing has been modified :)', {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast('No se ha modificado nada :)', {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
  sessionStorage.clear();
  document.getElementById('alertExpenseNote').value = null;
  document.getElementById('alertExpenseMoney').value = null;
  document.getElementById('alertExpenseDate').value = null;
  document.getElementById('alertToAddExpense').hide();
}

/* PARA EDITAR UN GASTO */
function editDetailExpense(idSend) {
  var dialog = document.getElementById('alertToEditExpense');
  let expenses = JSON.parse(localStorage.getItem('expenseDetailStorage'));
  sessionStorage.setItem('editExpense', idSend);

  let note, money, date;

  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].inID == idSend) {
      note = expenses[i].inName;
      money = expenses[i].inAmount;
      date = expenses[i].inDate;
      break;
    }
  }

  if (dialog) {
    dialog.show();
    document.getElementById('alertEditExpenseNote').value = note;
    document.getElementById('alertEditExpenseMoney').value = money;
    document.getElementById('alertEditExpenseDate').value = date;
  } else {
    ons.notification.toast('Ups! No se ha podido cargar la ventana para editar!', {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
}

// PARA EDITAR UN GASTO YA CREADO
function hideEditAlertExpense() {
  let note = document.getElementById('alertEditExpenseNote').value;
  let money = parseFloat(document.getElementById('alertEditExpenseMoney').value).toFixed(2);
  let date = document.getElementById('alertEditExpenseDate').value;
  let mName, id, index;

  let idSend = sessionStorage.getItem('editExpense');
  let expenses = JSON.parse(localStorage.getItem('expenseDetailStorage'));

  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (languaje == 'false') {
    if (note == null || note == '') {
      ons.notification.toast('I cannot add an expense without a name / note!', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    if (money == null || money == '' || money == 'NaN') {
      ons.notification.toast('I can edit that expense, but I need to know how much you spent.', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }
  } else {
    if (note == null || note == '') {
      ons.notification.toast('No puedo añadir un gasto sin un nombre/nota!', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    if (money == null || money == '' || money == 'NaN') {
      ons.notification.toast('Puedo editar ese gasto, pero necesito saber cuanto gastaste.', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }
  }

  if (date == null || date == '') {
    date = new Date().toJSON().slice(0, 10);
  }

  let testSign = Math.sign(money);
  if (testSign == '-1' || testSign == '-0') {
    if (languaje == 'false') {
      ons.notification.toast('You cannot add a negative expense, that would be very strange.', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('No puedes añadir un gasto negativo, eso seria muy extraño.', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
    return;
  }

  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].inID == idSend) {
      mName = expenses[i].expenseName;
      id = expenses[i].inID;
      index = i;
      break;
    }
  }

  let expenseDetail = {
    expenseName: mName,
    inName: note,
    inAmount: money,
    inDate: date,
    inID: id,
  };

  /* Guardo los detalles del Expense*/
  expenses[index] = expenseDetail;
  localStorage.setItem('expenseDetailStorage', JSON.stringify(expenses));

  /**/
  reInsertExpenseDetail(mName);
  insertNewExpenseAmount(mName);
  updateExpenseLastDays(mName);

  if (languaje == 'false') {
    ons.notification.toast(`Expense ${mName} modified correctly!`, {
      title: 'Notice!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast(`Gasto ${mName} modificado correctamente!`, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }

  sessionStorage.clear();
  document.getElementById('alertEditExpenseNote').value = null;
  document.getElementById('alertEditExpenseMoney').value = null;
  document.getElementById('alertEditExpenseDate').value = null;
  document.getElementById('alertToEditExpense').hide();
}

function insertNewExpenseAmount(sendName) {
  let storageExpense = JSON.parse(localStorage.getItem('expenseDetailStorage'));

  let newAmount = 0;
  for (let i = 0; i < storageExpense.length; i++) {
    if (storageExpense[i].expenseName == sendName) {
      newAmount += +storageExpense[i].inAmount;
    }
  }

  newAmount = parseFloat(newAmount).toFixed(2);
  document.getElementById('totalExpenseDetail').innerHTML = newAmount;

  let mainStorage = JSON.parse(localStorage.getItem('expenseStorage'));
  let index;
  for (let i = 0; i < mainStorage.length; i++) {
    if (mainStorage[i].expenseName == sendName) {
      index = i;

      let expense = {
        expenseName: mainStorage[i].expenseName,
        totalExpense: newAmount,
        mainDate: mainStorage[i].mainDate,
        iconName: mainStorage[i].iconName,
        expenseColor: mainStorage[i].expenseColor,
        toShow: mainStorage[i].toShow,
      };
      mainStorage[index] = expense;
      localStorage.setItem('expenseStorage', JSON.stringify(mainStorage));
    }
  }
}

function hideEditAlertExpenseNoChange() {
  let languaje = localStorage.getItem('storageSwitchLanguage');
  if (languaje == 'false') {
    ons.notification.toast('Nothing has been modified :)', {
      title: 'Notice!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast('No se ha modificado nada :)', {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
  sessionStorage.clear();
  document.getElementById('alertEditExpenseMoney').value = null;
  document.getElementById('alertEditExpenseDate').value = null;
  document.getElementById('alertToEditExpense').hide();
}

function editExpense(sendName) {
  sessionStorage.setItem('expenseNameEdit', sendName);

  const navigator = document.querySelector('#navigator');
  navigator.pushPage('editExpense.html');
}

function hideAlertExpenseEditNoChange() {
  document.getElementById('newExpenseNameEdit').value = null;
  document.getElementById('newExpenseColorEdit').value = '#ffffff';

  let languaje = localStorage.getItem('storageSwitchLanguage');

  sessionStorage.clear();
  functionPopPage();
  if (languaje == 'false') {
    ons.notification.toast('Okay, everything normal!', {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast('De acuerdo, todo normal!', {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
}

function hideAlertExpenseEdit() {
  let oldName = sessionStorage.getItem('expenseNameEdit');
  let newName = document.getElementById('newExpenseNameEdit').value;
  let newColor = document.getElementById('newExpenseColorEdit').value;
  let newIcon = sessionStorage.getItem('expenseIconName');
  let toShowN = document.getElementById('switchNewGoalEdit').checked;

  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (newName == null || newName == 'null' || newName == '') {
    if (languaje == 'false') {
      ons.notification.toast('You must add a new name to the expense!', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('Debes añadir un nuevo nombre al gasto!', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
    return;
  }

  if (newIcon == null || newIcon == 'null' || newIcon == '') {
    newIcon = sessionStorage.getItem('oldIcon');
    sessionStorage.removeItem('oldIcon');
  }

  let expenseStorage = JSON.parse(localStorage.getItem('expenseStorage'));
  let index, expense;

  for (let i = 0; i < expenseStorage.length; i++) {
    if (expenseStorage[i].expenseName == oldName) {
      index = i;

      expense = {
        expenseName: newName,
        totalExpense: expenseStorage[i].totalExpense,
        mainDate: expenseStorage[i].mainDate,
        iconName: newIcon,
        expenseColor: newColor,
        toShow: toShowN,
      };

      expenseStorage[index] = expense;
      break;
    }
  }

  if (localStorage.getItem('expenseStorage') === null) {
    let expenseArray = [];
    expenseArray.push(expense);
    localStorage.setItem('expenseStorage', JSON.stringify(expenseArray));
  } else {
    localStorage.setItem('expenseStorage', JSON.stringify(expenseStorage));
  }

  if (languaje == 'false') {
    ons.notification.toast(`Expenditure ${newName} modified successfully!`, {
      title: 'Notice!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast(`Gasto ${newName} modificado exitosamente!`, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }

  functionPopPage(2);
  sessionStorage.clear();
}

function loadIconsEdit() {
  let iconsView = document.getElementById('expenseIconListOfIconsEdit');
  iconsView.innerHTML = '';

  let iconColor = document.getElementById('newExpenseColorEdit').value;

  iconsView.innerHTML = `<i class="expenseIconList ion-md-airplane" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-airplane', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-alarm" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-alarm', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-flame" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-flame', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-aperture" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-aperture', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-baseball" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-baseball', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-basket" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-basket', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-basketball" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-basketball', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-beaker" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-beaker', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-beer" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-beer', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-bicycle" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-bicycle', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-boat" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-boat', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-body" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-body', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-book" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-book', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-brush" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-brush', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-build" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-build', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-bus" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-bus', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-cafe" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-cafe', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-car" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-car', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-cart" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-cart', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-cash" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-cash', '${iconColor}')"></i>
      <i class="expenseIconList ion-ios-paper" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-ios-paper', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-construct" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-construct', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-desktop" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-desktop', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-eye" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-eye', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-film" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-film', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-fitness" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-fitness', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-flask" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-flask', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-football" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-football', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-gift" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-gift', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-glasses" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-glasses', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-happy" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-happy', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-headset" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-headset', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-heart" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-heart', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-home" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-home', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-pricetags" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-pricetags', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-images" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-images', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-jet" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-jet', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-laptop" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-laptop', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-man" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-man', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-map" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-map', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-medkit" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-medkit', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-microphone" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-microphone', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-bookmarks" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-bookmarks', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-compass" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-compass', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-pin" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-pin', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-pizza" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-pizza', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-print" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-print', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-rose" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-rose', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-school" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-school', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-shirt" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-shirt', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-subway" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-subway', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-umbrella" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-umbrella', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-wallet" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-wallet', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-woman" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-woman', '${iconColor}')"></i>
      <i class="expenseIconList ion-md-wine" style="--expenseIconColor: ${iconColor}" onclick="selectIconEdit('ion-md-wine', '${iconColor}')"></i>`;
}

function selectIconEdit(iconName, iconColor) {
  sessionStorage.setItem('expenseIconName', iconName);
  // Oculto los iconos, ya tengo uno seleccionado
  document.getElementById('expandableListContainerEdit').hideExpansion();

  // Añado el icono seleccionado
  let iconElement = document.getElementById('expensePrevIconEdit');
  iconElement.className = '';
  iconElement.classList.add('expenseIcon');
  iconElement.classList.add(iconName);
  // Añado el color
  iconElement.style.cssText = `--expenseIconColorPrev: ${iconColor}`;
}

function changeTitlePreviewEdit() {
  let newTitle = document.getElementById('newExpenseNameEdit').value;
  let oldTitle = document.getElementById('expensePrevTitleEdit');

  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (newTitle == '' || newTitle == null) {
    if (languaje == 'false') {
      oldTitle.innerHTML = `NAME <i class="expenseIcon ion-md-laptop"></i>`;
    } else {
      oldTitle.innerHTML = `NOMBRE <i class="expenseIcon ion-md-laptop"></i>`;
    }
  } else {
    oldTitle.innerHTML = '';
    oldTitle.innerHTML = newTitle;
  }
}

function deleteDetailExpense(idSend) {
  let languaje = localStorage.getItem('storageSwitchLanguage');
  if (languaje == 'false') {
    ons.notification.confirm({
      message: 'Are you sure to erase the expense?',
      title: 'Notice!',
      buttonLabels: ['YES', 'CANCEL'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let detailExpenses = JSON.parse(localStorage.getItem('expenseDetailStorage'));
          let loadName, amountLess;

          for (let i = 0; i < detailExpenses.length; i++) {
            if (detailExpenses[i].inID == idSend) {
              loadName = detailExpenses[i].expenseName;
              amountLess = detailExpenses[i].inAmount;
              detailExpenses.splice(i, 1);
              i--;
              break;
            }
          }
          localStorage.setItem('expenseDetailStorage', JSON.stringify(detailExpenses));

          ons.notification.toast('The selected expense has been deleted!', {
            title: 'Notice!',
            timeout: 2000,
            animation: 'ascend',
          });

          /* Actualizo los datos de la meta principal */
          reInsertExpenseDetail(loadName);
          updateExpenseTotalMoney(loadName, '-' + amountLess);
          updateExpenseLastDays(loadName);

          let storage = JSON.parse(localStorage.getItem('expenseStorage'));

          for (let i = 0; i < storage.length; i++) {
            if (storage[i].expenseName == loadName) {
              document.getElementById('totalExpenseDetail').innerHTML = '' + storage[i].totalExpense;
              break;
            }
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
      message: '¿Estas seguro de borrar el gasto?',
      title: 'Aviso!',
      buttonLabels: ['SÍ', 'CANCELAR'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let detailExpenses = JSON.parse(localStorage.getItem('expenseDetailStorage'));
          let loadName, amountLess;

          for (let i = 0; i < detailExpenses.length; i++) {
            if (detailExpenses[i].inID == idSend) {
              loadName = detailExpenses[i].expenseName;
              amountLess = detailExpenses[i].inAmount;
              detailExpenses.splice(i, 1);
              i--;
              break;
            }
          }
          localStorage.setItem('expenseDetailStorage', JSON.stringify(detailExpenses));

          ons.notification.toast('Se ha eliminado el gasto seleccionado!', {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          });

          /* Actualizo los datos de la meta principal */
          reInsertExpenseDetail(loadName);
          updateExpenseTotalMoney(loadName, '-' + amountLess);
          updateExpenseLastDays(loadName);

          let storage = JSON.parse(localStorage.getItem('expenseStorage'));

          for (let i = 0; i < storage.length; i++) {
            if (storage[i].expenseName == loadName) {
              document.getElementById('totalExpenseDetail').innerHTML = '' + storage[i].totalExpense;
              break;
            }
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

/* RECARGA LOS GASTOS AL ELIMINAR UNO CUANDO SE ENTRA DETALLADAMENTE A UN GASTO*/
function reInsertExpenseDetail(sendName) {
  let detailDetailExpenseView = document.getElementById('expenseListOfExpenses');
  detailDetailExpenseView.innerHTML = '';

  let expensesDetail = JSON.parse(localStorage.getItem('expenseDetailStorage'));

  let languaje = localStorage.getItem('storageSwitchLanguage');

  let actualEx = 0;
  if (expensesDetail == null || expensesDetail == 'null') {
  } else {
    for (let i = 0; i < expensesDetail.length; i++) {
      if (expensesDetail[i].expenseName == sendName) {
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
      if (expensesDetail[i].expenseName == sendName) {
        let iName = expensesDetail[i].inName;
        let iAmount = expensesDetail[i].inAmount;
        let iDate = expensesDetail[i].inDate;
        let iD = expensesDetail[i].inID;

        let today = new Date().toJSON().slice(0, 10);
        let days = dateDiff(today, iDate);

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

        if (languaje == 'false') {
          detailDetailExpenseView.innerHTML += `<ons-list-item expandable style="margin-top: -16px;" modifier="nodivider">
            <div class="center">
              <label class="list-item__title labelDetailExpense" style="text-align:center; font-size:22px">${iName} - $ <span class="labelInfoDetailExpense" style="font-size:22px">${iAmount}</span></label>
              <label class="list-item__subtitle labelDetailExpense" style="padding-top: 0px; font-size: 18px; text-align:center">${iDate}</label>
            </div>
            <div class="expandable-content" style="grid-template-columns: 1fr 1fr;">

              <ons-button class="moneyButtonDe" style="margin-bottom: 16px; margin-left: 32px; margin-right: 8px; background: var(--flat-button-color); color: var(--flat-button-color-text)" onclick="editDetailExpense('${iD}')" >
                EDIT
              </ons-button>

              <ons-button class="moneyButtonDe" style="margin-bottom: 16px; margin-left: 8px; margin-right: 32px; background: var(--flat-button-light-color); color: var(--flat-button-light-color-text)" onclick="deleteDetailExpense('${iD}')" >
                DELETE
              </ons-button>

            </div>
          </ons-list-item>`;
        } else {
          detailDetailExpenseView.innerHTML += `<ons-list-item expandable style="margin-top: -16px;" modifier="nodivider">
            <div class="center">
              <label class="list-item__title labelDetailExpense" style="text-align:center; font-size:22px">${iName} - $ <span class="labelInfoDetailExpense" style="font-size:22px">${iAmount}</span></label>
              <label class="list-item__subtitle labelDetailExpense" style="padding-top: 0px; font-size: 18px; text-align:center">${iDate}</label>
            </div>
            <div class="expandable-content" style="grid-template-columns: 1fr 1fr;">
  
              <ons-button class="moneyButtonDe" style="margin-bottom: 16px; margin-left: 32px; margin-right: 8px; background: var(--flat-button-color); color: var(--flat-button-color-text)" onclick="editDetailExpense('${iD}')" >
                EDITAR
              </ons-button>
  
              <ons-button class="moneyButtonDe" style="margin-bottom: 16px; margin-left: 8px; margin-right: 32px; background: var(--flat-button-light-color); color: var(--flat-button-light-color-text)" onclick="deleteDetailExpense('${iD}')" >
                ELIMINAR
              </ons-button>
  
            </div>
          </ons-list-item>`;
        }
      }
    }
  }
}

function updateExpenseLastDays(sendName) {
  let days = document.getElementById('lastDaysDetail');
  let month = document.getElementById('lastMonthDetail');

  days.innerHTML = getAmountFDays(sendName);
  month.innerHTML = getAmountTDays(sendName);
}
