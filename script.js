
      
      let gameBoard = ['', '', '', '', '', '', '', '', ''];
      let currentPlayer = 'X';
      let gameOver = false;

      function makeMove(index) {
        if (gameBoard[index] === '' && !gameOver) {
          gameBoard[index] = currentPlayer;
          document.getElementById('gameBoard').children[index].textContent = currentPlayer;

          if (checkWin(currentPlayer)) {
           //alert(currentPlayer + ' wins!');
           document.getElementById('resultMessage').textContent = "🎉🎉🎉"+currentPlayer + ' wins!'+"🎉🎉🎉";
           //resetGame();
           //clearGrid();
           return;
           stop;
          }

          if (gameBoard.indexOf('') === -1) {
            //alert('It\'s a tie!');
            document.getElementById('resultMessage').textContent = "🤝🤝🤝"+'It\'s a tie!'+"🤝🤝🤝";
            //resetGame();
           // clearGrid();
           return;
           stop;
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
       //document.getElementById('resultMessage').textContent = '';
      }
      function clearGrid() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        const cells = document.querySelectorAll('.cell');
        cells.forEach(cell => {
          cell.textContent = '';
        });
        document.getElementById('resultMessage').textContent = '';
      }
