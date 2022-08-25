// gameBoard must be an id -- it can't be a class. 
let gameBoard = document.getElementById('gameBoard');
let coordinateArray = []
let numberOfRows = 27
let numberOfCols = 64
let mouseDown = false
window.onmousedown = () => mouseDown = true;
window.onmouseup = () => mouseDown = false;

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

function drawWall(e) {
  if (mouseDown === true) {
    e.target.style.backgroundColor = "black";
    e.target.classList.remove('unvisited');
    e.target.classList.add('wall');
  }
}

let unvisitedNodes = gameBoard.querySelectorAll(":scope > .unvisited");
unvisitedNodes.forEach(node => {
    node.addEventListener('mousedown', drawWall);
    node.addEventListener('mouseover', drawWall);
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
      currentNode.classList.remove('unvisited');
      currentNode.classList.add('visited');

      let coordinates = currentNode.id.split("-");
      let row = parseInt(coordinates[0]);
      let col = parseInt(coordinates[1]);    
      // leftNode
      if (col - 1 >= 0) {
        let leftNode = document.getElementById(`${row}-${col - 1}`);
        if (!(leftNode.classList.contains('visited')) && !(leftNode.classList.contains('wall'))) {
            stack.push(leftNode);
        } 
      }   
      // bottomNode
      if (row + 1 <= 26) {
        let bottomNode = document.getElementById(`${row + 1}-${col}`);
        if (!(bottomNode.classList.contains('visited')) && !(bottomNode.classList.contains('wall'))) {
            stack.push(bottomNode);
        } 
      }  
      // rightNode
      if (col + 1 <= 63) {
        let rightNode = document.getElementById(`${row}-${col + 1}`);
        if (!(rightNode.classList.contains('visited')) && !(rightNode.classList.contains('wall'))) {
            stack.push(rightNode);
        } 
      }  
      // topNode
      if (row - 1 >= 0) {
        let topNode = document.getElementById(`${row - 1}-${col}`);
        if (!(topNode.classList.contains('visited')) && !(topNode.classList.contains('wall'))) {
            stack.push(topNode);
        } 
    }
  }
  // change set to array
  // Helpful link: https://stackoverflow.com/questions/16401216/iterate-over-set-elements
  b = Array.from(visitedNodesInOrder);
  for (let i = 0; i < b.length; i++) {
  setTimeout(() => {
    console.log("hello")
    const node = b[i];
    node.style.backgroundColor = 'royalblue';
  }, 10 * i);
}
  return;
}

makeGrid(numberOfRows, numberOfCols) 
