'use strict';

(function () {
  // var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  // var WIZARD_FAMILIES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var NUMBER_OF_MAGES = 4;
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var setupBlock = document.querySelector('.setup');
  var form = setupBlock.querySelector('.setup-wizard-form');
  var similarListElement = setupBlock.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var moveButton = document.querySelector('.upload');

  /*var getMages = function (quantity) {
    var mages = [];
    for (var i = 0; i < quantity; i++) {
      var mage = {
        name: WIZARD_NAMES[window.util.getRandomData(0, WIZARD_NAMES.length)] + ' ' + WIZARD_FAMILIES[window.util.getRandomData(0, WIZARD_FAMILIES.length)],
        coatColor: WIZARD_COAT_COLORS[window.util.getRandomData(0, WIZARD_COAT_COLORS.length)],
        eyesColor: WIZARD_EYES_COLORS[window.util.getRandomData(0, WIZARD_EYES_COLORS.length)]
      };
      mages.push(mage);
    }
    return mages;
  };*/

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  window.backend.load(function (wizards) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < NUMBER_OF_MAGES; j++) {
      fragment.appendChild(renderWizard(wizards[j]));
    }
    similarListElement.appendChild(fragment);
  }, function () {});


  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      setupBlock.classList.add('hidden');
    }, function () {});
  });

  moveButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupBlock.style.top = (setupBlock.offsetTop - shift.y) + 'px';
      setupBlock.style.left = (setupBlock.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);


      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          moveButton.removeEventListener('click', onClickPreventDefault);
        };
        moveButton.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.dialog = {
    WIZARD_COAT_COLORS: WIZARD_COAT_COLORS,
    WIZARD_FIREBALL_COLORS: WIZARD_FIREBALL_COLORS,
    WIZARD_EYES_COLORS: WIZARD_EYES_COLORS
  };
})();
