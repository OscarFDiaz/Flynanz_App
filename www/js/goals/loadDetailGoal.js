function loadDetailGoal() {
  document.getElementById('titleDetailGoal').innerHTML = '';

  let parseGoal = JSON.parse(sessionStorage.getItem('sessionFindGoal'));

  let { goalName, goalDescription, goalMoney, goalActualMoney, goalDate, goalGradient } =
    parseGoal;

  let gAMoneyTS = formatMoney(goalActualMoney);
  let gMoneyTS = formatMoney(goalMoney);

  let gPercent = getPercent(goalMoney, goalActualMoney);

  let today = new Date().toJSON().slice(0, 10);
  let days = dateDiff(today, goalDate);
  let pureDate = goalDate;

  if (goalDate === '') {
    pureDate = getLang('goals_getgoals_nodatedata');
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

  if (goalDescription === '') {
    goalDescription = getLang('goals_makenew_gdesc');
  }

  document.getElementById('titleDetailGoal').innerHTML = goalName;

  let goalsView = document.getElementById('goalDetailContainer');
  goalsView.innerHTML = '';

  goalsView.innerHTML += `
    <ons-card style="padding: 16px 0px 0px 0px; background: var(${goalGradient}); border: none" class="goalCard">
    <!--ProgressBar-->
    <!--ActualMoney-->
    <span style="margin-left: 20px; font-size: 30px; font-weight: 700; color: var(--detail-goal-content-color)">$ 
    <span style="color: var(--detail-money-goal)" id="detailMoneyActualMoney">${gAMoneyTS}</span>
    </span>
    <!--GoalMoney-->
    <span style="position: absolute; right: 20px; margin-right: 20px;font-size: 16px; font-weight: 600; margin-top: 16px; color: var(--detail-goal-content-color)">$ 
    <span style="color: var(--detail-money-goal)" id="detailMoneyGoalGoalMoney">${gMoneyTS}</span>
    </span>
    <!--ProgressBar-->
    <div class="progressBarContainer percentBar" style="margin-top:0px"> 
    <div class="progressBarPercent" style="--width:${gPercent}" data-label="${gPercent}" id="pbarDetail">
    <span style="white-space: nowrap; display: table; margin: 0 auto; color: var(--progressbar-back-color); font-weight: 500; position: relative; top: 5px; font-size:20px" id="${goalName}-pnumber">${gPercent} %</span>
    </div> 
    </div>
    <!--Description-->
    <div class="content detailInfo" style="margin-top:64px">
    ${goalDescription}
    </div>
    <!--GoalDate-->
    <div class="content">
    <div style="height: 80px;">
    <div class="iconSavedMoney" style="display: flex; justify-content: space-around;  margin-left:0px; background: var(--fab-button)" >
    <img src="./assets/icons/calendarIcon.png" alt="saving icon">
    </div>
    <label class="moneyDetailGoal" style="display: block; position: relative; top: -75px; left: 76px; font-size: 14px;">
    ${pureDate}
    </label>
    <label class="moneyDetailGoal" style="display: block; position: relative;top: -70px; left: 76px; font-weight: 500">
    ${goalDate}
    </label>
    </div>
    <ons-button class="flatButton" style="margin-left: 0px; margin-right: 0px" onclick="addMoneyGoal('${goalName}')">
    ${getLang('goals_loadDetail_modifymoney')}
    </ons-button>
    </div>
    </ons-card>
        
    <ons-button class="flatButtonLight" style="margin-top: 16px; margin-bottom: 16px" onclick="deleteGoal('${goalName}')">
    ${getLang('goals_loadDetail_deletegoal')}
    </ons-button>
    
    <ons-fab position="bottom right" onclick="editGoal('${goalName}')" style="display: flex; justify-content: space-around">
    <img src="./assets/icons/editButton.png" alt="saving icon" style="width: 32px; margin-top: 30%;">
    </ons-fab>`;
}
