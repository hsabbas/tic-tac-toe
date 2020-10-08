const gameBoard = () => {
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    function getSymbolInSpace(x, y){
        return board[x][y];
    }
    
    function addPlayerMove(playerSymbol, x, y){
        board[x][y] = playerSymbol;
    }

    function isOccupied(x, y){
        return !(board[x][y] === '');
    }

    function isFull(){
        for(let i = 0; i <3; i++){
            if(board[i].includes('')){
                return false;
            }
        }
        return true;
    }

    function checkThreeInARow(){
        if(board[0][0] !== ''){
            if(board[0][0] == board[0][1] && board[0][0] == board[0][2]){
                return board[0][0];
            }

            if(board[0][0] == board[1][0] && board[0][0] == board[2][0]){
                return board[0][0];
            }

            if(board[0][0] == board[1][1] && board[0][0] == board[2][2]){
                return board[0][0];
            }
        }

        if(board[1][1] !== ''){
            if(board[1][0] == board[1][1] && board[1][0] == board[1][2]){
                return board[1][1];
            }

            if(board[0][1] == board[1][1] && board[0][1] == board[2][1]){
                return board[1][1];
            }

            if(board[2][0] == board[1][1] && board[0][0] == board[0][2]){
                return board[1][1];
            }
        }

        if(board[2][2] !== ''){
            if(board[2][0] == board[2][1] && board[2][0] == board[2][2]){
                return board[2][2];
            }
    
    
            if(board[0][2] == board[1][2] && board[0][2] == board[2][2]){
                return board[2][2];
            }
        }

        return 'none';
    }

    function reset(){
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    }

    return {
        getSymbolInSpace,
        addPlayerMove,
        isOccupied,
        isFull,
        checkThreeInARow,
        reset
    }
};

const TicTacToe = () =>{
    const playerOne = 'X';
    const playerTwo = 'O';
    let currentPlayer = playerOne;
    let winner = 'none';
    const board = gameBoard();

    function playerMove(x, y){
        if(!board.isOccupied(x, y)){
            board.addPlayerMove(currentPlayer, x, y);

            if(currentPlayer == playerOne){
                currentPlayer = playerTwo;
            } else {
                currentPlayer = playerOne;
            }
        }

        return board.getSymbolInSpace(x, y)
    }

    function getWinner(){
        winner = board.checkThreeInARow();
        
        if(winner === 'none' && board.isFull()){
            winner = 'draw';
        }

        return winner;
    }

    function reset(){
        currentPlayer = playerOne;
        winner = 'none';
        board.reset();
    }

    return {
        playerMove,
        getWinner,
        reset
    }
};

const displayController = (() => {
    const gameGrid = document.getElementsByClassName("cells");
    const gameOverScreen = document.getElementById("game-over-screen");
    const gameOverMsgDisplay = document.getElementById("game-over-msg");
    const resetButton = document.getElementById("reset-btn");
    const game = TicTacToe();
    
    function cellClicked(index){
        const x = getRow(index);
        const y = getCol(index);
        gameGrid[index].innerText = game.playerMove(x, y);
        checkForWinner();
    }

    function checkForWinner(){
        winner = game.getWinner();
        if(winner == 'none'){
            return;
        }
        gameOver(winner);
    }

    function gameOver(winner){
        gameOverScreen.style.display = "block";
        gameOverMsgDisplay.innerText = getGameOverMsg(winner);
    }

    function reset(){
        gameOverScreen.style.display = "none";
        resetGameDisplay();
        game.reset();
    }

    function resetGameDisplay(){
        for(cell in gameGrid){
            cell.innerText = '';
        }
    }

    function getRow(i){
        return parseInt(i / 3);
    }

    function getCol(i){
        if(i <3 /*u*/){
            return i;
        } else if(i < 6){
            return i - 3;
        }
        return i - 6;
    }

    function getGameOverMsg(winner){
        if(winner == 'X'){
            return "Player 1 Wins!";
        } else if(winner == 'O') {
            return "Player 2 Wins!";
        } else {
            return "It's a Draw!";
        }
    }

    function initialize(){
        for(let i = 0; i < 9; i++){
            gameGrid[i].addEventListener("click", function(){
                cellClicked(i);
            })
        }
        resetButton.addEventListener("click", reset);
    }

    return {
        initialize
    }
})();

displayController.initialize();