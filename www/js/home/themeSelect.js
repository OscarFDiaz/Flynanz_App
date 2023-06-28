// Tema seleccionado por el usuario

//* DEPRECATED
// TODO: Check
// function changeTheme() {
//   let actualThemeIndex = sessionStorage.getItem('themeIndex');
//   let language = getFromStorage('storageSwitchLanguage');

//   if (actualThemeIndex == '0') {
//     deleteProperty();
//     setTheme('theme-default');

//     document.getElementById('buttonSelectTheme').innerHTML =
//       getLang('home_theme_current');
//   } else if (actualThemeIndex == '1') {
//     deleteProperty();
//     setTheme('theme-dark');

//     document.getElementById('buttonSelectTheme').innerHTML =
//       getLang('home_theme_current');
//   }
// }

function setTheme(themeName) {
  //Si no es el mismo tema lo cambio
  saveToStorage('userTheme', themeName);
  document.documentElement.className = themeName;

  ons.notification.toast(getLang('home_theme_changed'), {
    title: getLang('title_notice'),
    timeout: 2000,
    animation: 'ascend',
  });
}
