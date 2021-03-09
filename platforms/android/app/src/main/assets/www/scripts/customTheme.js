function setTutorial() {
  let container = document.getElementById('customThemeTutorialContainer');
  container.innerHTML = '';

  let tutorial = localStorage.getItem('storageSwitchTutorial');
  if (tutorial == true || tutorial == 'true') {
    let languaje = localStorage.getItem('storageSwitchLanguage');
    if (languaje == 'false') {
      container.innerHTML += `
        <ons-card>
          <ons-list style="background: none;" id="expenseListOfExpensesContainer">
            <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
              <label class="iconExpenseLabel" style="margin-left: 50px;">
                READ TUTORIAL
              </label>
              <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr;">
                <p class="paraTutorial">
                  Here you can customize the colors of the application, as you change them they will be applied, 
                  you can customize the theme as many times as you want. You can exit to see the changes and return to continue editing.
                </p>
                <p class="paraTutorial">
                  Since the application has many elements there will be many customization options.
                </p>
                <p class="paraTutorial">
                  The colors are separated by elements, the essential elements will be first and then they will be separated by screens, 
                  home screen, goals, etc.
                </p>
              </div>
            </ons-list-item>
          </ons-list>
        </ons-card>`;
    } else {
      container.innerHTML += `
        <ons-card>
          <ons-list style="background: none;" id="expenseListOfExpensesContainer">
            <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
              <label class="iconExpenseLabel" style="margin-left: 50px;">
                LEER TUTORIAL
              </label>
              <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr;">
                <p class="paraTutorial">
                  Aquí podrás personalizar los colores de la aplicación, conforme los vayas cambiando se irán aplicando, puedes personalizar el tema cuantas
                  veces quieras. Puedes salir para ver los cambios y volver para seguir editando.
                </p>
                <p class="paraTutorial">
                  Dado que la aplicación tiene muchos elementos habrá muchas opciones de personalización.
                </p>
                <p class="paraTutorial">
                  Los colores están separados por elementos, primero estarán los elementos esenciales y después estarán separados por pantallas, pantalla inicio, metas, etc.
                </p>
              </div>
            </ons-list-item>
          </ons-list>
        </ons-card>`;
    }
  }
}

/* CARGA LOS COLORES CUANDO SE INTENTA PERSONALIZAR EL TEMA*/
function setColors() {
  let pname = '--gradient-1';
  let color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#0d2840');
    color = '#0d2840';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--gradient-2';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#113a5e');
    color = '#113a5e';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--gradient-2';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#113a5e');
    color = '#113a5e';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--spiner-back-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--spiner-front-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--icon-home';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--icon-goals';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#dc2929');
    color = '#dc2929';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--icon-savings';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#235dff');
    color = '#235dff';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--icon-expenses';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#1aff4c');
    color = '#1aff4c';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--icon-money';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#c0ff00');
    color = '#c0ff00';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--icon-config';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#acff0a');
    color = '#acff0a';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--menu-font-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--label-toolbar-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--back-button-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--menu-button-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--chevron-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--item-list-config';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--text-without-card';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--expense-title';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--expense-info';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--expense-detail';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--expense-detail-money';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--detail-goal-title-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--detail-goal-content-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--detail-money-goal';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#0596a6');
    color = '#0596a6';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--home-total-money';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--home-goal-label';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--para-home-options';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--home-options-labels';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--money-title';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--money-info';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--money-delete-button';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#DC143C');
    color = '#DC143C';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--saving-main-title';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--saving-info';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--saving-title';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--saving-daily';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--saving-days-title';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--saving-days-left';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--saving-edit-label-range';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--saving-edit-range-selected';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--saving-edit-selected-range';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--entry-amount-text';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--entry-amount-detail';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--switch-button-round';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--switch-back-off';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--switch-back-on';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#0596a6');
    color = '#0596a6';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--color-input';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--color-input-text';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--text-area-border-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--text-area-text-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--alert-tile-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--alert-container-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#0d2840');
    color = '#0d2840';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--alert-footer-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#0e5259');
    color = '#0e5259';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--alert-content-text-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--alert-button-color-text';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--alert-custom-label';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--alert-custom-label-money';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--toast-back-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--toast-message-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--progressbar-back-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#0d2840');
    color = '#0d2840';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--progressbar-main-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--card-back-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#134068');
    color = '#134068';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--card-text-title-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--card-content-text-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#0596a6');
    color = '#0596a6';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--flat-button-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--flat-button-color-text';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--flat-button-active-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#cc7e00');
    color = '#cc7e00';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--flat-button-light-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#0596a6');
    color = '#0596a6';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--flat-button-light-color-text';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }

  pname = '--flat-button-light-active-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#05565f');
    color = '#0596a6';
  } else {
    document.getElementById(pname).value = color;
    updateColor(pname, color);
  }
}

