//Borra todos los datos, se accede por la configuración
function deleteAllData() {
  ons.notification.confirm({
    message: getLang('helpers_delete_message'),
    title: getLang('title_notice'),
    buttonLabels: [
      getLang('helpers_delete_labelconfirm'),
      getLang('helpers_delete_labelcancel'),
    ],
    animation: 'default',
    primaryButtonIndex: 1,
    cancelable: true,
    callback: function (index) {
      if (0 === index) {
        // deleteProperty();
        setTheme('theme-default');
        localStorage.clear();
        sessionStorage.clear();

        const navigator = document.querySelector('#navigator');
        navigator.resetToPage('./pages/userPage/splitterUser.html');
      } else {
        ons.notification.toast(getLang('helpers_delete_cancel'), {
          title: getLang('title_notice'),
          timeout: 1000,
          animation: 'ascend',
        });
      }
    },
  });
}
