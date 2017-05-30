var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();

function googleSignin() {
   firebase.auth()

   .signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;

      console.log(token)
      console.log(user)
   }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(error.code)
      console.log(error.message)
   });

}

function googleSignout() {
   firebase.auth().signOut()

   .then(function() {
      console.log('Signout Succesfull')
   }, function(error) {
      console.log('Signout Failed')
   });
}

function save() {
  var character = {
    name: document.getElementById('name').value,
    race: document.getElementById('race').options[document.getElementById('race').selectedIndex].text, //random number, only choose from canon races
    charClass: document.getElementById('class').options[document.getElementById('class').selectedIndex].text, //random number, only choose from canon classes
    alignment: document.getElementById('alignment').options[document.getElementById('alignment').selectedIndex].text, //two random numbers determines alignment based on the following:
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
    attributes: ["1:str 2:dex 3:con 4:int 5:wis 6:cha",
                 document.getElementById('str').value,
                 document.getElementById('dex').value,
                 document.getElementById('con').value,
                 document.getElementById('int').value,
                 document.getElementById('wis').value,
                 document.getElementById('cha').value],
    modifiers: ["1:strMOD 2:dexMOD 3:conMOD 4:intMOD 5:wisMOD 6:chaMOD",
                document.getElementById('strMod').textContent,
                document.getElementById('dexMod').textContent,
                document.getElementById('conMod').textContent,
                document.getElementById('intMod').textContent,
                document.getElementById('wisMod').textContent,
                document.getElementById('chaMod').textContent],

    classInfo: " ",        //determined based on class
  };
  var firebaseRef = firebase.database().ref();
  firebaseRef.push().set({
    character: character
  });
  pdf(character);
}

function pdf(char) {

  var doc = new jsPDF();

  doc.setFontSize(30);
  doc.text(100, 20, 'Pathfinder character sheet', null, null, 'center');

  doc.setFontSize(10);
  doc.text(20, 30, 'character name: ' + char.name);
  doc.text(20, 40, 'race: ' + char.race);
  doc.text(20, 50, 'class: ' + char.charClass);
  doc.text(20, 60, 'alignment: ' + char.alignment);

  //--table lines--\\

  //outer lines
  doc.line(25, 85, 115, 85);
  doc.line(25, 85, 25, 152);
  doc.line(55, 85, 55, 152);
  doc.line(85, 85, 85, 152);
  doc.line(115, 85, 115, 152);
  doc.line(25, 152, 115, 152);


//inner lines
  doc.line(25, 94, 115, 94);
  doc.line(25, 104, 115, 104);
  doc.line(25, 114, 115, 114);
  doc.line(25, 123, 115, 123);
  doc.line(25, 134, 115, 134);
  doc.line(25, 143, 115, 143);

  //---table content---\\

  doc.text(40, 90, 'Ability', null, null, 'center');
    doc.text(70, 90, 'Ability Score', null, null, 'center');
      doc.text(100, 90, 'Ability Modifier', null, null, 'center');
  doc.text(40, 100, 'Strength', null, null, 'center');
    doc.text(70, 100, ' ' + char.attributes[1], null, null, 'center');
      doc.text(100, 100, ' ' + char.modifiers[1], null, null, 'center');
  doc.text(40, 110, 'Dexterity', null, null, 'center');
    doc.text(70, 110, ' ' + char.attributes[2], null, null, 'center');
      doc.text(100, 110, ' ' + char.modifiers[2], null, null, 'center');
  doc.text(40, 120, 'Constitution', null, null, 'center');
    doc.text(70, 120, ' ' + char.attributes[3], null, null, 'center');
      doc.text(100, 120, ' ' + char.modifiers[3], null, null, 'center');
  doc.text(40, 130, 'Intelligence', null, null, 'center');
    doc.text(70, 130, ' ' + char.attributes[4], null, null, 'center');
      doc.text(100, 130, ' ' + char.modifiers[4], null, null, 'center');
  doc.text(40, 140, 'Wisdom', null, null, 'center');
    doc.text(70, 140, ' ' + char.attributes[5], null, null, 'center');
      doc.text(100, 140, ' ' + char.modifiers[5], null, null, 'center');
  doc.text(40, 150, 'Charisma', null, null, 'center');
    doc.text(70, 150, ' ' + char.attributes[6], null, null, 'center');
      doc.text(100, 150, ' ' + char.modifiers[6], null, null, 'center');

  doc.output("dataurlnewwindow");
}
  //http://rawgit.com/MrRio/jsPDF/master/
