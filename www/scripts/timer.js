function startTime() {
  let themeSelected = localStorage.getItem('userTheme');

  if (themeSelected != 'theme-default' || themeSelected != 'theme-dark') {
    localStorage.setItem('userTheme', 'theme-default');
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
  let currentVersion = 1; // Versión actual de la app
  let appVersion = localStorage.getItem('appVersion');

  if (appVersion == null || appVersion == '') {
    // Si entra la aplicación es posterior a la nueva actualización
    localStorage.setItem('appVersion', '1');

    // TODO
    /**
     * Comprobar los datos nuevos para evitar errores
     *   - Añadir los nuevos datos en su defecto, de data.txt
     */

    // A todas las carteras les añado un degradado de fondo.
  } else {
    // Sino entra, la aplicación es posterior a la actualización
    localStorage.setItem('appVersion', `${currentVersion}`); // Actualizo la versión del storage
  }

  setTimeout(function () {
    const navigator = document.querySelector('#navigator');
    navigator.resetToPage('splitterUser.html');
  }, 1000);
}
