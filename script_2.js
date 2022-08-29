
class Node {
  constructor(parent, row, col) {
    this.parent = parent;
    this.row = row;
    this.col = col;
    this.parents = []
  }
  addParent(name) {
    this.parents.push(new Node(name));
  }
}

// functions 
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

function changeNodeColor(node, color) {
  node.style.backgroundColor = color;
}

function markNodeAsVisited(node) {
  node.classList.remove('unvisited');
  node.classList.add('visited');
}

function DFS(array, parentNode, row, col) {
  let currentArray = array;
  let nextNode = document.getElementById(`${row}-${col}`);
  let childNode = new Node(parentNode, row, col);
  childNode.addParent(nextNode);
  if (row < 0 || row > 26 || col < 0 || col > 63 || nextNode.classList.contains('visited') || nextNode.classList.contains('wall')) {
      return;
  }
  markNodeAsVisited(nextNode);

  if (row == 13 && col == 55) {
    targetReached = true;
    console.log(childNode.parents)
    let node = childNode;
    while (node.parent != null) {
        let shortestPathNode = document.getElementById(`${node.row}-${node.col}`);
        shortestPath.push(shortestPathNode);
        node = node.parent;
    }
  }

  else if (targetReached == false) {
    markNodeAsVisited(nextNode);
    currentArray.push(nextNode);
    DFS(currentArray, childNode, row + 1, col);
    DFS(currentArray, childNode, row - 1, col);
    DFS(currentArray, childNode, row, col + 1);
    DFS(currentArray, childNode, row, col - 1);
  }
}

///////////////////////////////////////////////////////////////////////////////////////


// gameBoard must be an id -- it can't be a class. 
let gameBoard = document.getElementById('gameBoard');
let numberOfRows = 27
let numberOfCols = 64
let mouseDown = false
window.onmousedown = () => mouseDown = true;
window.onmouseup = () => mouseDown = false;
let shortestPath = []

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
      let array = [];
      DFS(array, null, row + 1, col)
      DFS(array, null, row - 1, col)
      DFS(array, null, row, col + 1)
      DFS(array, null, row, col - 1)
      let timeToFinishBluePath = 40 * array.length;
      for (let i = 0; i < array.length; i++) {
        setTimeout(() => {
            let node = array[i];
            changeNodeColor(node, 'slateblue');
            node.style.animation = "foundFirstPath 1s";
        }, 40 * i); 
      }
      setTimeout(() => {
        shortestPath.reverse()
          for (let i = 0; i < shortestPath.length - 1; i++) {
            setTimeout(() => {
                let node = shortestPath[i];
                changeNodeColor(node, 'red'); 
                node.style.animation = "foundShortestPath 1s";
            }, 40 * i); 
          }
      }, timeToFinishBluePath)
  })
});






let targetReached = false;


makeGrid(numberOfRows, numberOfCols) 
