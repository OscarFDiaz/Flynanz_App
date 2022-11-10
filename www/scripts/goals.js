function loadIconsGoal() {
  let iconsView = document.getElementById('expenseIconListOfIconsGoal');
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
      iconsView.innerHTML += `<img src="${art}${artNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${artNames[i]}', '${art}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${art}${artNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIconGoal('${artNames[i]}', '${art}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Books</p>`;
  for (let i = 0; i < bookNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${book}${bookNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${bookNames[i]}', '${book}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${book}${bookNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIconGoal('${bookNames[i]}', '${book}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Builds</p>`;
  for (let i = 0; i < buildsNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${builds}${buildsNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${buildsNames[i]}', '${builds}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${builds}${buildsNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIconGoal('${buildsNames[i]}', '${builds}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Camera</p>`;
  for (let i = 0; i < cameraNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${camera}${cameraNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${cameraNames[i]}', '${camera}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${camera}${cameraNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIconGoal('${cameraNames[i]}', '${camera}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Fix</p>`;
  for (let i = 0; i < fixNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${fix}${fixNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${fixNames[i]}', '${fix}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${fix}${fixNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIconGoal('${fixNames[i]}', '${fix}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Food</p>`;
  for (let i = 0; i < foodNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${food}${foodNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${foodNames[i]}', '${food}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${food}${foodNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoal('${foodNames[i]}', '${food}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Fun</p>`;
  for (let i = 0; i < funNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${fun}${funNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${funNames[i]}', '${fun}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${fun}${funNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoal('${funNames[i]}', '${fun}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Money</p>`;
  for (let i = 0; i < moneyNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${money}${moneyNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${moneyNames[i]}', '${money}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${money}${moneyNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoal('${moneyNames[i]}', '${money}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Music</p>`;
  for (let i = 0; i < musicNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${music}${musicNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${musicNames[i]}', '${music}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${music}${musicNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoal('${musicNames[i]}', '${music}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">PC</p>`;
  for (let i = 0; i < pcNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${pc}${pcNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${pcNames[i]}', '${pc}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${pc}${pcNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoal('${pcNames[i]}', '${pc}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Sport</p>`;
  for (let i = 0; i < sportNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${sport}${sportNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${sportNames[i]}', '${sport}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${sport}${sportNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoal('${sportNames[i]}', '${sport}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Time</p>`;
  for (let i = 0; i < timeNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${time}${timeNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${timeNames[i]}', '${time}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${time}${timeNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoal('${timeNames[i]}', '${time}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Transport</p>`;
  for (let i = 0; i < transportNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${transport}${transportNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${transportNames[i]}', '${transport}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${transport}${transportNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoal('${transportNames[i]}', '${transport}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Travel</p>`;
  for (let i = 0; i < travelNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${travel}${travelNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${travelNames[i]}', '${travel}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${travel}${travelNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoal('${travelNames[i]}', '${travel}')"></img>`;
    }
  }
}

function gradientButtonClick(gradient) {
  // Defino el gradiento al que le da click
  sessionStorage.setItem('tempGradient', gradient);
}

function selectIconGoal(iconName, url) {
  sessionStorage.setItem('expenseIconName', iconName);
  sessionStorage.setItem('expenseIconUrl', url);
  // Oculto los iconos, ya tengo uno seleccionado
  document.getElementById('expandableListContainerGoal').hideExpansion();
}

function makeNewGoal() {
  let goalName = document.getElementById('newGoalName').value;
  let goalDescription = document.getElementById('newGoalDescription').value;
  let goalMoney = document.getElementById('newGoalMoney').value;
  let goalActualMoney = 0.0;
  let goalDate = document.getElementById('newGoalDate').value;
  let goalGradient = sessionStorage.getItem('tempGradient');

  let iconUrl = sessionStorage.getItem('expenseIconUrl');
  let iconName = sessionStorage.getItem('expenseIconName');

  let languaje = localStorage.getItem('storageSwitchLanguage');

  //Compruebo que no hay campos vacios, en su defecto los lleno
  if (languaje == 'false') {
    if (goalDescription === '') {
      goalDescription = "There is no description for this amazing goal. You can add one in the 'EDIT GOAL' button";
    }

    if (goalDate === '') {
      goalDate = 'No date goal';
    }

    if (goalName === '') {
      ons.notification.toast('Wait, a goal needs a good name!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    if (goalMoney === '') {
      ons.notification.toast('Wait, how much money does your goal need?!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    } else {
      goalMoney = parseFloat(goalMoney).toFixed(2);
    }

    if (goalGradient == null || goalGradient == '') {
      ons.notification.toast('Wait, you have to select a color for the goal!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    let goalTest = Math.sign(goalMoney);
    if (goalTest == '-1' || goalTest == '-0' || goalTest == '0') {
      ons.notification.toast('Wait, it is not possible to add a negative goal, it would be impossible to achieve.', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }
  } else {
    /* SI EL IDIOMA SELECCIONADO ESTA EN ESPANOL */
    if (goalDescription === '') {
      if (languaje == 'false') {
        goalDescription = "There is no description for this amazing goal. You can add one in the 'EDIT GOAL' button";
      } else {
        goalDescription = "No existe una descripción para esta asombrosa meta. Puedes añadir una en el botón 'EDITAR META'";
      }
    }

    if (goalDate === '') {
      goalDate = 'Sin datos de fecha';
    }

    if (goalName === '') {
      ons.notification.toast('Un momento, una meta necesita un buen nombre!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    if (goalMoney === '') {
      ons.notification.toast('Un momento, cuanto dinero necesita tu meta?!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    } else {
      goalMoney = parseFloat(goalMoney).toFixed(2);
    }

    if (goalGradient == null || goalGradient == '') {
      ons.notification.toast('Un momento, debes seleccionar un color!', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }

    if (iconName == '' || iconName == null) {
      iconName = 'construction.svg';
    }
  
    if (iconUrl == '' || iconUrl == null) {
      iconUrl = '/www/assets/icons/icons_list/fix/';
    }

    let goalTest = Math.sign(goalMoney);
    if (goalTest == '-1' || goalTest == '-0' || goalTest == '0') {
      ons.notification.toast('Un momento, no es posible añadir una meta en negativo, seria imposible de lograr.', {
        title: 'Error!',
        timeout: 2000,
        animation: 'ascend',
      });
      return;
    }
  } /* TERMINA IDIOMA */

  let goal = {
    goalName,
    goalDescription,
    goalMoney,
    goalActualMoney,
    goalDate,
    goalGradient,
    iconName,
    iconUrl,
  };

  if (localStorage.getItem('goalStorage') === null) {
    let goalsArray = [];
    goalsArray.push(goal);
    localStorage.setItem('goalStorage', JSON.stringify(goalsArray));
  } else {
    let goalsArray = JSON.parse(localStorage.getItem('goalStorage'));
    goalsArray.push(goal);
    localStorage.setItem('goalStorage', JSON.stringify(goalsArray));
  }

  if (languaje == 'false') {
    ons.notification.toast(`New goal ${goalName} added!`, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast(`Nueva meta ${goalName} añadida!`, {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }

  sessionStorage.removeItem('tempGradient');
  try {
    getGoals();
    functionPopPage();
  } catch (error) {
    functionPopPage();
  }
}

/*
  - Consigo el local Storage y con un FOR lo voy cargando
*/
function getPercent(goalMoney, actualMoney) {
  return Math.round((actualMoney * 100) / goalMoney);
}

function getGoals() {
  let goals = JSON.parse(localStorage.getItem('goalStorage'));
  let goalsView = document.getElementById('goalsContainer');
  let languaje = localStorage.getItem('storageSwitchLanguage');

  goalsView.innerHTML = '';
  let goalsTutorial = '';

  if (languaje == 'false') {
    goalsTutorial = `<ons-card>
      <ons-list style="background: none;" id="expenseListOfExpensesContainer">
        <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
          <label class="iconExpenseLabel" style="margin-left: 50px;">
            Read tutorial
          </label>
          <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr;">
            <p class="paraTutorial">
              Here you can add the goals you want to achieve. You will need to add a name to the goal, 
              the amount of money you need to achieve it, and, if necessary, the date you would like to achieve this goal.
            </p>
            <p class="paraTutorial">
              Later, you can add the money you collect and, in addition, 
              you will see a percentage indicating how far or close you are to the goal.
            </p>
            <p class="paraTutorial">
              You can edit this information as many times as you want, and even delete the goal if you no longer want to see it.
            </p>
            <p class="paraTutorial">
              To create a new goal press the "+" button.
            </p>
          </div>
        </ons-list-item>
      </ons-list>
    </ons-card>
  `;
  } else {
    goalsTutorial = `<ons-card>
      <ons-list style="background: none;" id="expenseListOfExpensesContainer">
        <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
          <label class="iconExpenseLabel" style="margin-left: 50px;">
            LEER TUTORIAL
          </label>
          
          <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr;">
            <p class="paraTutorial">
              Aquí podrás añadir las metas que deseas cumplir. Deberás añadir un nombre a la meta, 
              la cantidad de dinero que necesitas para cumplirla y, de ser necesario, la fecha en la que te gustaría cumplir esta meta.
            </p>
            <p class="paraTutorial">
              Posteriormente, podrás añadir el dinero que vayas recaudando y, además, 
              verás un porcentaje en el que se indique que tan lejos o cerca te encuentras de la meta.
            </p>
            <p class="paraTutorial">
              Podrás editar esta información cuantas veces quieras, e incluso eliminar la meta si ya no la deseas ver.
            </p>
            <p class="paraTutorial">
              Para crear una nueva meta pulsa el botón "+".
            </p>
          </div>
        </ons-list-item>
      </ons-list>
    </ons-card>`;
  }

  if (goals == null || goals == 'null') {
    let tutorial = localStorage.getItem('storageSwitchTutorial');
    if (tutorial == true || tutorial == 'true') {
      goalsView.innerHTML += `${goalsTutorial}`;
    }
    return;
  } else if (goals.length == 0) {
    let tutorial = localStorage.getItem('storageSwitchTutorial');
    if (tutorial == true || tutorial == 'true') {
      goalsView.innerHTML += `${goalsTutorial}`;
    }
    return;
  }

  for (let i = 0; i < goals.length; i++) {
    let gName = goals[i].goalName;
    let gMoney = goals[i].goalMoney;
    let gAMoney = goals[i].goalActualMoney;
    let gDate = goals[i].goalDate;
    let gGradient = goals[i].goalGradient;

    let eicon = goals[i].iconName;
    let eiconUrl = goals[i].iconUrl;

    let gMoneyTS = formatMoney(gMoney);
    let gAMoneyTS = formatMoney(gAMoney);

    let gPercent = getPercent(gMoney, gAMoney);

    let today = new Date().toJSON().slice(0, 10);
    let days = dateDiff(today, gDate);

    if (languaje == 'false') {
      if (gDate === '') {
        gDate = 'No date data';
      } else {
        if (Math.sign(days) == 1 || Math.sign(days) == '1') {
          gDate = days + ' days remaining';
        } else if (Math.sign(days) == '-1' || Math.sign(days) == -1) {
          gDate = 'Expired ' + Math.abs(days) + ' days ago';
        } else if (Math.sign(days) == '0' || Math.sign(days) == 0) {
          gDate = 'Today is the last day';
        }
      }
    } else {
      if (gDate === '') {
        gDate = 'Sin datos de fecha';
      } else {
        if (Math.sign(days) == 1 || Math.sign(days) == '1') {
          gDate = days + ' días restantes';
        } else if (Math.sign(days) == '-1' || Math.sign(days) == -1) {
          gDate = 'Venció hace ' + Math.abs(days) + ' días';
        } else if (Math.sign(days) == '0' || Math.sign(days) == 0) {
          gDate = 'Hoy es el último día';
        }
      }
    }

    goalsView.innerHTML += `<div onclick="findGoal('${gName}')" class="goalCard" style="background: var(${gGradient})">
        <div class="content">
            <span style="font-weight: 900; font-size: 24px">$ ${gAMoneyTS} <span style="font-weight: 500; font-size: 16px">/ $ ${gMoneyTS}</span></span>
            <div class="progressBarContainer"> 
            <div class="progressBarPercent" style="--width: ${gPercent}" id="${gName}-pbar"></div> 
          </div> 
          <div class="goalInfo">
            <div>
              <img src="${eiconUrl}${eicon}" alt="saving icon" style="width: 100%">
            </div>
            <div class="title goalTitle" id="titleGoal">
              ${gName}
              <label id="goalInfo" class="goalDate">${gDate}</label>
            </div>
          </div>
        </div>
      </div>`;
  }
}

function findGoal(sendGoalName) {
  let goals = JSON.parse(localStorage.getItem('goalStorage'));

  for (let i = 0; i < goals.length; i++) {
    let gName = goals[i].goalName;

    if (gName == sendGoalName) {
      let gDescription = goals[i].goalDescription;
      let gAMoney = goals[i].goalActualMoney;
      let gMoney = goals[i].goalMoney;
      let gDate = goals[i].goalDate;
      let gGradient = goals[i].goalGradient;
      let eicon = goals[i].iconName;
      let eiconUrl = goals[i].iconUrl;

      let findGoalObject = {
        name: gName,
        description: gDescription,
        actualMoney: gAMoney,
        goalMoney: gMoney,
        date: gDate,
        gradient: gGradient,
        iconName: eicon,
        iconUrl: eiconUrl,
      };

      if (sessionStorage.getItem('sessionFindGoal') === null) {
        sessionStorage.setItem('sessionFindGoal', JSON.stringify(findGoalObject));
      } else {
        sessionStorage.removeItem('sessionFindGoal');
        sessionStorage.setItem('sessionFindGoal', JSON.stringify(findGoalObject));
      }

      const navigator = document.querySelector('#navigator');
      navigator.pushPage('detailGoal.html');
      break;
    }
  }
}

function deleteGoal(sendGoalName) {
  let languaje = localStorage.getItem('storageSwitchLanguage');
  if (languaje == 'false') {
    ons.notification.confirm({
      message: 'Are you sure you delete the goal?',
      title: 'Notice!',
      buttonLabels: ['Yes, delete', 'Cancel'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let goals = JSON.parse(localStorage.getItem('goalStorage'));

          for (let i = 0; i < goals.length; i++) {
            if (goals[i].goalName == sendGoalName) {
              goals.splice(i, 1);
              break;
            }
          }
          localStorage.setItem('goalStorage', JSON.stringify(goals));

          getGoals();
          functionPopPage();

          ons.notification.toast(`The goal ${sendGoalName} has been removed!`, {
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
      message: 'Estas seguro de borrar la meta?',
      title: 'Aviso!',
      buttonLabels: ['Sí, borrar', 'Cancelar'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          let goals = JSON.parse(localStorage.getItem('goalStorage'));

          for (let i = 0; i < goals.length; i++) {
            if (goals[i].goalName == sendGoalName) {
              goals.splice(i, 1);
              break;
            }
          }
          localStorage.setItem('goalStorage', JSON.stringify(goals));

          getGoals();
          functionPopPage();

          ons.notification.toast(`La meta ${sendGoalName} ha sido eliminada!`, {
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

function deleteGoalInsta(sendGoalName) {
  let goals = JSON.parse(localStorage.getItem('goalStorage'));

  for (let i = 0; i < goals.length; i++) {
    if (goals[i].goalName == sendGoalName) {
      goals.splice(i, 1);
      break;
    }
  }
  localStorage.setItem('goalStorage', JSON.stringify(goals));
}

function addMoneyGoal(sendGoalName) {
  let goals = JSON.parse(localStorage.getItem('goalStorage'));

  for (let i = 0; i < goals.length; i++) {
    let gName = goals[i].goalName;

    if (gName == sendGoalName) {
      let gDescription = goals[i].goalDescription;
      let gAMoney = goals[i].goalActualMoney;
      let gMoney = goals[i].goalMoney;
      let gDate = goals[i].goalDate;
      let gGradient = goals[i].goalGradient;

      let eicon = goals[i].iconName;
      let eiconUrl = goals[i].iconUrl;

      let findGoalObject = {
        name: gName,
        description: gDescription,
        actualMoney: gAMoney,
        goalMoney: gMoney,
        date: gDate,
        gradient: gGradient,
        iconName: eicon,
        iconUrl: eiconUrl,
      };

      if (sessionStorage.getItem('sessionFindGoal') === null) {
        sessionStorage.setItem('sessionFindGoal', JSON.stringify(findGoalObject));
      } else {
        sessionStorage.removeItem('sessionFindGoal');
        sessionStorage.setItem('sessionFindGoal', JSON.stringify(findGoalObject));
      }
      createAlertDialogToEditGoalMoney();
      break;
    }
  }
}

function loadDetailGoal() {
  document.getElementById('titleDetailGoal').innerHTML = '';

  let retrievedGoal = sessionStorage.getItem('sessionFindGoal');
  let parseGoal = JSON.parse(retrievedGoal);
  let languaje = localStorage.getItem('storageSwitchLanguage');

  let gName = parseGoal.name;
  let gDescription = parseGoal.description;
  let gAMoney = parseGoal.actualMoney;
  let gMoney = parseGoal.goalMoney;
  let nModifyDate = parseGoal.date;
  let gDate = parseGoal.date;
  let gGradient = parseGoal.gradient;

  let gAMoneyTS = formatMoney(gAMoney);
  let gMoneyTS = formatMoney(gMoney);

  let gPercent = getPercent(gMoney, gAMoney);

  let today = new Date().toJSON().slice(0, 10);
  let days = dateDiff(today, gDate);

  if (languaje == 'false') {
    if (Math.sign(days) == 1 || Math.sign(days) == '1') {
      gDate = days + ' days remaining';
    } else if (Math.sign(days) == '-1' || Math.sign(days) == -1) {
      gDate = 'Expired ' + Math.abs(days) + ' days ago';
    } else if (Math.sign(days) == '0' || Math.sign(days) == 0) {
      gDate = 'Today is the last day';
    }

    if (gDescription === '') {
      gDescription = "There is no description for this amazing goal. You can add one in the 'EDIT META' button";
    }

    document.getElementById('titleDetailGoal').innerHTML = gName;

    let goalsView = document.getElementById('goalDetailContainer');
    goalsView.innerHTML = '';

    goalsView.innerHTML += `
      <ons-card style="padding: 16px 0px 0px 0px; background: var(${gGradient})" class="goalCard">
        
        <!--ProgressBar-->
        <!--ActualMoney-->
        <span style="margin-left: 20px; font-size: 30px; font-weight: 700; color: var(--detail-goal-content-color)">$ 
          <span style="color: var(--detail-money-goal)" id="detailMoneyActualMoney">${gAMoneyTS}</span>
        </span>
        <!--GoalMoney-->
        <span style="position: absolute; right: 20px; margin-right: 20px;font-size: 16px; font-weight: 600; margin-top: 16px; color: var(--detail-goal-content-color)">$ 
          <span style="color: var(--detail-money-goal)" id="detailMoneyGoalGoalMoney">${gMoneyTS}</span>
        </span>
        <!--ProgressBar-->
        <div class="progressBarContainer percentBar" style="margin-top:0px"> 
          <div class="progressBarPercent" style="--width:${gPercent}" data-label="${gPercent}" id="pbarDetail">
            <span style="white-space: nowrap; display: table; margin: 0 auto; color: var(--progressbar-back-color); font-weight: 500; position: relative; top: 5px; font-size:20px" id="${gName}-pnumber">${gPercent} %</span>
          </div> 
        </div>

        <!--Description-->
        <div class="content detailInfo" style="margin-top:64px">
            ${gDescription}
        </div>

        <!--GoalDate-->
        <div class="content">
          <div style="height: 80px;">

            <div class="iconSavedMoney" style="display: flex; justify-content: space-around;  margin-left:0px; background: var(--flat-button-color)" >
              <img src="/www/assets/icons/calendarIcon.svg" alt="saving icon" style="width: 24px">
            </div>
            <label class="moneyDetailGoal" style="display: block; position: relative; top: -75px; left: 76px; font-size: 14px;">
              ${nModifyDate}
            </label>
            <label class="moneyDetailGoal" style="display: block; position: relative;top: -70px; left: 76px; font-weight: 500">
              ${gDate}
            </label>
          </div>
          <ons-button class="flatButton" style="margin-left: 0px; margin-right: 0px" onclick="addMoneyGoal('${gName}')">
            Modify money
          </ons-button>
        </div>
      </ons-card>
      
      <ons-button class="flatButtonLight" style="margin-top: 16px; margin-bottom: 16px" onclick="deleteGoal('${gName}')">
        Delete goal
      </ons-button>
      
      <ons-fab position="bottom right" onclick="editGoal('${gName}')" style="display: flex; justify-content: space-around">
        <img src="/www/assets/icons/editButton.svg" alt="saving icon" style="width: 32px; margin-top: 30%;">
      </ons-fab>`;
  } else {
    if (Math.sign(days) == 1 || Math.sign(days) == '1') {
      gDate = days + ' días restantes';
    } else if (Math.sign(days) == '-1' || Math.sign(days) == -1) {
      gDate = 'Venció hace ' + Math.abs(days) + ' días';
    } else if (Math.sign(days) == '0' || Math.sign(days) == 0) {
      gDate = 'Hoy es el último día';
    }

    if (gDescription === '') {
      gDescription = "No existe una descripción para esta asombrosa meta. Puedes añadir una en el botón 'EDITAR META'";
    }

    document.getElementById('titleDetailGoal').innerHTML = gName;

    let goalsView = document.getElementById('goalDetailContainer');
    goalsView.innerHTML = '';

    goalsView.innerHTML += `
      <ons-card style="padding: 16px 0px 0px 0px; background: var(${gGradient})" class="goalCard">
        
        <!--ProgressBar-->
        <!--ActualMoney-->
        <span style="margin-left: 20px; font-size: 30px; font-weight: 700; color: var(--detail-goal-content-color)">$ 
          <span style="color: var(--detail-money-goal)" id="detailMoneyActualMoney">${gAMoneyTS}</span>
        </span>
        <!--GoalMoney-->
        <span style="position: absolute; right: 20px; margin-right: 20px;font-size: 16px; font-weight: 600; margin-top: 16px; color: var(--detail-goal-content-color)">$ 
          <span style="color: var(--detail-money-goal)" id="detailMoneyGoalGoalMoney">${gMoneyTS}</span>
        </span>
        <!--ProgressBar-->
        <div class="progressBarContainer percentBar" style="margin-top:0px"> 
          <div class="progressBarPercent" style="--width:${gPercent}" data-label="${gPercent}" id="pbarDetail">
            <span style="white-space: nowrap; display: table; margin: 0 auto; color: var(--progressbar-back-color); font-weight: 500; position: relative; top: 5px; font-size:20px" id="${gName}-pnumber">${gPercent} %</span>
          </div> 
        </div>

        <!--Description-->
        <div class="content detailInfo" style="margin-top:64px">
            ${gDescription}
        </div>

        <!--GoalDate-->
        <div class="content">
          <div style="height: 80px;">

            <div class="iconSavedMoney" style="display: flex; justify-content: space-around;  margin-left:0px; background: var(--flat-button-color)" >
              <img src="/www/assets/icons/calendarIcon.svg" alt="saving icon" style="width: 24px">
            </div>
            <label class="moneyDetailGoal" style="display: block; position: relative; top: -75px; left: 76px; font-size: 14px;">
              ${nModifyDate}
            </label>
            <label class="moneyDetailGoal" style="display: block; position: relative;top: -70px; left: 76px; font-weight: 500">
              ${gDate}
            </label>
          </div>
          <ons-button class="flatButton" style="margin-left: 0px; margin-right: 0px" onclick="addMoneyGoal('${gName}')">
            Modificar dinero
          </ons-button>
        </div>
      </ons-card>
      
      <ons-button class="flatButtonLight" style="margin-top: 16px; margin-bottom: 16px" onclick="deleteGoal('${gName}')">
        Eliminar meta
      </ons-button>
      
      <ons-fab position="bottom right" onclick="editGoal('${gName}')" style="display: flex; justify-content: space-around">
        <img src="/www/assets/icons/editButton.svg" alt="saving icon" style="width: 32px; margin-top: 30%;">
      </ons-fab>`;
  }
}
