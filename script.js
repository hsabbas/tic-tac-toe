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
        return !board.some(row => row.includes(''));
    }

    function threeInARow(){
        if(board[0][0] !== ''){
            if(board[0][0] == board[0][1] && board[0][0] == board[0][2]){
                return true;
            }

            if(board[0][0] == board[1][0] && board[0][0] == board[2][0]){
                return true;
            }

            if(board[0][0] == board[1][1] && board[0][0] == board[2][2]){
                return true;
            }
        }

        if(board[1][1] !== ''){
            if(board[1][0] == board[1][1] && board[1][0] == board[1][2]){
                return true;
            }

            if(board[0][1] == board[1][1] && board[0][1] == board[2][1]){
                return true;
            }

            if(board[2][0] == board[1][1] && board[0][0] == board[0][2]){
                return true;
            }
        }

        if(board[2][2] !== ''){
            if(board[2][0] == board[2][1] && board[2][0] == board[2][2]){
                return true;
            }
    
    
            if(board[0][2] == board[1][2] && board[0][2] == board[2][2]){
                return true;
            }
        }

        return false;
    }

    function reset(){
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
    }

    return {
        addPlayerMove,
        isOccupied,
        isFull,
        threeInARow,
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
        }

        if(currentPlayer == playerOne){
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }

        return board.getSymbolInSpace(x, y)
    }

    function getWinner(){
        if(board.threeInARow()){
            winner = currentPlayer;
        } else if(board.isFull){
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
    const game = TicTacToe();
    
    function playerMove(x, y){
        gameGrid[x][y].innerText = game.playerMove(x, y);
    }
})();