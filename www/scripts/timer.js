function startTime() {
  let themeSelected = localStorage.getItem('userTheme');

  if (themeSelected == null || themeSelected == '') {
    localStorage.setItem('userTheme', 'theme-default');
    document.documentElement.className = 'theme-default';
  } else {
    document.documentElement.className = themeSelected;
    if (themeSelected == 'theme-custom') {
      initColors();
    }
  }

  setTimeout(function () {
    const navigator = document.querySelector('#navigator');
    navigator.resetToPage('splitterUser.html');
  }, 1000);
}
