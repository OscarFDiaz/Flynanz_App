// CONSIGO LAS METAS DEL USUARIO Y LAS HAGO UNA STRINGLIST
function getTotalGoals() {
  let goals = JSON.parse(getFromStorage('goalStorage'));

  let goalsView = '';

  if (!goals || goals.length < 1) {
    goalsView += `<p class="homeGoalLabel" style="text-align:center; margin-bottom:0px">
    ${getLang('home_load_nothing')}
    </p>`;

    return goalsView;
  }

  for (let i = 0; i < goals.length; i++) {
    let { goalName, goalMoney, goalActualMoney, goalGradient, iconName, iconUrl } =
      goals[i];

    let gMoneyTS = formatMoney(goalMoney);
    let gAMoneyTS = formatMoney(goalActualMoney);

    let gPercent = getPercent(goalMoney, goalActualMoney);

    goalsView += `<div onclick="findGoal('${goalName}')" class="goalCard" style="background: var(${goalGradient})">
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
          </div>
        </div>
      </div>
    </div>`;
  }

  return goalsView;
}
