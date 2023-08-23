const getGoals = () => {
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
      
      <div class="expandable-content" id="expenseListOfExpenses" style="grid-template-columns: 1fr;">
        <p class="paraTutorial">
          ${lang.tutoPara}
        </p>
        <p class="paraTutorial">
          ${lang.tutoPara1}
        </p>
        <p class="paraTutorial">
          ${lang.tutoPara2}
        </p>
        <p class="paraTutorial">
        ${lang.tutoPara3}
        </p>
      </div>
    </ons-list-item>
  </ons-list>
</ons-card>`;

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

    if (gDate === '') {
      gDate = lang.noDate;
    } else {
      if (Math.sign(days) === 1) {
        gDate = `${days} ${lang.leftDays}`;
      } else if (Math.sign(days) === -1) {
        gDate = `${lang.expiredAgo} ${Math.abs(days)} ${lang.days}`;
      } else if (Math.sign(days) === 0) {
        gDate = lang.lastDay;
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
