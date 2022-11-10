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
  let languaje = localStorage.getItem('storageSwitchLanguage');

  let container = document.getElementById('selectOptio');
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

  if (selectedOption == 'NO RESTAR' || selectedOption == 'DO NOT SUBTRACT') {
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
    inWallet: selectedOption,
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

  let note, money, date, inWallet;

  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].inID == idSend) {
      note = expenses[i].inName;
      money = expenses[i].inAmount;
      date = expenses[i].inDate;
      inWallet = expenses[i].inWallet;
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
  let mName, id, index, inWallet;

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
      inWallet = expenses[i].inWallet;
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
    inWallet: inWallet,
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
  document.getElementById('totalExpenseDetail').innerHTML = formatMoney(newAmount);

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
        iconUrl: mainStorage[i].iconUrl,
        toShow: mainStorage[i].toShow,
        expenseColor: mainStorage[i].expenseColor,
        expenseColor1: mainStorage[i].expenseColor1,
        expenseGradient: mainStorage[i].expenseGradient,
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

  let expenseStorage = JSON.parse(localStorage.getItem('expenseStorage'));

  // Busco el expense y guardo cosas que pueden omitirse
  // Icono, iconourl, icono gradient, iconoc1 y c2
  for (let i = 0; i < expenseStorage.length; i++) {
    if (expenseStorage[i].expenseName == sendName) {
      sessionStorage.setItem('expenseIconName', expenseStorage[i].iconName);
      sessionStorage.setItem('expenseIconUrl', expenseStorage[i].iconUrl);
      sessionStorage.setItem('tempGradient', expenseStorage[i].expenseGradient);
      sessionStorage.setItem('colorExpense', expenseStorage[i].expenseColor);
      sessionStorage.setItem('colorExpense1', expenseStorage[i].expenseColor1);
      break;
    }
  }

  const navigator = document.querySelector('#navigator');
  navigator.pushPage('editExpense.html');
}

