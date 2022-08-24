// gameBoard must be an id -- it can't be a class. 
let gameBoard = document.getElementById('gameBoard');
let coordinateArray = []
let numberOfRows = 27
let numberOfCols = 64

function makeGrid(numRows, numCols) {
  gameBoard.style.setProperty('--numRows', numRows); 
  gameBoard.style.setProperty('--numCols', numCols); 
}

for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfCols; col++) {
        // add [row, col] to board array
        coordinateArray.push([row, col])
        let div = document.createElement('div');
        div.id = `${row}-${col}`
        div.classList.add('unvisited');
        gameBoard.appendChild(div);
    }
}

// Use querySelectorAll to retrieve direct children
// Link: https://stackoverflow.com/questions/3680876/using-queryselectorall-to-retrieve-direct-children
let unvisitedNodes = gameBoard.querySelectorAll(":scope > .unvisited_node");
unvisitedNodes.forEach(node => {
    node.addEventListener('click', () => {
      let coordinates = node.id.split("-");
      let row = parseInt(coordinates[0]);
      let col = parseInt(coordinates[1]);
      // DFS
      let visitedNodes = []
      for (let row = 0; row < numberOfRows; row++) {
          for (let col = 0; col < numberOfCols; col++) {
              visitedNodes.push([false]);
          }
      }
      depthFirstSearch(row, col, visitedNodes);
    })
});

function depthFirstSearch(row, col, visitedNodes) {
    if (row < 0 || row > 26 || col < 0 || col > 63 || visitedNodes[row][col] == true) {
      return;
    }
    visitedNodes[row][col] = true;
    let neighboringNode = document.getElementById(`${row}-${col}`);
    neighboringNode.style.backgroundColor = 'seagreen';
    depthFirstSearch(row + 1, col, visitedNodes);
    depthFirstSearch(row - 1, col, visitedNodes);
    depthFirstSearch(row, col + 1, visitedNodes);
    depthFirstSearch(row, col - 1, visitedNodes);
}

makeGrid(numberOfRows, numberOfCols) 
