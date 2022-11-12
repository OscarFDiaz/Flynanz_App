/*Funciones para abrir el splitter de ambos usuarios, aqui se encarga de abrir el splitter, y cargar las paginas
 */
window.fn = {};

window.fn.open = function () {
  var menu = document.getElementById('menu');
  menu.open();
  loadMenuIcons();
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
  let menuOptions = document.getElementById('userSplitterList');

  if (themeSelected == null || themeSelected == '' || themeSelected == 'theme-default') {
    menuOptions.innerHTML = '';
    menuOptions.innerHTML = `<ons-list-item onclick="fn.load('userHome.html')" tappable modifier="nodivider" class="menuItem">
            <img src="/www/assets/icons/menu_icons/homeOption.svg" alt="main icon" class="menuIcon iconHome" />
            <label class="labelMenu" id="menuLabelHome">Inicio</label>
          </ons-list-item>

          <ons-list-item onclick="fn.load('goals.html')" tappable modifier="nodivider" class="menuItem">
            <img src="/www/assets/icons/menu_icons/goalOption.svg" alt="goal icon" class="menuIcon iconHome" />
            <label class="labelMenu" style="margin-left: 8px" id="menuLabelGoals">Metas</label>
          </ons-list-item>

          <ons-list-item onclick="fn.load('savings.html')" tappable modifier="nodivider" class="menuItem">
            <img src="/www/assets/icons/menu_icons/savingOption.svg" alt="saving icon" class="menuIcon iconHome" />
            <label class="labelMenu" id="menuLabelSaved">Fondo</label>
          </ons-list-item>

          <ons-list-item onclick="fn.load('expenses.html')" tappable modifier="nodivider" class="menuItem">
            <img src="/www/assets/icons/menu_icons/expensesOption.svg" alt="expenses icon" class="menuIcon iconHome" />
            <label class="labelMenu" style="margin-left: 5px" id="menuLabelExpenses">Gastos</label>
          </ons-list-item>

          <ons-list-item id="closeSesionItem" onclick="fn.load('money.html')" tappable modifier="nodivider" class="menuItem">
            <img src="/www/assets/icons/menu_icons/moneyOption.svg" alt="money icon" class="menuIcon iconHome" />
            <label class="labelMenu" style="margin-left: 3px" id="menuLabelMoney">Mi dinero</label>
          </ons-list-item>

          <ons-list-item
            id="closeSesionItem"
            onclick="fn.load('configuration.html')"
            tappable
            modifier="nodivider"
            class="menuItem"
          >
            <img src="/www/assets/icons/menu_icons/settingsOption.svg" alt="settings icon" class="menuIcon iconHome" />
            <label class="labelMenu" style="margin-left: 3px" id="menuLabelConfiguration">Configuración</label>
          </ons-list-item>`;
  } else if (themeSelected == 'theme-dark') {
    menuOptions.innerHTML = '';
    menuOptions.innerHTML = `<ons-list-item onclick="fn.load('userHome.html')" tappable modifier="nodivider" class="menuItem">
            <img src="/www/assets/icons/menu_icons/dark/homeOption.svg" alt="main icon" class="menuIcon iconHome" />
            <label class="labelMenu" id="menuLabelHome">Inicio</label>
          </ons-list-item>

          <ons-list-item onclick="fn.load('goals.html')" tappable modifier="nodivider" class="menuItem">
            <img src="/www/assets/icons/menu_icons/dark/goalOption.svg" alt="goal icon" class="menuIcon iconHome" />
            <label class="labelMenu" style="margin-left: 8px" id="menuLabelGoals">Metas</label>
          </ons-list-item>

          <ons-list-item onclick="fn.load('savings.html')" tappable modifier="nodivider" class="menuItem">
            <img src="/www/assets/icons/menu_icons/dark/savingOption.svg" alt="saving icon" class="menuIcon iconHome" />
            <label class="labelMenu" id="menuLabelSaved">Fondo</label>
          </ons-list-item>

          <ons-list-item onclick="fn.load('expenses.html')" tappable modifier="nodivider" class="menuItem">
            <img src="/www/assets/icons/menu_icons/dark/expensesOption.svg" alt="expenses icon" class="menuIcon iconHome" />
            <label class="labelMenu" style="margin-left: 5px" id="menuLabelExpenses">Gastos</label>
          </ons-list-item>

          <ons-list-item id="closeSesionItem" onclick="fn.load('money.html')" tappable modifier="nodivider" class="menuItem">
            <img src="/www/assets/icons/menu_icons/dark/moneyOption.svg" alt="money icon" class="menuIcon iconHome" />
            <label class="labelMenu" style="margin-left: 3px" id="menuLabelMoney">Mi dinero</label>
          </ons-list-item>

          <ons-list-item id="closeSesionItem" onclick="fn.load('configuration.html')" tappable modifier="nodivider" class="menuItem">
            <img src="/www/assets/icons/menu_icons/dark/settingsOption.svg" alt="settings icon" class="menuIcon iconHome" />
            <label class="labelMenu" style="margin-left: 3px" id="menuLabelConfiguration">Configuración</label>
          </ons-list-item>`;
  }
}
