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

var nInd = getRandomData(0, WIZARD_NAMES.length);
var fInd = getRandomData(0, WIZARD_FAMILIES.length);
var namE = WIZARD_NAMES[nInd] + ' ' + WIZARD_FAMILIES[fInd];

var cInd = getRandomData(0, WIZARD_COATCOLORS.length);
var coatColor = WIZARD_COATCOLORS[cInd];

var eInd = getRandomData(0, WIZARD_EYESCOLORS.length);
var eyesColor = WIZARD_EYESCOLORS[eInd];

var wizards = [
  {name: namE,
    coatColor: coatColor,
    eyesColor: eyesColor
  },
  {name: namE,
    coatColor: coatColor,
    eyesColor: eyesColor
  },
  {name: namE,
    coatColor: coatColor,
    eyesColor: eyesColor
  },
  {name: namE,
    coatColor: coatColor,
    eyesColor: eyesColor
  }
];

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};


var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

setupBlock.querySelector('.setup-similar').classList.remove('hidden');
