function pdf() {
const character = {
  name: document.getElementById('name').value,
  race: document.getElementById('race').value,
  class: document.getElementById('class').value,
  alignment: document.getElementById('alignment').value,
};


var doc = new jsPDF();

doc.setFontSize(30);
doc.text(100, 20, 'Pathfinder character sheet', null, null, 'center');

doc.setFontSize(10);
doc.text(20, 30, 'character name: ' + character.name);
doc.text(20, 40, 'race: ' + character.race);
doc.text(20, 50, 'class: ' + character.class);
doc.text(20, 60, 'alignment: ' + character.alignment);

//--table rectangles--\\



//---table content---\\
doc.text(40, 90, 'Ability', null, null, 'center');
  doc.text(80, 90, 'Ability Score', null, null, 'center');
    doc.text(120, 90, 'Ability Modifier', null, null, 'center');
doc.text(40, 100, 'Strength', null, null, 'center');

doc.text(40, 110, 'Dexterity', null, null, 'center');

doc.text(40, 120, 'Constitution', null, null, 'center');

doc.text(40, 130, 'Intelligence', null, null, 'center');

doc.text(40, 140, 'Wisdom', null, null, 'center');

doc.text(40, 150, 'Charisma', null, null, 'center');

doc.output("dataurlnewwindow");
}
//http://rawgit.com/MrRio/jsPDF/master/
