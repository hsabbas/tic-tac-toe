const gameBoard = (() => {
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    
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
        if(board[0][0] == board[0][1] && board[0][0] == board[0][2]){
            return true;
        }

        if(board[1][0] == board[1][1] && board[1][0] == board[1][2]){
            return true;
        }

        if(board[2][0] == board[2][1] && board[2][0] == board[2][2]){
            return true;
        }

        if(board[0][0] == board[1][0] && board[0][0] == board[2][0]){
            return true;
        }

        if(board[0][1] == board[1][1] && board[0][1] == board[2][1]){
            return true;
        }

        if(board[0][2] == board[1][2] && board[0][2] == board[2][2]){
            return true;
        }

        if(board[0][0] == board[1][1] && board[0][0] == board[2][2]){
            return true;
        }

        if(board[2][0] == board[1][1] && board[0][0] == board[0][2]){
            return true;
        }

        return false;
    }

    return {
        addPlayerMove,
        isOccupied,
        isFull,
        threeInARow
    }
})();