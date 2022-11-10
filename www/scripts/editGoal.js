function loadIconsGoalEdit() {
  let iconsView = document.getElementById('expenseIconListOfIconsGoalEdit');
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
      iconsView.innerHTML += `<img src="${art}${artNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIconGoalEdit('${artNames[i]}', '${art}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${art}${artNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIconGoalEdit('${artNames[i]}', '${art}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Books</p>`;
  for (let i = 0; i < bookNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${book}${bookNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIconGoalEdit('${bookNames[i]}', '${book}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${book}${bookNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIconGoalEdit('${bookNames[i]}', '${book}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Builds</p>`;
  for (let i = 0; i < buildsNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${builds}${buildsNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIconGoalEdit('${buildsNames[i]}', '${builds}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${builds}${buildsNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIconGoalEdit('${buildsNames[i]}', '${builds}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Camera</p>`;
  for (let i = 0; i < cameraNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${camera}${cameraNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIconGoalEdit('${cameraNames[i]}', '${camera}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${camera}${cameraNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIconGoalEdit('${cameraNames[i]}', '${camera}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Fix</p>`;
  for (let i = 0; i < fixNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${fix}${fixNames[i]}" style="width: 50%; margin: auto auto; grid-column: 1;" onclick="selectIconGoalEdit('${fixNames[i]}', '${fix}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${fix}${fixNames[i]}" style="width: 50%; margin: auto auto;" onclick="selectIconGoalEdit('${fixNames[i]}', '${fix}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Food</p>`;
  for (let i = 0; i < foodNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${food}${foodNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoalEdit('${foodNames[i]}', '${food}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${food}${foodNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoalEdit('${foodNames[i]}', '${food}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Fun</p>`;
  for (let i = 0; i < funNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${fun}${funNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoalEdit('${funNames[i]}', '${fun}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${fun}${funNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoalEdit('${funNames[i]}', '${fun}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Money</p>`;
  for (let i = 0; i < moneyNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${money}${moneyNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoalEdit('${moneyNames[i]}', '${money}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${money}${moneyNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoalEdit('${moneyNames[i]}', '${money}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Music</p>`;
  for (let i = 0; i < musicNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${music}${musicNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoalEdit('${musicNames[i]}', '${music}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${music}${musicNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoalEdit('${musicNames[i]}', '${music}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">PC</p>`;
  for (let i = 0; i < pcNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${pc}${pcNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoalEdit('${pcNames[i]}', '${pc}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${pc}${pcNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoalEdit('${pcNames[i]}', '${pc}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Sport</p>`;
  for (let i = 0; i < sportNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${sport}${sportNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoalEdit('${sportNames[i]}', '${sport}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${sport}${sportNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoalEdit('${sportNames[i]}', '${sport}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Time</p>`;
  for (let i = 0; i < timeNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${time}${timeNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoalEdit('${timeNames[i]}', '${time}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${time}${timeNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoalEdit('${timeNames[i]}', '${time}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Transport</p>`;
  for (let i = 0; i < transportNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${transport}${transportNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoalEdit('${transportNames[i]}', '${transport}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${transport}${transportNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoalEdit('${transportNames[i]}', '${transport}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Travel</p>`;
  for (let i = 0; i < travelNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${travel}${travelNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoalEdit('${travelNames[i]}', '${travel}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${travel}${travelNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoalEdit('${travelNames[i]}', '${travel}')"></img>`;
    }
  }
}

function selectIconGoalEdit(iconName, url) {
  sessionStorage.setItem('expenseIconName', iconName);
  sessionStorage.setItem('expenseIconUrl', url);
  // Oculto los iconos, ya tengo uno seleccionado
  document.getElementById('expandableListContainerGoalEdit').hideExpansion();
}

function editGoal(sendGoalName) {
  let goals = JSON.parse(localStorage.getItem('goalStorage'));

  for (let i = 0; i < goals.length; i++) {
    let gName = goals[i].goalName;

    if (gName == sendGoalName) {
      let gDescription = goals[i].goalDescription;
      let gAMoney = goals[i].goalActualMoney;
      let gMoney = goals[i].goalMoney;
      let gDate = goals[i].goalDate;

      let gGradient = goals[i].goalGradient;
      let iconName = goals[i].iconName;
      let url = goals[i].iconUrl;

      sessionStorage.setItem('tempGradient', gGradient);
      sessionStorage.setItem('expenseIconName', iconName);
      sessionStorage.setItem('expenseIconUrl', url);

      let findGoalObject = {
        name: gName,
        description: gDescription,
        actualMoney: gAMoney,
        goalMoney: gMoney,
        date: gDate,
        gradient: gGradient,
        iconName: iconName,
        iconUrl: url
      };

      if (sessionStorage.getItem('sessionFindGoal') === null) {
        sessionStorage.setItem('sessionFindGoal', JSON.stringify(findGoalObject));
      } else {
        sessionStorage.removeItem('sessionFindGoal');
        sessionStorage.setItem('sessionFindGoal', JSON.stringify(findGoalObject));
      }

      const navigator = document.querySelector('#navigator');
      navigator.pushPage('editGoal.html');
      //createAlertDialogToEditGoal();
      break;
    }
  }
}

/*********************************************************/
// ALERT DIALOG PARA EDITAR UNA META COMPLETAMENTE
function createAlertDialogToEditGoal() {
  let retrievedGoal = sessionStorage.getItem('sessionFindGoal');
  let parseGoal = JSON.parse(retrievedGoal);

  //Guardo el nombre por si el usuario lo edita
  localStorage.setItem('nameSaved', parseGoal.name);

  document.getElementById('editGoalName').value = parseGoal.name;
  document.getElementById('editGoalDescription').value = parseGoal.description;
  document.getElementById('editGoalMoney').value = parseGoal.goalMoney;
  document.getElementById('editActualGoalMoney').value = parseGoal.actualMoney;
  document.getElementById('editGoalDate').value = parseGoal.date;
}
