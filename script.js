const board = Array.from(document.querySelectorAll('.gameBoard > *'));

const gameBoard = (() => {
    let board = [[]];

    const checkAvail = (x, y) => {
        if (board[x][y] != null) {
            return false;
        };

        return true;
    };

    return {
        board,
        checkAvail
    };
})();

const displayController = (() => {
    const changeDisplay = (cell) => {
        const cellName = cell.target.className;
        switch(cellName) {
            case 'topLeft':
                board[0].textContent = 'f';
                break;
            case 'topMiddle':
                board[1].textContent = 'f';
                break;
            case 'topRight':
                board[2].textContent = 'f';
                break;
            case 'centreLeft':
                board[3].textContent = 'f';
                break;
            case 'centreMiddle':
                board[4].textContent = 'f';
                break;
            case 'centreRight':
                board[5].textContent = 'f';
                break;
            case 'bottomLeft':
                board[6].textContent = 'f';
                break;
            case 'bottomMiddle':
                board[7].textContent = 'f';
                break;
            case 'bottomRight':
                board[8].textContent = 'f';
                break;
        }
    }

    return {
        changeDisplay
    };
})();

const player = (name) => {
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
        displayController.changeDisplay(event);
    })
});
