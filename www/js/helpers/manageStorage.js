function getFromStorage(key) {
  return localStorage.getItem(key);
}

function saveToStorage(key, toStorage) {
  localStorage.setItem(key, toStorage);
}
