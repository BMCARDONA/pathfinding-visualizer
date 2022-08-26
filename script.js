function makeGrid(numRows, numCols) {
    gameBoard.style.setProperty('--numRows', numRows); 
    gameBoard.style.setProperty('--numCols', numCols); 
}

function appendDivsToBoard(numberOfRows, numberOfCols) {
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

function colorFirstPath(array) {
    timeToFinishBluePath = 0
    for (let i = 0; i < array.length; i++) {
        setTimeout(() => {
            let currentNodeOnPath = array[i];
            currentNodeOnPath.style.backgroundColor = 'blue';
            // getManhattanDistance(currentNodeOnPath);
        }, 10 * i);  
        timeToFinishBluePath = 10 * array.length;
    }

}

function markNodeAsVisited(node) {
    node.classList.remove('unvisited');
    node.classList.add('visited');
}

  

function DFS(startNode) {
    let stack = [startNode];
    let visitedNodesInOrder = new Set();
    while (stack.length !== 0) {
        currentNode = stack.pop();
        visitedNodesInOrder.add(currentNode);
        markNodeAsVisited(currentNode)
        let row = getNodeRow(currentNode); 
        let col = getNodeColumn(currentNode); 

        function notTargetNode(parentNode, row, col) {
            let childNode = document.getElementById(`${row}-${col}`);
            if (childNode.classList.contains('visited') == false && childNode.classList.contains('wall') == false) {
                stack.push(childNode);
                childNode = new Node(parentNode);
                console.log(childNode.parent);
            } 
        }
        
        function targetNode(node) {
            while (node.parent) {
                node.parent.style.backgroundColor = 'yellow';
                node = node.parent;
            }
        }

        if (currentNode.classList.contains('target')) {
            targetNode(currentNode);
            break;
        }

        // leftNode, bottomNode, rightNode, topNode
        if ((col - 1 >= 0)) {
            notTargetNode(currentNode, row, col - 1);
        }
        if ((row + 1 <= 26)) {
            notTargetNode(currentNode, row + 1, col);
        }
        if ((col + 1 <= 63)) {
            notTargetNode(currentNode, row, col + 1);
        }
        if ((row - 1 >= 0)) {
            notTargetNode(currentNode, row - 1, col);
        }
    }

    arrayOfVisitedNodesInOrder = Array.from(visitedNodesInOrder);
    colorFirstPath(arrayOfVisitedNodesInOrder);
    return;
}

////////////////////////////////////////////////////////////////////////////////////

class Node {
    constructor(parent=false, child=false, visited=false, firstPathColor = "blue", shortestPathColor="yellow") {
        this.parent = parent;
        this.child = child;
        this.visited = visited;
        this.firstPathColor = firstPathColor;
        this.shortestPathColor = shortestPathColor;
    }
}


let gameBoard = document.getElementById('gameBoard');
let numberOfRows = 27
let numberOfCols = 64
let mouseDown = false
window.onmousedown = () => mouseDown = true;
window.onmouseup = () => mouseDown = false;
makeGrid(numberOfRows, numberOfCols) 
appendDivsToBoard(numberOfRows, numberOfCols)


let unvisitedNodes = gameBoard.querySelectorAll(":scope > .unvisited");
unvisitedNodes.forEach(node => {
    node.addEventListener('mousedown', drawWall);
    node.addEventListener('mouseover', drawWall);
    node.addEventListener('click', () => {
        let row = getNodeRow(node); 
        let col = getNodeColumn(node); 
        let startNode = document.getElementById(`${row}-${col}`)
        startNode.classList.add('start');
        DFS(startNode);
    })
});