/* CARGA LOS COLORES CUANDO SE SELECCIONA EL TEMA PERSONALIZADO*/
function initColors() {
  let pname = '--gradient-1';
  let color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#0d2840');
    color = '#0d2840';
  } else {
    updateColor(pname, color);
  }

  pname = '--gradient-2';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#113a5e');
    color = '#113a5e';
  } else {
    updateColor(pname, color);
  }

  pname = '--spiner-back-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    updateColor(pname, color);
  }

  pname = '--spiner-front-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--icon-home';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    updateColor(pname, color);
  }

  pname = '--icon-goals';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#dc2929');
    color = '#dc2929';
  } else {
    updateColor(pname, color);
  }

  pname = '--icon-savings';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#235dff');
    color = '#235dff';
  } else {
    updateColor(pname, color);
  }

  pname = '--icon-expenses';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#1aff4c');
    color = '#1aff4c';
  } else {
    updateColor(pname, color);
  }

  pname = '--icon-money';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#c0ff00');
    color = '#c0ff00';
  } else {
    updateColor(pname, color);
  }

  pname = '--icon-config';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#acff0a');
    color = '#acff0a';
  } else {
    updateColor(pname, color);
  }

  pname = '--menu-font-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    updateColor(pname, color);
  }

  pname = '--label-toolbar-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    updateColor(pname, color);
  }

  pname = '--back-button-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    updateColor(pname, color);
  }

  pname = '--menu-button-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    updateColor(pname, color);
  }

  pname = '--chevron-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    updateColor(pname, color);
  }

  pname = '--item-list-config';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--text-without-card';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--expense-title';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    updateColor(pname, color);
  }

  pname = '--expense-info';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--expense-detail';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--expense-detail-money';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    updateColor(pname, color);
  }

  pname = '--detail-goal-title-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--detail-goal-content-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--detail-money-goal';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#0596a6');
    color = '#0596a6';
  } else {
    updateColor(pname, color);
  }

  pname = '--home-total-money';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    updateColor(pname, color);
  }

  pname = '--home-goal-label';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--para-home-options';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--home-options-labels';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--money-title';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    updateColor(pname, color);
  }

  pname = '--money-info';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--money-delete-button';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#DC143C');
    color = '#DC143C';
  } else {
    updateColor(pname, color);
  }

  pname = '--saving-main-title';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--saving-info';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    updateColor(pname, color);
  }

  pname = '--saving-title';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--saving-daily';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    updateColor(pname, color);
  }

  pname = '--saving-days-title';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--saving-days-left';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    updateColor(pname, color);
  }

  pname = '--saving-edit-label-range';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--saving-edit-range-selected';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--saving-edit-selected-range';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    updateColor(pname, color);
  }

  pname = '--entry-amount-text';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--entry-amount-detail';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    updateColor(pname, color);
  }

  pname = '--switch-button-round';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    updateColor(pname, color);
  }

  pname = '--switch-back-off';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    updateColor(pname, color);
  }

  pname = '--switch-back-on';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#0596a6');
    color = '#0596a6';
  } else {
    updateColor(pname, color);
  }

  pname = '--color-input';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    updateColor(pname, color);
  }

  pname = '--color-input-text';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--text-area-border-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    updateColor(pname, color);
  }

  pname = '--text-area-text-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--alert-tile-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    updateColor(pname, color);
  }

  pname = '--alert-container-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#0d2840');
    color = '#0d2840';
  } else {
    updateColor(pname, color);
  }

  pname = '--alert-footer-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#0e5259');
    color = '#0e5259';
  } else {
    updateColor(pname, color);
  }

  pname = '--alert-content-text-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    updateColor(pname, color);
  }

  pname = '--alert-button-color-text';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    updateColor(pname, color);
  }

  pname = '--alert-custom-label';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--alert-custom-label-money';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    updateColor(pname, color);
  }

  pname = '--toast-back-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    updateColor(pname, color);
  }

  pname = '--toast-message-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    updateColor(pname, color);
  }

  pname = '--progressbar-back-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#0d2840');
    color = '#0d2840';
  } else {
    updateColor(pname, color);
  }

  pname = '--progressbar-main-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    updateColor(pname, color);
  }

  pname = '--card-back-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#134068');
    color = '#134068';
  } else {
    updateColor(pname, color);
  }

  pname = '--card-text-title-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#9cd9ce');
    color = '#9cd9ce';
  } else {
    updateColor(pname, color);
  }

  pname = '--card-content-text-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#0596a6');
    color = '#0596a6';
  } else {
    updateColor(pname, color);
  }

  pname = '--flat-button-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#f5a11b');
    color = '#f5a11b';
  } else {
    updateColor(pname, color);
  }

  pname = '--flat-button-color-text';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    updateColor(pname, color);
  }

  pname = '--flat-button-active-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#cc7e00');
    color = '#cc7e00';
  } else {
    updateColor(pname, color);
  }

  pname = '--flat-button-light-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#0596a6');
    color = '#0596a6';
  } else {
    updateColor(pname, color);
  }

  pname = '--flat-button-light-color-text';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#ffffff');
    color = '#ffffff';
  } else {
    updateColor(pname, color);
  }

  pname = '--flat-button-light-active-color';
  color = localStorage.getItem(pname);
  if (color == null) {
    localStorage.setItem(pname, '#05565f');
    color = '#0596a6';
  } else {
    updateColor(pname, color);
  }
}

