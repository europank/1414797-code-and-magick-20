'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var FONT_GAP = 15;
  var TEXT_HEIGHT = 40;
  var BAR_WIDHT = 40;
  var GISTO_HEIGHT = 150;
  var barHeight = GISTO_HEIGHT + GAP * 2;
  var tempestString = 'Ура вы победили!\nСписок результатов: ';

  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(CLOUD_X, CLOUD_Y);
    ctx.lineTo(CLOUD_X + GAP * 2, CLOUD_Y + CLOUD_HEIGHT / 2);
    ctx.lineTo(CLOUD_X, CLOUD_Y + CLOUD_HEIGHT);
    ctx.lineTo(CLOUD_X + CLOUD_WIDTH, CLOUD_Y + CLOUD_HEIGHT);
    ctx.lineTo(CLOUD_X + CLOUD_WIDTH - GAP * 2, CLOUD_Y + CLOUD_HEIGHT / 2);
    ctx.lineTo(CLOUD_X + CLOUD_WIDTH, CLOUD_Y);
    ctx.moveTo(CLOUD_X, CLOUD_Y);
    ctx.closePath();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowOffsetX = GAP;
    ctx.shadowOffsetY = GAP;
    ctx.fill();
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  };

  window.renderStatistics = function (ctx, players, times) {
    renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

    var splitString = function (stringToSplit, separator) {
      var arrayOfStrings = stringToSplit.split(separator);
      ctx.fillStyle = '#000';
      ctx.font = '16px PT Mono';
      for (var i = 0; i < arrayOfStrings.length; i++) {
        if (i === 0) {
          ctx.fillText(arrayOfStrings[i], CLOUD_X + GAP * 2, CLOUD_Y + TEXT_HEIGHT);
        } else {
          ctx.fillText(arrayOfStrings[i], CLOUD_X + GAP * 2, CLOUD_Y + TEXT_HEIGHT + GAP * 2);
        }
      }
    };

    splitString(tempestString, '\n');

    var maxTime = window.util.getMaxElement(times);

    for (var i = 0; i < players.length; i++) {
      var randomNumber = window.util.getRandomInt(1, 101);
      ctx.fillStyle = 'hsl(240, ' + randomNumber + '%, 50%)';

      if (players[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      }
      ctx.fillRect(CLOUD_X + BAR_WIDHT + GAP + (GAP * 4 + BAR_WIDHT) * i, CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT, BAR_WIDHT, -((barHeight * times[i]) / maxTime) + TEXT_HEIGHT);
      ctx.fillStyle = '#000';
      ctx.fillText(players[i], CLOUD_X + BAR_WIDHT + GAP + (GAP * 4 + BAR_WIDHT) * i, CLOUD_Y + CLOUD_HEIGHT - TEXT_HEIGHT + FONT_GAP + GAP);
      ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_WIDHT + GAP + (GAP * 4 + BAR_WIDHT) * i, CLOUD_HEIGHT - (barHeight * times[i]) / maxTime);
    }
  };
})();
