const gameBoard = () => {
    let board = ['', '', '', '', '', '', '', '', ''];

    function getSymbolInSpace(i){
        return board[i];
    }

    function getBoardArray(){
        return board;
    }

    function setBoardArray(boardArray){
        board = boardArray;
    }

    function addPlayerMove(playerSymbol, i){
        board[i] = playerSymbol;
    }

    function isOccupied(i){
        return !(board[i] === '');
    }

    function isFull(){
        if(board.includes('')){
            return false;
        }
        return true;
    }

    function checkThreeInARow(){
        if(board[0] !== ''){
            if(board[0] == board[1] && board[0] == board[2]){
                return board[0];
            }

            if(board[0] == board[3] && board[0] == board[6]){
                return board[0];
            }

            if(board[0] == board[4] && board[0] == board[8]){
                return board[0];
            }
        }

        if(board[4] !== ''){
            if(board[4] == board[1] && board[4] == board[7]){
                return board[4];
            }

            if(board[4] == board[3] && board[4] == board[5]){
                return board[4];
            }

            if(board[4] == board[6] && board[4] == board[2]){
                return board[4];
            }
        }

        if(board[8] !== ''){
            if(board[8] == board[6] && board[8] == board[7]){
                return board[8];
            }
    
    
            if(board[8] == board[2] && board[8] == board[5]){
                return board[8];
            }
        }

        return 'none';
    }

    function reset(){
        board = ['', '', '', '', '', '', '', '', ''];
    }

    return {
        setBoardArray,
        getBoardArray,
        getSymbolInSpace,
        addPlayerMove,
        isOccupied,
        isFull,
        checkThreeInARow,
        reset
    }
};

const TicTacToe = (board) =>{
    const playerOne = 'X';
    const playerTwo = 'O';
    let currentPlayer = playerOne;
    let winner = 'none';

    function playerMove(i){
        board.addPlayerMove(currentPlayer, i);

        if(currentPlayer == playerOne){
            currentPlayer = playerTwo;
            return playerOne;
        } else {
            currentPlayer = playerOne;
            return playerTwo;
        }
    }

    function isValidMove(i){
        return !board.isOccupied(i);
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
        isValidMove,
        playerMove,
        getWinner,
        reset
    }
};

const Computer = () => {
    function evaluate(board){
        let score = 0;
        let winner = board.checkThreeInARow();
        if(winner == 'X') {
            score = -100;
        } else if (winner == 'O'){
            score = 100;
        }
        return score;
    }

    function minimax(board, depth, isMax){
        let score = evaluate(board);

        if(score == 100 || score == -100){
            return score - depth;
        }

        if(board.isFull()){
            return 0;
        }

        if(isMax){
            let best = -100;
            for(let i = 0; i < 9; i++){
                if(!board.isOccupied(i)){
                    board.addPlayerMove('O', i);
                    best = Math.max(best, minimax(board, depth + 1, !isMax));
                    board.addPlayerMove('', i);
                }
            }
            return best;
        } else {
            let best = 100;
            for(let i = 0; i < 9; i++){
                if(!board.isOccupied(i)){
                    board.addPlayerMove('X', i);
                    best = Math.min(best, minimax(board, depth + 1, !isMax));
                    board.addPlayerMove('', i);
                }
            }
            return best;
        }
    }

    function findBestMove(board){
        let bestVal = -100;
        let bestMove = -1;

        for(let i = 0; i < 9; i++){
            if(!board.isOccupied(i)){
                board.addPlayerMove('O', i);
                moveVal = minimax(board, false);
                board.addPlayerMove('', i);

                if(moveVal > bestVal){
                    bestMove = i;
                }
            }
        }

        return bestMove;
    }

    return {
        findBestMove
    }
}

const displayController = (() => {
    const twoPlayerButton = document.getElementById('two-player');
    const computerButton = document.getElementById('vs-computer');
    const startScreen = document.getElementById('start-screen');
    const gameGrid = document.getElementsByClassName("cells");
    const gameOverScreen = document.getElementById("game-over-screen");
    const gameOverMsgDisplay = document.getElementById("game-over-msg");
    const resetButton = document.getElementById("reset-btn");
    const board = gameBoard();
    const computer = Computer();
    const game = TicTacToe(board);
    let computerPlaying = false;
    
    function cellClicked(index){
        if(game.isValidMove(index)){
            gameGrid[index].innerText = game.playerMove(index);

            if(!checkForWinner()){
                if(computerPlaying && board.getSymbolInSpace(index) =="X"){
                    computerMove();
                }
            }
        }
    }

    function computerMove(){
        let move = computer.findBestMove(board);
        gameGrid[move].click();
    }

    function checkForWinner(){
        winner = game.getWinner();
        if(winner == 'none'){
            return false;
        }
        gameOver(winner);
        return true;
    }

    function gameOver(winner){
        gameOverScreen.style.display = "block";
        gameOverMsgDisplay.innerText = getGameOverMsg(winner);
    }

    function reset(){
        gameOverScreen.style.display = "none";
        startScreen.style.display = "block";
        computerPlaying = false;
        resetGameDisplay();
        game.reset();
    }

    function resetGameDisplay(){
        for(let i = 0; i < 9; i++){
            gameGrid[i].innerText = '';
        }
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

        twoPlayerButton.addEventListener("click", removeStartScreen)
        computerButton.addEventListener("click", function(){
            computerPlaying = true;
            removeStartScreen();
        })

        resetButton.addEventListener("click", reset);
    }

    function removeStartScreen(){
        startScreen.style.display = 'none';
    }

    return {
        initialize
    }
})();

displayController.initialize();