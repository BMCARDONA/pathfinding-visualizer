// functions 
function makeGrid(numRows, numCols) {
  gameBoard.style.setProperty('--numRows', numRows); 
  gameBoard.style.setProperty('--numCols', numCols); 
}

function drawWall(e) {
    if (mouseDown === true) {
      e.target.style.backgroundColor = 'rgb(24, 52, 69)';
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
    node.style.backgroundColor = 'rgb(24, 52, 69)';
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


/////////////////////////////////////////// dfs ///////////////////////////////////////////

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
          changeNodeColor(node, mainPathColor);
          node.style.animation = "foundFirstPath 1s";
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
            changeNodeColor(node, shortPathColor)
            node.style.animation = "foundShortestPath 2s";
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
    DFS(array, childNode, row - 1, col);
    DFS(array, childNode, row, col + 1);
    DFS(array, childNode, row + 1, col);
    DFS(array, childNode, row, col - 1);
  }
}

function beginDFS(startNode, row, col) {
    dfsShortestPath.push(startNode);
    let array = []
    DFS(array, null, row - 1, col)
    DFS(array, null, row, col + 1)
    DFS(array, null, row + 1, col)
    DFS(array, null, row, col - 1)
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
        targetReached = false;
        dfsShortestPath = [];
        bfsVisited = [];
        bfsShortestPath = []
        astarVisited = [];
        astarShortestPath = [];
    }
  }
}


/////////////////////////////////////////// bfs ///////////////////////////////////////////

function bfsPathColorAnimation(array) {
  for (let i = 0; i < array.length; i++) {
    setTimeout(() => {
        let node = array[i];
        if (node.classList.contains('start') == false && node.classList.contains('target') == false) {
          changeNodeColor(node, mainPathColor);
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
            changeNodeColor(domNode, shortPathColor)
            domNode.style.animation = "foundShortestPath 3s";
          }
      }, pathSpeed * i); 
    }
}


class bfsNode {
  constructor(row, col, parent) {
    this.row = row;
    this.col = col;
    this.parent = parent;
  }
}

function addNodeToQueue(currentNode, queue, rowIncrement, colIncrement) {
  node = new bfsNode(currentNode.row + rowIncrement, currentNode.col + colIncrement, currentNode)
  if (queue.includes(node) == false) {
      queue.push(node);
  }
}

function bfs(row, col) {
    let startNode = new bfsNode(row, col, null);
    queue = [startNode]
    while (queue.length > 0) {
        let currentNode = queue.shift();
        let domNode = document.getElementById(`${currentNode.row}-${currentNode.col}`)
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

            if (currentNode.row - 1 >= 0) {
                addNodeToQueue(currentNode, queue, -1, 0)
            }

            if (currentNode.row + 1 <= 26) {
                addNodeToQueue(currentNode, queue, 1, 0)
            }

            if (currentNode.col + 1 <= 63) {
              addNodeToQueue(currentNode, queue, 0, 1)
          }

            if (currentNode.col - 1 >= 0) {
                addNodeToQueue(currentNode, queue, 0, -1)
            }
        }
    }
}


/////////////////////////////////////////// astar ///////////////////////////////////////////

class aStarNode {
  constructor(parent, row, col, g, f) {
    this.parent = parent;
    this.row = row;
    this.col = col;
    this.g = g;
    this.f = f;
  }
}

function isNodeInVisited(array, row, col) {
  for (let i = 0; i < array.length; i++) {
    node = array[i];
    if (node.row == row && node.col == col) {
        return(true);
    }
    return(false);
  } 
}

function addCurrentNodeToQueue(queue, node) {
    queue.push(node);
}

function updateNodeInQueue(queue, node) {
    for (let i = 0; i < queue.length; i++) {
      existingNode = queue[i];
      if (node.g < existingNode.g) {
          existingNode.g = node.g;
          existingNode.parent = node.parent
      }
    } 
}

