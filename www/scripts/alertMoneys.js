function createAlertDialogToEditMoneyMoney() {
  let retrievedMoney = sessionStorage.getItem('sessionFindMoney');
  let parseMoney = JSON.parse(retrievedMoney);

  //Guardo el nombre por si el usuario lo edita
  localStorage.setItem('nameSaved', parseMoney.moneyName);

  var dialog = document.getElementById('alertEditMoneyMoney');

  if (dialog) {
    document.getElementById('editOnlyMoneyMoney').value = '';
    document.getElementById('editMoneyEndMoney').innerHTML = '';
    dialog.show();
    document.getElementById('editMoneyActualMoney').innerHTML = parseMoney.moneyCurrent;
  } else {
    ons.notification.toast('Ups! No se ha podido cargar la ventana para modificar!', {
      title: 'Error!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
}

function hideAlertMoneys() {
  let element = document.getElementById('editOnlyMoneyMoney').value;

  let languaje = localStorage.getItem('storageSwitchLanguage');

  if (element === null || element === '' || element == '') {
    if (languaje == 'false') {
      ons.notification.toast('Enter how much money you want to add / remove, please!', {
        title: 'Notice!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('Ingresa cuanto dinero deseas añadir/quitar, por favor!', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
    return;
  }

  let newMoney = sessionStorage.getItem('addNewMoney'); // Se hace la suma del dinero en cuanto se ingresan datos

  let testMoney = Math.sign(newMoney);
  if (testMoney == '-1' || testMoney === '-0') {
    if (languaje == 'false') {
      ons.notification.toast('You cannot leave a wallet in negative numbers, sorry ...', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    } else {
      ons.notification.toast('No puedes dejar una cartera en numeros negativos, lo siento...', {
        title: 'Aviso!',
        timeout: 2000,
        animation: 'ascend',
      });
    }
    return;
  }

  let moneys = JSON.parse(localStorage.getItem('moneyStorage'));

  let indexGoal;

  let sName = localStorage.getItem('nameSaved');

  for (let i = 0; i < moneys.length; i++) {
    if (moneys[i].moneyName == sName) {
      indexGoal = i; //Pongo la posición donde esta mi objeto que modificare

      updateMoneyObject = {
        moneyName: moneys[i].moneyName,
        moneyCurrent: newMoney,
      };

      // Modifico los elementos para mostrar la cantidad de dinero actualizada
      document.getElementById(sName + '-money').innerHTML = '';
      document.getElementById(sName + '-money').innerHTML = '$ ' + newMoney;

      if (localStorage.getItem('moneyStorage') === null) {
        let moneysArray = [];
        moneysArray.push(updateMoneyObject);
        localStorage.setItem('moneyStorage', JSON.stringify(moneysArray));
      } else {
        moneys[indexGoal] = updateMoneyObject;
        localStorage.setItem('moneyStorage', JSON.stringify(moneys));
      }
      localStorage.removeItem('nameSaved');
      break;
    }
  }

  document.getElementById('editOnlyMoneyMoney').value = null;
  document.getElementById('alertEditMoneyMoney').hide();

  if (languaje == 'false') {
    ons.notification.toast('Money modified successfully!', {
      title: 'Notice!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast('Dinero modificado satisfactoriamente!', {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }

  sessionStorage.clear();
  getMoneys();
}

function hideAlertNoChangeMoneys() {
  let languaje = localStorage.getItem('storageSwitchLanguage');
  if (languaje == 'false') {
    ons.notification.toast('Money has not been modified!', {
      title: 'Notice!',
      timeout: 2000,
      animation: 'ascend',
    });
  } else {
    ons.notification.toast('No se ha modificado el dinero!', {
      title: 'Aviso!',
      timeout: 2000,
      animation: 'ascend',
    });
  }
  sessionStorage.clear();
  document.getElementById('alertEditMoneyMoney').hide();
}
