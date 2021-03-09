function pushToDetailSaving() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('detailSaving.html');
}

function pushToNewGoal() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('newGoal.html');
}

function pushToNewMoney() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('newMoney.html');
}

function pushToNewExpense() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('newExpense.html');
}

function pushToThemeSelector() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('themeSelector.html');
}

function pushToHomeOptions() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('homeOptions.html');
}

function pushToLanguageOptions() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('languageOptions.html');
}

function pushToTutorialOptions() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('tutorialOptions.html');
}

function pushToDeleteOptions() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('deleteOptions.html');
}

function pushToEditTheme() {
  setTheme('theme-custom');
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('customTheme.html');
}

function pushToAbout() {
  const navigator = document.querySelector('#navigator');
  navigator.pushPage('about.html');
}

function functionPopPage(timesS) {
  let time = timesS;
  if (time == null || time == 'null' || time == '') {
    time = 1;
  }
  const navigator = document.querySelector('#navigator');
  navigator.popPage({ times: time });
}