function isNodeInQueue(queue, node) {
    if (queue.includes(node)) {
        // update node's g attribute and parent attribute, if necessary.
        updateNodeInQueue(queue, node);
    }
    else {
        // add node to queue
        addCurrentNodeToQueue(queue, node);
    }
}


function heuristic(row, col) {
    // Manhattan distance
    distance = Math.abs(row - 13) + Math.abs(col - 55);
    return (distance); 
}


function aStarSearch(startRow, startCol) {
    let heuristicValue = heuristic(startRow, startCol);
    let startNode = new aStarNode(null, startRow, startCol, 0, heuristicValue);
    queue = [startNode]
    visited = []
    while (queue.length > 0) {
        let currentNode = queue[0];
        // set currentNode to queue element with lowest f value
        for (let i = 0; i < queue.length; i++) {
            node = queue[i];
            if (node.f < currentNode.f) {
              currentNode = node;
          }
        } 
        // if node is target
        if (currentNode.row == 13 && currentNode.col == 55) {
            node = currentNode;
            while (true) {
                astarShortestPath.push(node);
                node = node.parent;
                if (node == null) {
                    break;
                }
            }
            return;
        }
        const currentNodeIdx = queue.indexOf(currentNode)
        // We splice an array from the queue -- not an element! 
        let pluckedArray = queue.splice(currentNodeIdx, 1);  // 2nd parameter means remove one item only
        let pluckedNode = pluckedArray[0];
        visited.push(pluckedNode);
        let domNode = document.getElementById(`${pluckedNode.row}-${pluckedNode.col}`)
        if (domNode.classList.contains('wall') == false && domNode.classList.contains('visited') == false) {
            markNodeAsVisited(domNode);
            astarVisited.push(domNode);

            // check if adjacent node has same row and column as currentNode
            let firstNeighbor = isNodeInVisited(visited, pluckedNode.row - 1, pluckedNode.col);
            let secondNeighbor = isNodeInVisited(visited, pluckedNode.row, pluckedNode.col + 1);
            let thirdNeighbor = isNodeInVisited(visited, pluckedNode.row + 1, pluckedNode.col);
            let fourthNeighbor = isNodeInVisited(visited, pluckedNode.row, pluckedNode.col - 1);
            // store booleans (which tell us whether node is in VISITED)
            let children = [firstNeighbor, secondNeighbor, thirdNeighbor, fourthNeighbor];
    
            for (let i = 0; i < children.length; i++) {
                // if node not in visited
                if (children[i] == false) {
                    if (i == 0) {
                        // set attributes of child
                        if (pluckedNode.row - 1 >= 0) {
                          // set attributes of child
                          let heuristicValue = heuristic(pluckedNode.row - 1, pluckedNode.col);
                          let childNode = new aStarNode(pluckedNode, pluckedNode.row - 1, pluckedNode.col, pluckedNode.g + 1, heuristicValue);
                          isNodeInQueue(queue, childNode);
                        }
                    }
                    if (i == 1) {
                        if (pluckedNode.col + 1 <= 63) {
                            let heuristicValue = heuristic(pluckedNode.row, pluckedNode.col + 1);
                            let childNode = new aStarNode(pluckedNode, pluckedNode.row, pluckedNode.col + 1, pluckedNode.g + 1, heuristicValue);
                            isNodeInQueue(queue, childNode);
                        }
                    }
                    if (i == 2) {
                        if (pluckedNode.row + 1 <= 26) {
                            let heuristicValue = heuristic(pluckedNode.row + 1, pluckedNode.col);
                            let childNode = new aStarNode(pluckedNode, pluckedNode.row + 1, pluckedNode.col, pluckedNode.g + 1, heuristicValue);
                            isNodeInQueue(queue, childNode);
                        }
                    }
                    if (i == 3) {
                        if (pluckedNode.col - 1 >= 0) {
                          let heuristicValue = heuristic(pluckedNode.row, pluckedNode.col - 1);
                          let childNode = new aStarNode(pluckedNode, pluckedNode.row, pluckedNode.col - 1, pluckedNode.g + 1, heuristicValue);
                          isNodeInQueue(queue, childNode);
                        }
                    }
                }
            }
        }
    }
}


