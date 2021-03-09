/*Funciones para abrir el splitter de ambos usuarios, aqui se encarga de abrir el splitter, y cargar las paginas
 */
window.fn = {};

window.fn.open = function () {
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
