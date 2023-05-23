import { formSubmitSetup } from './modules/form'

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
  formSubmitSetup("character.html", "charPage.html", items);
}

formSetup();