/////////////////////////////////////////// greedy best-first ///////////////////////////////////////////

class greedyBestFirstNode {
  constructor(parent, row, col, manhattan) {
    this.parent = parent;
    this.row = row;
    this.col = col;
    this.manhattan = manhattan;
  }
}

let greedyBestFirstSearchVisited = [];
let greedyBestFirstSearchShortestPath = [];


function greedyBestFirstSearch(startRow, startCol) {
    let heuristicValue = heuristic(startRow, startCol);
    let startNode = new greedyBestFirstNode(null, startRow, startCol, heuristicValue);
    queue = [startNode]
    visited = []
    while (queue.length > 0) {
        let currentNode = queue[0];
        // set currentNode to queue element with lowest manhattan value
        for (let i = 0; i < queue.length; i++) {
            node = queue[i];
            if (node.manhattan < currentNode.manhattan) {
              currentNode = node;
          }
        } 
        // if node is target
        if (currentNode.row == 13 && currentNode.col == 55) {
            node = currentNode;
            while (true) {
                greedyBestFirstSearchShortestPath.push(node);
                node = node.parent;
                if (node == null) {
                    break;
                }
            }
            return;
        }
        const currentNodeIdx = queue.indexOf(currentNode)
        // We splice an array from the queue -- not an element! 
        let pluckedArray = queue.splice(currentNodeIdx, 1);  // 2nd parameter means remove one item only
        let pluckedNode = pluckedArray[0];
        visited.push(pluckedNode);
        console.log(visited);
        let domNode = document.getElementById(`${pluckedNode.row}-${pluckedNode.col}`)
        if (domNode.classList.contains('wall') == false && domNode.classList.contains('visited') == false) {
            markNodeAsVisited(domNode);
            greedyBestFirstSearchVisited.push(domNode);

            // check if adjacent node has same row and column as currentNode
            let firstNeighbor = isNodeInVisited(visited, pluckedNode.row - 1, pluckedNode.col);
            let secondNeighbor = isNodeInVisited(visited, pluckedNode.row, pluckedNode.col + 1);
            let thirdNeighbor = isNodeInVisited(visited, pluckedNode.row + 1, pluckedNode.col);
            let fourthNeighbor = isNodeInVisited(visited, pluckedNode.row, pluckedNode.col - 1);
            // store booleans (which tell us whether node is in VISITED)
            let children = [firstNeighbor, secondNeighbor, thirdNeighbor, fourthNeighbor];
    
            for (let i = 0; i < children.length; i++) {
                // if node not in visited
                if (children[i] == false) {
                    if (i == 0) { 
                        if (pluckedNode.row - 1 >= 0) {
                          let heuristicValue = heuristic(pluckedNode.row - 1, pluckedNode.col);
                          let childNode = new greedyBestFirstNode(pluckedNode, pluckedNode.row - 1, pluckedNode.col, heuristicValue);
                          addCurrentNodeToQueue(queue, childNode)
                        }
                    }
                    if (i == 1) {
                        if (pluckedNode.col + 1 <= 63) {
                            let heuristicValue = heuristic(pluckedNode.row, pluckedNode.col + 1);
                            let childNode = new greedyBestFirstNode(pluckedNode, pluckedNode.row, pluckedNode.col + 1, heuristicValue);
                            addCurrentNodeToQueue(queue, childNode)
                        }
                    }
                    if (i == 2) {
                        if (pluckedNode.row + 1 <= 26) {
                            let heuristicValue = heuristic(pluckedNode.row + 1, pluckedNode.col);
                            let childNode = new greedyBestFirstNode(pluckedNode, pluckedNode.row + 1, pluckedNode.col, heuristicValue);
                            addCurrentNodeToQueue(queue, childNode)
                        }
                    }
                    if (i == 3) {
                        if (pluckedNode.col - 1 >= 0) {
                          let heuristicValue = heuristic(pluckedNode.row, pluckedNode.col - 1);
                          let childNode = new greedyBestFirstNode(pluckedNode, pluckedNode.row, pluckedNode.col - 1, heuristicValue);
                           addCurrentNodeToQueue(queue, childNode)
                        }
                    }
                }
            }
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////


// gameBoard must be an id -- it can't be a class. 
let gameBoard = document.getElementById('gameBoard');
let numberOfRows = 27
let numberOfCols = 64
makeGrid(numberOfRows, numberOfCols) 
createUnvisitedAndTargetNodes(numberOfRows, numberOfCols);
let pathSpeed = 40;
let targetReached = false;
let dfsShortestPath = []
let unvisitedNodes = gameBoard.querySelectorAll(":scope > .unvisited");
let visualizeButton = document.getElementById("visualizeButton")
let row = 13
let col = 8
let shortPathColor = '#08b6ab';
let mainPathColor = 'rgb(93, 63, 211)';
// don't forget to reset these to empty arrays when you clear the board!
let bfsVisited = [];
let bfsShortestPath = [];
let astarVisited = [];
let astarShortestPath = [];
let startNode = document.getElementById(`${row}-${col}`)
changeNodeColor(startNode, "red")


let algorithmToVisualize = ''

// dfs button
let dfsButton = document.getElementById("dfsButton")
dfsButton.addEventListener('click', () => {
  algorithmToVisualize = 'dfs'
});


// bfs button
let bfsButton = document.getElementById("bfsButton")
bfsButton.addEventListener('click', () => {
  algorithmToVisualize = 'bfs'
});

// astar button
let astarButton = document.getElementById("astarButton")
astarButton.addEventListener('click', () => {
  algorithmToVisualize = 'astar'
});

// greedy best-first button
let greedyBestFirstSearchButton = document.getElementById("greedyBestFirstSearchButton")
greedyBestFirstSearchButton.addEventListener('click', () => {
  algorithmToVisualize = 'greedyBestFirst';
});

startNode.classList.add('start');
visualizeButton.addEventListener('click', () => {
    if (algorithmToVisualize == 'dfs') {
        beginDFS(startNode, row, col)
    }
    else if (algorithmToVisualize == 'bfs') {
        bfs(row, col)
        bfsPathColorAnimation(bfsVisited);
        let timeToFinishBluePath = pathSpeed * bfsVisited.length;
        setTimeout(() => {
          bfsShortestPathAnimation(bfsShortestPath);
        }, timeToFinishBluePath)
    }
    else if (algorithmToVisualize == 'astar') {
        aStarSearch(row, col);
        bfsPathColorAnimation(astarVisited);
        let timeToFinishBluePath = pathSpeed * astarVisited.length;
        setTimeout(() => {
          bfsShortestPathAnimation(astarShortestPath);
        }, timeToFinishBluePath)
    }
    else if (algorithmToVisualize == 'greedyBestFirst') {
      greedyBestFirstSearch(row, col);
      bfsPathColorAnimation(greedyBestFirstSearchVisited);
      let timeToFinishBluePath = pathSpeed * greedyBestFirstSearchVisited.length;
      setTimeout(() => {
        bfsShortestPathAnimation(greedyBestFirstSearchShortestPath);
      }, timeToFinishBluePath)
  }
});


// Random board generator

let generateRandomWallsButton = document.getElementById("generate-random-walls-button");
generateRandomWallsButton.addEventListener('click', () => {
  clearBoard(numberOfRows, numberOfCols);
  unvisitedNodes.forEach(node => {
      let randomNumber = getRandomInt(0, 2);
      if ((randomNumber == 0) && (node.classList.contains('start') == false) && (node.classList.contains('target') == false)) {
        drawWallWithButton(node);
      }
  })
});

let clearBoardButton = document.getElementById("clear-board-button");
clearBoardButton.addEventListener('click', () => {
    clearBoard(numberOfRows, numberOfCols);
});



