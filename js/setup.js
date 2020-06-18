'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_FAMILIES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var NUMBER_OF_MAGES = 4;

var setupBlock = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupBlock.querySelector('.setup-close');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupInputUserName = document.querySelector('.setup-user-name');
var setupWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var setupWizardFireball = document.querySelector('.setup-fireball-wrap');
var inputWizardCoat = document.querySelector('.setup-wizard-appearance input[name=coat-color]');
var inputWizardEyes = document.querySelector('.setup-wizard-appearance input[name=eyes-color]');
var inputWizardFireball = document.querySelector('.setup-fireball-wrap input[name=fireball-color]');
var similarListElement = setupBlock.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomData = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getMages = function (quantity) {
  var mages = [];
  for (var i = 0; i < quantity; i++) {
    var mage = {
      name: WIZARD_NAMES[getRandomData(0, WIZARD_NAMES.length)] + ' ' + WIZARD_FAMILIES[getRandomData(0, WIZARD_FAMILIES.length)],
      coatColor: WIZARD_COATCOLORS[getRandomData(0, WIZARD_COATCOLORS.length)],
      eyesColor: WIZARD_EYESCOLORS[getRandomData(0, WIZARD_EYESCOLORS.length)]
    };
    mages.push(mage);
  }
  return mages;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var j = 0; j < getMages(NUMBER_OF_MAGES).length; j++) {
  fragment.appendChild(renderWizard(getMages(NUMBER_OF_MAGES)[j]));
}
similarListElement.appendChild(fragment);


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

var randomCoatColor = function () {
  var coatColor = WIZARD_COATCOLORS[getRandomData(0, WIZARD_COATCOLORS.length)];
  setupWizardCoat.style.fill = coatColor;
  inputWizardCoat.value = coatColor;
};

var randomEyesColor = function () {
  var eyesColor = WIZARD_EYESCOLORS[getRandomData(0, WIZARD_EYESCOLORS.length)];
  setupWizardEyes.style.fill = eyesColor;
  inputWizardEyes.value = eyesColor;
};

var randomFireballColor = function () {
  var fireballColor = WIZARD_FIREBALL_COLORS[getRandomData(0, WIZARD_FIREBALL_COLORS.length)];
  setupWizardFireball.style.backgroundColor = fireballColor;
  inputWizardFireball.value = fireballColor;
};

var openPopup = function () {
  setupBlock.classList.remove('hidden');
  document.addEventListener('keydown', offPopupEscPress);
  setupClose.addEventListener('keydown', offPopupEnterPress);
  setupOpenIcon.addEventListener('keydown', onPopupEnterPress);
  setupWizardCoat.addEventListener('click', randomCoatColor);
  setupWizardEyes.addEventListener('click', randomEyesColor);
  setupWizardFireball.addEventListener('click', randomFireballColor);
  setupInputUserName.addEventListener('keydown', onPopupEscapePress);
};

var closePopup = function () {
  setupBlock.classList.add('hidden');
  document.removeEventListener('keydown', offPopupEscPress);
  setupClose.removeEventListener('keydown', offPopupEnterPress);
  setupOpenIcon.removeEventListener('keydown', onPopupEnterPress);
  setupWizardCoat.removeEventListener('click', randomCoatColor);
  setupWizardEyes.removeEventListener('click', randomEyesColor);
  setupWizardFireball.removeEventListener('click', randomFireballColor);
  setupInputUserName.removeEventListener('keydown', onPopupEscapePress);
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
