# Procedural vegetation generation using L-System
<p>A procedural vegetation generator algorithm using L-system. This algorithm was implemented in JavaScript using P5.js library. This idea was inspired by the book <b>"Procedural Content Generation in Games"</b>, chapter 5 "Grammars and L-systems with application to vegetation and levels" </p>
## Instructions
### How to see the image
Open the *index.html* file in a local server

### Settings
If you want to modify any data, plase use the *config.js* file.

- `CNV_HEIGHT` and `CNV_WIDTH` are the canva dimensions for P5.js
- `PACE` counts how many pixels there are in each edge of the picture (how many pixels it will "jump" from node to node)
- `L_SYSTEM_LEFT` and `L_SYSTEM_RIGHT` are the rules the algorithm will used. Please, read more information about that right bellow
- `SEED` is the initial value to be transformed by the rules
- `INITIAL_X` and `INITIAL_Y` are the coordinates of the first point of the curve
- `EXPANSIONS` is the number of iterations the algorithm will execute in order to generate the image

### How to use L-system variables
First, you should know I've adopted the same alphabet from the book:
- **f** -> move forward
- **+** -> turn 30 degrees left
- **-** -> turn 30 degrees right
- **[** -> adds the current position to the saved positions stack
- **]** -> pops the last saved position from the stack

Consider A,B,C,D as statements and the following L-system:
1. A -> B
2. C -> D

You should rewrite the variables as:<br>
`L_SYSTEM_LEFT = [A, C]` <br>
`L_SYSTEM_RIGHT = [B, D]`

<p>Consider writing the rules sorted by hierarchy if necessary.</p>
You can find out more L-system for generating different types of vegetation on *files/l_systems.js*

