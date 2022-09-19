// Helper Functions

function makeGrid(gameBoard, numRows, numCols) {
  gameBoard.style.setProperty('--numRows', numRows); 
  gameBoard.style.setProperty('--numCols', numCols); 
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawWallWithButton(node, wallColor) {
  if (node.classList.contains('unvisited')) {
    node.classList.remove('unvisited')
  }
  node.classList.add('wall');
  node.style.backgroundColor = wallColor;
  node.style.borderColor = wallColor;
  node.style.animation = "generateWalls 0.5s";
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


function manhattanDistance(row, col) {
  // Manhattan distance
  let distance = Math.abs(row - 13) + Math.abs(col - 55);
  return (distance); 
}


export { 
  makeGrid,
  getRandomInt,
  drawWallWithButton,
  changeNodeColor,
  markNodeAsVisited, 
  manhattanDistance
 };