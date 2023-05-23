"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const form_1 = require("./modules/form");
// // 
// // Form Submission
// // 
const formSetup = function () {
    // Set items to be submitted by the form
    let items = [
        ["characterName", "heroName"],
        ["characterClass", "classGroup"],
        ["characterRace", "raceGroup"],
        ["characterElement", "elementGroup"],
    ];
    // Set up form submission
    (0, form_1.formSubmitSetup)("character.html", "charPage.html", items);
};
formSetup();
