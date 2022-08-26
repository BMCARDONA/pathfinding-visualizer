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
    timeToFinishBluePath = 0
    for (let i = 0; i < array.length; i++) {
        setTimeout(() => {
            let currentNodeOnPath = array[i];
            currentNodeOnPath.style.backgroundColor = 'blue';
            // getManhattanDistance(currentNodeOnPath);
        }, 10 * i);  
        timeToFinishBluePath = 10 * array.length;
    }
    // setTimeout(() => {
    //     for (let k = 0; k < array.length; k++) {
    //         setTimeout(() => {
    //             let currentNodeOnPath = array[k];
    //             currentNodeOnPath.style.backgroundColor = 'yellow';
    //             // getManhattanDistance(currentNodeOnPath);
    //         }, 10 * k);
    //     }
    // }, timeToFinishBluePath)
    setTimeout(() => {
        for (let k = 0; k < array.length; k++) {
            setTimeout(() => {
                let currentNodeOnPath = array[k];
                if (currentNodeOnPath.classList.contains('dead-end')) {
                    currentNodeOnPath.style.background = 'orange';
                }    
                // else if (currentNodeOnPath.classList.contains('fork')) {
                //     currentNodeOnPath.style.background = 'purple';
                // }  
                // currentNodeOnPath.style.backgroundColor = 'yellow';
                // getManhattanDistance(currentNodeOnPath);
            }, 10 * k);
        }
    }, timeToFinishBluePath)

}

function markNodeAsVisited(node) {
    node.classList.remove('unvisited');
    node.classList.add('visited');
}


// function labelForkNodes(array) {
//     for (let i = 0; i < array.length; i++) {
//         node = array[i];
//         if (node.classList.contains('fork')) {
//             node.style.background = 'orange';
//         }
//     }
// }


class Node {
    constructor(child, parent=null) {
      this.child = child;
      this.parent = parent;
    }
  }
  

function DFS(node) {
    let stack = [node]
    node.textContent = '1'
    let visitedNodesInOrder = new Set();
    while (stack.length !== 0) {
        currentNode = stack.pop();
        visitedNodesInOrder.add(currentNode);
        markNodeAsVisited(currentNode)
        let row = getNodeRow(currentNode); 
        let col = getNodeColumn(currentNode); 
        let possiblePathsForNode = 0;
        let numberOfBarriers = 0; 


        function generalFunction(currentNode, row, col) {
            let childNode = document.getElementById(`${row}-${col}`);
            if (childNode.classList.contains('visited') == false && childNode.classList.contains('wall') == false) {
                let count = parseInt(currentNode.textContent) + 1;
                currentNode = new Node(childNode);
                // let childNode = new Node(null, currentNode);
                currentNode.child.textContent = `${count}`
                stack.push(childNode);
                possiblePathsForNode += 1;
            } 
            else if (childNode.classList.contains('wall')) {
                numberOfBarriers += 1;
            }
        }
        
        if (currentNode.classList.contains('target')) {
            break;
        }

        // leftNode, bottomNode, rightNode, topNode
        (col - 1 >= 0) ? generalFunction(currentNode, row, col - 1) : numberOfBarriers += 1;
        (row + 1 <= 26) ? generalFunction(currentNode, row + 1, col) : numberOfBarriers += 1;
        (col + 1 <= 63) ? generalFunction(currentNode, row, col + 1) : numberOfBarriers += 1;
        (row - 1 >= 0) ? generalFunction(currentNode, row - 1, col) : numberOfBarriers += 1;

        
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