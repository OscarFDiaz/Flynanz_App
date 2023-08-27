function loadIconsGoal() {
  let iconsView = document.getElementById('expenseIconListOfIconsGoal');
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
      iconsView.innerHTML += `<img src="${art}${artNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${artNames[i]}', '${art}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${art}${artNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoal('${artNames[i]}', '${art}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Books</p>`;
  for (let i = 0; i < bookNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${book}${bookNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${bookNames[i]}', '${book}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${book}${bookNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoal('${bookNames[i]}', '${book}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Builds</p>`;
  for (let i = 0; i < buildsNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${builds}${buildsNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${buildsNames[i]}', '${builds}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${builds}${buildsNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoal('${buildsNames[i]}', '${builds}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Camera</p>`;
  for (let i = 0; i < cameraNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${camera}${cameraNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${cameraNames[i]}', '${camera}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${camera}${cameraNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoal('${cameraNames[i]}', '${camera}')"></img>`;
    }
  }

  iconsView.innerHTML += `<p style="grid-column: 1; margin-left: 20px;">Fix</p>`;
  for (let i = 0; i < fixNames.length; i++) {
    if (i == 0) {
      iconsView.innerHTML += `<img src="${fix}${fixNames[i]}" style="width: 55%; margin: auto auto; grid-column: 1;" onclick="selectIconGoal('${fixNames[i]}', '${fix}')"></img>`;
    } else {
      iconsView.innerHTML += `<img src="${fix}${fixNames[i]}" style="width: 55%; margin: auto auto;" onclick="selectIconGoal('${fixNames[i]}', '${fix}')"></img>`;
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
