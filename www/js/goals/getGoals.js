function getGoals() {
  let goals = JSON.parse(getFromStorage('goalStorage'));
  let goalsView = document.getElementById('goalsContainer');

  goalsView.innerHTML = '';

  let goalsTutorial = `<ons-card>
    <ons-list style="background: none;" id="expenseListOfExpensesContainer">
    <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
    <label class="iconExpenseLabel" style="margin-left: 50px;">
    ${getLang('goals_getgoals_tutorial')}
    </label>
    <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr;">
    <p class="paraTutorial">
    ${getLang('goals_getgoals_tutorial_p1')}
    </p>
    <p class="paraTutorial">
    ${getLang('goals_getgoals_tutorial_p2')}
    </p>
    <p class="paraTutorial">
    ${getLang('goals_getgoals_tutorial_p3')}
    </p>
    </div>
    </ons-list-item>
    </ons-list>
    </ons-card>
  `;

  let tutorial = JSON.parse(getFromStorage('storageSwitchTutorial'));
  if (!goals || goals.length === 0) {
    if (tutorial) {
      goalsView.innerHTML += goalsTutorial;
    }
    return;
  }

  for (let i = 0; i < goals.length; i++) {
    let {
      goalName,
      goalMoney,
      goalActualMoney,
      goalDate,
      goalGradient,
      iconName,
      iconUrl,
    } = goals[i];

    let gMoneyTS = formatMoney(goalMoney);
    let gAMoneyTS = formatMoney(goalActualMoney);

    let gPercent = getPercent(goalMoney, goalActualMoney);

    let today = new Date().toJSON().slice(0, 10);
    let days = dateDiff(today, goalDate);

    if (goalDate === '') {
      goalDate = getLang('goals_getgoals_nodatedata');
    } else {
      if (Math.sign(days) == 1 || Math.sign(days) == '1') {
        goalDate = `${days} ${getLang('goals_getgoals_daysremaining')}`;
      } else if (Math.sign(days) == '-1' || Math.sign(days) == -1) {
        goalDate = `${getLang('goals_getgoals_expired')}  ${Math.abs(days)} ${getLang(
          'goals_getgoals_daysago',
        )}`;
      } else if (Math.sign(days) == '0' || Math.sign(days) == 0) {
        goalDate = getLang('goals_getgoals_lastday');
      }
    }

    goalsView.innerHTML += `<div onclick="findGoal('${goalName}')" class="goalCard" style="background: var(${goalGradient})">
     <div class="content">
     <span style="font-weight: 900; font-size: 24px">$ ${gAMoneyTS} <span style="font-weight: 500; font-size: 16px">/ $ ${gMoneyTS}</span></span>
     <div class="progressBarContainer"> 
     <div class="progressBarPercent" style="--width: ${gPercent}" id="${goalName}-pbar"></div> 
     </div> 
     <div class="goalInfo">
     <div>
     <img src="${iconUrl}${iconName}" alt="saving icon" style="width: 32px">
     </div>
     <div class="title goalTitle" id="titleGoal">
     ${goalName}
     <label id="goalInfo" class="goalDate">${goalDate}</label>
     </div>
     </div>
     </div>
     </div>`;
  }
}
