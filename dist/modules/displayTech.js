// import capitalize from "./capitalize.js";
// import getEl from "./getEl.js"
// import display from "./display.js"
// 
// Display Techniques
// 
// Display the techniques of the specified class
const techDisplay = (gameData, classIndex, elementIndex, techIndex, capitalize, getEl, display) => {
    let classTech = gameData.techniques[techIndex];
    console.log('class tech: ');
    console.log(classTech);
    const charClass = capitalize(gameData.charClasses[classIndex]);
    const techModal = getEl('techModal');
    let content = "";
    const techTitle = getEl('techTitle');
    let titleContent = `${charClass} Techniques`;
    display(techTitle, titleContent);
    for (let i = 0; i < classTech.length; i++) {
        let tech = classTech[i];
        let cooldownText = '';
        if (tech.cooldown) {
            cooldownText = `<div class="col">
                <p class="fw-normal tech-footer p-2">Cooldown: ${tech.cooldown}</p>
            </div>`;
        }
        content += `<div class="col-12 col-lg-6 my-3">
        <!-- ${tech.name} Card -->
        <div class="card shadow h-100">

          <div class="card-header py-0">
            <!-- Name TP Row -->
            <div class="row tech-header">
              <div class="col">
                <h5 class="card-text py-2 text-start">
                    ${tech.name}
                </h5>
              </div>
              <div class="col">
                <p class="card-text text-end p-2">${tech.tp} TP</p>
              </div>
            </div>
          </div>

          <div class="card-body py-0 d-flex flex-column">
            

            <div class="row flex-grow-1">
              <p class="p-3 align-self-center">${classTech[i].description}</p>
            </div>
            <!-- Wisdom Range Cooldown Row -->
            <div class="row flex-grow-2">
              <div class="col">
                <p class="fw-normal tech-footer p-2">Wisdom: ${tech.wisdom}</p>
              </div>
              <div class="col">
                <p class="fw-normal tech-footer p-2">Range: ${tech.range}</p>
              </div>
              
              ${cooldownText}

            </div>
          </div>
        </div> <!-- End Technique Card -->
      </div> <!-- End Column -->`;
    }
    // Display generated content to the modal
    display(techModal, content);
};
export default techDisplay;
