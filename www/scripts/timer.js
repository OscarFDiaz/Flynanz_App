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

    updateGolsOnUpdate();

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

function updateGolsOnUpdate() {
  let goals = JSON.parse(localStorage.getItem('goalStorage'));

  if (goals == null || goals == 'null' || goals.length == 0 || goals.length < 1) {
    return;
  }

  for (let i = 0; i < goals.length; i++) {
    let gGradient = goals[i].goalGradient;

    if (gGradient == null || gGradient == '') {
      goals[i].goalGradient = '--gradient_0';
      localStorage.setItem('goalStorage', JSON.stringify(goals));
    }
  }
}
