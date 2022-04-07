// INSERT YOUR PREFERENCES HERE - - - - - -

//canva dimensions
CNV_HEIGHT = 400
CNV_WIDTH = 800

//pace of the figure: how many pixels it will walk to the next generated point
const PACE = 1

//L-SYSTEM - rules of transformation (if you have no idea how to use it, please consider reading the instructions in readme.md file)
//see suggested l-systems on files/l_systems.js
const L_SYSTEM_LEFT = [suggested_left1]
const L_SYSTEM_RIGHT = [suggested_right1]

const SEED = "f" //initial string to apply the rules of the l-system

//starting point of the figure
const INITIAL_X = 0
const INITIAL_Y = CNV_HEIGHT/2
 

const EXPANSIONS = 4 //number of iterations in order to generate a greater figure

