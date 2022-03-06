const gameBoard = (() => {
    const Player = (name, turn, symbol) => {
        const playerName = name;
        const playerTurn = turn;
        const playerSymbol = symbol;
        return {playerName, playerTurn, playerSymbol}
    }                                                           // making a player constructor
    const player1 = Player("Jeff", true, "X")
    const player2 = Player("Michael", false, "0")               // instantiate players
    let buttons = document.querySelectorAll("button");
    let gameBoardArray = [
        [], [], [],
        [], [], [],                                         // crazy 3d array :O
        [], [], []
    ];
    for (let btn of buttons) {
        btn.addEventListener("click", (e) => {
            display.displaySymbol(e);                     // add event to buttons on click to display the symbol
        });
    }
    const resetGame = () => {
        for (let btn of buttons) {                             // disable all buttons when using resetGame()
            btn.classList.add("disabled");
        }
    }
    const changeTurn = () => {
        let symbol = null;
            if (player1.playerTurn) {                       // simple way to determine who's turn it is. click-based and ez.
                symbol = player1.playerSymbol;
                player1.playerTurn = false;
                player2.playerTurn = true;
            } else {
                symbol = player2.playerSymbol;
                player1.playerTurn = true;
                player2.playerTurn = false;
            }
        return symbol;
    }
    return { buttons, gameBoardArray, resetGame, changeTurn, player1, player2 }
})();
const display = (() => {
    const displaySymbol = (e) => {
        let symbol = gameBoard.changeTurn();
        switch (e.target.id) {
            case "top-left":                                                // simple switch system to push the symbol into the 3d array.
                gameBoard.gameBoardArray[0].push(symbol);
                break;
            case "top-mid":
                gameBoard.gameBoardArray[1].push(symbol);
                break;
            case "top-right":
                gameBoard.gameBoardArray[2].push(symbol);
                break;
            case "mid-left":
                gameBoard.gameBoardArray[3].push(symbol);
                break;
            case "mid-mid":
                gameBoard.gameBoardArray[4].push(symbol);
                break;
            case "mid-right":
                gameBoard.gameBoardArray[5].push(symbol);
                break;
            case "bot-left":
                gameBoard.gameBoardArray[6].push(symbol);
                break;
            case "bot-mid":
                gameBoard.gameBoardArray[7].push(symbol);
                break;
            case "bot-right":
                gameBoard.gameBoardArray[8].push(symbol);
                break;
        }
        e.target.innerText = symbol;
        e.target.classList.add("disabled");
        if (pickWinner(symbol)) {                               // pickwinner returns true as seen below. easy way to check if someone won.
            if (gameBoard.player1.playerSymbol === symbol) {
                alert(`${gameBoard.player1.playerName} wins`)
            } else {
                alert(`${gameBoard.player2.playerName} wins`)
            }
            gameBoard.resetGame();
        };
    }
    const checkForDraw = () => {
        let drawStatus = null;
        for (let i = 0; i < gameBoard.buttons.length; i++) {
            if (gameBoard.buttons[i].classList.contains("disabled")) {
                drawStatus = true;
            } else {
                drawStatus = false;
                break;
            }
        }
        return drawStatus;
    }
    const pickWinner = (symbol) => {
        if (gameBoard.gameBoardArray[0].includes(symbol) && gameBoard.gameBoardArray[1].includes(symbol) && gameBoard.gameBoardArray[2].includes(symbol)) {
            return true;
        } else if (gameBoard.gameBoardArray[0].includes(symbol) && gameBoard.gameBoardArray[4].includes(symbol) && gameBoard.gameBoardArray[8].includes(symbol)) {
            return true;
        } else if (gameBoard.gameBoardArray[3].includes(symbol) && gameBoard.gameBoardArray[4].includes(symbol) && gameBoard.gameBoardArray[5].includes(symbol)) {
            return true;
        } else if (gameBoard.gameBoardArray[0].includes(symbol) && gameBoard.gameBoardArray[3].includes(symbol) && gameBoard.gameBoardArray[6].includes(symbol)) {
            return true;
        } else if (gameBoard.gameBoardArray[1].includes(symbol) && gameBoard.gameBoardArray[4].includes(symbol) && gameBoard.gameBoardArray[7].includes(symbol)) {
            return true;
        } else if (gameBoard.gameBoardArray[2].includes(symbol) && gameBoard.gameBoardArray[4].includes(symbol) && gameBoard.gameBoardArray[6].includes(symbol)) {
            return true;
        } else if (gameBoard.gameBoardArray[2].includes(symbol) && gameBoard.gameBoardArray[5].includes(symbol) && gameBoard.gameBoardArray[8].includes(symbol)) {
            return true;
        } else if (gameBoard.gameBoardArray[6].includes(symbol) && gameBoard.gameBoardArray[7].includes(symbol) && gameBoard.gameBoardArray[8].includes(symbol)) {
            return true;
        } else if (checkForDraw()) {
            return alert("draw");
        } else {
            return false;
        }
    }                       // dumpster fire code, but easy to understand and i have no clue how to check in some other way.
    return { displaySymbol };
})();

