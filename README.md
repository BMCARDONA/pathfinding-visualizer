# Pathfinding Visualizer
- Welcome to my pathfinding visualizer project! Access the live demo [here](https://bmcardona.github.io/pathfinding-visualizer/).

- This project was inspired by Clement Mihailescu's project of the same name (see his YouTube channel [here](https://www.youtube.com/channel/UCaO6VoaYJv4kS-TQO_M-N_g)) and CS50's Introduction to Artificial Intelligence with Python.

## Features
- [x] Search Algorithms:
  - [X] Depth-First Search
  - [X] Breadth-First Search
  - [X] Greedy Best-First Search
  - [X] A* Search
  - [X] Dijkstra's algorithm

- [X] Draw own path by clicking and dragging

- [X] Speed Adjustment:
  - [X] Slow
  - [X] Medium
  - [X] Fast


## Some Helpful Things I Learned:
- How to provide each div (in this case, each cell in the grid) with an id containing its respective coordinate.
- How to use querySelectorAll to retrieve direct children
- Javascript arrays are objects and you can't simply use the equality operator == to understand if the content of those objects is the same. The equality operator will only test if two OBJECTS are exactly the same instance (e.g., myObjVariable==myObjVariable, works for null and undefined too).
- To check if an element contains a class, you use the contains() method of the classList property of the element. (e.g., element.classList.contains(className))
- How to convert a set into an array ([Helpful link](https://stackoverflow.com/questions/16401216/iterate-over-set-elements))
- Figured out how to "click then drag" on a grid to fill in the background color of the target cells. This just involves using 'mousedown' and 'mouseover'.
- How to use ternary operators
- How to use classes to keep track of a node's parents. (Learning this lesson proved to be a crucial part of finding the shortest path using the DFS algorithm.)
- The basics of Webpack ([Helpful link](https://webpack.js.org/guides/getting-started/))
- How to load CSS with Webpack ([Helpful Link](https://webpack.js.org/guides/asset-management/#loading-css))
- How to deploy a bundled JavaScript project to GitHub pages ([Helpful link](https://medium.com/@cassandra.torske/one-way-to-deploy-your-bundled-javascript-project-to-github-pages-9f9bb2a1aaa1))
