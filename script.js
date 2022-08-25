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

// add "target" to one node, "unvisited" to other nodes
for (let row = 0; row < numberOfRows; row++) {
    for (let col = 0; col < numberOfCols; col++) {
        let div = document.createElement('div');
        div.id = `${row}-${col}`
        // target node
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

function drawWall(e) {
  if (mouseDown === true) {
    e.target.style.backgroundColor = "black";
    e.target.classList.remove('unvisited');
    e.target.classList.add('wall');
  }
}

let unvisitedNodes = gameBoard.querySelectorAll(":scope > .unvisited");
unvisitedNodes.forEach(node => {
    node.addEventListener('mousedown', drawWall);
    node.addEventListener('mouseover', drawWall);
    node.addEventListener('click', () => {
        let coordinates = node.id.split("-");
        let row = parseInt(coordinates[0]);
        let col = parseInt(coordinates[1]);
        // DFS
        let currentNode = document.getElementById(`${row}-${col}`)
        DFS(currentNode);
    })
});

// We're not using DFS to get all the nodes! We're using it till we reach a target node!

function DFS(node) {
  let stack = [node]
  let visitedNodesInOrder = new Set();
  while (stack.length !== 0) {
      currentNode = stack.pop();
      visitedNodesInOrder.add(currentNode);
      currentNode.classList.remove('unvisited');
      currentNode.classList.add('visited');
      let coordinates = currentNode.id.split("-");
      let row = parseInt(coordinates[0]);
      let col = parseInt(coordinates[1]);   
      
      // only put node on stack if it hasn't already been visited and isn't a wall

      if (currentNode.classList.contains('target')) {
        break;
      }

      let possiblePathsForNode = 0;
      let numberOfBarriers = 0;

      // leftNode
      if (col - 1 >= 0) {
        let leftNode = document.getElementById(`${row}-${col - 1}`);
        if (leftNode.classList.contains('visited') == false && leftNode.classList.contains('wall') == false) {
            stack.push(leftNode);
            possiblePathsForNode += 1;
        } 
        else if (leftNode.classList.contains('wall')) {
          numberOfBarriers += 1;
        }
      }   
      else {
        numberOfBarriers += 1;
      }

      // bottomNode
      if (row + 1 <= 26) {
        let bottomNode = document.getElementById(`${row + 1}-${col}`);
        if (bottomNode.classList.contains('visited') == false && bottomNode.classList.contains('wall') == false) {
            stack.push(bottomNode);
            possiblePathsForNode += 1;
        } 
        else if (bottomNode.classList.contains('wall')) {
          numberOfBarriers += 1;
        }
      }  
      else {
        numberOfBarriers += 1;
      }
      // rightNode
      if (col + 1 <= 63) {
        let rightNode = document.getElementById(`${row}-${col + 1}`);
        if (rightNode.classList.contains('visited') == false && rightNode.classList.contains('wall') == false) {
            stack.push(rightNode);
            possiblePathsForNode += 1;
        } 
        else if (rightNode.classList.contains('wall')) {
          numberOfBarriers += 1;
        }
      }  
      else {
        numberOfBarriers += 1;
      }
      // topNode
      if (row - 1 >= 0) {
        let topNode = document.getElementById(`${row - 1}-${col}`);
        if (topNode.classList.contains('visited') == false && topNode.classList.contains('wall') == false) {
            stack.push(topNode);
            possiblePathsForNode += 1;
        } 
        else if (topNode.classList.contains('wall')) {
          numberOfBarriers += 1;
        }
      }
      else {
        numberOfBarriers += 1;
      }

      if (possiblePathsForNode >= 2) {
        currentNode.classList.add('fork');
      }

      if (numberOfBarriers >= 3) {
        currentNode.classList.add('dead-end');
      }
  }
  // change set to array
  // Helpful link: https://stackoverflow.com/questions/16401216/iterate-over-set-elements
  

  d = [];

// need to re-do this...
  // label nodes between fork and dead-end as 'useless'
  c = Array.from(visitedNodesInOrder);
  c.reverse();
  let addUseless = false;
  for (let i = 0; i < c.length; i++) {
      let node = c[i];
      if (node.classList.contains('dead-end')) {
          addUseless = true;
      }
      else if (node.classList.contains('fork')) {
          addUseless = false;
      }
      if (addUseless) {
          node.classList.add('useless')
      }
      else {
          d.push(node);
      }
      console.log(node);
  }

  d.reverse()
  // console.log(d);




  b = Array.from(visitedNodesInOrder);
  for (let i = 0; i < b.length; i++) {
      targetReached = false;
      const node = b[i];
      // console.log(node);
      if (node.classList.contains('target')) {
          targetReached = true;
          length = i;
          let timeToFindNode = 0;
          for (let j = 0; j < length + 1; j++) {
              setTimeout(() => {
                const pathToTargetNode = b[j];
                pathToTargetNode.style.backgroundColor = 'blue';
              }, 10 * j);
              timeToFindNode = 10 * length + 1;
          }
          // setTimeout(() => {
          //   for (let k = 0; k < d.length; k++) {
          //       setTimeout(() => {
          //           const pathToTargetNode = d[k];
          //           pathToTargetNode.style.backgroundColor = 'yellow';
          //       }, 10 * k);
          //   }
          // }, timeToFindNode);
      }
  }
  return;
}

makeGrid(numberOfRows, numberOfCols) 
