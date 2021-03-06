'use strict';

(function () {
  var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
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
  var form = document.querySelector('.setup-wizard-form');
  var error = setupBlock.querySelector('.error');
  var numberOfElementsForm = form.children.length;

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
    colorize(WIZARD_COAT_COLORS, inputWizardCoat, setupWizardCoat);
  };
  var colorEyes = function () {
    colorize(WIZARD_EYES_COLORS, inputWizardEyes, setupWizardEyes);
  };
  var colorFireball = function () {
    colorize(WIZARD_FIREBALL_COLORS, inputWizardFireball, setupWizardFireball);
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

  var startY = setupBlock.style.top;
  var startX = setupBlock.style.left;

  var closePopup = function () {
    setupBlock.classList.add('hidden');
    document.removeEventListener('keydown', offPopupEscPress);
    setupClose.removeEventListener('keydown', offPopupEnterPress);
    setupOpenIcon.removeEventListener('keydown', onPopupEnterPress);
    setupWizardCoat.removeEventListener('click', colorCoat);
    setupWizardEyes.removeEventListener('click', colorEyes);
    setupWizardFireball.removeEventListener('click', colorFireball);
    setupInputUserName.removeEventListener('keydown', onPopupEscapePress);
    setupBlock.style.top = startY;
    setupBlock.style.left = startX;
    if (error) {
      form.removeChild(error);
    }
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

  var setErrorMessage = function (message) {
    var element = document.createElement('div');
    element.innerHTML = '<p>' + message + ' ' + '<button>OK</button>' + '</p>';
    var buttonOk = element.querySelector('button');
    var player = document.querySelector('.setup-footer');
    buttonOk.addEventListener('click', function () {
      form.removeChild(element);
    });
    buttonOk.style.height = '25px';
    buttonOk.style.margin = '0';
    buttonOk.style.lineHeight = '0px';
    buttonOk.style.fontSize = '16px';
    buttonOk.style.backgroundColor = 'rgba(232, 232, 232, 0.6)';
    element.classList.add('error');
    element.style.fontSize = '20px';
    element.style.color = 'red';
    element.style.fontWeight = 'bold';
    element.style.position = 'absolute';
    element.style.width = '100%';
    element.style.textAlign = 'center';
    element.style.backgroundColor = 'white';
    element.style.border = '2px solid black';
    if (form.children.length === numberOfElementsForm) {
      form.insertBefore(element, player);
    }
  };

  window.events = {
    setErrorMessage: setErrorMessage
  };

})();
