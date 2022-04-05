
var initial_point;
var koch;

function setup() {
  createCanvas(CNV_WIDTH, CNV_HEIGHT);
  initial_point = createVector(INITIAL_X, INITIAL_Y)
  
  koch = new KochCurve(initial_point, PACE,L_SYSTEM_LEFT, L_SYSTEM_RIGHT, SEED,  EXPANSIONS) //creates the koch curve
  koch.generate() //generates the string
  koch.generate_points() //generates the points
}

function draw() {
  background(240);
  koch.draw() //draws the curve
}