/* CARGA EL COLOR EN LA APLICACIÓN*/
function updateColor(name, value) {
  document.documentElement.style.setProperty(name, value);
}

/* MIENTRAS SE EDITA EL COLOR SE ACTUALIZA E IGUALMENTE SE GUARDA*/
function cssVar(name, value) {
  //setColors();
  if (name[0] != '-') {
    name = '--' + name; //allow passing with or without --
  }

  if (value) {
    document.documentElement.style.setProperty(name, value);
  }
  localStorage.setItem(name, value);

  return getComputedStyle(document.documentElement).getPropertyValue(name);
}

/* BORRDA TODAS LAS PROPIEDADES PARA PERMITIR A LOS DEMAS TEMAS*/
function deleteProperty() {
  document.documentElement.style.removeProperty('--gradient-1');
  document.documentElement.style.removeProperty('--gradient-2');
  document.documentElement.style.removeProperty('--spiner-back-color');
  document.documentElement.style.removeProperty('--spiner-front-color');
  document.documentElement.style.removeProperty('--icon-home');
  document.documentElement.style.removeProperty('--icon-goals');
  document.documentElement.style.removeProperty('--icon-savings');
  document.documentElement.style.removeProperty('--icon-expenses');
  document.documentElement.style.removeProperty('--icon-money');
  document.documentElement.style.removeProperty('--icon-config');
  document.documentElement.style.removeProperty('--menu-icon-color');
  document.documentElement.style.removeProperty('--menu-font-color');
  document.documentElement.style.removeProperty('--label-toolbar-color');
  document.documentElement.style.removeProperty('--back-button-color');
  document.documentElement.style.removeProperty('--menu-button-color');
  document.documentElement.style.removeProperty('--chevron-color');
  document.documentElement.style.removeProperty('--item-list-config');
  document.documentElement.style.removeProperty('--text-without-card');
  document.documentElement.style.removeProperty('--expense-title');
  document.documentElement.style.removeProperty('--expense-info');
  document.documentElement.style.removeProperty('--expense-detail');
  document.documentElement.style.removeProperty('--expense-detail-money');
  document.documentElement.style.removeProperty('--detail-goal-title-color');
  document.documentElement.style.removeProperty('--detail-goal-content-color');
  document.documentElement.style.removeProperty('--detail-money-goal');
  document.documentElement.style.removeProperty('--home-total-money');
  document.documentElement.style.removeProperty('--home-goal-label');
  document.documentElement.style.removeProperty('--para-home-options');
  document.documentElement.style.removeProperty('--home-options-labels');
  document.documentElement.style.removeProperty('--money-title');
  document.documentElement.style.removeProperty('--money-info');
  document.documentElement.style.removeProperty('--money-delete-button');
  document.documentElement.style.removeProperty('--saving-main-title');
  document.documentElement.style.removeProperty('--saving-info');
  document.documentElement.style.removeProperty('--saving-title');
  document.documentElement.style.removeProperty('--saving-daily');
  document.documentElement.style.removeProperty('--saving-days-title');
  document.documentElement.style.removeProperty('--saving-days-left');
  document.documentElement.style.removeProperty('--saving-edit-label-range');
  document.documentElement.style.removeProperty('--saving-edit-range-selected');
  document.documentElement.style.removeProperty('--saving-edit-selected-range');
  document.documentElement.style.removeProperty('--entry-amount-text');
  document.documentElement.style.removeProperty('--entry-amount-detail');
  document.documentElement.style.removeProperty('--switch-button-round');
  document.documentElement.style.removeProperty('--switch-back-off');
  document.documentElement.style.removeProperty('--switch-back-on');
  document.documentElement.style.removeProperty('--color-input');
  document.documentElement.style.removeProperty('--color-input-text');
  document.documentElement.style.removeProperty('--text-area-border-color');
  document.documentElement.style.removeProperty('--text-area-text-color');
  document.documentElement.style.removeProperty('--alert-tile-color');
  document.documentElement.style.removeProperty('--alert-container-color');
  document.documentElement.style.removeProperty('--alert-footer-color');
  document.documentElement.style.removeProperty('--alert-content-text-color');
  document.documentElement.style.removeProperty('--alert-button-color-text');
  document.documentElement.style.removeProperty('--alert-custom-label');
  document.documentElement.style.removeProperty('--alert-custom-label-money');
  document.documentElement.style.removeProperty('--toast-back-color');
  document.documentElement.style.removeProperty('--toast-message-color');
  document.documentElement.style.removeProperty('--progressbar-back-color');
  document.documentElement.style.removeProperty('--progressbar-main-color');
  document.documentElement.style.removeProperty('--card-back-color');
  document.documentElement.style.removeProperty('--card-text-title-color');
  document.documentElement.style.removeProperty('--card-content-text-color');
  document.documentElement.style.removeProperty('--flat-button-color');
  document.documentElement.style.removeProperty('--flat-button-color-text');
  document.documentElement.style.removeProperty('--flat-button-active-color');
  document.documentElement.style.removeProperty('--flat-button-light-color');
  document.documentElement.style.removeProperty('--flat-button-light-color-text');
  document.documentElement.style.removeProperty('--flat-button-light-active-color');
}

