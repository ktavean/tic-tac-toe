const gameBoard = (() => {
    let buttons = document.querySelectorAll("button");
    let gameBoardArray = [
        [], [], [],
        [], [], [],
        [], [], []
    ];
    for (let btn of buttons) {
        btn.addEventListener("click", (e) => {
            displayBoard.displaySymbol(e);
        });
    }
    return { buttons, gameBoardArray }
})();
/* make 3 arrays in the main array, each being a button, when the event is sent, switch and check which button we received, and add the corresponding to the appropriate array.*/
const displayBoard = (() => {
    const displaySymbol = (e) => {
        switch (e.target.id) {
            case "top-left":
                gameBoard.gameBoardArray[0].push("x");
                break;
            case "top-mid":
                gameBoard.gameBoardArray[1].push("x");
                break;
            case "top-right":
                gameBoard.gameBoardArray[2].push("x");
                break;
            case "mid-left":
                gameBoard.gameBoardArray[3].push("x");
                break;
            case "mid-mid":
                gameBoard.gameBoardArray[4].push("x");
                break;
            case "mid-right":
                gameBoard.gameBoardArray[5].push("x");
                break;
            case "bot-left":
                gameBoard.gameBoardArray[6].push("x");
                break;
            case "bot-mid":
                gameBoard.gameBoardArray[7].push("x");
                break;
            case "bot-right":
                gameBoard.gameBoardArray[8].push("x");
                break;
        }
        e.target.innerText = "x";
        e.target.classList.add("disabled");
    }
    return { displaySymbol };
})();