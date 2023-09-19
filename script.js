let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

// Function to make a move on the game board
function makeMove(index) {
  if (gameBoard[index] === '' && !gameOver) {
    var player1 = document.getElementById("player1").value;
    var player2 = document.getElementById("player2").value;
    gameBoard[index] = currentPlayer;
    document.getElementById('gameBoard').children[index].textContent = currentPlayer;

    // Check if the current player has won the game
    if (checkWin(currentPlayer)) {
      document.getElementById('resultMessage').textContent = "🎉🎉🎉" + currentPlayer + ' (Player ' + (currentPlayer === 'X' ? player1 : player2) + ') wins!' + "🎉🎉🎉";
      gameOver = true;
      return;
    }

    // Check if the game is a tie
    if (gameBoard.indexOf('') === -1) {
      document.getElementById('resultMessage').textContent = "🤝🤝🤝" + 'It\'s a tie between ' + player1 + ' and ' + player2 + '!' + "🤝🤝🤝";
      gameOver = true;
      return;
    }

    // Switch to the next player's turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    // Check if playing against the computer and it's the computer's turn
    const computerOption = document.querySelector('input[value="comp"]:checked');
    if (computerOption && currentPlayer === 'O') {
      const difficultyLevel = document.querySelector('input[name="difficulty"]:checked').value;
      computerMove(difficultyLevel);
    }
  }
}

// Function to check if a player has won the game
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

// Function to reset the game
function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  document.getElementById('gameBoard').innerHTML = '';
}

// Function to clear the game grid
function clearGrid() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.textContent = '';
  });
  document.getElementById('resultMessage').textContent = '';
  gameOver = false;
}

// Function for the computer to make a move based on the selected difficulty level
function computerMove(difficulty) {
  switch (difficulty) {
    case 'easy':
      makeRandomMove();
      break;
    case 'medium':
      makeSmartMove();
      break;
    case 'hard':
      makeHardMove();
      break;
    default:
      makeRandomMove();
      break;
  }
}

// Function for the computer to make a random move
function makeRandomMove() {
  const emptyCells = gameBoard.reduce((acc, cell, index) => {
    if (cell === '') {
      acc.push(index);
    }
    return acc;
  }, []);

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const computerMove = emptyCells[randomIndex];
  makeMove(computerMove);
}

// Function for the computer to make a smart move
function makeSmartMove() {
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

  // Check if there's a winning move for the computer
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      gameBoard[a] === currentPlayer &&
      gameBoard[b] === currentPlayer &&
      gameBoard[c] === ''
    ) {
      makeMove(c);
      return;
    } else if (
      gameBoard[a] === currentPlayer &&
      gameBoard[c] === currentPlayer &&
      gameBoard[b] === ''
    ) {
      makeMove(b);
      return;
    } else if (
      gameBoard[b] === currentPlayer &&
      gameBoard[c] === currentPlayer &&
      gameBoard[a] === ''
    ) {
      makeMove(a);
      return;
    }
  }

  // Check if there's a winning move for the opponent and block it
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      gameBoard[a] !== currentPlayer &&
      gameBoard[b] !== currentPlayer &&
      gameBoard[c] === ''
    ) {
      makeMove(c);
      return;
    } else if (
      gameBoard[a] !== currentPlayer &&
      gameBoard[c] !== currentPlayer &&
      gameBoard[b] === ''
    ) {
      makeMove(b);
      return;
    } else if (
      gameBoard[b] !== currentPlayer &&
      gameBoard[c] !== currentPlayer &&
      gameBoard[a] === ''
    ) {
      makeMove(a);
      return;
    }
  }

  // If no winning or blocking moves, make a random move
  makeRandomMove();
}

// Function for the computer to make a hard move
function makeHardMove() {
  // Check if the computer can win in the next move
  for (let i = 0; i < 9; i++) {
    if (gameBoard[i] === '') {
      gameBoard[i] = currentPlayer;
      if (checkWin(currentPlayer)) {
        makeMove(i);
        return;
      }
      gameBoard[i] = '';
    }
  }

  // Check if the opponent can win in the next move and block it
  for (let i = 0; i < 9; i++) {
    if (gameBoard[i] === '') {
      gameBoard[i] = currentPlayer === 'X' ? 'O' : 'X';
      if (checkWin(currentPlayer === 'X' ? 'O' : 'X')) {
        makeMove(i);
        return;
      }
      gameBoard[i] = '';
    }
  }

  // Make a move in the center if available
  if (gameBoard[4] === '') {
    makeMove(4);
    return;
  }

  // Make a move in the corners if available
  const corners = [0, 2, 6, 8];
  for (let corner of corners) {
    if (gameBoard[corner] === '') {
      makeMove(corner);
      return;
    }
  }

  // Make a move in any available edge
  const edges = [1, 3, 5, 7];
  for (let edge of edges) {
    if (gameBoard[edge] === '') {
      makeMove(edge);
      return;
    }
  }
}

// Function to start the game with the entered player names
function getValue() {
  var play1 = document.getElementById("player1").value;
  var play2 = document.getElementById("player2").value;
  document.getElementById('Message').textContent = "Let the game begin! " + play1 + "(X)" + " vs " + play2 + "(O)";
  clearGrid();
}
