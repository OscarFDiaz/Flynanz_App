function checkRadioSelect(id) {
  let container = document.getElementById('containerAlertAddMoneyLeft');
  sessionStorage.setItem('selectedRadioID', id);

  let lang = getLang('saving');

  // Si elige la opción de mi dinero se cargan las opciones, de lo contrario se ocultan
  if (id == 'radio-2') {
    container.innerHTML = ` <label style="color: var(--alert-tile-color)"
        >${lang.addTo}:
      </label>
      <select id="selectOptionAddMoney">
        <!--AQUÍ SE CARGAN LOS POSIBLES GASTOS-->
      </select>`;

    // CARGO EL DINERO DISPONIBLE
    let moneyStorage = JSON.parse(localStorage.getItem('moneyStorage'));

    let containerMoney = document.getElementById('selectOptionAddMoney');
    containerMoney.innerHTML = '';

    const option = document.createElement('option');
    let text = 'SELECCIONA OPCIÓN';
    option.innerText = text;

    containerMoney.appendChild(option);
    if (moneyStorage !== null) {
      for (let i = 0; i < moneyStorage.length; i++) {
        const option = document.createElement('option');
        let text = moneyStorage[i].moneyName;
        option.innerText = text;

        containerMoney.appendChild(option);
      }
    }
  } else {
    container.innerHTML = '';
  }
}
