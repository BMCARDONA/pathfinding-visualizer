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

function showPathToTargetNode(array) {
    timeToFinishBluePath = 0
    for (let i = 0; i < array.length; i++) {
        setTimeout(() => {
            let currentNodeOnPath = array[i];
            currentNodeOnPath.style.backgroundColor = 'blue';
            // getManhattanDistance(currentNodeOnPath);
        }, 10 * i);  
        timeToFinishBluePath = 10 * array.length;
    }
    setTimeout(() => {
        for (let k = 0; k < array.length; k++) {
            setTimeout(() => {
                let currentNodeOnPath = array[k];
                if (currentNodeOnPath.classList.contains('dead-end')) {
                    currentNodeOnPath.style.background = 'orange';
                }    
            }, 10 * k);
        }
    }, timeToFinishBluePath)

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

        function generalFunction(parentNode, row, col) {
            let childNode = document.getElementById(`${row}-${col}`);
            if (childNode.classList.contains('visited') == false && childNode.classList.contains('wall') == false) {
                stack.push(childNode);
                if (childNode.classList.contains('target')) {
                    childNode = new Node(parentNode, true);
                }
                else {
                    childNode = new Node(parentNode, false);
                }
                console.log(childNode.parent)

                if (childNode.isTarget) {
                    let node = childNode;
                    while (node.parent) {
                        node.parent.style.backgroundColor = 'yellow';
                        node = node.parent;
                    }
                }
            } 
        }
        
        if (currentNode.classList.contains('target')) {
            break;
        }

        // leftNode, bottomNode, rightNode, topNode
        if ((col - 1 >= 0)) {
            generalFunction(currentNode, row, col - 1)
        }
        if ((row + 1 <= 26)) {
            generalFunction(currentNode, row + 1, col)
        }
        if ((col + 1 <= 63)) {
            generalFunction(currentNode, row, col + 1)
        }
        if ((row - 1 >= 0)) {
            generalFunction(currentNode, row - 1, col)
        }
    }

    arrayOfVisitedNodesInOrder = Array.from(visitedNodesInOrder);
    showPathToTargetNode(arrayOfVisitedNodesInOrder);
    return;
}

////////////////////////////////////////////////////////////////////////////////////

class Node {
    constructor(parent, child) {
        this.parent = parent;
        this.child = child;
    }
}

class NodeVisited {
    constructor(visited=false) {
        this.visited = visited;
    }
}

class NodeDecorator {
    constructor(firstPathColor = "blue", shortestPathColor = "yellow") {
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
