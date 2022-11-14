function gradientButtonExpenseClick(gradient, color, color1) {
  // Defino el gradiento al que le da click
  sessionStorage.setItem('tempGradient', gradient);
  sessionStorage.setItem('colorExpense', color);
  sessionStorage.setItem('colorExpense1', color1);
}

function loadIcons() {
  let iconsView = document.getElementById('expenseIconListOfIcons');
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
    'villa.svg',
  ];

  let camera = `/www/assets/icons/icons_list/camera/`;
  let cameraNames = ['camera.svg', 'photo_camera.svg', 'video_camera_back.svg', 'videocam.svg'];

  let fix = `/www/assets/icons/icons_list/fix/`;
  let fixNames = [
    'build.svg',
    'construction.svg',
    'engineering.svg',
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
    'sports_baseball.svg',
    'sports_basketball.svg',
    'sports_cricket.svg',
    'sports_football.svg',
    'sports_golf.svg',
    'sports_handball.svg',
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
      iconsView.innerHTML += `<img src="${art}${artNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIcon('${artNames[i]}', '${art}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${art}${artNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIcon('${artNames[i]}', '${art}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Books</p>`;
  for (let i = 0; i < bookNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${book}${bookNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIcon('${bookNames[i]}', '${book}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${book}${bookNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIcon('${bookNames[i]}', '${book}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Builds</p>`;
  for (let i = 0; i < buildsNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${builds}${buildsNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIcon('${buildsNames[i]}', '${builds}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${builds}${buildsNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIcon('${buildsNames[i]}', '${builds}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Camera</p>`;
  for (let i = 0; i < cameraNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${camera}${cameraNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIcon('${cameraNames[i]}', '${camera}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${camera}${cameraNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIcon('${cameraNames[i]}', '${camera}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Fix</p>`;
  for (let i = 0; i < fixNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${fix}${fixNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIcon('${fixNames[i]}', '${fix}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${fix}${fixNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIcon('${fixNames[i]}', '${fix}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Food</p>`;
  for (let i = 0; i < foodNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${food}${foodNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIcon('${foodNames[i]}', '${food}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${food}${foodNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIcon('${foodNames[i]}', '${food}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Fun</p>`;
  for (let i = 0; i < funNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${fun}${funNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIcon('${funNames[i]}', '${fun}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${fun}${funNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIcon('${funNames[i]}', '${fun}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Money</p>`;
  for (let i = 0; i < moneyNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${money}${moneyNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIcon('${moneyNames[i]}', '${money}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${money}${moneyNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIcon('${moneyNames[i]}', '${money}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Music</p>`;
  for (let i = 0; i < musicNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${music}${musicNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIcon('${musicNames[i]}', '${music}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${music}${musicNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIcon('${musicNames[i]}', '${music}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">PC</p>`;
  for (let i = 0; i < pcNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${pc}${pcNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIcon('${pcNames[i]}', '${pc}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${pc}${pcNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIcon('${pcNames[i]}', '${pc}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Sport</p>`;
  for (let i = 0; i < sportNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${sport}${sportNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIcon('${sportNames[i]}', '${sport}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${sport}${sportNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIcon('${sportNames[i]}', '${sport}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Time</p>`;
  for (let i = 0; i < timeNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${time}${timeNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIcon('${timeNames[i]}', '${time}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${time}${timeNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIcon('${timeNames[i]}', '${time}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Transport</p>`;
  for (let i = 0; i < transportNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${transport}${transportNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIcon('${transportNames[i]}', '${transport}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${transport}${transportNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIcon('${transportNames[i]}', '${transport}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Travel</p>`;
  for (let i = 0; i < travelNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${travel}${travelNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIcon('${travelNames[i]}', '${travel}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${travel}${travelNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIcon('${travelNames[i]}', '${travel}')"></img>`;
    }
  }
}

function selectIcon(iconName, url) {
  sessionStorage.setItem('expenseIconName', iconName);
  sessionStorage.setItem('expenseIconUrl', url);
  // Oculto los iconos, ya tengo uno seleccionado
  document.getElementById('expandableListContainerExpense').hideExpansion();
}

function makeNewExpense() {
  let expenseName = document.getElementById('newExpenseName').value;
  let totalExpense = 0.0;
  let mainDate = new Date().toJSON().slice(0, 10);
  let iconName = sessionStorage.getItem('expenseIconName');
  let toShow = document.getElementById('switchNewGoal').checked;

  let expenseGradient = sessionStorage.getItem('tempGradient');
  let expenseColor = sessionStorage.getItem('colorExpense');
  let expenseColor1 = sessionStorage.getItem('colorExpense1');

  let iconUrl = sessionStorage.getItem('expenseIconUrl');

  let languaje = localStorage.getItem('storageSwitchLanguage');

  sessionStorage.removeItem('expenseIconName');

  if (expenseName == '' || expenseName == null) {
    if (languaje == 'false') {
      ons.notification.toast('Wait, the expense needs a name!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('Un momento, el gasto necesita un nombre!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
    return;
  }

  if (expenseGradient == '' || expenseGradient == null) {
    if (languaje == 'false') {
      ons.notification.toast('Wait, please select a color!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('Un momento, debes seleccionar un color!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
    return;
  }

  if (iconName == '' || iconName == null) {
    iconName = 'construction.svg';
  }

  if (iconUrl == '' || iconUrl == null) {
    iconUrl = '/www/assets/icons/icons_list/fix/';
  }

  let expense = {
    expenseName,
    totalExpense,
    mainDate,
    toShow,
    expenseGradient,
    expenseColor,
    expenseColor1,
    iconName,
    iconUrl,
  };

  /* Guardo el expense original*/
  if (localStorage.getItem('expenseStorage') === null) {
    let expenseArray = [];
    expenseArray.push(expense);
    localStorage.setItem('expenseStorage', JSON.stringify(expenseArray));
  } else {
    let expenseArray = JSON.parse(localStorage.getItem('expenseStorage'));
    expenseArray.push(expense);
    localStorage.setItem('expenseStorage', JSON.stringify(expenseArray));
  }

  if (languaje == 'false') {
    ons.notification.toast(`New expense ${expenseName} added!`, {
      title: 'Notice!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast(`Nuevo gasto ${expenseName} añadido!`, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }

  getExpenses();
  functionPopPage();

  sessionStorage.clear();
}

function getExpenses() {
  let expenses = JSON.parse(localStorage.getItem('expenseStorage'));
  let expensesView = document.getElementById('expensesContainer');

  let languaje = localStorage.getItem('storageSwitchLanguage');

  document.getElementById('expensesContainer').innerHTML = '';
  let expenseTutorial = '';
  if (languaje == 'false') {
    expenseTutorial = `<ons-card>
    <ons-list style="background: none;" id="expenseListOfExpensesContainer">
      <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
        <label class="iconExpenseLabel" style="margin-left: 32px;">
         See tutorial
        </label>
        <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr;">
          <p class="paraTutorial">
            Here you can add the expenses you make. You can separate them into categories and, at the same time, 
            select a color and icon for each one of them.
            The expenses will be reflected on the "HOME" screen; where is the donut-shaped graph.
            In addition, you can remove the expense to any of your wallets located in: "MY MONEY".
          </p>
          <p class="paraTutorial">
            Individual expenses may be added. It will show how much you have spent in each category and it will tell you the total expenses.
          </p>
          <p class="paraTutorial">
            When entering your category you will see a list of the expenses that you have generated, 
            these will be shown as they are created, that is; the most recent expense will be ranked first.
          </p>
          <p class="paraTutorial">
            You can also restart the expenses incurred in a category by entering it and clicking on: "RESET".
            In case you restart the expenses, the money will not be updated.
          </p>
          <p class="paraTutorial">
            To create a new expense, click on +.
          </p>
        </div>
      </ons-list-item>
    </ons-list>
  </ons-card>`;
  } else {
    expenseTutorial = `
    <ons-card>
      <ons-list style="background: none;" id="expenseListOfExpensesContainer">
        <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
          <label class="iconExpenseLabel" style="margin-left: 32px;">
            Ver tutorial
          </label>
          <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr;">
            <p class="paraTutorial">
              Aquí podrás añadir los gastos que vayas realizando. Podrás separarlos en categorías y, a la vez, 
              seleccionar un color e icono para cada una de ellas. 
              Los gastos se verán reflejados en la pantalla de "INICIO"; en dónde se encuentra la gráfica en forma de dona. 
              Además, podrás remover el gasto a alguna de tus carteras ubicadas en: "MI DINERO". 
            </p>
            <p class="paraTutorial">
              Se podrá añadir gastos individuales. Se mostrará cuánto has gastado en cada categoría y te dirá los gastos en total. 
            </p>
            <p class="paraTutorial">
              Al ingresar a tu categoría verás una lista de los gastos que has generado, éstos se mostrarán conforme se vayan creando, 
              es decir; el gasto más reciente estará ubicado en el primer lugar. 
            </p>
            <p class="paraTutorial">
              También podrás reiniciar los gastos realizados en una categoría entrando a ésta y dando clic en: "REINICIAR". 
              En dado caso de qué reinicies los gastos el dinero no se actualizará.
            </p>
            <p class="paraTutorial">
              Para crear un nuevo gasto pulsa "+".
            </p>
          </div>
        </ons-list-item>
      </ons-list>
    </ons-card>`;
  }

  if (expenses == null || expenses == 'null') {
    let tutorial = localStorage.getItem('storageSwitchTutorial');
    if (tutorial == true || tutorial == 'true') {
      expensesView.innerHTML += `${expenseTutorial}`;
    }
    return;
  } else if (expenses.length == 0) {
    let tutorial = localStorage.getItem('storageSwitchTutorial');
    if (tutorial == true || tutorial == 'true') {
      expensesView.innerHTML += `${expenseTutorial}`;
    }
    return;
  }

  let totalExpenses = formatMoney(getTotalExpenses());
  let totalFDays = formatMoney(getAmountFDaysN());
  let totalTDays = formatMoney(getAmountTDaysN());

  // Datos de los gastos totales
  if (languaje == 'false') {
    expensesView.innerHTML += `<ons-card>
      <div class="content">
        <label class="labelDetailExpense"
          >Total cost:
          <div style="display: block; font-size: 30px; font-weight: bold;">
            <span id="totalExpenseDetailMain" class="labelInfoDetailExpense"
              >$ ${totalExpenses}</span
            >
          </div>
        </label>
        
        <label class="labelDetailExpense"
          >Last 15 days: 
          <div style="display: block; font-size: 30px; font-weight: bold;"> 
            <span id="lastDaysDetailMain" class="labelInfoDetailExpense"
              >$ ${totalFDays}</span
            >
          </div>
        </label>
        <label class="labelDetailExpense"
          >Last 31 days: 
          <div style="display: block; font-size: 30px; font-weight: bold;">
            <span id="lastMonthDetailMain" class="labelInfoDetailExpense"
              >$ ${totalTDays}</span
            >
          </div>
        </label>
      </div>
    </ons-card>`;
  } else {
    expensesView.innerHTML += `<ons-card>
      <div class="content">
        <label class="labelDetailExpense"
          >Gasto total:
          <div style="display: block; font-size: 30px; font-weight: bold;">
            <span id="totalExpenseDetailMain" class="labelInfoDetailExpense"
              >$ ${totalExpenses}</span
            >
          </div>
        </label>
        
        <label class="labelDetailExpense"
          >Últimos 15 días: 
          <div style="display: block; font-size: 30px; font-weight: bold;">
            <span id="lastDaysDetailMain" class="labelInfoDetailExpense"
              >$ ${totalFDays}</span
            >
          </div>
        </label>
        <label class="labelDetailExpense"
          >Últimos 31 días: 
          <div style="display: block; font-size: 30px; font-weight: bold;">
            <span id="lastMonthDetailMain" class="labelInfoDetailExpense"
              >$ ${totalTDays}</span
            >
          </div>
        </label>
      </div>
    </ons-card>`;
  }

  for (let i = 0; i < expenses.length; i++) {
    let eName = expenses[i].expenseName;
    let eicon = expenses[i].iconName;
    let eiconUrl = expenses[i].iconUrl;
    let eExpense = formatMoney(parseFloat(expenses[i].totalExpense).toFixed(2));

    let eGradient = expenses[i].expenseGradient;

    if (languaje == 'false') {
      expensesView.innerHTML += `<ons-card class="expenseCard" style="background: var(${eGradient}); border: none">
        <div class="title expenseTitle" onclick="findExpense('${eName}')" style="padding: 16px 16px 0px 16px">
          ${eName}
        </div>
        <div class="iconSavedMoney expenseIconContainer">
            <img src="${eiconUrl}${eicon}" alt="saving icon" style="width: 100%">
        </div>
        <div class="content">
          <label class="expenseInfo">$ ${eExpense} expended</label>
        </div>
        <ons-button class="moneyButtonAdd" style="margin-bottom: 16px;" onclick="addExpenseToExpense('${eName}')" > 
          Add expense
        </ons-button>
        <ons-button class="moneyButtonDe" style="margin-bottom: 16px; background: none" onclick="deleteExpense('${eName}')" >
          Delete
        </ons-button>
      </ons-card>`;
    } else {
      expensesView.innerHTML += `<ons-card class="expenseCard" style="background: var(${eGradient}); border: none">
        <div class="title expenseTitle" onclick="findExpense('${eName}')" style="padding: 16px 16px 0px 16px">
          ${eName}  
        </div>
        <div class="iconSavedMoney expenseIconContainer">
            <img src="${eiconUrl}${eicon}" alt="saving icon" style="width: 100%">
        </div>
        <div class="content">
          <label class="expenseInfo">$ ${eExpense} gastados</label>
        </div>
        <ons-button class="moneyButtonAdd" style="margin-bottom: 16px;" onclick="addExpenseToExpense('${eName}')" > 
          AÑADIR GASTO
        </ons-button>
        <ons-button class="moneyButtonDe" style="margin-bottom: 16px; background: none" onclick="deleteExpense('${eName}')" >
          ELIMINAR
        </ons-button>
      </ons-card>`;
    }
  }
}

function findExpense(sendName) {
  let expenses = JSON.parse(localStorage.getItem('expenseStorage'));

  for (let i = 0; i < expenses.length; i++) {
    let eName = expenses[i].expenseName;

    if (eName == sendName) {
      let findExpenseObject = expenses[i];

      if (sessionStorage.getItem('sessionFindGoal') === null) {
        sessionStorage.setItem('sessionFindGoal', JSON.stringify(findExpenseObject));
      } else {
        sessionStorage.removeItem('sessionFindGoal');
        sessionStorage.setItem('sessionFindGoal', JSON.stringify(findExpenseObject));
      }

      const navigator = document.querySelector('#navigator');
      navigator.pushPage('detailExpense.html');
      break;
    }
  }
}

function addExpenseToExpense(sendName) {
  let expenses = JSON.parse(localStorage.getItem('expenseStorage'));

  for (let i = 0; i < expenses.length; i++) {
    let eName = expenses[i].expenseName;

    if (eName == sendName) {
      let objectFinded = expenses[i].expenseName;

      if (sessionStorage.getItem('sessionFindExpense') === null) {
        sessionStorage.setItem('sessionFindExpense', objectFinded);
      } else {
        sessionStorage.removeItem('sessionFindExpense');
        sessionStorage.setItem('sessionFindExpense', objectFinded);
      }
      createAlertDialogToAddExpense();
      break;
    }
  }
}

function resetExpense(sendName) {
  let languaje = localStorage.getItem('storageSwitchLanguage');
  if (languaje == 'false') {
    ons.notification.confirm({
      message: 'Are you sure to delete all the expenses made? The creation date will not be modified.',
      title: 'Notice!',
      buttonLabels: ['Yes, delete', 'Cancel'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let detailExpenses = JSON.parse(localStorage.getItem('expenseDetailStorage'));

          if (detailExpenses == null || detailExpenses == 'null') {
            ons.notification.toast('Wait, there are no costs to delete, do you want to try to deceive me?', {
              title: 'Notice!',
              timeout: 2000,
              animation: 'ascend',
            });
            return;
          }

          if (detailExpenses.length == 0 || detailExpenses.length == '0') {
            ons.notification.toast('Wait, there are no costs to delete, do you want to try to deceive me?', {
              title: 'Notice!',
              timeout: 2000,
              animation: 'ascend',
            });
            return;
          }

          for (let i = 0; i < detailExpenses.length; i++) {
            let name = detailExpenses[i].expenseName;
            if (name === sendName || name == sendName) {
              detailExpenses.splice(i, 1);
              i--;
            }
          }
          localStorage.setItem('expenseDetailStorage', JSON.stringify(detailExpenses));

          /* RESETEO LOS CONTADORES DEL EXPENSE A 0*/
          let exName = sendName;

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

          expense.totalExpense = 0;

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

          functionPopPage();

          getExpenses();
          ons.notification.toast('Expenses have been restarted! A new beginning ...', {
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
      message: 'Estas seguro de borrar todos los gastos realizados?, la fecha de creación no se modificara.',
      title: 'Aviso!',
      buttonLabels: ['Sí, borrar', 'Cancelar'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let detailExpenses = JSON.parse(localStorage.getItem('expenseDetailStorage'));

          if (detailExpenses == null || detailExpenses == 'null') {
            ons.notification.toast('Un momento, no hay gastos para borrar, me quieres intentar engañar?', {
              title: 'Aviso!',
              timeout: 2000,
              animation: 'ascend',
            });
            return;
          }

          if (detailExpenses.length == 0 || detailExpenses.length == '0') {
            ons.notification.toast('Un momento, no hay gastos para borrar, me querias intentar engañar?', {
              title: 'Aviso!',
              timeout: 2000,
              animation: 'ascend',
            });
            return;
          }

          for (let i = 0; i < detailExpenses.length; i++) {
            let name = detailExpenses[i].expenseName;
            if (name === sendName || name == sendName) {
              detailExpenses.splice(i, 1);
              i--;
            }
          }
          localStorage.setItem('expenseDetailStorage', JSON.stringify(detailExpenses));

          /* RESETEO LOS CONTADORES DEL EXPENSE A 0*/
          let exName = sendName;

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

          expense.totalExpense = 0.0;

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

          functionPopPage();

          getExpenses();
          ons.notification.toast('Se han reiniciado los gastos!, un nuevo comienzo...', {
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

function deleteExpense(sendName) {
  let languaje = localStorage.getItem('storageSwitchLanguage');
  if (languaje == 'false') {
    ons.notification.confirm({
      message: 'Are you sure to erase the expense completely?',
      title: 'Notice!',
      buttonLabels: ['Yes, erase', 'Cancel'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let expenses = JSON.parse(localStorage.getItem('expenseStorage'));
          let detailExpenses = JSON.parse(localStorage.getItem('expenseDetailStorage'));

          for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].expenseName == sendName) {
              expenses.splice(i, 1);
              break;
            }
          }
          localStorage.setItem('expenseStorage', JSON.stringify(expenses));

          if (detailExpenses == null || detailExpenses == 'null') {
          } else {
            for (let i = 0; i < detailExpenses.length; i++) {
              if (detailExpenses[i].expenseName == sendName) {
                detailExpenses.splice(i, 1);
                i--;
              }
            }
            localStorage.setItem('expenseDetailStorage', JSON.stringify(detailExpenses));
          }

          getExpenses();

          ons.notification.toast('The selected expense has been deleted!', {
            title: 'Notice!',
            timeout: 2000,
            animation: 'ascend',
          });
        } else {
          ons.notification.toast('Okay, everything flows as normal!', {
            title: 'Aviso!',
            timeout: 1000,
            animation: 'ascend',
          });
        }
      },
    });
  } else {
    ons.notification.confirm({
      message: 'Estas seguro de borrar el gasto totalmente?',
      title: 'Aviso!',
      buttonLabels: ['Sí, borrar', 'Cancelar'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let expenses = JSON.parse(localStorage.getItem('expenseStorage'));
          let detailExpenses = JSON.parse(localStorage.getItem('expenseDetailStorage'));

          for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].expenseName == sendName) {
              expenses.splice(i, 1);
              break;
            }
          }
          localStorage.setItem('expenseStorage', JSON.stringify(expenses));

          if (detailExpenses == null || detailExpenses == 'null') {
          } else {
            for (let i = 0; i < detailExpenses.length; i++) {
              if (detailExpenses[i].expenseName == sendName) {
                detailExpenses.splice(i, 1);
                i--;
              }
            }
            localStorage.setItem('expenseDetailStorage', JSON.stringify(detailExpenses));
          }

          getExpenses();

          ons.notification.toast('Se ha eliminado el gasto seleccionado!', {
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

function updateExpenseTotalMoney(sendName, amountSend) {
  let exName = sendName;
  let newAmount = amountSend; //-323

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

  expense.totalExpense = parseFloat(parseFloat(expense.totalExpense) + parseFloat(newAmount)).toFixed(2);

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

  getExpenses();
}

function getAmountFDays(sendName) {
  let storage = JSON.parse(localStorage.getItem('expenseDetailStorage'));

  let today = new Date().toJSON().slice(0, 10);
  let total = 0;
  for (let i = 0; i < storage.length; i++) {
    if (storage[i].expenseName == sendName) {
      let dateD = dateDiff(storage[i].inDate, today);
      if (dateD < 16 && dateD >= 0) {
        total = +total + +storage[i].inAmount;
      }
    }
  }
  return parseFloat(total).toFixed(2);
}

function getAmountTDays(sendName) {
  let storage = JSON.parse(localStorage.getItem('expenseDetailStorage'));

  let today = new Date().toJSON().slice(0, 10);
  let total = 0;
  for (let i = 0; i < storage.length; i++) {
    if (storage[i].expenseName == sendName) {
      let dateD = dateDiff(storage[i].inDate, today);
      if (dateD < 32 && dateD >= 0) {
        total = +total + +storage[i].inAmount;
      }
    }
  }
  return parseFloat(total).toFixed(2);
}

function dateDiff(date1, date2) {
  dt1 = new Date(date1);
  dt2 = new Date(date2);
  return Math.floor(
    (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
      (1000 * 60 * 60 * 24)
  );
}

function loadDetailExpense() {
  document.getElementById('detailExpenseContainer').innerHTML = '';

  let languaje = localStorage.getItem('storageSwitchLanguage');

  let retrievedExpense = sessionStorage.getItem('sessionFindGoal');
  let parseExpense = JSON.parse(retrievedExpense);

  let eName = parseExpense.expenseName;
  let eTotal = parseFloat(parseExpense.totalExpense).toFixed(2);
  let eTotalTS = formatMoney(eTotal);
  let mDate = parseExpense.mainDate;

  let lastFDays, lastTDays;

  if (eTotal == 0) {
    lastFDays = lastTDays = parseFloat(eTotal).toFixed(2);
  } else {
    lastFDays = formatMoney(getAmountFDays(eName));
    lastTDays = formatMoney(getAmountTDays(eName));
  }

  let expenseView = document.getElementById('detailExpenseContainer');
  expenseView.innerHTML = '';

  document.getElementById('titleDetailExpense').innerHTML = eName;

  if (languaje == 'false') {
    expenseView.innerHTML += `
    <ons-card>
      <div class="content">
        <label class="labelDetailExpense"
          >Total cost since ${mDate}: 
          <div style="display: block; font-size: 30px; font-weight: bold;">  
            <span id="totalExpenseDetail" class="labelInfoDetailExpense"
              >$ ${eTotalTS}</span
            >
          </div>
        </label>
        
        <label class="labelDetailExpense"
          >Last 15 days: 
          <div style="display: block; font-size: 30px; font-weight: bold;">
            <span id="lastDaysDetail" class="labelInfoDetailExpense"
              >$ ${lastFDays}</span
            >
          </div>
        </label>
        <label class="labelDetailExpense"
          >Last 30 days: 
          <div style="display: block; font-size: 30px; font-weight: bold;">
            <span id="lastMonthDetail" class="labelInfoDetailExpense"
              >$ ${lastTDays}</span
            >
          </div>
        </label>
      </div>
    </ons-card>
    
    
    <ons-card>
      <ons-list style="background: none;" id="expenseListOfExpensesContainer">
        <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
          <label class="iconExpenseLabel" style="margin-left: 16px;">
            See expenses
          </label>
          <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr;">
            <!-- AQUI SE CARGAN LOS GASTOS -->
          </div>
        </ons-list-item>
      </ons-list>
    </ons-card>
    
    <ons-button class="flatButtonLight" style="margin-bottom: 16px;"
    onclick="resetExpense('${eName}')">Reset</ons-button>

    <ons-fab position="bottom right"  onclick="editExpense('${eName}')" style="display: flex; justify-content: space-around">
      <img src="/www/assets/icons/editButton.svg" alt="saving icon" style="width: 32px; margin-top: 30%" />
    </ons-fab>`;
  } else {
    expenseView.innerHTML += `
    <ons-card>
      <div class="content">
        <label class="labelDetailExpense"
          >Gasto total desde ${mDate}:
          <div style="display: block; font-size: 30px; font-weight: bold;">
            <span id="totalExpenseDetail" class="labelInfoDetailExpense"
              >$ ${eTotalTS}</span
            >
          </div>
        </label>
        
        <label class="labelDetailExpense"
          >Últimos 15 días: 
          <div style="display: block; font-size: 30px; font-weight: bold;">
            <span id="lastDaysDetail" class="labelInfoDetailExpense"
              >$ ${lastFDays}</span
            >
          </div>
        </label>
        <label class="labelDetailExpense"
          >Últimos 30 días: 
          <div style="display: block; font-size: 30px; font-weight: bold;">
            <span id="lastMonthDetail" class="labelInfoDetailExpense"
              >$ ${lastTDays}</span
            >
          </div>
        </label>
      </div>
    </ons-card>
    
    
    <ons-card>
      <ons-list style="background: none;" id="expenseListOfExpensesContainer">
        <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
          <label class="iconExpenseLabel" style="margin-left: 16px;">
            Ver gastos
          </label>
          <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr;">
            <!-- AQUI SE CARGAN LOS GASTOS -->
          </div>
        </ons-list-item>
      </ons-list>
    </ons-card>
    
    <ons-button class="flatButtonLight" style="margin-bottom: 16px;"
    onclick="resetExpense('${eName}')">Reiniciar</ons-button>
    
    <ons-fab position="bottom right" onclick="editExpense('${eName}')" style="display: flex; justify-content: space-around">
      <img src="/www/assets/icons/editButton.svg" alt="saving icon" style="width: 32px; margin-top: 30%" />
    </ons-fab>
    `;
  }

  let detailDetailExpenseView = document.getElementById('expenseListOfExpenses');
  detailDetailExpenseView.innerHTML = '';

  let expensesDetail = JSON.parse(localStorage.getItem('expenseDetailStorage'));

  let actualEx = 0;
  if (expensesDetail == null || expensesDetail == 'null') {
  } else {
    for (let i = 0; i < expensesDetail.length; i++) {
      if (expensesDetail[i].expenseName == eName) {
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
      if (expensesDetail[i].expenseName == eName) {
        let iName = expensesDetail[i].inName;
        let iAmount = formatMoney(expensesDetail[i].inAmount);
        let iDate = expensesDetail[i].inDate;
        let iD = expensesDetail[i].inID;

        let today = new Date().toJSON().slice(0, 10);
        let days = dateDiff(today, iDate);

        if (languaje == 'false') {
          if (iDate === '') {
            iDate = 'No date data';
          } else {
            if (Math.sign(days) == 1 || Math.sign(days) == '1') {
              iDate = 'In ' + days + ' days';
            } else if (Math.sign(days) == '-1' || Math.sign(days) == -1) {
              iDate = Math.abs(days) + ' days ago';
            } else if (Math.sign(days) == '0' || Math.sign(days) == 0) {
              iDate = 'Today';
            }
          }

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
              <ons-button class="moneyButtonDe" style="margin-bottom: 16px; margin-left: 20px; margin-right: 8px; background: var(--flat-button-color); color: var(--flat-button-color-text)" onclick="editDetailExpense('${iD}')" >
                EDIT
              </ons-button>
  
              <ons-button class="moneyButtonDe" style="margin-bottom: 16px; margin-left: 8px; margin-right: 20px; background: var(--flat-button-light-color); color: var(--flat-button-light-color-text)" onclick="deleteDetailExpense('${iD}')" >
                DELETE
              </ons-button>
            </div>
          </ons-list-item>`;
        } else {
          if (iDate === '') {
            iDate = 'Sin datos de fecha';
          } else {
            if (Math.sign(days) == 1 || Math.sign(days) == '1') {
              iDate = 'En ' + days + ' días';
            } else if (Math.sign(days) == '-1' || Math.sign(days) == -1) {
              iDate = 'Hace ' + Math.abs(days) + ' Días';
            } else if (Math.sign(days) == '0' || Math.sign(days) == 0) {
              iDate = 'Hoy';
            }
          }

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
              <ons-button class="moneyButtonDe" style="margin-bottom: 16px; margin-left: 20px; margin-right: 8px; background: var(--flat-button-color); color: var(--flat-button-color-text)" onclick="editDetailExpense('${iD}')" >
                EDITAR
              </ons-button>
  
              <ons-button class="moneyButtonDe" style="margin-bottom: 16px; margin-left: 8px; margin-right: 20px; background: var(--flat-button-light-color); color: var(--flat-button-light-color-text)" onclick="deleteDetailExpense('${iD}')" >
                ELIMINAR
              </ons-button>
            </div>
          </ons-list-item>`;
        }
      }
    }
  }
}

function getTotalExpenses() {
  let total = 0;
  let expenses = JSON.parse(localStorage.getItem('expenseStorage'));

  for (let i = 0; i < expenses.length; i++) {
    total = +total + +expenses[i].totalExpense;
  }

  return parseFloat(total).toFixed(2);
}

function getAmountFDaysN() {
  let storage = JSON.parse(localStorage.getItem('expenseDetailStorage'));

  let total = 0;
  if (storage == null || storage == '') {
    return parseFloat(total).toFixed(2);
  }

  let today = new Date().toJSON().slice(0, 10);
  for (let i = 0; i < storage.length; i++) {
    let dateD = dateDiff(storage[i].inDate, today);
    if (dateD < 16 && dateD >= 0) {
      total = +total + +storage[i].inAmount;
    }
  }

  return parseFloat(total).toFixed(2);
}

function getAmountTDaysN() {
  let storage = JSON.parse(localStorage.getItem('expenseDetailStorage'));

  let total = 0;
  if (storage == null || storage == '') {
    return parseFloat(total).toFixed(2);
  }

  let today = new Date().toJSON().slice(0, 10);
  for (let i = 0; i < storage.length; i++) {
    let dateD = dateDiff(storage[i].inDate, today);
    if (dateD < 32 && dateD >= 0) {
      total = +total + +storage[i].inAmount;
    }
  }
  return parseFloat(total).toFixed(2);
}
