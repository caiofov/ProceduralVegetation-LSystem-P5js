class PlantGenerator{
    constructor(initial_point, pace, l_system_left,l_system_right, seed, expansions){
        this.initial_point = initial_point
        this.seed = seed
        this.l_system_left = l_system_left
        this.l_system_right = l_system_right
        this.expansions = expansions
        this.generated_string = undefined
        this.pace = pace
        this.points = [initial_point]
        
        this.angle_acc = 0 //angle accumulator
        this.default_angle = Math.PI/6 //default angle -> 30 degrees
        
        this.saved_position = undefined
        this.saved_angle = undefined
    }

    generate(){ //generates the string using the l_system previously defined
        let generated = this.seed
          
        
        for(let i = 0; i < this.expansions; i++){
          let aux = "" //current parallel statement
          for(let l=0; l<generated.length; l++){
            let s = generated[l]
            let changed = false
            
            for (let st = 0; st < this.l_system_left.length; st++){
                if (s === this.l_system_left[st]){             
                    aux += this.l_system_right[st]
                    changed = true
                    break
                }
            }
           
            if(!changed){
                aux+=s
            }
          }
          generated = aux
          
        }
        
        this.generated_string = generated
    }
    
    draw(){
        stroke(0)

        circle(this.points[0].x, this.points[0].y,4)
        
        for(let l = 0; l < this.points.length-1; l++){
            line(this.points[l].x,this.points[l].y,this.points[l+1].x,this.points[l+1].y)
            // circle(this.points[l+1].x,this.points[l+1].y,4)
        }
    }

    generate_points(){
        let last_point = this.initial_point
        let current_point
        
        for(let l=0; l< this.generated_string.length; l++){
            let current_character = this.generated_string[l]
            
      
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
                    print("posiçao carregada" , current_point)
                    break
                    
                default:
                    break
            }
            this.points.push(current_point)
            last_point = current_point
        }
    }
    
    //moving methods
    move_forward(v){
        print(v)
        let v2 = v.copy()
        let ang = v2.angleBetween(createVector(1,0)) == 0 ? 0 : this.angle_acc
        
        v2.x = v.x + this.pace*cos(ang)
        v2.y = v.y + this.pace*sin(ang)
        print("moveu pra frente")
        return v2
    }
    move_left(v) {
        let v2 = this.move_forward(v)
        this.angle_acc += this.default_angle
        v2.x = v.x + this.pace*cos(this.angle_acc)
        v2.y = v.y + this.pace*sin(this.angle_acc)
        print("moveu para a esquerda")
        return v2
    }
    move_right(v){
        this.angle_acc -= this.default_angle
        let v2 = this.move_forward(v)
        v2.x = v.x + this.pace*cos(this.angle_acc)
        v2.y = v.y + this.pace*sin(this.angle_acc)
        print("moveu para a direita")
        return v2
    }
    save_position(current_point){
        this.saved_position = current_point
        this.saved_angle = this.angle_acc
        print("salvou a posiçao")
    }
    load_position(){
        
        this.angle_acc = this.saved_angle
        return this.saved_position
       
    }
}