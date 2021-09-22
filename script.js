const board = Array.from(document.querySelectorAll('.gameBoard > *'));

const gameBoard = (() => {
    let board = [[]];

    return {
        board
    };
})();

const displayController = (() => {
    const changeDisplay = () => {
        board[0].textContent = 'f';
    }

    return {
        changeDisplay
    };
})();

const player = () => {

};

board.forEach(cell => {
    cell.addEventListener('click', () => {
        displayController.changeDisplay();
    })
});
