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
    node.style.backgroundColor = 'rgb(77, 78, 107)';
    if (node.classList.contains('unvisited')) {
      node.classList.remove('unvisited')
    }
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
  if (node.classList.contains('unvisited')) {
    node.classList.remove('unvisited')
  }
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


function dfsPathColorAnimation(array) {
  for (let i = 0; i < array.length; i++) {
    setTimeout(() => {
        let node = array[i];
        if (node.classList.contains('start') == false && node.classList.contains('target') == false) {
          changeNodeColor(node, 'slateblue');
          node.style.animation = "foundFirstPath 0.5s";
        }
    }, pathSpeed * i); 
  }
}


function shortestPathColorAnimation(array) {
    array.reverse()
    for (let i = 0; i < array.length - 1; i++) {
      setTimeout(() => {
          let node = array[i];
          if (node.classList.contains('start') == false && node.classList.contains('target') == false) {
            changeNodeColor(node, 'rgb(255, 253, 129)')
            node.style.animation = "foundShortestPath 0.5s";
          }
      }, pathSpeed * i); 
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

function beginDFS(startNode, row, col) {
    dfsShortestPath.push(startNode);
    let array = []
    DFS(array, null, row, col + 1)
    DFS(array, null, row, col - 1)
    DFS(array, null, row + 1, col)
    DFS(array, null, row - 1, col)
    let timeToFinishBluePath = pathSpeed * array.length;
    dfsPathColorAnimation(array);
    setTimeout(() => {
      shortestPathColorAnimation(dfsShortestPath);
    }, timeToFinishBluePath)
}


function createUnvisitedAndTargetNodes(numberOfRows, numberOfCols) {
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
}


function clearBoard(numberOfRows, numberOfCols) {
  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfCols; col++) {
        let node = document.getElementById(`${row}-${col}`)
        // start node
        if (row == 13 && col == 8) {
            node.setAttribute("class", "");
            node.classList.add('start');
            node.classList.add('unvisited');
            node.style.backgroundColor = 'red';
        }
        // target node
        else if (row == 13 && col == 55) {
            node.setAttribute("class", "");
            node.classList.add('target');
            node.style.backgroundColor = 'green';
        }
        else {
            node.setAttribute("class", "");
            node.classList.add('unvisited');
            node.style.backgroundColor = 'white';
        }
        mouseDown = false
        targetReached = false;
        dfsShortestPath = []
    }
  }
}











////////////////////////////////////////////////////////////////////////////////////////


// gameBoard must be an id -- it can't be a class. 
let gameBoard = document.getElementById('gameBoard');
let numberOfRows = 27
let numberOfCols = 64
makeGrid(numberOfRows, numberOfCols) 
createUnvisitedAndTargetNodes(numberOfRows, numberOfCols);
let pathSpeed = 30;


let mouseDown = false
window.onmousedown = () => mouseDown = true;
window.onmouseup = () => mouseDown = false;
let targetReached = false;
let dfsShortestPath = []


let unvisitedNodes = gameBoard.querySelectorAll(":scope > .unvisited");
// unvisitedNodes.forEach(node => {
//     node.addEventListener('mousedown', drawWall);
//     node.addEventListener('mouseover', drawWall);
// })



// visualization button
let algorithmToVisualize = ''


// dfs 
let dfsButton = document.getElementById("dfsButton")
dfsButton.addEventListener('click', () => {
  algorithmToVisualize = 'dfs'
});


// bfs 
let bfsButton = document.getElementById("bfsButton")
bfsButton.addEventListener('click', () => {
  algorithmToVisualize = 'bfs'
});


function bfsPathColorAnimation(array) {
  for (let i = 0; i < array.length; i++) {
    setTimeout(() => {
        let node = array[i];
        if (node.classList.contains('start') == false && node.classList.contains('target') == false) {
          changeNodeColor(node, 'slateblue');
          node.style.animation = "foundFirstPath 0.5s";
        }
    }, pathSpeed * i); 
  }
}

function bfsShortestPathAnimation(array) {
    array.reverse()
    for (let i = 0; i < array.length - 1; i++) {
      setTimeout(() => {
          let node = array[i];
          let domNode = document.getElementById(`${node.row}-${node.col}`)
          if (domNode.classList.contains('start') == false && domNode.classList.contains('target') == false) {
            changeNodeColor(domNode, 'rgb(255, 253, 129)')
            domNode.style.animation = "foundShortestPath 0.5s";
          }
      }, pathSpeed * i); 
    }
}

let bfsVisited = [];
let bfsShortestPath = [];

class bfsNode {
  constructor(row, col, parent) {
    this.row = row;
    this.col = col;
    this.parent = parent;
  }
}

function bfs(row, col) {
    let startNode = new bfsNode(row, col, null);
    queue = [startNode]
    while (queue.length > 0) {
        let currentNode = queue.shift();
        let domNode = document.getElementById(`${currentNode.row}-${currentNode.col}`)
        // domNode is null
        if (domNode.classList.contains('target')) {
            node = currentNode;
            while (true) {
                bfsShortestPath.push(node);
                node = node.parent;
                if (node == null) {
                    break;
                }
            }
            break;
        }
        else if (domNode.classList.contains('wall') == false && domNode.classList.contains('visited') == false) {
            markNodeAsVisited(domNode);
            bfsVisited.push(domNode);
    
            if (currentNode.row + 1 <= 26) {
                topNode = new bfsNode(currentNode.row + 1, currentNode.col, currentNode)
                if (queue.includes(topNode) == false) {
                    queue.push(topNode);
                }
            }
            if (currentNode.row - 1 >= 0) {
                bottomNode = new bfsNode(currentNode.row - 1, currentNode.col, currentNode)
                if (queue.includes(bottomNode) == false) {
                  queue.push(bottomNode);
              }
            }
            if (currentNode.col - 1 >= 0) {
                leftNode = new bfsNode(currentNode.row, currentNode.col - 1, currentNode)
                if (queue.includes(leftNode) == false) {
                    queue.push(leftNode);
              }
            }
            if (currentNode.col + 1 <= 63) {
                rightNode = new bfsNode(currentNode.row, currentNode.col + 1, currentNode)
                if (queue.includes(rightNode) == false) {
                    queue.push(rightNode);
              }
            }
        }
    }
}




let visualizeButton = document.getElementById("visualizeButton")
let row = 13
let col = 8
let startNode = document.getElementById(`${row}-${col}`)
changeNodeColor(startNode, "red")
startNode.classList.add('start');
visualizeButton.addEventListener('click', () => {
  if (algorithmToVisualize == 'dfs') {
    beginDFS(startNode, row, col)
  }
  if (algorithmToVisualize == 'bfs') {
      bfs(row, col)
      bfsPathColorAnimation(bfsVisited);
      let timeToFinishBluePath = pathSpeed * bfsVisited.length;
      setTimeout(() => {
        bfsShortestPathAnimation(bfsShortestPath);
      }, timeToFinishBluePath)
  }
});


// Random board generator

let generateRandomWallsButton = document.getElementById("generate-random-walls-button");
generateRandomWallsButton.addEventListener('click', () => {
  clearBoard(numberOfRows, numberOfCols);
  unvisitedNodes.forEach(node => {
      let randomNumber = getRandomInt(0, 3);
      if ((randomNumber == 0) && (node.classList.contains('start') == false) && (node.classList.contains('target') == false)) {
        drawWallWithButton(node);
      }
  })
});

let clearBoardButton = document.getElementById("clear-board-button");
clearBoardButton.addEventListener('click', () => {
    clearBoard(numberOfRows, numberOfCols);
});



