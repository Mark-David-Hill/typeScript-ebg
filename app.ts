const formSubmit = require('./modules/form.ts');

// // 
// // Form Submission
// // 

const formSetup = function() {
  // Set items to be submitted by the form
  let items = [
      ["characterName", "heroName"],
      ["characterClass", "classGroup"],
      ["characterRace", "raceGroup"],
      ["characterElement", "elementGroup"],
  ]

  // Set up form submission
  formSubmit("character.html", "charPage.html", items);
}

formSetup();