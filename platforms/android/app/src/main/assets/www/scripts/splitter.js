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
    document.getElementById('mainIconMenu').src = './assets/icons/menu_icons/homeOption.png';
    document.getElementById('goalIconMenu').src = './assets/icons/menu_icons/goalOption.png';
    document.getElementById('savingIconMenu').src = './assets/icons/menu_icons/savingOption.png';
    document.getElementById('expenseIconMenu').src = './assets/icons/menu_icons/expensesOption.png';
    document.getElementById('moneyIconMenu').src = './assets/icons/menu_icons/moneyOption.png';
    document.getElementById('settingsIconMenu').src = './assets/icons/menu_icons/settingsOption.png';
  } else if (themeSelected == 'theme-dark') {
    document.getElementById('mainIconMenu').src = './assets/icons/menu_icons/dark/homeOption.png';
    document.getElementById('goalIconMenu').src = './assets/icons/menu_icons/dark/goalOption.png';
    document.getElementById('savingIconMenu').src = './assets/icons/menu_icons/dark/savingOption.png';
    document.getElementById('expenseIconMenu').src = './assets/icons/menu_icons/dark/expensesOption.png';
    document.getElementById('moneyIconMenu').src = './assets/icons/menu_icons/dark/moneyOption.png';
    document.getElementById('settingsIconMenu').src = './assets/icons/menu_icons/dark/settingsOption.png';
  }
}
