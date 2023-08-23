const startApp = () => {
  // Busco el tema del usuario o defino uno, entre el claro y el oscuro
  let themeSelected = localStorage.getItem('userTheme');

  if (themeSelected != 'theme-default' && themeSelected != 'theme-dark') {
    localStorage.setItem('userTheme', 'theme-default');
    themeSelected = 'theme-default';
    document.documentElement.className = 'theme-default';
  }

  if (themeSelected == null || themeSelected == '') {
    localStorage.setItem('userTheme', 'theme-default');
    document.documentElement.className = 'theme-default';
  } else {
    document.documentElement.className = themeSelected;
  }

  /**
   * CHECA LA VERSIÓN DE LA APP
   * Si la versión es anterior a esta es necesario hacer comprobaciones para evitar
   * que los datos se dañen por las nuevas configuraciones
   */
  let currentVersion = 3; // Versión actual de la app
  let appVersion = localStorage.getItem('appVersion');

  if (appVersion == null || appVersion == '') {
    // Si entra la aplicación es posterior a la nueva actualización
    localStorage.setItem('appVersion', '3');

    checkUpdates();
  } else if (currentVersion > appVersion) {
    localStorage.setItem('appVersion', '3');

    checkUpdates();
  } else {
    // Sino entra, la aplicación es posterior a la actualización
    localStorage.setItem('appVersion', `${currentVersion}`); // Actualizo la versión del storage
  }

  setTimeout(function () {
    const navigator = document.querySelector('#navigator');
    navigator.resetToPage('pages/userPage/splitterUser.html');
  }, 500);
};
startApp();
