import "./style.css";
// import { makeGrid } from './algorithms/breadth_first_search'
import {
  makeGrid,
  getRandomInt,
  drawWallWithButton,
  changeNodeColor,
  markNodeAsVisited,
  manhattanDistance,
} from "./helper_functions";

function drawWall(e) {
  if (
    e.target.classList.contains("start") == false &&
    e.target.classList.contains("target") == false
  ) {
    if (mouseDown === true) {
      if (e.target.classList.contains("unvisited")) {
        e.target.classList.remove("unvisited");
      }
      e.target.classList.add("wall");
      e.target.style.backgroundColor = wallColor;
      e.target.style.borderColor = wallColor;
      e.target.style.animation = "generateWalls 0.5s";
    }
  }
}

/////////////////////////////////////////// dfs ///////////////////////////////////////////

class Node {
  constructor(parent, row, col) {
    this.parent = parent;
    this.row = row;
    this.col = col;
    this.parents = [];
  }
  addParent(name) {
    this.parents.push(new Node(name));
  }
}

function dfsPathColorAnimation(array) {
  for (let i = 0; i < array.length; i++) {
    setTimeout(() => {
      let node = array[i];
      if (
        node.classList.contains("start") == false &&
        node.classList.contains("target") == false
      ) {
        changeNodeColor(node, mainPathColor);
        node.style.animation = "foundFirstPath 0.5s";
      }
      node.style.borderColor = mainPathBorderColor;
    }, pathSpeed * i);
  }
  resetAnimationForAllValidNodes(27, 64);
}

function shortestPathColorAnimation(array) {
  array.reverse();
  for (let i = 0; i < array.length - 1; i++) {
    setTimeout(() => {
      let node = array[i];
      if (
        node.classList.contains("start") == false &&
        node.classList.contains("target") == false
      ) {
        changeNodeColor(node, shortPathColor);
        node.style.animation = "foundShortestPath 2s";
        node.style.borderColor = shortPathBorderColor;
      }
      if (i == array.length - 2) {
        enableButton();
      }
    }, finishedPathSpeed * i);
  }
}

function DFS(array, parentNode, row, col) {
  let nextNode = document.getElementById(`${row}-${col}`);
  let childNode = new Node(parentNode, row, col);
  childNode.addParent(nextNode);
  if (
    row < 0 ||
    row > 26 ||
    col < 0 ||
    col > 63 ||
    nextNode.classList.contains("visited") ||
    nextNode.classList.contains("wall")
  ) {
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
  } else if (targetReached == false) {
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
  let array = [];
  DFS(array, null, row - 1, col);
  DFS(array, null, row, col + 1);
  DFS(array, null, row + 1, col);
  DFS(array, null, row, col - 1);
  let timeToFinishBluePath = pathSpeed * array.length;
  dfsPathColorAnimation(array);
  setTimeout(() => {
    shortestPathColorAnimation(dfsShortestPath);
  }, timeToFinishBluePath);
}

function createUnvisitedAndTargetNodes(numberOfRows, numberOfCols) {
  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfCols; col++) {
      let div = document.createElement("div");
      div.id = `${row}-${col}`;
      if (row == 13 && col == 55) {
        div.classList.add("target");
        gameBoard.appendChild(div);
        div.style.backgroundColor = "green";
        div.style.borderColor = "green";
      } else {
        div.classList.add("unvisited");
        gameBoard.appendChild(div);
      }
    }
  }
}

function clearBoard(numberOfRows, numberOfCols) {
  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfCols; col++) {
      let node = document.getElementById(`${row}-${col}`);
      // start node
      if (row == 13 && col == 8) {
        node.setAttribute("class", "");
        node.classList.add("start");
        node.classList.add("unvisited");
        node.style.backgroundColor = "red";
        node.style.borderColor = "red";
      }
      // target node
      else if (row == 13 && col == 55) {
        node.setAttribute("class", "");
        node.classList.add("target");
        node.style.backgroundColor = "green";
        node.style.borderColor = "green";
      }
      // other nodes
      else {
        node.setAttribute("class", "");
        node.classList.add("unvisited");
        node.style.backgroundColor = "white";
        node.style.borderColor = "lightgray";
      }
      targetReached = false;
      dfsShortestPath = [];
      bfsVisited = [];
      bfsShortestPath = [];
      astarVisited = [];
      astarShortestPath = [];
      greedyBestFirstSearchVisited = [];
      greedyBestFirstSearchShortestPath = [];
      djikstraVisited = [];
      djikstraShortestPath = [];
      node.textContent = "";
    }
  }
}

