function loadChartData(expenseData) {
  let expenses = JSON.parse(localStorage.getItem('expenseStorage'));
  let lang = getLang('chart');
  let entry = false;
  let expenseCanvas = document.getElementById('oilChart');

  if (expenseData.datasets.length > 0) {
    if (expenses === null || expenses === '') {
      expenseData.labels.push(lang.noExpenses);

      expenseData.datasets[0].data.push('000.01');
      expenseData.datasets[0].backgroundColor.push(
        getComputedStyle(document.documentElement).getPropertyValue('--home-total-money'),
      );
    } else {
      for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].toShow == true) {
          // Si el usuario decide que se muestre en la dona
          let { expenseName, totalExpense, expenseColor, expenseColor1 } = expenses[i];

          let ctx = expenseCanvas.getContext('2d');
          let gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, expenseColor);
          gradient.addColorStop(1, expenseColor1);

          expenseData.labels.push(expenseName);
          expenseData.datasets[0].data.push(totalExpense);
          expenseData.datasets[0].backgroundColor.push(gradient);
          entry = true;
        }
      }
      if (!entry) {
        expenseData.labels.push(lang.noActive);

        expenseData.datasets[0].data.push('100');
        expenseData.datasets[0].backgroundColor.push(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--home-total-money',
          ),
        );
      }
    }
  }

  Chart.defaults.global.defaultFontColor = getComputedStyle(
    document.documentElement,
  ).getPropertyValue('--card-text-title-color');
  Chart.defaults.global.defaultFontSize = 16;
  Chart.defaults.RoundedDoughnut = Chart.helpers.clone(Chart.defaults.doughnut);

  Chart.defaults.global.tooltips.backgroundColor = getComputedStyle(
    document.documentElement,
  ).getPropertyValue('--toolbar-color');
  Chart.defaults.global.tooltips.titleFontSize = 20;

  Chart.defaults.global.elements.arc.backgroundColor = getComputedStyle(
    document.documentElement,
  ).getPropertyValue('--card-back-color');
  Chart.defaults.global.elements.arc.borderColor = getComputedStyle(
    document.documentElement,
  ).getPropertyValue('--card-back-color');
  Chart.defaults.global.elements.arc.borderWidth = 0;

  Chart.defaults.RoundedDoughnut = Chart.helpers.clone(Chart.defaults.doughnut);
  Chart.controllers.RoundedDoughnut = Chart.controllers.doughnut.extend({
    draw: function (ease) {
      var ctx = this.chart.ctx;
      var easingDecimal = ease || 1;
      var arcs = this.getMeta().data;

      Chart.helpers.each(arcs, function (arc, i) {
        arc.transition(easingDecimal).draw();

        var pArc = arcs[i === 0 ? arcs.length - 1 : i - 1];
        var pColor = pArc._view.backgroundColor;

        var vm = arc._view;
        var radius = (vm.outerRadius + vm.innerRadius) / 2;
        var thickness = (vm.outerRadius - vm.innerRadius) / 2;
        var startAngle = Math.PI - vm.startAngle - Math.PI / 2;
        var angle = Math.PI - vm.endAngle - Math.PI / 2;

        ctx.save();
        ctx.translate(vm.x, vm.y);

        ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor;
        ctx.beginPath();
        ctx.arc(
          radius * Math.sin(startAngle),
          radius * Math.cos(startAngle),
          thickness,
          0,
          2 * Math.PI,
        );
        ctx.fill();

        ctx.fillStyle = vm.backgroundColor;
        ctx.beginPath();
        ctx.arc(
          radius * Math.sin(angle),
          radius * Math.cos(angle),
          thickness,
          0,
          2 * Math.PI,
        );
        ctx.fill();

        ctx.restore();
      });
    },
  });

  let pieChart = new Chart(expenseCanvas, {
    type: 'RoundedDoughnut',
    data: expenseData,
    options: {
      cutoutPercentage: 75,
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
      tooltips: {
        callbacks: {
          title: function (tooltipItem, data) {
            return data['labels'][tooltipItem[0]['index']];
          },
          label: function (tooltipItem, data) {
            return '$ ' + data['datasets'][0]['data'][tooltipItem['index']];
          },
        },
      },
    },
  });

  pieChart.update();
}
