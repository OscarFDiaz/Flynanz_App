const loadDetailGoal = () => {
  document.getElementById('titleDetailGoal').innerHTML = '';

  let retrievedGoal = sessionStorage.getItem('sessionFindGoal');
  let parseGoal = JSON.parse(retrievedGoal);
  let languaje = localStorage.getItem('storageSwitchLanguage');

  let gName = parseGoal.name;
  let gDescription = parseGoal.description;
  let gAMoney = parseGoal.actualMoney;
  let gMoney = parseGoal.goalMoney;
  let nModifyDate = parseGoal.date;
  let gDate = parseGoal.date;
  let gGradient = parseGoal.gradient;

  let gAMoneyTS = formatMoney(gAMoney);
  let gMoneyTS = formatMoney(gMoney);

  let gPercent = getPercent(gMoney, gAMoney);

  let today = new Date().toJSON().slice(0, 10);
  let days = dateDiff(today, gDate);

  if (languaje == 'false') {
    if (Math.sign(days) == 1 || Math.sign(days) == '1') {
      gDate = days + ' days remaining';
    } else if (Math.sign(days) == '-1' || Math.sign(days) == -1) {
      gDate = 'Expired ' + Math.abs(days) + ' days ago';
    } else if (Math.sign(days) == '0' || Math.sign(days) == 0) {
      gDate = 'Today is the last day';
    }

    if (gDescription === '') {
      gDescription =
        "There is no description for this amazing goal. You can add one in the 'EDIT META' button";
    }

    document.getElementById('titleDetailGoal').innerHTML = gName;

    let goalsView = document.getElementById('goalDetailContainer');
    goalsView.innerHTML = '';

    goalsView.innerHTML += `
        <ons-card style="padding: 16px 0px 0px 0px; background: var(${gGradient}); border: none" class="goalCard">
          
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
              <span style="white-space: nowrap; display: table; margin: 0 auto; color: var(--progressbar-back-color); font-weight: 500; position: relative; top: 5px; font-size:20px" id="${gName}-pnumber">${gPercent} %</span>
            </div> 
          </div>
  
          <!--Description-->
          <div class="content detailInfo" style="margin-top:64px">
              ${gDescription}
          </div>
  
          <!--GoalDate-->
          <div class="content">
            <div style="height: 80px;">
  
              <div class="iconSavedMoney" style="display: flex; justify-content: space-around;  margin-left:0px; background: var(--fab-button)" >
                <img src="./assets/icons/calendarIcon.png" alt="saving icon">
              </div>
              <label class="moneyDetailGoal" style="display: block; position: relative; top: -75px; left: 76px; font-size: 14px;">
                ${nModifyDate}
              </label>
              <label class="moneyDetailGoal" style="display: block; position: relative;top: -70px; left: 76px; font-weight: 500">
                ${gDate}
              </label>
            </div>
            <ons-button class="flatButton" style="margin-left: 0px; margin-right: 0px" onclick="addMoneyGoal('${gName}')">
              Modify money
            </ons-button>
          </div>
        </ons-card>
        
        <ons-button class="flatButtonLight" style="margin-top: 16px; margin-bottom: 16px" onclick="deleteGoal('${gName}')">
          Delete goal
        </ons-button>
        
        <ons-fab position="bottom right" onclick="editGoal('${gName}')" style="display: flex; justify-content: space-around">
          <img src="./assets/icons/editButton.png" alt="saving icon" style="width: 32px; margin-top: 30%;">
        </ons-fab>`;
  } else {
    if (Math.sign(days) == 1 || Math.sign(days) == '1') {
      gDate = days + ' días restantes';
    } else if (Math.sign(days) == '-1' || Math.sign(days) == -1) {
      gDate = 'Venció hace ' + Math.abs(days) + ' días';
    } else if (Math.sign(days) == '0' || Math.sign(days) == 0) {
      gDate = 'Hoy es el último día';
    }

    if (gDescription === '') {
      gDescription =
        "No existe una descripción para esta asombrosa meta. Puedes añadir una en el botón 'EDITAR META'";
    }

    document.getElementById('titleDetailGoal').innerHTML = gName;

    let goalsView = document.getElementById('goalDetailContainer');
    goalsView.innerHTML = '';

    goalsView.innerHTML += `
        <ons-card style="padding: 16px 0px 0px 0px; background: var(${gGradient}); border: none" class="goalCard">
          
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
              <span style="white-space: nowrap; display: table; margin: 0 auto; color: var(--progressbar-back-color); font-weight: 500; position: relative; top: 5px; font-size:20px" id="${gName}-pnumber">${gPercent} %</span>
            </div> 
          </div>
  
          <!--Description-->
          <div class="content detailInfo" style="margin-top:64px">
              ${gDescription}
          </div>
  
          <!--GoalDate-->
          <div class="content">
            <div style="height: 80px;">
  
              <div class="iconSavedMoney" style="display: flex; justify-content: space-around;  margin-left:0px; background: var(--fab-button)" >
                <img src="./assets/icons/calendarIcon.png" alt="saving icon">
              </div>
              <label class="moneyDetailGoal" style="display: block; position: relative; top: -75px; left: 76px; font-size: 14px;">
                ${nModifyDate}
              </label>
              <label class="moneyDetailGoal" style="display: block; position: relative;top: -70px; left: 76px; font-weight: 500">
                ${gDate}
              </label>
            </div>
            <ons-button class="flatButton" style="margin-left: 0px; margin-right: 0px" onclick="addMoneyGoal('${gName}')">
              Modificar dinero
            </ons-button>
          </div>
        </ons-card>
        
        <ons-button class="flatButtonLight" style="margin-top: 16px; margin-bottom: 16px" onclick="deleteGoal('${gName}')">
          Eliminar meta
        </ons-button>
        
        <ons-fab position="bottom right" onclick="editGoal('${gName}')" style="display: flex; justify-content: space-around">
          <img src="./assets/icons/editButton.png" alt="saving icon" style="width: 32px; margin-top: 30%;">
        </ons-fab>`;
  }
};
