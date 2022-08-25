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


let unvisitedNodes = gameBoard.querySelectorAll(":scope > .unvisited");
unvisitedNodes.forEach(node => {
    node.addEventListener('click', () => {
        let coordinates = node.id.split("-");
        let row = parseInt(coordinates[0]);
        let col = parseInt(coordinates[1]);
        // DFS
        let currentNode = document.getElementById(`${row}-${col}`)
        DFS(currentNode);
    })
});


function DFS(node) {
  let stack = [node]
  let visitedNodesInOrder = new Set();
  while (stack.length !== 0) {
      currentNode = stack.pop();
      visitedNodesInOrder.add(currentNode);
      // currentNode.style.backgroundColor = 'blue';
      currentNode.classList.remove('unvisited');
      currentNode.classList.add('visited');

      let coordinates = currentNode.id.split("-");
      let row = parseInt(coordinates[0]);
      let col = parseInt(coordinates[1]);    
      // leftNode
      if (col - 1 >= 0) {
        let leftNode = document.getElementById(`${row}-${col - 1}`);
        if (!(leftNode.classList.contains('visited'))) {
            stack.push(leftNode);
        } 
      }   
      // bottomNode
      if (row + 1 <= 26) {
        let bottomNode = document.getElementById(`${row + 1}-${col}`);
        if (!(bottomNode.classList.contains('visited'))) {
            stack.push(bottomNode);
        } 
      }  
      // rightNode
      if (col + 1 <= 63) {
        let rightNode = document.getElementById(`${row}-${col + 1}`);
        if (!(rightNode.classList.contains('visited'))) {
            stack.push(rightNode);
        } 
      }  
      // topNode
      if (row - 1 >= 0) {
        let topNode = document.getElementById(`${row - 1}-${col}`);
        if (!(topNode.classList.contains('visited')) && (topNode != null)) {
            stack.push(topNode);
        } 
    }
  }
  console.log(visitedNodesInOrder);
  // how do we loop through a set?
  b = Array.from(visitedNodesInOrder);
  for (let i = 0; i < b.length; i++) {
  setTimeout(() => {
    console.log("hello")
    const node = b[i];
    node.style.backgroundColor = 'blue';
  }, 10 * i);
}
  return;
}

makeGrid(numberOfRows, numberOfCols) 
