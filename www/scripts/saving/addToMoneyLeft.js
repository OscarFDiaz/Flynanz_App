//alertMoneyLeft
function addToMoneyLeftMoney() {
  let leftMoney = document.getElementById('leftMoneyToAlert').textContent;
  let selectedRadioID = sessionStorage.getItem('selectedRadioID');
  let savingStorage = JSON.parse(localStorage.getItem('savingStorage'));
  let lang = getLang('saving');

  if (selectedRadioID === null) {
    selectedRadioID = 'radio-1';
    sessionStorage.setItem('selectedRadioID', 'radio-1');
  }

  // Si quiero añadir al día siguiente
  if (selectedRadioID == 'radio-1') {
    let days = savingStorage.daysLeft;
    let leftDays = parseInt(days) - 1;

    // No hay más días para el fondo
    if (leftDays < 1) {
      ons.notification.toast(lang.noMore, {
        title: 'Aviso!',
        timeout: 2500,
        animation: 'ascend',
      });
      return;
    } else {
      // Si días restantes es mayor a 0 lo resto, para evitar el -1
      if (leftDays > 0) {
        // Resto el día y añado el dinero al día siguiente
        savingStorage.daysLeft = parseInt(savingStorage.daysLeft) - 1;
      }

      let newAmount = parseFloat(savingStorage.toExpend) + parseFloat(leftMoney);
      savingStorage.moneyLeft = newAmount.toFixed(2);

      localStorage.setItem('savingStorage', JSON.stringify(savingStorage));

      document.getElementById('alertMoneyLeft').hide();
      loadSaving();

      ons.notification.toast(lang.moneyAdded, {
        title: 'Aviso!',
        timeout: 2500,
        animation: 'ascend',
      });
    }
    // Si quiero añadir el dinero a alguna cartera
  } else if (selectedRadioID == 'radio-2') {
    const selMoney = document.getElementById('selectOptionAddMoney');
    const optMoney = selMoney.options;
    // Categoría seleccionada
    var choseMoney = optMoney[selMoney.selectedIndex].value;

    if (choseMoney == 'SELECCIONA OPCIÓN') {
      ons.notification.toast(lang.selectOption, {
        title: 'Aviso!',
        timeout: 2500,
        animation: 'ascend',
      });
      return;
    }

    savingStorage.daysLeft = parseInt(savingStorage.daysLeft) - 1;
    localStorage.setItem('savingStorage', JSON.stringify(savingStorage));

    let moneys = JSON.parse(localStorage.getItem('moneyStorage'));

    // Añado el dinero a la cartera
    for (let i = 0; i < moneys.length; i++) {
      if (moneys[i].moneyName == choseMoney) {
        let newMoney = parseFloat(moneys[i].moneyCurrent) + parseFloat(leftMoney);
        moneys[i].moneyCurrent = newMoney.toFixed(2);

        localStorage.setItem('moneyStorage', JSON.stringify(moneys));

        // Actualizo el dinero ahorrado
        let savedMoney = localStorage.getItem('savedMoneySaving');
        if (savedMoney === null) {
          savedMoney = 0;
        }
        savedMoney = (parseFloat(savedMoney) + parseFloat(leftMoney)).toFixed(2);
        localStorage.setItem('savedMoneySaving', savedMoney);
        break;
      }
    }

    // Pongo el nuevo dinero
    savingStorage.moneyLeft = savingStorage.toExpend;
    localStorage.setItem('savingStorage', JSON.stringify(savingStorage));

    // Pongo el dinero disponible en 0 dado que no quedan días restantes del fondo
    if (parseInt(savingStorage.daysLeft) < 1) {
      savingStorage.moneyLeft = 0;
      localStorage.setItem('savingStorage', JSON.stringify(savingStorage));
    }

    document.getElementById('alertMoneyLeft').hide();
    loadSaving();

    ons.notification.toast(`${lang.leftAmountAdd}: ${choseMoney}!`, {
      title: 'Aviso!',
      timeout: 2500,
      animation: 'ascend',
    });
  }
}
