const board = Array.from(document.querySelectorAll('.gameBoard > *'));
const form = document.querySelector('#form');

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

    const playerTurn = () => {
        let sym;

        if (turn % 2 == 0) {
            sym = 'X';
        } else {
            sym = 'O';
        }
        turn++;

        return sym;
    };

    const addSym = (sym, x, y) => {
        if (checkAvail(x, y)) {
            board[y][x] = sym;
        }

        let matches = [checkRowMatch(), checkColMatch(), checkDiagMatch()];
        return matches.some((element) => {return element});
    };

    const checkRowMatch = () => {
        let rowSum = '';
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                rowSum += board[i][j];
            }
        }

        if (rowSum.search(/XXX|OOO/) != -1) {
            return true;
        } else {
            return false;
        }
    }

    const checkColMatch = () => {
        let colSum = '';
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                colSum += board[j][i];
            }
        }

        if (colSum.search(/XXX|OOO/) != -1) {
            return true;
        } else {
            return false;
        }
    }

    const checkDiagMatch = () => {
        let diagSum1 = '';
        let diagSum2 = '';
        for (let i = 0; i < board.length; i++) {
            diagSum1 += board[i][i];
        }

        for (let i = 0; i < board.length; i++) {
            diagSum2 += board[board.length - i - 1][i];
        }

        if (diagSum1.search(/XXX|OOO/) != -1 || diagSum2.search(/XXX|OOO/) != -1) {
            return true;
        } else {
            return false;
        }
    }

    return {
        board,
        addSym,
        playerTurn 
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

    const getScore = () => {
        return score;
    }

    const getName = () => {
        return name;
    }

    return {
        increaseScore,
        getScore,
        getName
    }
};

let count = 0;
let player1;
let player2;

board.forEach(cell => {
    cell.addEventListener('click', (event) => {
        const sym = gameBoard.playerTurn();
        const cellCoord = displayController.changeDisplay(event, sym);
        if (gameBoard.addSym(sym, cellCoord[0], cellCoord[1])) {
            if (gameBoard.playerTurn() == 'X') {
                window.alert(`${player2.getName()} wins`);
            } else if (gameBoard.playerTurn() == 'O') {
                window.alert(`${player1.getName()} wins`);
            }
        }
    });
});

form.addEventListener('submit', (event) => {
    let player= document.createElement('div');
    player.textContent = form.elements['name'].value;
    document.body.appendChild(player);
    if (count < 1) {
        player1 = Player(player.textContent);
    } else {
        player2 = Player(player.textContent);
    }

    count++;
    event.preventDefault();
});

