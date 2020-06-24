'use strict';

(function () {

  var inputWizardCoat = document.querySelector('.setup-wizard-appearance input[name=coat-color]');
  var inputWizardEyes = document.querySelector('.setup-wizard-appearance input[name=eyes-color]');
  var inputWizardFireball = document.querySelector('.setup-fireball-wrap input[name=fireball-color]');
  var setupBlock = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setupBlock.querySelector('.setup-close');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupInputUserName = document.querySelector('.setup-user-name');
  var setupWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardFireball = document.querySelector('.setup-fireball-wrap');

  var colorize = function (array, elemValue, element) {
    var color = array[window.util.getRandomData(0, array.length)];
    elemValue.value = color;
    if (element !== setupWizardFireball) {
      element.style.fill = color;
    } else {
      element.style.backgroundColor = color;
    }
  };

  var colorCoat = function () {
    colorize(window.dialog.WIZARD_COAT_COLORS, inputWizardCoat, setupWizardCoat);
  };
  var colorEyes = function () {
    colorize(window.dialog.WIZARD_EYES_COLORS, inputWizardEyes, setupWizardEyes);
  };
  var colorFireball = function () {
    colorize(window.dialog.WIZARD_FIREBALL_COLORS, inputWizardFireball, setupWizardFireball);
  };

  var openPopup = function () {
    setupBlock.classList.remove('hidden');
    document.addEventListener('keydown', offPopupEscPress);
    setupClose.addEventListener('keydown', offPopupEnterPress);
    setupOpenIcon.addEventListener('keydown', onPopupEnterPress);
    setupWizardCoat.addEventListener('click', colorCoat);
    setupWizardEyes.addEventListener('click', colorEyes);
    setupWizardFireball.addEventListener('click', colorFireball);
    setupInputUserName.addEventListener('keydown', onPopupEscapePress);
  };

  var closePopup = function () {
    setupBlock.classList.add('hidden');
    document.removeEventListener('keydown', offPopupEscPress);
    setupClose.removeEventListener('keydown', offPopupEnterPress);
    setupOpenIcon.removeEventListener('keydown', onPopupEnterPress);
    setupWizardCoat.removeEventListener('click', colorCoat);
    setupWizardEyes.removeEventListener('click', colorEyes);
    setupWizardFireball.removeEventListener('click', colorFireball);
    setupInputUserName.removeEventListener('keydown', onPopupEscapePress);
  };

  var onPopupEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      openPopup();
    }
  };

  var offPopupEnterPress = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      closePopup();
    }
  };

  var offPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  var onPopupEscapePress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      openPopup();
    }
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupOpenIcon.addEventListener('keydown', function (evt) {
    onPopupEnterPress(evt);
  });

})();
