
// gameBoard must be an id -- it can't be a class. 
let gameBoard = document.getElementById('gameBoard');
let numberOfRows = 27
let numberOfCols = 64

function makeGrid(numRows, numCols) {
  gameBoard.style.setProperty('--numRows', numRows); 
  gameBoard.style.setProperty('--numCols', numCols); 
}

for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfCols; col++) {
        let div = document.createElement('div');
        div.id = `${row}-${col}`
        div.classList.add('unvisited_node');
        gameBoard.appendChild(div);
    }
}

makeGrid(numberOfRows, numberOfCols)