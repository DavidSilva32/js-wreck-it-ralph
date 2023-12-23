const createPanelElements = (rows, squares) => {
  // Global Variables
  let squareId = 0;
  const panel = document.getElementById("panel");

  const createSection = (className, id) => {
    const section = document.createElement("section");
    section.className = `${className}`;
    className === "panel-row"
      ? (section.id = `${className}-${id}`)
      : (section.id = `${id}`);

    return section;
  };

  // Create some rows
  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    panel.appendChild(createSection("panel-row", rowIndex));

    // Get the element with class called panel-row
    const panelRow = document.getElementById(`panel-row-${rowIndex}`);

    // Create squares inside panel rows
    for (let squareIndex = 0; squareIndex < squares; squareIndex++) {
      squareId === 4 ? 
      panelRow.appendChild(createSection("square enemy", squareId)) :
      panelRow.appendChild(createSection("square", squareId)) 

      squareId++;
    }
  }
};
