import React, { useState } from 'react';
import './App.css';

const symbols = ['🍒', '🍋', '🔔', '💎', '7️⃣'];

function getRandomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function App() {
  const [slots, setSlots] = useState(['❔', '❔', '❔']);
  const [chips, setChips] = useState(100);
  const [message, setMessage] = useState('');
  const [lastChange, setLastChange] = useState(0);

  const spin = () => {
    if (chips < 10) {
      setMessage("❌ Not enough chips to spin. You need at least 10.");
      return;
    }

    const newSlots = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
    setSlots(newSlots);

    let newChips = chips - 10; // cost to spin
    let change = 0;
    let resultMessage = '';

    const [s1, s2, s3] = newSlots;

    if (s1 === s2 && s2 === s3) {
      change = 100;
      resultMessage = `🎉 JACKPOT! 3 of a kind! You win ${change} chips!`;
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
      change = 50;
      resultMessage = `✨ Nice! 2 of a kind! You win ${change} chips!`;
    } else {
      resultMessage = '😢 No match. Better luck next time!';
    }

    newChips += change;
    setChips(newChips);
    setLastChange(change - 10); // spin cost = -10, win is +change
    setMessage(resultMessage);
  };

  return (
    <div className="App">
      <h1>🎰 Slot Machine</h1>

      <div className="chip-count">
        💰 Chips: <strong>{chips}</strong>
      </div>

      <div className="slot-display">
        {slots.map((symbol, index) => (
          <span key={index} className="slot">{symbol}</span>
        ))}
      </div>

      <button onClick={spin}>Spin (Cost: 10 chips)</button>

      <div className="message">
        <p>{message}</p>
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
