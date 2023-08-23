const getGoals = () => {
  let goals = JSON.parse(localStorage.getItem('goalStorage'));
  let goalsView = document.getElementById('goalsContainer');
  let languaje = localStorage.getItem('storageSwitchLanguage');

  goalsView.innerHTML = '';
  let goalsTutorial = '';

  if (languaje == 'false') {
    goalsTutorial = `<ons-card>
      <ons-list style="background: none;" id="expenseListOfExpensesContainer">
        <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
          <label class="iconExpenseLabel" style="margin-left: 50px;">
            Read tutorial
          </label>
          <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr;">
            <p class="paraTutorial">
              Here you can add the goals you want to achieve. You will need to add a name to the goal, 
              the amount of money you need to achieve it, and, if necessary, the date you would like to achieve this goal.
            </p>
            <p class="paraTutorial">
              Later, you can add the money you collect and, in addition, 
              you will see a percentage indicating how far or close you are to the goal.
            </p>
            <p class="paraTutorial">
              You can edit this information as many times as you want, and even delete the goal if you no longer want to see it.
            </p>
            <p class="paraTutorial">
              To create a new goal press the "+" button.
            </p>
          </div>
        </ons-list-item>
      </ons-list>
    </ons-card>
  `;
  } else {
    goalsTutorial = `<ons-card>
      <ons-list style="background: none;" id="expenseListOfExpensesContainer">
        <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
          <label class="iconExpenseLabel" style="margin-left: 50px;">
            LEER TUTORIAL
          </label>
          
          <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr;">
            <p class="paraTutorial">
              Aquí podrás añadir las metas que deseas cumplir. Deberás añadir un nombre a la meta, 
              la cantidad de dinero que necesitas para cumplirla y, de ser necesario, la fecha en la que te gustaría cumplir esta meta.
            </p>
            <p class="paraTutorial">
              Posteriormente, podrás añadir el dinero que vayas recaudando y, además, 
              verás un porcentaje en el que se indique que tan lejos o cerca te encuentras de la meta.
            </p>
            <p class="paraTutorial">
              Podrás editar esta información cuantas veces quieras, e incluso eliminar la meta si ya no la deseas ver.
            </p>
            <p class="paraTutorial">
              Para crear una nueva meta pulsa el botón "+".
            </p>
          </div>
        </ons-list-item>
      </ons-list>
    </ons-card>`;
  }

  if (goals == null || goals == 'null') {
    let tutorial = localStorage.getItem('storageSwitchTutorial');
    if (tutorial == true || tutorial == 'true') {
      goalsView.innerHTML += `${goalsTutorial}`;
    }
    return;
  } else if (goals.length == 0) {
    let tutorial = localStorage.getItem('storageSwitchTutorial');
    if (tutorial == true || tutorial == 'true') {
      goalsView.innerHTML += `${goalsTutorial}`;
    }
    return;
  }

  for (let i = 0; i < goals.length; i++) {
    let gName = goals[i].goalName;
    let gMoney = goals[i].goalMoney;
    let gAMoney = goals[i].goalActualMoney;
    let gDate = goals[i].goalDate;
    let gGradient = goals[i].goalGradient;

    let eicon = goals[i].iconName;
    let eiconUrl = goals[i].iconUrl;

    let gMoneyTS = formatMoney(gMoney);
    let gAMoneyTS = formatMoney(gAMoney);

    let gPercent = getPercent(gMoney, gAMoney);

    let today = new Date().toJSON().slice(0, 10);
    let days = dateDiff(today, gDate);

    if (languaje == 'false') {
      if (gDate === '') {
        gDate = 'No date data';
      } else {
        if (Math.sign(days) == 1 || Math.sign(days) == '1') {
          gDate = days + ' days remaining';
        } else if (Math.sign(days) == '-1' || Math.sign(days) == -1) {
          gDate = 'Expired ' + Math.abs(days) + ' days ago';
        } else if (Math.sign(days) == '0' || Math.sign(days) == 0) {
          gDate = 'Today is the last day';
        }
      }
    } else {
      if (gDate === '') {
        gDate = 'Sin datos de fecha';
      } else {
        if (Math.sign(days) == 1 || Math.sign(days) == '1') {
          gDate = days + ' días restantes';
        } else if (Math.sign(days) == '-1' || Math.sign(days) == -1) {
          gDate = 'Venció hace ' + Math.abs(days) + ' días';
        } else if (Math.sign(days) == '0' || Math.sign(days) == 0) {
          gDate = 'Hoy es el último día';
        }
      }
    }

    goalsView.innerHTML += `<div onclick="findGoal('${gName}')" class="goalCard" style="background: var(${gGradient})">
        <div class="content">
            <span style="font-weight: 900; font-size: 24px">$ ${gAMoneyTS} <span style="font-weight: 500; font-size: 16px">/ $ ${gMoneyTS}</span></span>
            <div class="progressBarContainer"> 
            <div class="progressBarPercent" style="--width: ${gPercent}" id="${gName}-pbar"></div> 
          </div> 
          <div class="goalInfo">
            <div>
              <img src="${eiconUrl}${eicon}" alt="saving icon" style="width: 32px">
            </div>
            <div class="title goalTitle" id="titleGoal">
              ${gName}
              <label id="goalInfo" class="goalDate">${gDate}</label>
            </div>
          </div>
        </div>
      </div>`;
  }
};
