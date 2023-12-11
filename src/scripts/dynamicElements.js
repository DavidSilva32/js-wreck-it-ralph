const createPanelElements = (rows, squares) => {
  // Global Variables
  let squareId = 0
  const panel = document.getElementById("panel");

  // Create some rows
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    panel.innerHTML += `<section class="panel-row" id="panel-row-${rowIndex}"></section>`;

    // Get the element with class called panel-row
    const panelRow = document.getElementById(`panel-row-${rowIndex}`);

    // Create squares inside panel rows
    for (let squareIndex = 0; squareIndex < squares; squareIndex++) {
      panelRow.innerHTML += `
            <section class="square enemy" id="${squareId}"></section>
        `;
        squareId++
    }
  }
};
