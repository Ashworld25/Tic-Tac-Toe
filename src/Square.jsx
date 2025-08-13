import React from 'react';

function Square({ value, onSquareClick, isWinner }) {
  const className = `square ${isWinner ? 'winner-square' : ''}`;
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;