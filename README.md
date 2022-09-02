# Pathfinding Visualizer
Welcome to my pathfinding visualizer project! This project was largely inspired by Clement Mihailescu (see his YouTube channel here! -> https://www.youtube.com/channel/UCaO6VoaYJv4kS-TQO_M-N_g) and the CS50's Introduction to Artificial Intelligence with Python. Access the live demo here: https://bmcardona.github.io/pathfinding-visualizer/

# Things I learned:
- How to provide each div (in this case, each cell in the grid) with an id containing its respective coordinate.
- How to use querySelectorAll to retrieve direct children
- Javascript arrays are objects and you can't simply use the equality operator == to understand if the content of those objects is the same. The equality operator will only test if two OBJECTS are exactly the same instance (e.g., myObjVariable==myObjVariable, works for null and undefined too).
- To check if an element contains a class, you use the contains() method of the classList property of the element. (e.g., element.classList.contains(className))
- How to convert a set into an array (Helpful link: https://stackoverflow.com/questions/16401216/iterate-over-set-elements)
- Figured out how to "click then drag" on a grid to fill in the background color of the target cells. This just involves using 'mousedown' and 'mouseover'.
- How to use ternary operators
- How to use classes to keep track of a node's parents. (Learning this lesson proved to be a crucial part of finding the shortest path using the DFS algorithm.)


# To-do:
- A* Search
- Best-first Search
