import { useState } from 'react';
import Square from './Square';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // Function to handle the click on a square
  function handleClick(i) {
    // Do nothing if the square is already occupied or if there is a winner
    const winnerInfo = calculateWinner(squares);
    if (squares[i] || (winnerInfo && winnerInfo.winner)) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // Logic to check for a winner and the winning line
  function calculateWinner(currentSquares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (currentSquares[a] && currentSquares[a] === currentSquares[b] && currentSquares[a] === currentSquares[c]) {
        return { winner: currentSquares[a], line: [a, b, c] };
      }
    }
    return null;
  }

  // Resets the game state
  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;
  const winningLine = winnerInfo?.line || [];
  const isTie = squares.every(square => square !== null) && !winner;

  let status;
  if (winner) {
    status = `Winner: ${winner}! 🥳`;
  } else if (isTie) {
    status = 'It\'s a tie! 🤝';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  // Renders the board and status messages
  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} isWinner={winningLine.includes(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} isWinner={winningLine.includes(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} isWinner={winningLine.includes(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} isWinner={winningLine.includes(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} isWinner={winningLine.includes(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} isWinner={winningLine.includes(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} isWinner={winningLine.includes(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} isWinner={winningLine.includes(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} isWinner={winningLine.includes(8)} />
        </div>
      </div>
      {(winner || isTie) && (
        <button className="restart-button" onClick={handleRestart}>
          Restart Game
        </button>
      )}
    </div>
  );
}

export default App;