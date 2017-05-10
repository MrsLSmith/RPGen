const genButton = document.getElementById("gen");
const race = document.getElementById("race");
const classes = document.getElementById('class');
const alignment = document.getElementById('alignment');

//Ability scores and modifiers elements
const str = document.getElementById('str');
const strMod = document.getElementById('strMod');
const dex = document.getElementById('dex');
const dexMod = document.getElementById('dexMod');
const con = document.getElementById('con');
const conMod = document.getElementById('conMod');
const intelligence = document.getElementById('int');
const intMod = document.getElementById('intMod');
const wis = document.getElementById('wis');
const wisMod = document.getElementById('wisMod');
const cha = document.getElementById('cha');
const chaMod = document.getElementById('chaMod');

//Class info elements
  //Hit points
  const hp = document.getElementById('hitPoints');
  //Fortitude Save
  const fortClass = document.getElementById('fortClass'); //fortitude save based on class
  const fortMod = document.getElementById('fortMod'); //fortitude modifier based on con
  const fortTotal = document.getElementById('fortTotal'); //fortitude save total

  //Reflex Save
  const refClass = document.getElementById('refClass'); //reflex save based on class
  const refMod = document.getElementById('refMod'); //reflex modifier based on dex
  const refTotal = document.getElementById('refTotal'); //reflex save total

  //Will Save
  const wilClass = document.getElementById('wilClass'); //will save based on class
  const wilMod = document.getElementById('wilMod'); //will modifier based on wis
  const wilTotal = document.getElementById('wilTotal'); //will save total

var character = {
  name: "",
  gender: "", //random number, 1 or 2
  race: "", //random number, only choose from canon races
  charClass: "", //random number, only choose from canon classes
  alignment: "", //two random numbers determines alignment based on the following:
  /*
                      1       2       3
                    Chaotic Neutral Lawful
                    _______________________
                   |   CG      NG     LG  |  Good     1
                   |   CN      NN     LN  |  Neutral  2
                   |   CE      NE     LE  |  Evil     3
                   |______________________|
  */

  //          str, dex, con, int, wis, cha
  attributes: [0, 0, 0, 0, 0, 0],
  modifiers: [0, 0, 0, 0, 0, 0],

  classInfo: "",        //determined based on class
};

genButton.addEventListener('click', generate);

function generate (){

  //randomly select race from the 7 total available
  var raceNum = rand(7);
  race.value = raceNum;

  //randomly select class from the 11 available
  var classNum = rand(11);
  classes.value = classNum;

  //randomly select alignment from 2 random numbers as described above
  var lawfulness = rand(3); //lawful, chaotic, or neutral
  var morals = rand(3); //good, neutral, evil
  alignment.value = lawfulness + '-' + morals;

  //generate ability scores one at a time.
  //roll 4 "dice", add up the top 3 dice to get total ability score
  //modifier is determined by ability score
  str.value = abilityScore();
  strMod.value = modifier(str.value);
  dex.value = abilityScore();
  dexMod.value = modifier(dex.value);
  con.value = abilityScore();
  conMod.value = modifier(con.value);
  cha.value = abilityScore();
  chaMod.value = modifier(cha.value);
  intelligence.value = abilityScore();
  intMod.value = modifier(intelligence.value);
  wis.value = abilityScore();
  wisMod.value = modifier(wis.value);

  //determine race trait
  determineRaceTrait(raceNum);

  //determine class info
  determineClassInfo(classNum);
}

function rand (max){
  var num = Math.floor(Math.random() * max) + 1;
  return num;
}

function abilityScore(){
  var num1, num2, num3, num4;

  //roll 4 "dice"
  num1 = rand(6);
  num2 = rand(6);
  num3 = rand(6);
  num4 = rand(6);
  var numbers = [num1, num2, num3, num4];
  //determine the lowest number of the 4
  var lowest = num4;
  for(var i = 0; i < 4; i++){
    if(numbers[i] < lowest){
      lowest = numbers[i];
    }
  }
  return (num1 + num2 + num3 + num4 - lowest);
}

function modifier(val){
  if(val == 1){
    return -5;
  }
  else if (val <= 3){
    return -4;
  }
  else if (val <= 5){
    return -3;
  }
  else if (val <= 7){
    return -2;
  }
  else if (val <= 9){
    return -1;
  }
  else if (val <= 11){
    return 0;
  }
  else if (val <= 13){
    return 1;
  }
  else if (val <= 15){
    return 2;
  }
  else if (val <= 17){
    return 3;
  }
  else if (val <= 19){
    return 4;
  }
  else {
    return 5;
  }
}

function determineRaceTrait (race) {
  /*
      1     Dwarf
      2     Elf
      3     Gnome
      4     Half-Elf
      5     Half-Orc
      6     Halfling
      7     Human
  */
  var currentTrait = document.getElementById('displayed');
  var traitToDisplay = document.getElementsByClassName(race)[0];
  currentTrait.id = '';
  traitToDisplay.id = 'displayed';


}

function determineClassInfo (classNum) {
  var classInfo2DArray = [
    /*Format: fortitude, reflex, will, max hit die (HP = max hit die + constitution modifier, done outside array)*/
    /*Barbarian*/[2, 0, 0, 12], /*0*/
    /*Bard*/[0, 2, 2, 8], /*1*/
    /*Cleric*/[2, 0, 2, 8], /*2*/
    /*Druid*/[2, 0, 2, 8], /*3*/
    /*Fighter*/[2, 0, 0, 10], /*4*/
    /*Monk*/[2, 2, 2, 8], /*5*/
    /*Paladin*/[2, 0, 2, 10], /*6*/
    /*Ranger*/[2, 2, 0, 10], /*7*/
    /*Rogue*/[0, 2, 0, 8], /*8*/
    /*Sorcerer*/[0, 0, 2, 6], /*9*/
    /*Wizard*/[0, 0, 2, 6] /*10*/
  ];

  //Hit points
  hp.textContent = parseInt(classInfo2DArray[classNum-1][3]) + parseInt(conMod.value);
  //fortitude
  fortClass.textContent = classInfo2DArray[classNum-1][0];
  fortMod.textContent = conMod.value;
  var fortTotalNum = parseInt(conMod.value) + parseInt(classInfo2DArray[classNum-1][0]);
  fortTotal.textContent = fortTotalNum;

  //reflex
  refClass.textContent = classInfo2DArray[classNum-1][1];
  refMod.textContent = dexMod.value;
  var refTotalNum = parseInt(dexMod.value) + parseInt(classInfo2DArray[classNum-1][1]);
  refTotal.textContent = refTotalNum;

  //will
  wilClass.textContent = classInfo2DArray[classNum-1][2];
  wilMod.textContent = wisMod.value;
  var wilTotalNum = parseInt(wisMod.value) + parseInt(classInfo2DArray[classNum-1][2]);
  wilTotal.textContent = wilTotalNum
}
