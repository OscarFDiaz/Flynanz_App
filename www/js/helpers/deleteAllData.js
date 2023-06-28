//Borra todos los datos, se accede por la configuración
function deleteAllData() {
  let language = localStorage.getItem('storageSwitchLanguage');
  if (language == 'false') {
    ons.notification.confirm({
      message: 'Are you sure to delete EVERYTHING?',
      title: 'Notice!',
      buttonLabels: ['Yes, delete', 'Cancel'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          deleteProperty();
          setTheme('theme-default');
          localStorage.clear();
          sessionStorage.clear();

          const navigator = document.querySelector('#navigator');
          navigator.resetToPage('splitterUser.html');
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
      message: '¿Estas seguro de borrar TODO?',
      title: 'Aviso!',
      buttonLabels: ['Sí, borrar', 'Cancelar'],
      animation: 'default',
      primaryButtonIndex: 1,
      cancelable: true,
      callback: function (index) {
        if (0 === index) {
          deleteProperty();
          setTheme('theme-default');
          localStorage.clear();
          sessionStorage.clear();

          const navigator = document.querySelector('#navigator');
          navigator.resetToPage('splitterUser.html');
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
