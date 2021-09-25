const board = Array.from(document.querySelectorAll('.gameBoard > *'));

const gameBoard = (() => {
    let board = new Array(3);
    for (let i = 0; i < board.length; i++) {
        board[i] = new Array(3);
    }

    let turn = 0;

    const checkAvail = (x) => {
        if (x == 3) {
            return false;
        }

        return true;
    };

    const addSym = (sym, x, y) => {
        if (checkAvail(x, y)) {
            board[y][x] = sym;
        }
        checkMatchRow();

        return;
    };

    const checkMatchRow = () => {
        rowSum = '';
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                rowSum += board[i][j];
            }
        }

        if (rowSum.search('XXX') != -1) {
            return true;
        } else {
            return false;
        }
    }

    const makeTurn = () => {
        let sym;
        if (turn % 2 == 0) {
            sym = 'X';
        } else {
            sym = 'O';
        }
        turn++;

        return sym;
    };

    return {
        board,
        addSym,
        makeTurn 
    };
})();

const displayController = (() => {
    const changeDisplay = (cell, playerTurn) => {
        const cellName = cell.target.className;
        console.log(cell.target.textContent);

        if (cell.target.textContent != '') {
            return [3, 3];
        }

        switch(cellName) {
            case 'topLeft':
                board[0].textContent = playerTurn;
                return [0, 0];
            case 'topMiddle':
                board[1].textContent = playerTurn;
                return [1, 0];
            case 'topRight':
                board[2].textContent = playerTurn;
                return [2, 0];
            case 'centreLeft':
                board[3].textContent = playerTurn;
                return [0, 1];
            case 'centreMiddle':
                board[4].textContent = playerTurn;
                return [1, 1];
            case 'centreRight':
                board[5].textContent = playerTurn;
                return [2, 1];
            case 'bottomLeft':
                board[6].textContent = playerTurn;
                return [0, 2];
            case 'bottomMiddle':
                board[7].textContent = playerTurn;
                return [1, 2];
            case 'bottomRight':
                board[8].textContent = playerTurn;
                return [2, 2];
        }
    }

    return {
        changeDisplay
    };
})();

const Player = (name) => {
    let score = 0;

    const increaseScore = () => {
        score++;
        return;
    };

    return {
        increaseScore
    }
};

board.forEach(cell => {
    cell.addEventListener('click', (event) => {
        const sym = gameBoard.makeTurn();
        const cellCoord = displayController.changeDisplay(event, sym);
        gameBoard.addSym(sym, cellCoord[0], cellCoord[1]);
        console.log(gameBoard.board);
    })
});

const michaelangelo = Player('Michaelangelo');
const diana = Player('Diana');