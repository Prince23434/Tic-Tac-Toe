const gameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGamebtn = document.querySelector(".btn");

const winningPostions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let currentPlayer;
let gridBox = ["","","","","","","","",""];
let gameOver;
let clickCount;

gameInit();

function gameInit(){

    currentPlayer = "X";
    gridBox.fill("");
    gameOver = false;
    clickCount = 0

    boxes.forEach((box, index) => {
        box.textContent = "";
        box.style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    })

    gameInfo.textContent = `Current Player - ${currentPlayer}`;
    newGamebtn.classList.remove("active");
}

boxes.forEach((box,index) => {
    box.addEventListener("click", () => {
        clickCount++;
        handleClick(index,clickCount);
    })
})

function handleClick(index,clickCount){
    if (gridBox[index] === "") {
        gridBox[index] = currentPlayer;
        boxes[index].textContent = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        //win
        if (clickCount>=5) {
            checkWin();
        }

        //swap player
        if (!gameOver) {
            swapPlayer(); // Only swap if game hasn't ended
        }
    }
}

function swapPlayer(){
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
}

function checkWin(){
    winningPostions.forEach((position) => {
        if (gridBox[position[0]] !== "" && gridBox[position[1]] !== "" && gridBox[position[2]] !== "" && (gridBox[position[0]] === gridBox[position[1]]) && (gridBox[position[1]] === gridBox[position[2]]) ) {

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            gameInfo.textContent = `Winner Player - ${gridBox[position[0]]}`;
            newGamebtn.classList.add("active");

            gameOver = true;
            return;
        }
    })
    
    //tie
    if (!gridBox.includes("") && !gameOver) {
        gameInfo.textContent = `Game Tied !`;
        newGamebtn.classList.add("active");
        gameOver = true;
    }
}

newGamebtn.addEventListener("click", gameInit);