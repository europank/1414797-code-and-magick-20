'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_FAMILIES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COATCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYESCOLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');
var similarListElement = setupBlock.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomData = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var mages = [];

for (var i = 0; i < 4; i++) {
  var mage = {
    name: WIZARD_NAMES[getRandomData(0, WIZARD_NAMES.length)] + ' ' + WIZARD_FAMILIES[getRandomData(0, WIZARD_FAMILIES.length)],
    coatColor: WIZARD_COATCOLORS[getRandomData(0, WIZARD_COATCOLORS.length)],
    eyesColor: WIZARD_EYESCOLORS[getRandomData(0, WIZARD_EYESCOLORS.length)]
  };
  mages.push(mage);
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};


var fragment = document.createDocumentFragment();
for (var j = 0; j < mages.length; j++) {
  fragment.appendChild(renderWizard(mages[j]));
}
similarListElement.appendChild(fragment);


setupBlock.querySelector('.setup-similar').classList.remove('hidden');