function hideAlertExpenseEditNoChange() {
  document.getElementById('newExpenseNameEdit').value = null;

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

// MODIFICA TODO EL EXPENSE
function hideAlertExpenseEdit() {
  let oldName = sessionStorage.getItem('expenseNameEdit');
  let newName = document.getElementById('newExpenseNameEdit').value;
  let toShowN = document.getElementById('switchNewGoalEdit').checked;

  let newIcon = sessionStorage.getItem('expenseIconName');
  let iconUrl = sessionStorage.getItem('expenseIconUrl');

  let expenseGradient = sessionStorage.getItem('tempGradient');
  let expenseColor = sessionStorage.getItem('colorExpense');
  let expenseColor1 = sessionStorage.getItem('colorExpense1');

  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (expenseGradient == null || expenseGradient == '') {
    expenseGradient = '--gradient_0';
    expenseColor = '#bfdff8';
    expenseColor1 = '#f4dcf5';
  }

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
    newIcon = 'construction.svg';
  }

  if (iconUrl == '' || iconUrl == null) {
    iconUrl = '/www/assets/icons/icons_list/fix/';
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
        iconUrl: iconUrl,
        toShow: toShowN,
        expenseColor: expenseColor,
        expenseColor1: expenseColor1,
        expenseGradient: expenseGradient,
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

  let art = `/www/assets/icons/icons_list/art/`;
  let artNames = ['brush.svg', 'format_color_fill.svg', 'format_paint.svg', 'imagesearch_roller.svg', 'palette.svg'];

  let book = `/www/assets/icons/icons_list/books/`;
  let bookNames = [
    'play_lesson.svg',
    'photo_album.svg',
    'menu_book.svg',
    'library_books.svg',
    'import_contacts.svg',
    'book.svg',
    'auto_stories.svg',
  ];

  let builds = `/www/assets/icons/icons_list/builds/`;
  let buildsNames = [
    'apartment.svg',
    'cabin.svg',
    'cottage.svg',
    'gite.svg',
    'home.svg',
    'home_work.svg',
    'house.svg',
    'location_city.svg',
    'names.txt',
    'villa.svg',
  ];

  let camera = `/www/assets/icons/icons_list/camera/`;
  let cameraNames = ['camera.svg', 'photo_camera.svg', 'video_camera_back.svg', 'videocam.svg'];

  let fix = `/www/assets/icons/icons_list/fix/`;
  let fixNames = [
    'build.svg',
    'construction.svg',
    'engineering.svg',
    'filenames.txt',
    'handyman.svg',
    'healing.svg',
    'home_repair_service.svg',
    'plumbing.svg',
  ];

  let food = `/www/assets/icons/icons_list/food/`;
  let foodNames = [
    'bakery_dining.svg',
    'brunch_dining.svg',
    'cake.svg',
    'coffee.svg',
    'coffee_maker.svg',
    'emoji_food_beverage.svg',
    'fastfood.svg',
    'filenames.txt',
    'icecream.svg',
    'kebab_dining.svg',
    'liquor.svg',
    'local_bar.svg',
    'local_cafe.svg',
    'local_drink.svg',
    'local_pizza.svg',
    'lunch_dining.svg',
    'ramen_dining.svg',
    'restaurant.svg',
    'sports_bar.svg',
    'takeout_dining.svg',
  ];

  let fun = `/www/assets/icons/icons_list/fun/`;
  let funNames = ['attractions.svg', 'celebration.svg', 'festival.svg', 'stadia_controller.svg', 'theater_comedy.svg'];

  let money = `/www/assets/icons/icons_list/money/`;
  let moneyNames = [
    'account_balance_wallet.svg',
    'credit_card.svg',
    'filenames.txt',
    'footprint.svg',
    'local_mall.svg',
    'monetization_on.svg',
    'payments.svg',
    'redeem.svg',
    'savings.svg',
    'sell.svg',
    'shopping_bag.svg',
    'shopping_cart.svg',
    'store.svg',
    'storefront.svg',
    'styler.svg',
    'wallet.svg',
  ];

  let music = `/www/assets/icons/icons_list/music/`;
  let musicNames = [
    'audio_file.svg',
    'auto_detect_voice.svg',
    'filenames.txt',
    'headphones.svg',
    'headset_mic.svg',
    'music_note.svg',
    'piano.svg',
    'settings_voice.svg',
    'speaker.svg',
    'volume_up.svg',
  ];

  let pc = `/www/assets/icons/icons_list/pc/`;
  let pcNames = ['computer.svg', 'desktop_windows.svg', 'devices.svg', 'mouse.svg', 'print.svg'];

  let sport = `/www/assets/icons/icons_list/sport/`;
  let sportNames = [
    'directions_run.svg',
    'fitness_center.svg',
    'golf_course.svg',
    'names.txt',
    'sports_baseball.svg',
    'sports_basketball.svg',
    'sports_cricket.svg',
    'sports_football.svg',
    'sports_golf.svg',
    'sports_handball.svg',
    'sports_rugby-1.svg',
    'sports_rugby.svg',
    'sports_soccer.svg',
    'sports_tennis.svg',
    'sports_volleyball.svg',
  ];

  let time = `/www/assets/icons/icons_list/time/`;
  let timeNames = ['alarm.svg', 'date_range.svg', 'hourglass_empty.svg', 'schedule.svg', 'watch.svg'];

  let transport = `/www/assets/icons/icons_list/transport/`;
  let transportNames = [
    'airport_shuttle.svg',
    'bike_scooter.svg',
    'directions_bike.svg',
    'directions_boat.svg',
    'directions_bus.svg',
    'directions_car.svg',
    'directions_railway.svg',
    'ev_station.svg',
    'local_gas_station.svg',
    'local_shipping.svg',
    'motorcycle.svg',
    'names.txt',
    'sailing.svg',
    'snowmobile.svg',
    'tire_repair.svg',
    'tram.svg',
  ];

  let travel = `/www/assets/icons/icons_list/travel/`;
  let travelNames = ['airplane_ticket.svg', 'connecting_airports.svg', 'flight_takeoff.svg', 'luggage.svg', 'map.svg'];

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Arte</p>`;
  for (let i = 0; i < artNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${art}${artNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIconEdit('${artNames[i]}', '${art}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${art}${artNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIconEdit('${artNames[i]}', '${art}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Books</p>`;
  for (let i = 0; i < bookNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${book}${bookNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIconEdit('${bookNames[i]}', '${book}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${book}${bookNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIconEdit('${bookNames[i]}', '${book}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Builds</p>`;
  for (let i = 0; i < buildsNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${builds}${buildsNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIconEdit('${buildsNames[i]}', '${builds}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${builds}${buildsNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIconEdit('${buildsNames[i]}', '${builds}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Camera</p>`;
  for (let i = 0; i < cameraNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${camera}${cameraNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIconEdit('${cameraNames[i]}', '${camera}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${camera}${cameraNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIconEdit('${cameraNames[i]}', '${camera}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Fix</p>`;
  for (let i = 0; i < fixNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${fix}${fixNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIconEdit('${fixNames[i]}', '${fix}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${fix}${fixNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIconEdit('${fixNames[i]}', '${fix}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Food</p>`;
  for (let i = 0; i < foodNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${food}${foodNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconEdit('${foodNames[i]}', '${food}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${food}${foodNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconEdit('${foodNames[i]}', '${food}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Fun</p>`;
  for (let i = 0; i < funNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${fun}${funNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconEdit('${funNames[i]}', '${fun}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${fun}${funNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconEdit('${funNames[i]}', '${fun}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Money</p>`;
  for (let i = 0; i < moneyNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${money}${moneyNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconEdit('${moneyNames[i]}', '${money}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${money}${moneyNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconEdit('${moneyNames[i]}', '${money}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Music</p>`;
  for (let i = 0; i < musicNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${music}${musicNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconEdit('${musicNames[i]}', '${music}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${music}${musicNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconEdit('${musicNames[i]}', '${music}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">PC</p>`;
  for (let i = 0; i < pcNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${pc}${pcNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconEdit('${pcNames[i]}', '${pc}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${pc}${pcNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconEdit('${pcNames[i]}', '${pc}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Sport</p>`;
  for (let i = 0; i < sportNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${sport}${sportNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconEdit('${sportNames[i]}', '${sport}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${sport}${sportNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconEdit('${sportNames[i]}', '${sport}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Time</p>`;
  for (let i = 0; i < timeNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${time}${timeNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconEdit('${timeNames[i]}', '${time}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${time}${timeNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconEdit('${timeNames[i]}', '${time}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Transport</p>`;
  for (let i = 0; i < transportNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${transport}${transportNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconEdit('${transportNames[i]}', '${transport}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${transport}${transportNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconEdit('${transportNames[i]}', '${transport}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Travel</p>`;
  for (let i = 0; i < travelNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${travel}${travelNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconEdit('${travelNames[i]}', '${travel}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${travel}${travelNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconEdit('${travelNames[i]}', '${travel}')"></img>`;
    }
  }
}

function selectIconEdit(iconName, url) {
  sessionStorage.setItem('expenseIconName', iconName);
  sessionStorage.setItem('expenseIconUrl', url);
  // Oculto los iconos, ya tengo uno seleccionado
  document.getElementById('expandableListContainerEdit').hideExpansion();
}

function deleteDetailExpense(idSend) {
  let languaje = localStorage.getItem('storageSwitchLanguage');
  if (languaje == 'false') {
    ons.notification.confirm({
      message: 'Are you sure to erase the expense?',
      title: 'Notice!',
      buttonLabels: ['Yes, erase', 'Cancel'],
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
              document.getElementById('totalExpenseDetail').innerHTML = formatMoney(storage[i].totalExpense);
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
      buttonLabels: ['Sí, borrar', 'Cancelar'],
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
              document.getElementById('totalExpenseDetail').innerHTML = formatMoney(storage[i].totalExpense);
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
        let iAmount = formatMoney(expensesDetail[i].inAmount);
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

  days.innerHTML = formatMoney(getAmountFDays(sendName));
  month.innerHTML = formatMoney(getAmountTDays(sendName));
}
