function getGoals() {
  let goals = JSON.parse(localStorage.getItem('goalStorage'));
  let goalsView = document.getElementById('goalsContainer');
  const lang = getLang('goals');

  goalsView.innerHTML = '';
  let goalsTutorial = '';

  goalsTutorial = `<ons-card>
    <ons-list style="background: none;" id="expenseListOfExpensesContainer">
      <ons-list-item id="expandableListContainer" expandable style="margin-top: 0px;">
        <label class="iconExpenseLabel" style="margin-left: 50px;">
          ${lang.readTuto}
        </label>

        <div
          class="expandable-content"
          id="expenseListOfExpenses"
          style="grid-template-columns: 1fr;"
        >
          <p class="paraTutorial">${lang.tutoPara}</p>
          <p class="paraTutorial">${lang.tutoPara1}</p>
          <p class="paraTutorial">${lang.tutoPara2}</p>
          <p class="paraTutorial">${lang.tutoPara3}</p>
        </div>
      </ons-list-item>
    </ons-list>
  </ons-card>`;

  let tutorial = JSON.parse(localStorage.getItem('storageSwitchTutorial'));

  if (goals === null) {
    if (tutorial === true) {
      goalsView.innerHTML += `${goalsTutorial}`;
    }
    return;
  } else if (goals.length === 0) {
    if (tutorial === true) {
      goalsView.innerHTML += `${goalsTutorial}`;
    }
    return;
  }

  for (let i = 0; i < goals.length; i++) {
    let {
      goalActualMoney,
      goalDate,
      goalGradient,
      goalMoney,
      goalName,
      iconName,
      iconUrl,
    } = goals[i];

    let gMoneyTS = formatMoney(goalMoney);
    let gAMoneyTS = formatMoney(goalActualMoney);

    let gPercent = getPercent(goalMoney, goalActualMoney);

    let today = new Date().toJSON().slice(0, 10);
    let days = dateDiff(today, goalDate);

    if (goalDate === '') {
      goalDate = lang.noDate;
    } else {
      if (Math.sign(days) === 1) {
        goalDate = `${days} ${lang.leftDays}`;
      } else if (Math.sign(days) === -1) {
        goalDate = `${lang.expiredAgo} ${Math.abs(days)} ${lang.days}`;
      } else if (Math.sign(days) === 0) {
        goalDate = lang.lastDay;
      }
    }

    goalsView.innerHTML += /*HTML*/ `<div
      onclick="findGoal('${goalName}')"
      class="goalCard"
      style="background: var(${goalGradient})"
    >
      <div class="content">
        <span style="font-weight: 900; font-size: 24px"
          >$ ${gAMoneyTS}
          <span style="font-weight: 500; font-size: 16px">/ $ ${gMoneyTS}</span></span
        >
        <div class="progressBarContainer">
          <div
            class="progressBarPercent"
            style="--width: ${gPercent}"
            id="${goalName}-pbar"
          ></div>
        </div>
        <div class="goalInfo">
          <div>
            <img src="${iconUrl}${iconName}" alt="saving icon" style="width: 32px" />
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
