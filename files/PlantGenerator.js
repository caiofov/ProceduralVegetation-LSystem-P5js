class PlantGenerator{
    constructor(initial_point, pace, l_system_left,l_system_right, seed, expansions){
        this.initial_point = initial_point
        this.seed = seed
        this.l_system_left = l_system_left
        this.l_system_right = l_system_right
        this.expansions = expansions
        this.generated_string = undefined
        this.pace = pace
        this.points = []
        
        this.angle_acc = 0 //angle accumulator
        this.default_angle = Math.PI/6 //default angle -> 30 degrees
        
        this.saved_positions = []
        this.saved_angles = []
    }

    generate(){ //generates the string using the l_system previously defined
        let generated = this.seed
        
        
        for(let i = 0; i < this.expansions; i++){
          let aux = "" //current parallel statement
          for(let l=0; l<generated.length; l++){
            let s = generated[l]
            let rule_applied = false
            
            for (let st = 0; st < this.l_system_left.length; st++){
                if (s === this.l_system_left[st]){             
                    aux += this.l_system_right[st]
                    rule_applied = true
                    break
                }
            }
           
            if(!rule_applied){
                aux+=s
            }
          }
          generated = aux
          
        }
        
        this.generated_string = generated
    }
    
    draw(){
        stroke(0)

        this.points.forEach(path =>{
            // circle(path[0].x, path[0].y, 3)
            for(let l = 0; l < path.length-1; l++){
                line( path[l].x, path[l].y, path[l+1].x, path[l+1].y)
                // circle(this.points[l+1].x,this.points[l+1].y,4)
            }
        })
        
    }

    generate_points(){
        
        let last_point = this.initial_point
        let current_point
        let pts = [last_point]
        
        for(let l=0; l< this.generated_string.length; l++){
            let current_character = this.generated_string[l]
            let position_loaded = false
            
      
            switch (current_character){
                case "f": //move foward
                    current_point = this.move_forward(last_point)
                    break
                
                case "+": //turn left
                    current_point = this.move_left(last_point)
                    break
                
                case "-": //turn right
                    current_point = this.move_right(last_point)
                    break
                case "[": //save the current position
                    this.save_position(current_point)
                    break
                case "]": //load the saved position
                    current_point = this.load_position()
                    position_loaded = true
                    break
                    
                default:
                    break
            }
            
            if (position_loaded){
                this.points.push(pts)
                pts = [current_point]
                last_point = current_point
            }
            else{
                pts.push(current_point)
                last_point = current_point
            }
            
        }
    }
    
    //moving methods
    move_forward(v){
        let v2 = v.copy()
        let ang = v2.angleBetween(createVector(1,0)) == 0 ? 0 : this.angle_acc
        
        v2.x = v.x + this.pace*cos(ang)
        v2.y = v.y + this.pace*sin(ang)
        return v2
    }
    move_left(v) {
        let v2 = this.move_forward(v)
        this.angle_acc += this.default_angle
        v2.x = v.x + this.pace*cos(this.angle_acc)
        v2.y = v.y + this.pace*sin(this.angle_acc)
        return v2
    }
    move_right(v){
        this.angle_acc -= this.default_angle
        let v2 = this.move_forward(v)
        v2.x = v.x + this.pace*cos(this.angle_acc)
        v2.y = v.y + this.pace*sin(this.angle_acc)
        return v2
    }
    save_position(current_point){
        this.saved_positions.push(current_point)
        this.saved_angles.push(this.angle_acc)
    }
    load_position(){
        
        this.angle_acc = this.saved_angles.pop()
        return this.saved_positions.pop()
       
    }
}