function removeStorageColors() {
  localStorage.removeItem('--color-input');
  localStorage.removeItem('--saving-days-left');
  localStorage.removeItem('--detail-money-goal');
  localStorage.removeItem('--expense-title');
  localStorage.removeItem('--alert-custom-label');
  localStorage.removeItem('--gradient-2');
  localStorage.removeItem('--icon-savings');
  localStorage.removeItem('--alert-footer-color');
  localStorage.removeItem('--toast-message-color');
  localStorage.removeItem('--flat-button-color-text');
  localStorage.removeItem('--spiner-front-color');
  localStorage.removeItem('--money-delete-button');
  localStorage.removeItem('--spiner-back-color');
  localStorage.removeItem('--saving-title');
  localStorage.removeItem('--money-info');
  localStorage.removeItem('--para-home-options');
  localStorage.removeItem('--saving-edit-selected-range');
  localStorage.removeItem('--flat-button-color');
  localStorage.removeItem('--progressbar-main-color');
  localStorage.removeItem('--expense-detail-money');
  localStorage.removeItem('--icon-money');
  localStorage.removeItem('--home-options-labels');
  localStorage.removeItem('--home-goal-label');
  localStorage.removeItem('--entry-amount-text');
  localStorage.removeItem('--alert-content-text-color');
  localStorage.removeItem('--saving-info');
  localStorage.removeItem('--label-toolbar-color');
  localStorage.removeItem('--money-title');
  localStorage.removeItem('--chevron-color');
  localStorage.removeItem('--text-area-border-color');
  localStorage.removeItem('--back-button-color');
  localStorage.removeItem('--card-text-title-color');
  localStorage.removeItem('--switch-back-off');
  localStorage.removeItem('--alert-button-color-text');
  localStorage.removeItem('--saving-days-title');
  localStorage.removeItem('--expense-detail');
  localStorage.removeItem('--icon-home');
  localStorage.removeItem('--menu-font-color');
  localStorage.removeItem('--flat-button-light-color');
  localStorage.removeItem('--alert-tile-color');
  localStorage.removeItem('--gradient-1');
  localStorage.removeItem('--alert-custom-label-money');
  localStorage.removeItem('--text-without-card');
  localStorage.removeItem('--alert-container-color');
  localStorage.removeItem('--saving-edit-label-range');
  localStorage.removeItem('--progressbar-back-color');
  localStorage.removeItem('--item-list-config');
  localStorage.removeItem('--icon-expenses');
  localStorage.removeItem('--menu-button-color');
  localStorage.removeItem('--card-back-color');
  localStorage.removeItem('--detail-goal-title-color');
  localStorage.removeItem('--text-area-text-color');
  localStorage.removeItem('--home-total-money');
  localStorage.removeItem('--flat-button-light-color-text');
  localStorage.removeItem('--entry-amount-detail');
  localStorage.removeItem('--toast-back-color');
  localStorage.removeItem('--icon-config');
  localStorage.removeItem('--switch-back-on');
  localStorage.removeItem('--expense-info');
  localStorage.removeItem('--switch-button-round');
  localStorage.removeItem('--saving-daily');
  localStorage.removeItem('--detail-goal-content-color');
  localStorage.removeItem('--color-input-text');
  localStorage.removeItem('--card-content-text-color');
  localStorage.removeItem('--saving-main-title');
  localStorage.removeItem('--flat-button-active-color');
  localStorage.removeItem('--flat-button-light-active-color');
  localStorage.removeItem('--icon-goals');
  localStorage.removeItem('--saving-edit-range-selected');
}

function resetCustomTheme() {
  let languaje = localStorage.getItem('storageSwitchLanguage');
  if (languaje == 'false') {
    ons.notification.confirm({
      message: 'Are you sure to reset all colors?',
      title: 'Notice!',
      buttonLabels: ['YES', 'CANCEL'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          deleteProperty();
          setTheme('theme-default');
          removeStorageColors();
          functionPopPage(2);
          ons.notification.toast('Theme restarted successfully!', {
            title: 'Notice!',
            timeout: 1000,
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
      message: '¿Estas seguro reiniciar todos los colores?',
      title: 'Aviso!',
      buttonLabels: ['SÍ', 'CANCELAR'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          deleteProperty();
          setTheme('theme-default');
          removeStorageColors();
          functionPopPage(2);
          ons.notification.toast('Tema reiniciado correctamente!', {
            title: 'Aviso!',
            timeout: 1000,
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
