let inputDir ={x: 0, y: 0};
const foodSound = new Audio('food.mp3');
const gameoverSound = new Audio('gameover.mp3');
const moveSound = new Audio('direction.mp3');
const musicSound = new Audio('background.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let frogArr = [
    {x: 13, y: 15}
]

food = {x:6, y:7};

// game functions 
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
    return ;
    }
    lastPaintTime = ctime;
    gameEngine();
    
}
 function isCollide(frog){
    // if you bump into yourself 
    for(let i =1; i < frogArr.length; i++){
        if(frog[i].x === frog[0].x  && frog[i].y === frog[0].y){
            return true;
        }
    }
    // if you bump into wall 
        if(frog[0].x >= 18 || frog[0].x <=0  || frog[0].y >=18 || frog[0].y <=0){
            return true;
        }
}
 


function gameEngine(){
    // part1 : updating the frog array and food

    if(isCollide(frogArr)){
        gameoverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over. Press any key to play again");
        frogArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    // if frog eaten the food, increment the score and regenerate the food 
    if(frogArr[0].y === food.y && frogArr[0].x === food.x){
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        frogArr.unshift({x: frogArr[0].x +1 + inputDir.x , y: frogArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food ={x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
    }

    // moving the frog 
    for( let i=frogArr.length-2; i>=0; i--){
      frogArr[i+1] = {...frogArr[i]};
    }
    frogArr[0].x += inputDir.x;
    frogArr[0].y += inputDir.y;











    // part 2: Display the frog and food
    board.innerHTML = "";
    frogArr.forEach((e, index)=>{
    frogElement = document.createElement('div');
    frogElement.style.gridRowStart = e.y;
    frogElement.style.gridColumnStart = e.x;
    if(index==0){
        frogElement.classList.add('head');
    }
    else{
        frogElement.classList.add('frog'); 
    }
    board.appendChild(frogElement);

    });

    // display food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}


// main logic started 
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir ={x:0 , y:1}// start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
        console.log("ArrowUp")
        inputDir.x = 0;
        inputDir.y = -1;
        break;
        
        case "ArrowDown":
        console.log("ArrowDown")
        inputDir.x = 0;
        inputDir.y = 1;
        break;
        
        case "ArrowLeft":
        console.log("ArrowLeft")
        inputDir.x = -1;
        inputDir.y = 0;
        break;

        case "ArrowRight":
        console.log("ArrowRight")
        inputDir.x = 1;
        inputDir.y = 0;
        break;



        default:
            break;
    }
})