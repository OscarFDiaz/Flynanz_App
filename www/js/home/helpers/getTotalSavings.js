// CONSIGO LA CANTIDAD AHORRADA DEL STORAGE
function getTotalSavings() {
  let storage = getFromStorage('savedMoneySaving');

  if (!storage) storage = 0;

  return storage;
}
