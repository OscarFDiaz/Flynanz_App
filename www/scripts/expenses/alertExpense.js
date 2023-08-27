/* PARA AÑADIR UN GASTO*/
function createAlertDialogToAddExpense() {
  var dialog = document.getElementById('alertToAddExpense');

  if (dialog) {
    loadSelectOptions();
    dialog.show();
  } else {
    ons.notification.toast('Ups! contact support', {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
}

function loadSelectOptions() {
  let moneyStorage = JSON.parse(localStorage.getItem('moneyStorage'));
  let lang = getLang('expense');

  let container = document.getElementById('selectOptio');
  container.innerHTML = '';

  const option = document.createElement('option');

  option.innerText = lang.noSubtract;

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

function hideAlertExpense() {
  let eName = document.getElementById('alertExpenseNote').value;
  let eMoney = document.getElementById('alertExpenseMoney').value;
  let eDate = document.getElementById('alertExpenseDate').value;
  let eid = localStorage.getItem('detailExpenseCount');
  let lang = getLang('expense');

  const selectTag = document.getElementById('selectOptio');
  const options = selectTag.options;
  var selectedOption = options[selectTag.selectedIndex].value;

  if (eid === null || eid === '') {
    localStorage.setItem('detailExpenseCount', '0');
    eid = 0;
  }

  eid = +eid + 1;
  localStorage.setItem('detailExpenseCount', eid);

  if (eName === null || eName === '') {
    ons.notification.toast(lang.noName, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (eMoney === null || eMoney === '') {
    ons.notification.toast(lang.noExpense, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }
  // Convierto la cantidad después de ver que fue escrita
  eMoney = parseFloat(eMoney).toFixed(2);

  if (eDate === null || eDate === '') {
    eDate = new Date().toJSON().slice(0, 10);
  }

  let testSign = Math.sign(eMoney);
  if (testSign === -1 || testSign === -0) {
    ons.notification.toast(lang.noNegative, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (selectedOption !== 'NO RESTAR' || selectedOption !== 'DO NOT SUBTRACT') {
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

  ons.notification.toast(`${lang.newExpense} ${expenseObject} ${lang.added}`, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

  sessionStorage.clear();
  document.getElementById('alertExpenseNote').value = null;
  document.getElementById('alertExpenseMoney').value = null;
  document.getElementById('alertExpenseDate').value = null;
  document.getElementById('alertToAddExpense').hide();
}

function updateMoneyStorage(sendName, amount) {
  let moneyStorage = JSON.parse(localStorage.getItem('moneyStorage'));

  let lang = getLang('expense');

  if (moneyStorage !== null) {
    for (let i = 0; i < moneyStorage.length; i++) {
      if (moneyStorage[i].moneyName == sendName) {
        let test = +moneyStorage[i].moneyCurrent + -amount;
        let testSign = Math.sign(test);
        if (testSign === -1) {
          ons.notification.toast(lang.noMore, {
            title: 'Aviso!',
            timeout: 2000,
            animation: 'ascend',
          });
          return true;
        }

        moneyStorage[i].moneyCurrent = (
          parseFloat(moneyStorage[i].moneyCurrent) - parseFloat(amount)
        ).toFixed(2);

        localStorage.setItem('moneyStorage', JSON.stringify(moneyStorage));
        break;
      }
    }
  }
}

function hideAlertExpenseNoChange() {
  let lang = getLang('expense');

  ons.notification.toast(lang.allNormal, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

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
    ons.notification.toast('Ups! contact support', {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
}

// PARA EDITAR UN GASTO YA CREADO
function hideEditAlertExpense() {
  let note = document.getElementById('alertEditExpenseNote').value;
  let money = parseFloat(document.getElementById('alertEditExpenseMoney').value).toFixed(
    2,
  );
  let date = document.getElementById('alertEditExpenseDate').value;
  let mName, id, index, inWallet;

  let idSend = sessionStorage.getItem('editExpense');
  let expenses = JSON.parse(localStorage.getItem('expenseDetailStorage'));

  let lang = getLang('expense');

  if (note === null || note === '') {
    ons.notification.toast(lang.noName, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (money == null || money == '' || money == 'NaN') {
    ons.notification.toast(lang.noExpense, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (date === null || date === '') {
    date = new Date().toJSON().slice(0, 10);
  }

  let testSign = Math.sign(money);
  if (testSign === -1 || testSign === -0) {
    ons.notification.toast(lang.noNegative, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
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

  ons.notification.toast(`${lang.expense} ${mName} ${lang.modify}`, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

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

      let {
        expenseName,
        mainDate,
        iconName,
        iconUrl,
        toShow,
        expenseColor,
        expenseColor1,
        expenseGradient,
      } = mainStorage[i];

      let expense = {
        expenseName,
        totalExpense: newAmount,
        mainDate,
        iconName,
        iconUrl,
        toShow,
        expenseColor,
        expenseColor1,
        expenseGradient,
      };
      mainStorage[index] = expense;
      localStorage.setItem('expenseStorage', JSON.stringify(mainStorage));
    }
  }
}

function hideEditAlertExpenseNoChange() {
  let lang = getLang('expense');

  ons.notification.toast(lang.allNormal, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

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
      let { iconName, iconUrl, expenseGradient, expenseColor, expenseColor1 } =
        expenseStorage[i];

      sessionStorage.setItem('expenseIconName', iconName);
      sessionStorage.setItem('expenseIconUrl', iconUrl);
      sessionStorage.setItem('tempGradient', expenseGradient);
      sessionStorage.setItem('colorExpense', expenseColor);
      sessionStorage.setItem('colorExpense1', expenseColor1);
      break;
    }
  }

  const navigator = document.querySelector('#navigator');
  navigator.pushPage('pages/expensePage/editExpense.html');
}

function hideAlertExpenseEditNoChange() {
  document.getElementById('newExpenseNameEdit').value = null;

  let lang = getLang('expense');

  sessionStorage.clear();
  functionPopPage();

  ons.notification.toast(lang.allNormal, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });
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

  let lang = getLang('expense');

  if (expenseGradient == null || expenseGradient == '') {
    expenseGradient = '--gradient_0';
    expenseColor = '#bfdff8';
    expenseColor1 = '#f4dcf5';
  }

  if (newName === null || newName === '') {
    ons.notification.toast(lang.noName, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
    return;
  }

  if (newIcon == null || newIcon == '') {
    newIcon = 'construction.png';
  }

  if (iconUrl == '' || iconUrl == null) {
    iconUrl = './assets/icons/icons_list/fix/';
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

  ons.notification.toast(`${lang.expense} ${newName} ${lang.modify}`, {
    title: 'Aviso!',
    timeout: 2000,
    animation: 'ascend',
  });

  functionPopPage(2);
  sessionStorage.clear();
}

function loadIconsEdit() {
  let iconsView = document.getElementById('expenseIconListOfIconsEdit');
  iconsView.innerHTML = '';

  let art = `./assets/icons/icons_list/art/`;
  let artNames = [
    'brush.png',
    'format_color_fill.png',
    'format_paint.png',
    'imagesearch_roller.png',
    'palette.png',
  ];

  let book = `./assets/icons/icons_list/books/`;
  let bookNames = [
    'play_lesson.png',
    'photo_album.png',
    'menu_book.png',
    'library_books.png',
    'import_contacts.png',
    'book.png',
    'auto_stories.png',
  ];

  let builds = `./assets/icons/icons_list/builds/`;
  let buildsNames = [
    'apartment.png',
    'cabin.png',
    'cottage.png',
    'gite.png',
    'home.png',
    'home_work.png',
    'house.png',
    'location_city.png',
    'villa.png',
  ];

  let camera = `./assets/icons/icons_list/camera/`;
  let cameraNames = [
    'camera.png',
    'photo_camera.png',
    'video_camera_back.png',
    'videocam.png',
  ];

  let fix = `./assets/icons/icons_list/fix/`;
  let fixNames = [
    'build.png',
    'construction.png',
    'engineering.png',
    'handyman.png',
    'healing.png',
    'home_repair_service.png',
    'plumbing.png',
  ];

  let food = `./assets/icons/icons_list/food/`;
  let foodNames = [
    'bakery_dining.png',
    'brunch_dining.png',
    'cake.png',
    'coffee.png',
    'coffee_maker.png',
    'emoji_food_beverage.png',
    'fastfood.png',
    'icecream.png',
    'kebab_dining.png',
    'liquor.png',
    'local_bar.png',
    'local_cafe.png',
    'local_drink.png',
    'local_pizza.png',
    'lunch_dining.png',
    'ramen_dining.png',
    'restaurant.png',
    'sports_bar.png',
    'takeout_dining.png',
  ];

  let fun = `./assets/icons/icons_list/fun/`;
  let funNames = [
    'attractions.png',
    'celebration.png',
    'festival.png',
    'stadia_controller.png',
    'theater_comedy.png',
  ];

  let money = `./assets/icons/icons_list/money/`;
  let moneyNames = [
    'account_balance_wallet.png',
    'credit_card.png',
    'footprint.png',
    'local_mall.png',
    'monetization_on.png',
    'payments.png',
    'redeem.png',
    'savings.png',
    'sell.png',
    'shopping_bag.png',
    'shopping_cart.png',
    'store.png',
    'storefront.png',
    'styler.png',
    'wallet.png',
  ];

  let music = `./assets/icons/icons_list/music/`;
  let musicNames = [
    'audio_file.png',
    'auto_detect_voice.png',
    'headphones.png',
    'headset_mic.png',
    'music_note.png',
    'piano.png',
    'settings_voice.png',
    'speaker.png',
    'volume_up.png',
  ];

  let pc = `./assets/icons/icons_list/pc/`;
  let pcNames = [
    'computer.png',
    'desktop_windows.png',
    'devices.png',
    'mouse.png',
    'print.png',
  ];

  let sport = `./assets/icons/icons_list/sport/`;
  let sportNames = [
    'directions_run.png',
    'fitness_center.png',
    'golf_course.png',
    'sports_baseball.png',
    'sports_basketball.png',
    'sports_cricket.png',
    'sports_football.png',
    'sports_golf.png',
    'sports_handball.png',
    'sports_rugby.png',
    'sports_soccer.png',
    'sports_tennis.png',
    'sports_volleyball.png',
  ];

  let time = `./assets/icons/icons_list/time/`;
  let timeNames = [
    'alarm.png',
    'date_range.png',
    'hourglass_empty.png',
    'schedule.png',
    'watch.png',
  ];

  let transport = `./assets/icons/icons_list/transport/`;
  let transportNames = [
    'airport_shuttle.png',
    'bike_scooter.png',
    'directions_bike.png',
    'directions_boat.png',
    'directions_bus.png',
    'directions_car.png',
    'directions_railway.png',
    'ev_station.png',
    'local_gas_station.png',
    'local_shipping.png',
    'motorcycle.png',
    'sailing.png',
    'snowmobile.png',
    'tire_repair.png',
    'tram.png',
  ];

  let travel = `./assets/icons/icons_list/travel/`;
  let travelNames = [
    'airplane_ticket.png',
    'connecting_airports.png',
    'flight_takeoff.png',
    'luggage.png',
    'map.png',
  ];

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
  document.getElementById('imageEditExpenseIcon').src = `${url}${iconName}`;
}

function deleteDetailExpense(idSend) {
  let lang = getLang('expense');
  ons.notification.confirm({
    message: lang.confirmDelete,
    title: lang.notice,
    buttonLabels: [lang.confirm, lang.cancel],
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

        ons.notification.toast(lang.success, {
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
            document.getElementById('totalExpenseDetail').innerHTML = formatMoney(
              storage[i].totalExpense,
            );
            break;
          }
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

/* RECARGA LOS GASTOS AL ELIMINAR UNO CUANDO SE ENTRA DETALLADAMENTE A UN GASTO*/
function reInsertExpenseDetail(sendName) {
  let detailDetailExpenseView = document.getElementById('expenseListOfExpenses');
  detailDetailExpenseView.innerHTML = '';

  let expensesDetail = JSON.parse(localStorage.getItem('expenseDetailStorage'));

  let lang = getLang('expense');

  let actualEx = 0;
  if (expensesDetail !== null) {
    for (let i = 0; i < expensesDetail.length; i++) {
      if (expensesDetail[i].expenseName == sendName) {
        actualEx = 1;
        break;
      }
    }
  }

  if (actualEx == 0) {
    detailDetailExpenseView.innerHTML = `<div style="margin-bottom: 30px;">
      <label class="labelDetailExpense" style="text-align:center"
        >${lang.nothing}</label
      >
    </div>`;
  } else {
    for (let i = 0; i < expensesDetail.length; i++) {
      if (expensesDetail[i].expenseName == sendName) {
        let iAmount = formatMoney(expensesDetail[i].inAmount);

        let { inName, inDate, inID } = expensesDetail[i];

        let today = new Date().toJSON().slice(0, 10);
        let days = dateDiff(today, inDate);

        if (inDate === '') {
          inDate = lang.noDateMayus;
        } else {
          if (Math.sign(days) === 1) {
            inDate = `${lang.in} ${days} ${lang.days}`;
          } else if (Math.sign(days) === -1) {
            inDate = `${lang.ago} ${Math.abs(days)} ${lang.days}`;
          } else if (Math.sign(days) === 0) {
            inDate = lang.today;
          }
        }

        detailDetailExpenseView.innerHTML += `<ons-list-item
          expandable
          style="margin-top: -16px;"
          modifier="nodivider"
        >
          <div class="center" style="margin-right: 16px">
            <div>
              <label
                class="list-item__title labelDetailExpense"
                style="text-align:left; margin-left:16px; font-size:22px"
                >${inName}</label
              >
              <label
                class="list-item__subtitle labelDetailExpense"
                style="padding-top: 0px; font-size: 18px; text-align:left; margin-left:16px"
                >${inDate}</label
              >
            </div>
            <div style="margin-left: auto; margin-right: 0px;">
              <span
                class="labelInfoDetailExpense"
                style="font-size:26px; color: var(--expense-detail)"
                >$</span
              >
              <span class="labelInfoDetailExpense" style="font-size:26px;"
                >${iAmount}</span
              >
            </div>
          </div>

          <div class="expandable-content" style="grid-template-columns: 1fr 1fr;">
            <ons-button
              class="moneyButtonDe"
              style="margin-bottom: 16px; margin-left: 32px; margin-right: 8px; background: var(--flat-button-color); color: var(--flat-button-color-text)"
              onclick="editDetailExpense('${inID}')"
            >
              ${lang.edit}
            </ons-button>

            <ons-button
              class="moneyButtonDe"
              style="margin-bottom: 16px; margin-left: 8px; margin-right: 32px; background: var(--flat-button-light-color); color: var(--flat-button-light-color-text)"
              onclick="deleteDetailExpense('${inID}')"
            >
            ${lang.delete}
            </ons-button>
          </div>
        </ons-list-item>`;
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
