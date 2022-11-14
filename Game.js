const canvas = document.querySelector('canvas');
const cv = canvas.getContext('2d');

canvas.width = 1056;
canvas.height = 576;
cv.fillStyle = "black";
cv.fillRect(0, 0, canvas.width, canvas.height);

// used for bringing character down to the top of Y axis 
var gravity = 0.7

// used for when keydown & keyup occurs
const key = {
   ArrowRight:{
     pressed: false
   },
   ArrowLeft: {
    pressed: false
   },
   ArrowUp:{
    pressed: false
   }

}




class animate { 
    constructor({position, imageSrc, width, height}){
        this.position = position        
        this.width = 50
        this.height = 100
        this.image = new Image()
        this.image.src = imageSrc  
    }

    draw(){
        cv.drawImage(this.image, this.position.x, this.position.y)
    }

    update(){
        this.draw()
    }       
}
// background image 
const backgroundimg = new animate({
    position:{
        x: 0,
        y: 0
    },
    imageSrc: 'BackgroundforCanvas.png',
    width: 1056,
    height: 576
})


// class for character and falling objects 
class char {

    constructor({ position, velocity, width, height, color, imageSrc})
    {
        this.position = position
        this.velocity = velocity
        this.width = width
        this.height = height
        this.color = color
        this.image = new Image()
        this.image.src = imageSrc
    }
    draw(){
        cv.drawImage(this.image, this.position.x, this.position.y)
    }

    update(){
        this.draw()
        
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if(runner.position.y + runner.height + runner.velocity.y >= canvas.height - 40){
            runner.velocity.y = 0
        } else this.velocity.y += gravity

        if(runner.position.y <= 0){
            runner.position.y = 0 
        }

        if(runner.position.x <= 0){
            runner.position.x = 0
        }
        if(runner.position.x >= 1006){
            runner.position.x = 1006
        }

        
    }
        
}
// character created
 
var runner = new char ({
    position:{
        x: 500,
        y: 50
    },
    velocity:{
        x: 0,
        y: 0
    },
    width: 50,
    height: 78,
    color: 'green',
    imageSrc: 'char.jpg'
})

// create multiple of same object using for loop with random X axis postions 
var rock = [];
for(let i = 0; i <= 25; i++){
    rock[i] = new char({
        position:{
            x: Math.random()*1000,
            y: 10
        },
        velocity:{
            x: 0,
            y: 0
        },
        width: 25,
        height: 25,
        color: 'red',
        imageSrc: 'rockforgame.jpg'
    })
}


let lastkey
// health bar amount and hit decrease
var health = 800
var hit = 3

// timeout/gameover function and reset game
function reset(){
    
    setTimeout((endgame) => { 
        health = 800
    }, 5000)    
}



// end the game when health is 0 
function endgame(){
    
        document.querySelector('#losegame').innerHTML = 'Game Over: You Made it to Wave '+wavelvl.toFixed(0)+'<br> Current Wave will continue in: 5 seconds <br> <br> For new game restart webpage'
        
        

        for(let i = 0; i <= 25; i++){
            if(rock[i].velocity.y > 0){
                rock[i].velocity.y = 0
            }
        }
        if(runner.velocity.x > 0 || runner.velocity.y > 0 || runner.velocity.y < 0){
            runner.velocity.x = 0
            runner.velocity.y = 0
        }
        reset()       

    }





// increase the velocity of rocks as wave increases
var nextlvl = 1
var wavelvl = 1
// shows the animation and update the postion of runner and rock 
function play(){
    window.requestAnimationFrame(play)
    cv.fillStyle = "black"
    cv.fillRect(0, 0, canvas.width, canvas.height)
    backgroundimg.update()
    runner.update()
 // sets new postion for rock when it reaches the bottom  
    rock.forEach(function(b){        
        b.update()
        b.velocity.y = nextlvl
        if(b.position.y >= canvas.height){
            b.position.y = 0
            b.position.x = Math.random()*1000
            nextlvl += .008
            document.querySelector('#wavecount').innerHTML = 'Wave '+wavelvl.toFixed(0) 
            wavelvl += .04         
        }
        if(nextlvl > 15){
            nextlvl = 15
        }
    })
 // clears start button
    document.querySelector('#losegame').innerHTML = ''

    runner.velocity.x = 0
// check last pressed key and if it is still pressed 
    if(key.ArrowRight.pressed && lastkey === "ArrowRight"){
        runner.velocity.x = 5
    } else if (key.ArrowLeft.pressed && lastkey === "ArrowLeft"){
        runner.velocity.x = -5
    }
// detect collison between left and right / up and down for character and rocks 
    for(let i = 0; i <= 25; i++){
    if(runner.position.x + runner.width >= rock[i].position.x 
    && runner.position.x <= rock[i].position.x + rock[i].width
    && runner.position.y + runner.height >= rock[i].position.y
    && runner.position.y <= rock[i].position.y + rock[i].height
    ){
            health -= hit
            document.querySelector('#healthbar').style.width = health 
    } 
        if(health <= 0){
            endgame()
            
        }
        
                      
    }

    
}


var directions =  "Dodge the Falling Rocks <br> ArrowUp: Jump <br> ArrowRight: Move Right <br> ArrowLeft: Move Left <div id='startbutton'>  </div>"
var clickstart = "<button id='beginbutton' onclick='play()'> Click to Begin </button>"




function begin(){
    document.querySelector('#losegame').innerHTML = directions
    document.querySelector('#startbutton').innerHTML = clickstart



}


begin()





// checks when a key is pressed down 
window.addEventListener('keydown', (event)  => {
    switch (event.key){
        case 'ArrowRight':
            key.ArrowRight.pressed = true
            lastkey = 'ArrowRight'
        break
        case 'ArrowLeft': 
            key.ArrowLeft.pressed = true
            lastkey = 'ArrowLeft'
        break
        case 'ArrowUp':
            runner.velocity.y = -10
    }

})
// checks when key is lifted up 
window.addEventListener('keyup', (event)  => {
    switch (event.key){
        case 'ArrowRight':
            key.ArrowRight.pressed = false
        break
        case "ArrowLeft": 
            key.ArrowLeft.pressed = false
        break
    }
})


