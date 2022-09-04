# Pathfinding Visualizer
- Welcome to my pathfinding visualizer project! Access the live demo [here](https://bmcardona.github.io/pathfinding-visualizer/).

- This project was inspired by Clement Mihailescu's project of the same name (see his YouTube channel [here](https://www.youtube.com/channel/UCaO6VoaYJv4kS-TQO_M-N_g)) and CS50's Introduction to Artificial Intelligence with Python.

## Features
- [x] Search Algorithms:
  - [X] Depth-First Search
  - [X] Breadth-First Search
  - [X] Greedy Best-First Search
  - [X] A* Search

- [ ] Speed Adjustment:
  - [ ] Slow
  - [ ] Medium
  - [ ] Fast

## To-do List:
- Create animation when generating walls
- Enable different paths to be visualized on the same configuration of walls
- Allow user to draw their own walls
- Greedy best-first search
- Stop Animation of search algorithm if "clear board" or "generate walls" is clicked. 



## What I learned:
- How to provide each div (in this case, each cell in the grid) with an id containing its respective coordinate.
- How to use querySelectorAll to retrieve direct children
- Javascript arrays are objects and you can't simply use the equality operator == to understand if the content of those objects is the same. The equality operator will only test if two OBJECTS are exactly the same instance (e.g., myObjVariable==myObjVariable, works for null and undefined too).
- To check if an element contains a class, you use the contains() method of the classList property of the element. (e.g., element.classList.contains(className))
- How to convert a set into an array ([Helpful link](https://stackoverflow.com/questions/16401216/iterate-over-set-elements))
- Figured out how to "click then drag" on a grid to fill in the background color of the target cells. This just involves using 'mousedown' and 'mouseover'.
- How to use ternary operators
- How to use classes to keep track of a node's parents. (Learning this lesson proved to be a crucial part of finding the shortest path using the DFS algorithm.)



<!-- add aStar functions

I still have to add conditions to the main aStar function to check whether the current "dom" node is a wall or a border. Moreover, I need to switch the node's class from "unvisited" to "visited".  -->
