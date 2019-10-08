class TicTacToe {
	get X_SYMBOL() {
		return 'x';
	}
	get O_SYMBOL() {
		return 'o';
	}

	constructor() {
		this.DIMENSION_X = 3;
		this.DIMENSION_Y = 3;

		this.historyMarks = [];
		this.marksStorage = [];

		for (let i = 0; i < this.DIMENSION_X; i++) {
			if (!this.marksStorage[i]) {
				this.marksStorage[i] = [];
			}
			for (let j = 0; j < this.DIMENSION_Y; j++) {
				this.marksStorage[i][j] = null;
			}
		}

		this.currentPlayer = this.X_SYMBOL;
	}

	getCurrentPlayerSymbol() {
		return this.currentPlayer;
	}

	nextTurn(rowIndex, columnIndex) {
		const makeMoveResult = this.makeMove(rowIndex, columnIndex);

		if (makeMoveResult) {
			this.tooglePlayer();
		}
	}

	makeMove(rowIndex, columnIndex) {
		const value = this.getFieldValue(rowIndex, columnIndex);
		if (value) {
			return false;
		}
		this.historyMarks.push([ rowIndex, columnIndex, this.currentPlayer ]);
		this.marksStorage[rowIndex][columnIndex] = this.currentPlayer;

		return true;
	}

	tooglePlayer() {
		this.currentPlayer = this.currentPlayer === this.X_SYMBOL ? this.O_SYMBOL : this.X_SYMBOL;
	}

	isFinished() {
        const winner = this.getWinner();

        return winner || this.noMoreTurns()? true : false;
	}

	getWinner() {
		const matrix = this.marksStorage;

		for (let i = 0; i < this.DIMENSION_X; i++) {
			let givenSymbol = matrix[i][0];

			for (let j = 1; j < this.DIMENSION_Y; j++) {
				const comparingSymbol = matrix[i][j];

				if (givenSymbol != comparingSymbol) {
					givenSymbol = null;
					break;
				}
			}

			if (givenSymbol) {
                return givenSymbol;
			}
		}

		for (let j = 0; j < this.DIMENSION_X; j++) {
			let givenSymbol = matrix[0][j];

			for (let i = 1; i < this.DIMENSION_Y; i++) {
				const comparingSymbol = matrix[i][j];

				if (givenSymbol != comparingSymbol) {
					givenSymbol = null;
					break;
				}
			}

			if (givenSymbol) {
				return givenSymbol;
			}
		}

		let givenSymbol = matrix[0][0];
		for (let i = 1; i < this.DIMENSION_X; i++) {
			const comparingSymbol = matrix[i][i];
			if (givenSymbol != comparingSymbol) {
				givenSymbol = null;
				break;
			}
		}

		if (givenSymbol) {
			return givenSymbol;
		}

		givenSymbol = matrix[this.DIMENSION_Y - 1][0];
		for (let i = this.DIMENSION_X - 2, j = 1; i >= 0; i--, j++) {
			const comparingSymbol = matrix[i][j];

			if (givenSymbol != comparingSymbol) {
				givenSymbol = null;
				break;
			}
		}

		if (givenSymbol) {
			return givenSymbol;
		}

		return null;
	}

	noMoreTurns() {
        const matrix = this.marksStorage;
        
		for (let i = 0; i < this.DIMENSION_Y; i++) {
			for (let j = 0; j < this.DIMENSION_X; j++) {
				if (!matrix[i][j]) {
					return false;
				}
			}
		}

		return true;
	}

	isDraw() {        
		return !this.getWinner() && this.noMoreTurns();
	}

	getFieldValue(rowIndex, colIndex) {
		const history = this.historyMarks;

		if (colIndex >= this.DIMENSION_X || rowIndex >= this.DIMENSION_Y) {
			throw new Error(`The rowIndex ${rowIndex} or colIndex ${colIndex} is not correct.`);
		}

		return this.marksStorage[rowIndex][colIndex];
	}

	print() {
        console.log('matrix');
        for(let i = 0; i < this.DIMENSION_Y; i++) {
            console.log(this.marksStorage[i]);
        }
    }
}

module.exports = TicTacToe;
