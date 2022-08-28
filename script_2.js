// gameBoard must be an id -- it can't be a class. 
let gameBoard = document.getElementById('gameBoard');
let numberOfRows = 27
let numberOfCols = 64
let mouseDown = false
window.onmousedown = () => mouseDown = true;
window.onmouseup = () => mouseDown = false;

// add "target" to one node, "unvisited" to other nodes
for (let row = 0; row < numberOfRows; row++) {
  for (let col = 0; col < numberOfCols; col++) {
      let div = document.createElement('div');
      div.id = `${row}-${col}`
      if (row == 13 && col == 55) {
          div.classList.add('target');
          gameBoard.appendChild(div);
          div.style.backgroundColor = "green";
      }
      else {
        div.classList.add('unvisited');
        gameBoard.appendChild(div);
      }
  }
}

let unvisitedNodes = gameBoard.querySelectorAll(":scope > .unvisited");
unvisitedNodes.forEach(node => {
  node.addEventListener('mousedown', drawWall);
  node.addEventListener('mouseover', drawWall);
  node.addEventListener('click', () => {
      let row = getNodeRow(node); 
      let col = getNodeColumn(node); 
      let startNode = document.getElementById(`${row}-${col}`);
      let array = [];
      // am I even the array back?
      DFS(startNode, row + 1, col, array);
      DFS(startNode, row - 1, col, array);
      DFS(startNode, row, col + 1, array);
      DFS(startNode, row, col - 1, array);
      console.log(array);
      // for (let i = 0; i < array.length; i++) {
      //   setTimeout(() => {
      //       let node = array[i];
      //       colorNodeBlue(node.parent);
      //   }, 10 * i); 
      // }
  })
});

function makeGrid(numRows, numCols) {
    gameBoard.style.setProperty('--numRows', numRows); 
    gameBoard.style.setProperty('--numCols', numCols); 
}

function drawWall(e) {
  if (mouseDown === true) {
    e.target.style.backgroundColor = "black";
    e.target.classList.remove('unvisited');
    e.target.classList.add('wall');
  }
}

function getNodeRow(node) {
    let coordinates = node.id.split("-");
    let r = parseInt(coordinates[0]);
    return (r);
}

function getNodeColumn(node) {
    let coordinates = node.id.split("-");
    let c = parseInt(coordinates[1]);  
    return (c);
}

function colorNodeBlue(node) {
    node.style.backgroundColor = 'blue';
}

function markNodeAsVisited(node) {
    node.classList.remove('unvisited');
    node.classList.add('visited');
}


class NodeParent {
  constructor(parent) {
    this.parent = parent;
  }
}

let targetReached = false;

function DFS(parentNode, row, col, array) {
    let currentArray = array
    let currentNode = document.getElementById(`${row}-${col}`);
    let childNode = new NodeParent(parentNode);
    if (row < 0 || row > 26 || col < 0 || col > 63 || currentNode.classList.contains('visited') || currentNode.classList.contains('wall')) {
        return;
    }
    markNodeAsVisited(currentNode);
    if (row == 13 && col == 55) {
      targetReached = true;
    }
    if (targetReached == false) {
      colorNodeBlue(currentNode);
      markNodeAsVisited(currentNode);
      currentArray.push(childNode);
    }
    // if (targetReached) {
    //   node = childNode;
    //   while (node.parent) {
    //       node.parent.style.backgroundColor = 'yellow';
    //       node = node.parent;
    //   }
    // }
    DFS(childNode, row + 1, col, currentArray);
    DFS(childNode, row - 1, col, currentArray);
    DFS(childNode, row, col + 1, currentArray);
    DFS(childNode, row, col - 1, currentArray);
}


makeGrid(numberOfRows, numberOfCols) 
