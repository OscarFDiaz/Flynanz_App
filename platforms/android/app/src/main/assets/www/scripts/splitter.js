/*Funciones para abrir el splitter de ambos usuarios, aqui se encarga de abrir el splitter, y cargar las paginas
 */
window.fn = {};

window.fn.open = function () {
  loadMenuIcons();
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.close = function () {
  var menu = document.getElementById('menu');
  menu.close();
};

window.fn.load = function (page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  let aPage = localStorage.getItem('actuaPage');

  if (aPage == page || aPage === page) {
    menu.close();
  } else {
    content.load(page).then(menu.close.bind(menu));
  }
};

function loadMenuIcons() {
  let themeSelected = localStorage.getItem('userTheme');

  if (themeSelected == 'theme-default') {
    document.getElementById('mainIconMenu').src = '/www/assets/icons/menu_icons/homeOption.svg';
    document.getElementById('goalIconMenu').src = '/www/assets/icons/menu_icons/goalOption.svg';
    document.getElementById('savingIconMenu').src = '/www/assets/icons/menu_icons/savingOption.svg';
    document.getElementById('expenseIconMenu').src = '/www/assets/icons/menu_icons/expensesOption.svg';
    document.getElementById('moneyIconMenu').src = '/www/assets/icons/menu_icons/moneyOption.svg';
    document.getElementById('settingsIconMenu').src = '/www/assets/icons/menu_icons/settingsOption.svg';
  } else if (themeSelected == 'theme-dark') {
    document.getElementById('mainIconMenu').src = '/www/assets/icons/menu_icons/dark/homeOption.svg';
    document.getElementById('goalIconMenu').src = '/www/assets/icons/menu_icons/dark/goalOption.svg';
    document.getElementById('savingIconMenu').src = '/www/assets/icons/menu_icons/dark/savingOption.svg';
    document.getElementById('expenseIconMenu').src = '/www/assets/icons/menu_icons/dark/expensesOption.svg';
    document.getElementById('moneyIconMenu').src = '/www/assets/icons/menu_icons/dark/moneyOption.svg';
    document.getElementById('settingsIconMenu').src = '/www/assets/icons/menu_icons/dark/settingsOption.svg';
  }
}
