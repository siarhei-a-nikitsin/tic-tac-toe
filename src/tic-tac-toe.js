class TicTacToe {
    get X_SYMBOL() {
        return 'x'; 
    }
    get O_SYMBOL() {
        return 'o'; 
    }

    constructor() {
        this.marksStorage = [];
        this.DIMENSION_X = 3;
        this.DIMENSION_Y = 3;

        for(let i = 0; i < this.DIMENSION_X; i++){
            if(!this.marksStorage[i]){
                this.marksStorage[i] = [];
            }
            for(let j = 0; j < this.DIMENSION_Y; j++){
                this.marksStorage[i][j] = null;
            }
        }

        this.historyMarks = [];
        this.currentPlayer = this.X_SYMBOL;
    }

    getCurrentPlayerSymbol() {
        return this.currentPlayer;
    }

    nextTurn(rowIndex, columnIndex) {
        const makeMoveResult = this.makeMove(rowIndex, columnIndex)
        
        // console.log('rowIndex - columnIndex: current player makeMoveResult', rowIndex, columnIndex, this.currentPlayer, makeMoveResult);

        if(makeMoveResult){
            this.tooglePlayer();
        }
    }

    makeMove(rowIndex, columnIndex){
        const value = this.getFieldValue(rowIndex, columnIndex);
        // console.log('rowIndex - columnIndex: value', rowIndex, columnIndex, value);
        if(value){
            return false;
        }
        this.historyMarks.push([rowIndex, columnIndex, this.currentPlayer]);

        return true;
    }

    tooglePlayer(){
        this.currentPlayer = this.currentPlayer === this.X_SYMBOL ? this.O_SYMBOL : this.X_SYMBOL;
    }

    isFinished() {

    }

    getWinner() {

    }

    noMoreTurns() {

    }

    isDraw() {

    }

    getFieldValue(rowIndex, colIndex) {
        const history = this.historyMarks;

        if(colIndex >= this.DIMENSION_X || rowIndex >= this.DIMENSION_Y) {
            throw new Error(`The rowIndex ${rowIndex} or colIndex ${colIndex} is not correct.`);
        }
        
        for(let i = 0; i < history.length; i++) {
            const record = history[i];
            if(record[0] === rowIndex && record[1] === colIndex) {
                return record[2];
            }
        }

        return null;
    }
}

module.exports = TicTacToe;
