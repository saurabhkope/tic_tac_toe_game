
      
      let gameBoard = ['', '', '', '', '', '', '', '', ''];
      let currentPlayer = 'X';
      let gameOver = false;

      function makeMove(index) {
        if (gameBoard[index] === '' && !gameOver) {
          gameBoard[index] = currentPlayer;
          document.getElementById('gameBoard').children[index].textContent = currentPlayer;

          if (checkWin(currentPlayer)) {
            alert(currentPlayer + ' wins!');
            resetGame();
            return;
          }

          if (gameBoard.indexOf('') === -1) {
            alert('It\'s a tie!');
            resetGame();
            return;
          }

          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
      }

      function checkWin(player) {
        const winningCombinations = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];

        for (let combination of winningCombinations) {
          if (
            gameBoard[combination[0]] === player &&
            gameBoard[combination[1]] === player &&
            gameBoard[combination[2]] === player
          ) {
            return true;
          }
        }

        return false;
      }

      function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameOver = false;
        document.getElementById('gameBoard').innerHTML = '';
      }
      const restartButton = document.getElementById('restartButton');
      restartButton.addEventListener('click', restartGame());
      function restartGame() {
        // Clear the game board
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
          cell.innerHTML = '';
        });
      
        // Reset any game-related variables or states
        // For example, you might need to reset the current player, game status, etc.
      
        // Perform any additional logic required to restart the game
      }
