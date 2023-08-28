const playBoard = document.querySelector(".play-board");


let foodX ,foodY;
// let snakeHeadHTML;
let snakeX=5 , snakeY =10;
let snakeBody = [];
let velocityX=0 , velocityY=0 ;
let gameOver = false;
let setIntervalId;
let score = 0;
let scoreElement = document.querySelector(".score");
let highScoreElement = document.querySelector(".high-score");

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;
let controlButtons = document.querySelectorAll(".control-buttons i");





const changeSnakeDirection = (e)=>{
    //changing the direction of the snake on pressing the keys 
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX= 0;
        velocityY= -1;
    }else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }else if(e.key === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
    // initGame();
}

controlButtons.forEach((key) => {
    key.addEventListener("click", () => changeSnakeDirection({key:key.dataset.arrowkeys}));
});

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over ! Press OK to replay");
    location.reload();
}

const snakeFoodPosition = () => {
    foodX = Math.floor(Math.random()*30)+1;
    foodY = Math.floor(Math.random()*30)+1;
}


const initGame = () => {
    if(gameOver){
        return handleGameOver();
    }
    let snakeFoodHTML = `<div class="food" style="grid-area: ${foodY} / ${foodX} "></div>`;
    if(snakeX === foodX && snakeY === foodY){
        snakeFoodPosition();
        snakeBody.push([foodX , foodY]);
        // console.log(snakeBody);
        score++ ;
        highScore = score ;
        if(score >= highScore){
            highScore = score;
        }
        localStorage.setItem("high-score" , highScore);
        scoreElement.innerText = `Score: ${score}`;

    }
    for(let i=snakeBody.length-1; i>0; i--){
        snakeBody[i]=snakeBody[i-1];
    }

    snakeBody[0] = [snakeX , snakeY];   
    snakeX += velocityX ;
    snakeY += velocityY ;

    if(snakeX <= 0 || snakeX>30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }

    for(let i=0; i<snakeBody.length; i++){
        snakeFoodHTML += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;

        if(i != 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }


    // let snakeFoodHTML = '<div class="food" style="grid-area: foodY / foodX "></div>';
    playBoard.innerHTML = snakeFoodHTML; //adding div element inside the playboard
    // playBoard.innerHTML = snakeHeadHTML;  syd ek sath ek chjo ke lie do baar inner html nhi use kr skte h

}
snakeFoodPosition();
setIntervalId = setInterval(initGame , 200);
document.addEventListener("keydown" , changeSnakeDirection);