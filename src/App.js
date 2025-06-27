import React, { useState } from 'react';
import './App.css';


const symbols = ['🍒', '🍋', '🔔', '💎', '7️⃣'];
const symbolValues = {
  '🍒': 20,
  '🍋': 10,
  '🔔': 30,
  '💎': 100,
  '7️⃣': 200,
};

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generateSlotGrid() {
  return Array.from({ length: 3 }, () =>
    Array.from({ length: 3 }, () => getRandomSymbol())
  );
}

function App() {
  const [grid, setGrid] = useState(generateSlotGrid());
  const [chips, setChips] = useState(100);
  const [message, setMessage] = useState('');
  const [lastChange, setLastChange] = useState(0);
  const [matchedSlots, setMatchedSlots] = useState([]); // <-- NEW

  const spin = () => {
    if (chips < 10) {
      setMessage("❌ Not enough chips to spin. You need at least 10.");
      return;
    }

    const newGrid = generateSlotGrid();
    setGrid(newGrid);
    const matches = [];
    const winningLines = [];
    let winnings = 0;

    for (let i = 0; i < 3; i++) {
      if (
        newGrid[i][0] === newGrid[i][1] &&
        newGrid[i][1] === newGrid[i][2]
      ) {
        winnings += symbolValues[newGrid[i][0]];
        winningLines.push(`Row ${i + 1} (${newGrid[i][0]})`);
        matches.push([i, 0], [i, 1], [i, 2]);
      }
    }

    for (let j = 0; j < 3; j++) {
      if (
        newGrid[0][j] === newGrid[1][j] &&
        newGrid[1][j] === newGrid[2][j]
      ) {
        winnings += symbolValues[newGrid[0][j]];
        winningLines.push(`Column ${j + 1} (${newGrid[0][j]})`);
        matches.push([0, j], [1, j], [2, j]);
      }
    }

    if (
      newGrid[0][0] === newGrid[1][1] &&
      newGrid[1][1] === newGrid[2][2]
    ) {
      winnings += symbolValues[newGrid[0][0]];
      winningLines.push(`Diagonal ↘ (${newGrid[0][0]})`);
      matches.push([0, 0], [1, 1], [2, 2]);
    }

    if (
      newGrid[0][2] === newGrid[1][1] &&
      newGrid[1][1] === newGrid[2][0]
    ) {
      winnings += symbolValues[newGrid[0][2]];
      winningLines.push(`Diagonal ↙ (${newGrid[0][2]})`);
      matches.push([0, 2], [1, 1], [2, 0]);
    }

    const chipChange = winnings - 10;
    setChips(prev => prev + chipChange);
    setLastChange(chipChange);
    setMatchedSlots(matches); 

    if (winningLines.length > 0) {
      setMessage(`🎉 You won ${winnings} chips!\nWinning Lines:\n- ${winningLines.join('\n- ')}`);
    } else {
      setMessage('😢 No matches. Try again!');
    }
  };

  return (
    <div className="App">
      {/* Legend */}
      <div className="legend">
        <h3>🎯 Symbol Values</h3>
        <ul>
          {symbols.map((sym) => (
            <li key={sym}>
              <span className="legend-symbol">{sym}</span> = {symbolValues[sym]} chips
            </li>
          ))}
        </ul>
      </div>

      <h1>🎰 Slot Machine</h1>

      <div className="chip-count">
        💰 Chips: <strong>{chips}</strong>
      </div>

      <div className="slot-grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="slot-row">
            {row.map((symbol, colIndex) => {
              const isMatch = matchedSlots.some(
                ([r, c]) => r === rowIndex && c === colIndex
              );
              return (
                <span
                  key={colIndex}
                  className={`slot ${isMatch ? 'match' : ''}`}
                >
                  {symbol}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <button onClick={spin}>Spin (Cost: 10 chips)</button>

      <div className="message">
        <pre>{message}</pre>
        {lastChange !== 0 && (
          <p className={lastChange >= 0 ? 'win' : 'loss'}>
            {lastChange >= 0 ? `+${lastChange}` : `${lastChange}`} chips this spin
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