/////////////////////////////////////////// bfs ///////////////////////////////////////////

// if array length is odd, need to change first node animation

function resetAnimationForAllValidNodes(numberOfRows, numberOfCols) {
  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfCols; col++) {
      let node = document.getElementById(`${row}-${col}`);
      // start node
      if (row == 13 && col == 8) {
        continue;
      }
      // target node
      else if (row == 13 && col == 55) {
        continue;
      }
      // if node is not wall
      else if (node.classList.contains("wall") == false) {
        node.style.animation = "resetPathAnimation 0s";
      }
    }
  }
}

function bfsPathColorAnimation(array) {
  for (let i = 0; i < array.length; i++) {
    setTimeout(() => {
      let node = array[i];
      if (
        node.classList.contains("start") == false &&
        node.classList.contains("target") == false
      ) {
        changeNodeColor(node, mainPathColor);
        node.style.animation = "foundFirstPath 0.5s";
      }
      node.style.borderColor = mainPathBorderColor;
    }, pathSpeed * i);
  }
  resetAnimationForAllValidNodes(27, 64);
}

function bfsShortestPathAnimation(array) {
  array.reverse();
  for (let i = 0; i < array.length - 1; i++) {
    setTimeout(() => {
      let node = array[i];
      let domNode = document.getElementById(`${node.row}-${node.col}`);
      if (
        domNode.classList.contains("start") == false &&
        domNode.classList.contains("target") == false
      ) {
        changeNodeColor(domNode, shortPathColor);
        domNode.style.animation = "foundShortestPath 2s";
        domNode.style.borderColor = shortPathBorderColor;
        // add numbers to final path
        // domNode.textContent = `${i}`;
        console.log(domNode);
        if (i == array.length - 2) {
          enableButton();
        }
      }
    }, finishedPathSpeed * i);
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
  let node = new bfsNode(
    currentNode.row + rowIncrement,
    currentNode.col + colIncrement,
    currentNode
  );
  if (queue.includes(node) == false) {
    queue.push(node);
  }
}

function bfs(row, col) {
  let startNode = new bfsNode(row, col, null);
  let queue = [startNode];
  while (queue.length > 0) {
    let currentNode = queue.shift();
    let domNode = document.getElementById(
      `${currentNode.row}-${currentNode.col}`
    );
    if (domNode.classList.contains("target")) {
      let node = currentNode;
      while (true) {
        bfsShortestPath.push(node);
        node = node.parent;
        if (node == null) {
          break;
        }
      }
      break;
    } else if (
      domNode.classList.contains("wall") == false &&
      domNode.classList.contains("visited") == false
    ) {
      markNodeAsVisited(domNode);
      bfsVisited.push(domNode);

      if (currentNode.row - 1 >= 0) {
        addNodeToQueue(currentNode, queue, -1, 0);
      }

      if (currentNode.row + 1 <= 26) {
        addNodeToQueue(currentNode, queue, 1, 0);
      }

      if (currentNode.col + 1 <= 63) {
        addNodeToQueue(currentNode, queue, 0, 1);
      }

      if (currentNode.col - 1 >= 0) {
        addNodeToQueue(currentNode, queue, 0, -1);
      }
    }
  }
}

/////////////////////////////////////////// astar ///////////////////////////////////////////

function isNodeInVisited(array, row, col) {
  for (let i = 0; i < array.length; i++) {
    let node = array[i];
    if (node.row == row && node.col == col) {
      return true;
    }
    return false;
  }
}

function addCurrentNodeToQueue(queue, node) {
  queue.push(node);
}

function updateNodeInQueue(queue, node) {
  // update g value of node

  for (let i = 0; i < queue.length; i++) {
    let existingNode = queue[i];
    if (existingNode.row == row && existingNode.col == col) {
      if (node.g < existingNode.g) {
        existingNode.g = node.g;
        existingNode.parent = node.parent;
      }
    }
  }
}

function isNodeInQueue(queue, node) {
  if (queue.includes(node)) {
    // update node's g attribute and parent attribute, if necessary.
    updateNodeInQueue(queue, node);
  } else {
    // add node to queue
    addCurrentNodeToQueue(queue, node);
  }
}

// g = cost so far to reach node n, f = manhattan distance.
class aStarNode {
  constructor(parent, row, col, g, h, f) {
    this.parent = parent;
    this.row = row;
    this.col = col;
    this.g = g;
    this.h = h;
    this.f = f;
  }
}

function aStarSearch(startRow, startCol) {
  let distanceToTarget = manhattanDistance(startRow, startCol);
  let startNode = new aStarNode(
    null,
    startRow,
    startCol,
    0,
    distanceToTarget,
    0 + distanceToTarget
  );
  let queue = [startNode];
  let visited = [];
  while (queue.length > 0) {
    let currentNode = queue[0];
    // set currentNode to queue element with lowest f value
    for (let i = 0; i < queue.length; i++) {
      let node = queue[i];
      if (node.f <= currentNode.f) {
        currentNode = node;
      }
    }
    // if node is target
    if (currentNode.row == 13 && currentNode.col == 55) {
      let node = currentNode;
      while (true) {
        astarShortestPath.push(node);
        node = node.parent;
        if (node == null) {
          break;
        }
      }
      return;
    }
    const currentNodeIdx = queue.indexOf(currentNode);
    // We splice an array from the queue -- not an element!
    let pluckedArray = queue.splice(currentNodeIdx, 1); // 2nd parameter means remove one item only
    let pluckedNode = pluckedArray[0];
    visited.push(pluckedNode);
    let domNode = document.getElementById(
      `${pluckedNode.row}-${pluckedNode.col}`
    );
    if (
      domNode.classList.contains("wall") == false &&
      domNode.classList.contains("visited") == false
    ) {
      markNodeAsVisited(domNode);
      astarVisited.push(domNode);

      // check if adjacent node has same row and column as currentNode
      let firstNeighbor = isNodeInVisited(
        visited,
        pluckedNode.row - 1,
        pluckedNode.col
      );
      let secondNeighbor = isNodeInVisited(
        visited,
        pluckedNode.row,
        pluckedNode.col + 1
      );
      let thirdNeighbor = isNodeInVisited(
        visited,
        pluckedNode.row + 1,
        pluckedNode.col
      );
      let fourthNeighbor = isNodeInVisited(
        visited,
        pluckedNode.row,
        pluckedNode.col - 1
      );
      // store booleans (which tell us whether node is in VISITED)
      let children = [
        firstNeighbor,
        secondNeighbor,
        thirdNeighbor,
        fourthNeighbor,
      ];

      for (let i = 0; i < children.length; i++) {
        // if node not in visited
        if (children[i] == false) {
          if (i == 0) {
            if (pluckedNode.row - 1 >= 0) {
              let g = pluckedNode.g + 1;
              let h = manhattanDistance(pluckedNode.row - 1, pluckedNode.col);
              let childNode = new aStarNode(
                pluckedNode,
                pluckedNode.row - 1,
                pluckedNode.col,
                g,
                h,
                g + h
              );
              isNodeInQueue(queue, childNode);
            }
          }
          if (i == 1) {
            if (pluckedNode.col + 1 <= 63) {
              let g = pluckedNode.g + 1;
              let h = manhattanDistance(pluckedNode.row, pluckedNode.col + 1);
              let childNode = new aStarNode(
                pluckedNode,
                pluckedNode.row,
                pluckedNode.col + 1,
                g,
                h,
                g + h
              );
              isNodeInQueue(queue, childNode);
            }
          }
          if (i == 2) {
            if (pluckedNode.row + 1 <= 26) {
              let g = pluckedNode.g + 1;
              let h = manhattanDistance(pluckedNode.row + 1, pluckedNode.col);
              let childNode = new aStarNode(
                pluckedNode,
                pluckedNode.row + 1,
                pluckedNode.col,
                g,
                h,
                g + h
              );
              isNodeInQueue(queue, childNode);
            }
          }
          if (i == 3) {
            if (pluckedNode.col - 1 >= 0) {
              let g = pluckedNode.g + 1;
              let h = manhattanDistance(pluckedNode.row, pluckedNode.col - 1);
              let childNode = new aStarNode(
                pluckedNode,
                pluckedNode.row,
                pluckedNode.col - 1,
                g,
                h,
                g + h
              );
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

function greedyBestFirstSearch(startRow, startCol) {
  let heuristicValue = manhattanDistance(startRow, startCol);
  let startNode = new greedyBestFirstNode(
    null,
    startRow,
    startCol,
    heuristicValue
  );
  let queue = [startNode];
  let visited = [];
  while (queue.length > 0) {
    let currentNode = queue[0];
    // set currentNode to queue element with lowest manhattan value
    for (let i = 0; i < queue.length; i++) {
      let node = queue[i];
      if (node.manhattan < currentNode.manhattan) {
        currentNode = node;
      }
    }
    // if node is target
    if (currentNode.row == 13 && currentNode.col == 55) {
      let node = currentNode;
      while (true) {
        greedyBestFirstSearchShortestPath.push(node);
        node = node.parent;
        if (node == null) {
          break;
        }
      }
      return;
    }
    const currentNodeIdx = queue.indexOf(currentNode);
    // We splice an array from the queue -- not an element!
    let pluckedArray = queue.splice(currentNodeIdx, 1); // 2nd parameter means remove one item only
    let pluckedNode = pluckedArray[0];
    visited.push(pluckedNode);
    let domNode = document.getElementById(
      `${pluckedNode.row}-${pluckedNode.col}`
    );
    if (
      domNode.classList.contains("wall") == false &&
      domNode.classList.contains("visited") == false
    ) {
      markNodeAsVisited(domNode);
      greedyBestFirstSearchVisited.push(domNode);

      // check if adjacent node has same row and column as currentNode
      let firstNeighbor = isNodeInVisited(
        visited,
        pluckedNode.row - 1,
        pluckedNode.col
      );
      let secondNeighbor = isNodeInVisited(
        visited,
        pluckedNode.row,
        pluckedNode.col + 1
      );
      let thirdNeighbor = isNodeInVisited(
        visited,
        pluckedNode.row + 1,
        pluckedNode.col
      );
      let fourthNeighbor = isNodeInVisited(
        visited,
        pluckedNode.row,
        pluckedNode.col - 1
      );
      // store booleans (which tell us whether node is in VISITED)
      let children = [
        firstNeighbor,
        secondNeighbor,
        thirdNeighbor,
        fourthNeighbor,
      ];

      for (let i = 0; i < children.length; i++) {
        // if node not in visited
        if (children[i] == false) {
          if (i == 0) {
            if (pluckedNode.row - 1 >= 0) {
              let heuristicValue = manhattanDistance(
                pluckedNode.row - 1,
                pluckedNode.col
              );
              let childNode = new greedyBestFirstNode(
                pluckedNode,
                pluckedNode.row - 1,
                pluckedNode.col,
                heuristicValue
              );
              addCurrentNodeToQueue(queue, childNode);
            }
          }
          if (i == 1) {
            if (pluckedNode.col + 1 <= 63) {
              let heuristicValue = manhattanDistance(
                pluckedNode.row,
                pluckedNode.col + 1
              );
              let childNode = new greedyBestFirstNode(
                pluckedNode,
                pluckedNode.row,
                pluckedNode.col + 1,
                heuristicValue
              );
              addCurrentNodeToQueue(queue, childNode);
            }
          }
          if (i == 2) {
            if (pluckedNode.row + 1 <= 26) {
              let heuristicValue = manhattanDistance(
                pluckedNode.row + 1,
                pluckedNode.col
              );
              let childNode = new greedyBestFirstNode(
                pluckedNode,
                pluckedNode.row + 1,
                pluckedNode.col,
                heuristicValue
              );
              addCurrentNodeToQueue(queue, childNode);
            }
          }
          if (i == 3) {
            if (pluckedNode.col - 1 >= 0) {
              let heuristicValue = manhattanDistance(
                pluckedNode.row,
                pluckedNode.col - 1
              );
              let childNode = new greedyBestFirstNode(
                pluckedNode,
                pluckedNode.row,
                pluckedNode.col - 1,
                heuristicValue
              );
              addCurrentNodeToQueue(queue, childNode);
            }
          }
        }
      }
    }
  }
}

/////////////////////////////////////////// dijkstra's ///////////////////////////////////////////

class dijkstraNode {
  constructor(parent, row, col, distance) {
    this.parent = parent;
    this.row = row;
    this.col = col;
    this.distance = distance;
  }
}

function updateNodeDistanceInQueue(queue, node, row, col) {
  for (let i = 0; i < queue.length; i++) {
    let existingNode = queue[i];
    if (existingNode.row == row && existingNode.col == col) {
      if (node.distance + 1 < existingNode.distance) {
        existingNode.distance = node.distance + 1;
        // we want to set the existing node's parent to the plucked node
        existingNode.parent = node;
      }
    }
  }
}

function helper(currentNode, nodeQueue, queue) {
  if (currentNode.row - 1 >= 0) {
    let newNode = new dijkstraNode(
      null,
      currentNode.row - 1,
      currentNode.col,
      Number.MAX_SAFE_INTEGER
    );
    let domNode = document.getElementById(
      `${currentNode.row - 1}-${currentNode.col}`
    );
    if (queue.includes(domNode) == false) {
      queue.push(domNode);
      nodeQueue.push(newNode);
      helper(newNode, nodeQueue, queue);
    }
  }
  if (currentNode.col + 1 <= 63) {
    let newNode = new dijkstraNode(
      null,
      currentNode.row,
      currentNode.col + 1,
      Number.MAX_SAFE_INTEGER
    );
    let domNode = document.getElementById(
      `${currentNode.row}-${currentNode.col + 1}`
    );
    if (queue.includes(domNode) == false) {
      queue.push(domNode);
      nodeQueue.push(newNode);
      helper(newNode, nodeQueue, queue);
    }
  }
  if (currentNode.row + 1 <= 26) {
    let newNode = new dijkstraNode(
      null,
      currentNode.row + 1,
      currentNode.col,
      Number.MAX_SAFE_INTEGER
    );
    let domNode = document.getElementById(
      `${currentNode.row + 1}-${currentNode.col}`
    );
    if (queue.includes(domNode) == false) {
      queue.push(domNode);
      nodeQueue.push(newNode);
      helper(newNode, nodeQueue, queue);
    }
  }
  if (currentNode.col - 1 >= 0) {
    let newNode = new dijkstraNode(
      null,
      currentNode.row,
      currentNode.col - 1,
      Number.MAX_SAFE_INTEGER
    );
    let domNode = document.getElementById(
      `${currentNode.row}-${currentNode.col - 1}`
    );
    if (queue.includes(domNode) == false) {
      queue.push(domNode);
      nodeQueue.push(newNode);
      helper(newNode, nodeQueue, queue);
    }
  }
}

let djikstraVisited = [];
let djikstraShortestPath = [];

function djikstras(startRow, startCol) {
  let startNode = new dijkstraNode(null, startRow, startCol, 0);
  let nodeQueue = [startNode];
  let domNodeQueue = [];
  helper(startNode, nodeQueue, domNodeQueue);
  // set other nodes distance to INF
  while (nodeQueue.length > 0) {
    let currentNode = nodeQueue[0];
    // set currentNode to queue element with lowest distance value
    for (let i = 0; i < nodeQueue.length; i++) {
      let node = nodeQueue[i];
      if (node.distance < currentNode.distance) {
        currentNode = node;
      }
    }
    // if node is target
    if (currentNode.row == 13 && currentNode.col == 55) {
      let node = currentNode;
      while (true) {
        djikstraShortestPath.push(node);
        console.log(node);
        node = node.parent;
        if (node == null) {
          break;
        }
      }
      break;
    }
    const currentNodeIdx = nodeQueue.indexOf(currentNode);
    // We splice an array from the queue -- not an element!
    let pluckedArray = nodeQueue.splice(currentNodeIdx, 1); // 2nd parameter means remove one item only
    let pluckedNode = pluckedArray[0];

    let domNode = document.getElementById(
      `${pluckedNode.row}-${pluckedNode.col}`
    );
    if (
      domNode.classList.contains("wall") == false &&
      domNode.classList.contains("visited") == false
    ) {
      djikstraVisited.push(domNode);
      markNodeAsVisited(domNode);

      if (pluckedNode.row - 1 >= 0) {
        let dom = document.getElementById(
          `${pluckedNode.row - 1}-${pluckedNode.col}`
        );
        if (dom.classList.contains("visited") == false) {
          updateNodeDistanceInQueue(
            nodeQueue,
            pluckedNode,
            pluckedNode.row - 1,
            pluckedNode.col
          );
        }
      }
      if (pluckedNode.col + 1 <= 63) {
        let dom = document.getElementById(
          `${pluckedNode.row}-${pluckedNode.col + 1}`
        );
        if (dom.classList.contains("visited") == false) {
          updateNodeDistanceInQueue(
            nodeQueue,
            pluckedNode,
            pluckedNode.row,
            pluckedNode.col + 1
          );
        }
      }
      if (pluckedNode.row + 1 <= 26) {
        let dom = document.getElementById(
          `${pluckedNode.row + 1}-${pluckedNode.col}`
        );
        if (dom.classList.contains("visited") == false) {
          updateNodeDistanceInQueue(
            nodeQueue,
            pluckedNode,
            pluckedNode.row + 1,
            pluckedNode.col
          );
        }
      }
      if (pluckedNode.col - 1 >= 0) {
        let dom = document.getElementById(
          `${pluckedNode.row}-${pluckedNode.col - 1}`
        );
        if (dom.classList.contains("visited") == false) {
          updateNodeDistanceInQueue(
            nodeQueue,
            pluckedNode,
            pluckedNode.row,
            pluckedNode.col - 1
          );
        }
      }
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////

// gameBoard must be an id -- it can't be a class.
let gameBoard = document.getElementById("gameBoard");
let numberOfRows = 27;
let numberOfCols = 64;
let wallColor = "rgb(24, 52, 69)";
makeGrid(gameBoard, numberOfRows, numberOfCols);
createUnvisitedAndTargetNodes(numberOfRows, numberOfCols);
let pathSpeed = 0;
let finishedPathSpeed = 45;
let targetReached = false;
let dfsShortestPath = [];
let unvisitedNodes = gameBoard.querySelectorAll(":scope > .unvisited");
let mouseDown = false;
window.onmousedown = () => (mouseDown = true);
window.onmouseup = () => (mouseDown = false);
unvisitedNodes.forEach((node) => {
  node.addEventListener("mousedown", drawWall);
  node.addEventListener("mouseover", drawWall);
});
let visualizeButton = document.getElementById("visualizeButton");
let row = 13;
let col = 8;
let shortPathColor = "rgb(65, 255, 172)";
let shortPathBorderColor = "lightskyblue";
let mainPathColor = "rgb(124, 91, 255)";
let mainPathBorderColor = "rebeccapurple";
// don't forget to reset these to empty arrays when you clear the board!
let bfsVisited = [];
let bfsShortestPath = [];
let astarVisited = [];
let astarShortestPath = [];
let greedyBestFirstSearchVisited = [];
let greedyBestFirstSearchShortestPath = [];
let startNode = document.getElementById(`${row}-${col}`);
changeNodeColor(startNode, "red");

let algorithmToVisualize = "";
let defaultPathButtonColor = "tomato";
let clickedPathButtonColor = "rgb(116, 250, 192)";
// dfs button
let dfsButton = document.getElementById("dfsButton");
dfsButton.addEventListener("click", () => {
  algorithmToVisualize = "dfs";
  changePathButtonsColors(algorithmToVisualize);
});

// bfs button
let bfsButton = document.getElementById("bfsButton");
bfsButton.addEventListener("click", () => {
  algorithmToVisualize = "bfs";
  changePathButtonsColors(algorithmToVisualize);
});

// astar button
let astarButton = document.getElementById("astarButton");
astarButton.addEventListener("click", () => {
  algorithmToVisualize = "astar";
  changePathButtonsColors(algorithmToVisualize);
});

// greedy best-first button
let greedyBestFirstSearchButton = document.getElementById(
  "greedyBestFirstSearchButton"
);
greedyBestFirstSearchButton.addEventListener("click", () => {
  algorithmToVisualize = "greedyBestFirst";
  changePathButtonsColors(algorithmToVisualize);
});

// djikstra button
let djikstraButton = document.getElementById("djikstraButton");
djikstraButton.addEventListener("click", () => {
  algorithmToVisualize = "djikstra";
  changePathButtonsColors(algorithmToVisualize);
});

function changePathButtonsColors(sortType) {
  if (sortType == "dfs") {
    dfsButton.style.color = clickedPathButtonColor;
    bfsButton.style.color = defaultPathButtonColor;
    astarButton.style.color = defaultPathButtonColor;
    greedyBestFirstSearchButton.style.color = defaultPathButtonColor;
    djikstraButton.style.color = defaultPathButtonColor;
  } else if (sortType == "bfs") {
    dfsButton.style.color = defaultPathButtonColor;
    bfsButton.style.color = clickedPathButtonColor;
    astarButton.style.color = defaultPathButtonColor;
    greedyBestFirstSearchButton.style.color = defaultPathButtonColor;
    djikstraButton.style.color = defaultPathButtonColor;
  } else if (sortType == "astar") {
    dfsButton.style.color = defaultPathButtonColor;
    bfsButton.style.color = defaultPathButtonColor;
    astarButton.style.color = clickedPathButtonColor;
    greedyBestFirstSearchButton.style.color = defaultPathButtonColor;
    djikstraButton.style.color = defaultPathButtonColor;
  } else if (sortType == "greedyBestFirst") {
    dfsButton.style.color = defaultPathButtonColor;
    bfsButton.style.color = defaultPathButtonColor;
    astarButton.style.color = defaultPathButtonColor;
    greedyBestFirstSearchButton.style.color = clickedPathButtonColor;
    djikstraButton.style.color = defaultPathButtonColor;
  } else if (sortType == "djikstra") {
    dfsButton.style.color = defaultPathButtonColor;
    bfsButton.style.color = defaultPathButtonColor;
    astarButton.style.color = defaultPathButtonColor;
    greedyBestFirstSearchButton.style.color = defaultPathButtonColor;
    djikstraButton.style.color = clickedPathButtonColor;
  }
}

// Speed buttons

let speedOption = "";
let slowButton = document.getElementById("slow-button");
slowButton.addEventListener("click", () => {
  changeSpeedButtonsColors("slow");
  pathSpeed = 45;
});

let mediumButton = document.getElementById("medium-button");
mediumButton.addEventListener("click", () => {
  changeSpeedButtonsColors("medium");
  pathSpeed = 30;
});

let fastButton = document.getElementById("fast-button");
fastButton.addEventListener("click", () => {
  changeSpeedButtonsColors("fast");
  pathSpeed = 15;
});

let defaultSpeedButtonColor = "tomato";
let clickedSpeedButtonColor = "cyan";
function changeSpeedButtonsColors(sortType) {
  if (sortType == "slow") {
    slowButton.style.color = clickedSpeedButtonColor;
    mediumButton.style.color = defaultSpeedButtonColor;
    fastButton.style.color = defaultSpeedButtonColor;
  } else if (sortType == "medium") {
    mediumButton.style.color = clickedSpeedButtonColor;
    slowButton.style.color = defaultSpeedButtonColor;
    fastButton.style.color = defaultSpeedButtonColor;
  } else if (sortType == "fast") {
    fastButton.style.color = clickedSpeedButtonColor;
    slowButton.style.color = defaultSpeedButtonColor;
    mediumButton.style.color = defaultSpeedButtonColor;
  }
}

function clearNodesThatAreNotWalls(numberOfRows, numberOfCols) {
  for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfCols; col++) {
      let node = document.getElementById(`${row}-${col}`);
      // start node
      if (row == 13 && col == 8) {
        node.setAttribute("class", "");
        node.classList.add("start");
        node.classList.add("unvisited");
        node.style.backgroundColor = "red";
        node.style.borderColor = "red";
      }
      // target node
      else if (row == 13 && col == 55) {
        node.setAttribute("class", "");
        node.classList.add("target");
        node.style.backgroundColor = "green";
        node.style.borderColor = "green";
      }
      // if node is not wall
      else if (node.classList.contains("wall") == false) {
        node.setAttribute("class", "");
        node.classList.add("unvisited");
        node.style.backgroundColor = "white";
        node.style.borderColor = "lightgray";
      }
      targetReached = false;
      dfsShortestPath = [];
      bfsVisited = [];
      bfsShortestPath = [];
      astarVisited = [];
      astarShortestPath = [];
      greedyBestFirstSearchVisited = [];
      greedyBestFirstSearchShortestPath = [];
      djikstraVisited = [];
      djikstraShortestPath = [];
    }
  }
}
function disableButton() {
  visualizeButton.style.animation = "resetVisualizeButton 0s";
  document.getElementById("visualizeButton").disabled = true;
  visualizeButton.style.backgroundColor = "red";
  document.getElementById("clear-board-button").disabled = true;
  clearBoardButton.style.color = "red";
  document.getElementById("generate-random-walls-button").disabled = true;
  generateRandomWallsButton.style.color = "red";
}

function enableButton() {
  document.getElementById("visualizeButton").disabled = false;
  visualizeButton.style.backgroundColor = "rgb(124, 91, 255)";
  visualizeButton.style.animation = "restoreVisualizeButton 2s";
  document.getElementById("clear-board-button").disabled = false;
  clearBoardButton.style.color = "#d8d8d8";
  document.getElementById("generate-random-walls-button").disabled = false;
  generateRandomWallsButton.style.color = "#d8d8d8";
}

startNode.classList.add("start");
visualizeButton.addEventListener("click", () => {
  clearNodesThatAreNotWalls(numberOfRows, numberOfCols);
  disableButton();
  if (algorithmToVisualize == "dfs") {
    beginDFS(startNode, row, col);
  } else if (algorithmToVisualize == "bfs") {
    bfs(row, col);
    bfsPathColorAnimation(bfsVisited);
    let timeToFinishBluePath = pathSpeed * bfsVisited.length;
    setTimeout(() => {
      bfsShortestPathAnimation(bfsShortestPath);
    }, timeToFinishBluePath);
  } else if (algorithmToVisualize == "astar") {
    aStarSearch(row, col);
    bfsPathColorAnimation(astarVisited);
    let timeToFinishBluePath = pathSpeed * astarVisited.length;
    setTimeout(() => {
      bfsShortestPathAnimation(astarShortestPath);
    }, timeToFinishBluePath);
  } else if (algorithmToVisualize == "greedyBestFirst") {
    greedyBestFirstSearch(row, col);
    bfsPathColorAnimation(greedyBestFirstSearchVisited);
    let timeToFinishBluePath = pathSpeed * greedyBestFirstSearchVisited.length;
    setTimeout(() => {
      bfsShortestPathAnimation(greedyBestFirstSearchShortestPath);
    }, timeToFinishBluePath);
  } else if (algorithmToVisualize == "djikstra") {
    djikstras(row, col);
    bfsPathColorAnimation(djikstraVisited);
    let timeToFinishBluePath = pathSpeed * djikstraVisited.length;
    setTimeout(() => {
      bfsShortestPathAnimation(djikstraShortestPath);
    }, timeToFinishBluePath);
  }
});

// Random board generator

let generateRandomWallsButton = document.getElementById(
  "generate-random-walls-button"
);
generateRandomWallsButton.addEventListener("click", () => {
  clearBoard(numberOfRows, numberOfCols);
  unvisitedNodes.forEach((node) => {
    let randomNumber = getRandomInt(0, 3);
    if (
      randomNumber == 0 &&
      node.classList.contains("start") == false &&
      node.classList.contains("target") == false
    ) {
      drawWallWithButton(node, wallColor);
    }
  });
});

let clearBoardButton = document.getElementById("clear-board-button");
clearBoardButton.addEventListener("click", () => {
  clearBoard(numberOfRows, numberOfCols);
});

// Click events

let clickEventOne = new Event("click");
fastButton.dispatchEvent(clickEventOne);

let clickEventTwo = new Event("click");
dfsButton.dispatchEvent(clickEventTwo);
