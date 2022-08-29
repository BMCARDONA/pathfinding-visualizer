// functions 
function makeGrid(numRows, numCols) {
  gameBoard.style.setProperty('--numRows', numRows); 
  gameBoard.style.setProperty('--numCols', numCols); 
}

function drawWall(e) {
    if (mouseDown === true) {
      e.target.style.backgroundColor = "rgb(77, 78, 107)";
      e.target.classList.remove('unvisited');
      e.target.classList.add('wall');
    }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function drawWallWithButton(node) {
  node.style.backgroundColor = "rgb(77, 78, 107)";
  node.classList.remove('unvisited');
  node.classList.add('wall');
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

function DFS(array, parentNode, row, col) {
  let nextNode = document.getElementById(`${row}-${col}`);
  let childNode = new Node(parentNode, row, col);
  childNode.addParent(nextNode);
  if (row < 0 || row > 26 || col < 0 || col > 63 || nextNode.classList.contains('visited') || nextNode.classList.contains('wall')) {
      return;
  }
  markNodeAsVisited(nextNode);

  if (row == 13 && col == 55) {
    targetReached = true;
    let node = childNode;
    while (true) {
        console.log(node.parent);
        let shortestPathNode = document.getElementById(`${node.row}-${node.col}`);
        dfsShortestPath.push(shortestPathNode);
        node = node.parent;
        if (node == null) {
            break;
        }
    }
  }

  else if (targetReached == false) {
    markNodeAsVisited(nextNode);
    array.push(nextNode);
    DFS(array, childNode, row + 1, col);
    DFS(array, childNode, row - 1, col);
    DFS(array, childNode, row, col + 1);
    DFS(array, childNode, row, col - 1);
  }
}


function dfsPathColorAnimation(array) {
  for (let i = 0; i < array.length; i++) {
    setTimeout(() => {
        let node = array[i];
        changeNodeColor(node, 'slateblue');
        node.style.animation = "foundFirstPath 0.5s";
    }, pathSpeed * i); 
  }
}


function shortestPathColorAnimation(array) {
    array.reverse()
    for (let i = 0; i < array.length - 1; i++) {
      setTimeout(() => {
          let node = array[i];
          if (node.classList.contains('target') == false) {
            changeNodeColor(node, '#00b6ad')
            node.style.animation = "foundShortestPath 0.5s";
          }
      }, pathSpeed * i); 
    }
}


////////////////////////////////////////////////////////////////////////////////////////


// gameBoard must be an id -- it can't be a class. 
let gameBoard = document.getElementById('gameBoard');
let numberOfRows = 27
let numberOfCols = 64
let pathSpeed = 10;
let mouseDown = false
window.onmousedown = () => mouseDown = true;
window.onmouseup = () => mouseDown = false;
let dfsShortestPath = []

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

let targetReached = false;
let unvisitedNodes = gameBoard.querySelectorAll(":scope > .unvisited");
unvisitedNodes.forEach(node => {
  node.addEventListener('mousedown', drawWall);
  node.addEventListener('mouseover', drawWall);
  node.addEventListener('click', () => {
      node.style.backgroundColor = "red";
      let row = getNodeRow(node); 
      let col = getNodeColumn(node); 
      let startNode = document.getElementById(`${node.row}-${node.col}`)
      dfsShortestPath.push(startNode);
      let array = []
      DFS(array, null, row + 1, col)
      DFS(array, null, row - 1, col)
      DFS(array, null, row, col + 1)
      DFS(array, null, row, col - 1)
      let timeToFinishBluePath = pathSpeed * array.length;
      dfsPathColorAnimation(array);
      setTimeout(() => {
        shortestPathColorAnimation(dfsShortestPath);
      }, timeToFinishBluePath)
  })
});


// Random board generator

let generateRandomWallsButton = document.getElementById("generate-random-walls-button");
generateRandomWallsButton.addEventListener('click', () => {
  unvisitedNodes.forEach(node => {
      let randomNumber = getRandomInt(0, 3);
      if (randomNumber == 0) {
          drawWallWithButton(node);
      }
  })
});

makeGrid(numberOfRows, numberOfCols) 
