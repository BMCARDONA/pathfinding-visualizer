# pathfinding-visualizer
A pathfinding-visualizer! 

# Things I learned:
- How to provide each div (in this case, each cell in the grid) with an id containing its respective coordinate.
- How to use querySelectorAll to retrieve direct children
- Javascript arrays are objects and you can't simply use the equality operator == to understand if the content of those objects is the same. The equality operator will only test if two OBJECTS are exactly the same instance (e.g., myObjVariable==myObjVariable, works for null and undefined too).
- To check if an element contains a class, you use the contains() method of the classList property of the element. (e.g., element.classList.contains(className))
- How to turn a set into an array
- Figured out how to "click then drag" on a grid to fill in the background color of the target cells. This just involves using 'mousedown' and 'mouseover'.


# To-do:
- Keep track of visited nodes. Needed to delete class that says unvisited. 