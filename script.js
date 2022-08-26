// gameBoard must be an id -- it can't be a class. 
let gameBoard = document.getElementById('gameBoard');
let numberOfRows = 27
let numberOfCols = 64
let mouseDown = false
window.onmousedown = () => mouseDown = true;
window.onmouseup = () => mouseDown = false;

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

function getManhattanDistance(node) {
    let row = getNodeRow(node); 
    let col = getNodeColumn(node); 
    let manhattanDistance = Math.abs(13 - row) + Math.abs(55 - col);
    node.classList.add(`${manhattanDistance}`);
    node.textContent = `${manhattanDistance}`
}

function showPathToTargetNode(array) {
    for (let i = 0; i < array.length; i++) {
        setTimeout(() => {
            let currentNodeOnPath = array[i];
            currentNodeOnPath.style.backgroundColor = 'blue';
            // getManhattanDistance(currentNodeOnPath);
        }, 10 * i);
    }
}

function markNodeAsVisited(node) {
    node.classList.remove('unvisited');
    node.classList.add('visited');
}

function DFS(node) {
    let stack = [node]
    let visitedNodesInOrder = new Set();
    while (stack.length !== 0) {
        currentNode = stack.pop();
        visitedNodesInOrder.add(currentNode);
        markNodeAsVisited(currentNode)

        let possiblePathsForNode = 0;
        let numberOfBarriers = 0; 
        let row = getNodeRow(currentNode); 
        let col = getNodeColumn(currentNode); 


        function generalFunction(row, col) {
            let node = document.getElementById(`${row}-${col}`);
            if (node.classList.contains('visited') == false && node.classList.contains('wall') == false) {
                stack.push(node);
                possiblePathsForNode += 1;
            } 
            else if (node.classList.contains('wall')) {
                numberOfBarriers += 1;
            }
        }
        
        if (currentNode.classList.contains('target')) {
            break;
        }

        // leftNode, bottomNode, rightNode, topNode
        (col - 1 >= 0) ? generalFunction(row, col - 1) : numberOfBarriers += 1;
        (row + 1 <= 26) ? generalFunction(row + 1, col) : numberOfBarriers += 1;
        (col + 1 <= 63) ? generalFunction(row, col + 1) : numberOfBarriers += 1;
        (row - 1 >= 0) ? generalFunction(row - 1, col) : numberOfBarriers += 1;

        if (possiblePathsForNode >= 2) {
            currentNode.classList.add('fork');
        }

        if (numberOfBarriers >= 3) {
            currentNode.classList.add('dead-end');
        }
    }

    arrayOfVisitedNodesInOrder = Array.from(visitedNodesInOrder);
    showPathToTargetNode(arrayOfVisitedNodesInOrder);
    return;
}


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
        let currentNode = document.getElementById(`${row}-${col}`)
        DFS(currentNode);
    })
});


makeGrid(numberOfRows, numberOfCols) 