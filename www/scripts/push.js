function pushToDetailSaving() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('pages/savingPage/detailSaving.html');
}

function pushToNewGoal() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('pages/goalPage/newGoal.html');
}

function pushToNewMoney() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('pages/moneyPage/newMoney.html');
}

function pushToNewExpense() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('pages/expensePage/newExpense.html');
}

function pushToHomeOptions() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('pages/optionsPage/homeOptions.html');
}

function pushToLanguageOptions() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('pages/optionsPage/languageOptions.html');
}

function pushToTutorialOptions() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('pages/optionsPage/tutorialOptions.html');
}

function pushToDeleteOptions() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('pages/optionsPage/deleteOptions.html');
}

function pushToAbout() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('pages/aboutPage/about.html');
}

function functionPopPage(timesS) {
  let time = timesS; // veces que se hace pop
  if (time == null || time == 'null' || time == '') {
    time = 1;
  }
  const navigator = document.querySelector('#navigator');
  navigator.popPage({ times: time });
}
