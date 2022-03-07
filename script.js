const gameBoard = (() => {
    const Player = (name, turn, symbol) => {
        const playerName = name;
        const playerTurn = turn;
        const playerSymbol = symbol;
        return { playerName, playerTurn, playerSymbol }
    }                                                           // making a player constructor
    const player1 = Player("Jeff", true, "X")                // instantiate players
    const player2 = Player("Michael", false, "0")
    let playerinputs = document.querySelectorAll("input");
    let csymbol = document.querySelector("#csymbol");
    let resetBtn = document.querySelector("#reset");
    let newGameBtn = document.querySelector("#newgame");
    let winnerPrompt = document.querySelector("#winnerprompt");
    let h2Winner = document.querySelector("#winner");
    csymbol.addEventListener("click", () => {
        if (player1.playerSymbol === "X") {
            csymbol.innerText = "Current symbol: O";
            csymbol.value = "O";
            player1.playerSymbol = "O";
            player2.playerSymbol = "X"
        } else {
            csymbol.innerText = "Current symbol: X";
            csymbol.value = "X";
            player1.playerSymbol = "X";
            player2.playerSymbol = "O";
        }
    })
    playerinputs[0].addEventListener("input", (e) => {
        player1.playerName = e.target.value;
    })
    playerinputs[1].addEventListener("input", (e) => {
        player2.playerName = e.target.value;
    })
    let buttons = document.querySelectorAll("#gameboard button");
    let gameBoardArray = [
        [], [], [],
        [], [], [],                                         // crazy 3d array :O
        [], [], []
    ];
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", (e) => {
            display.displaySymbol(e);                           // add event to buttons on click to display the symbol
            if (!csymbol.classList.contains("disabled")) {
                csymbol.classList.add("disabled");
            }
            if (!playerinputs[0].classList.contains("disabled") && !playerinputs[1].classList.contains("disabled")) {
                playerinputs[0].classList.add("disabled");
                playerinputs[1].classList.add("disabled");
            }
        });
    }
    const stopGame = () => {
        for (let i = 0; i < buttons.length; i++) {                             // disable all buttons when using resetGame()
            buttons[i].classList.add("disabled");
            resetBtn.classList.add("disabled");
        }
        newGameBtn.addEventListener("click", resetGame);
        winnerPrompt.classList.toggle("hidden");
    }
    const resetGame = () => {
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].innerText = "";
            buttons[i].classList.remove("disabled");
            gameBoardArray[i].pop();
        }
        csymbol.classList.remove("disabled");
        playerinputs[0].classList.remove("disabled");
        playerinputs[1].classList.remove("disabled");
        if (resetBtn.classList.contains("disabled")) {
            resetBtn.classList.remove("disabled");
            winnerPrompt.classList.toggle("hidden");
        }
    }
    resetBtn.addEventListener("click", resetGame);
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
    return { buttons, gameBoardArray, stopGame, changeTurn, player1, player2, h2Winner }
}) ();
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
                gameBoard.h2Winner.innerText = `Congrats ${gameBoard.player1.playerName}! You win!`;
            } else {
                gameBoard.h2Winner.innerText = `Congrats ${gameBoard.player2.playerName}! You win!`;
            }
            gameBoard.stopGame();
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

