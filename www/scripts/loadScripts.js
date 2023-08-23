// Cargar todos los scripts necesarios
const scriptsToLoad = [
  'startApp.js',
  'splitter.js',
  'push.js',
  'goals.js',
  'alertGoals.js',
  'editGoal.js',
  'money.js',
  'alertMoneys.js',
  'home.js',
  'expense.js',
  'alertExpense.js',
  'saving.js',
  'checkUpdates/checkUpdates.js',
];

// Función para cargar scripts
const loadScripts = () => {
  scriptsToLoad.forEach((script) => {
    const scriptElement = document.createElement('script');
    scriptElement.src = `scripts/${script}`;
    document.body.appendChild(scriptElement);
  });
};

// Cargar los scripts cuando la página haya cargado
document.addEventListener('DOMContentLoaded', loadScripts);
