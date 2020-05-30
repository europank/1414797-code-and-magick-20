var fireballSize = 22;
function getFireballSpeed (isWindFromLeft){
  if (isWindFromLeft) {
  return 5;
}
  return 2;
}
var wizardSpeed = 3;
var wizardWidth = 70;
function getWizardHeight (){
return 1.337 * wizardWidth;
}
function getWizardX (gameFieldWidth){
  return (gameFieldWidth - wizardWidth)/2;
}
function getWizardY (gameFieldWidth){
  return (gameFieldWidth - wizardWidth)/3;
}
