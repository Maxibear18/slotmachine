// src/App.js or App.tsx
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

  const spin = () => {
    if (chips <= 0) {
      setMessage("You're out of chips!");
      return;
    }

    const newSlots = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
    setSlots(newSlots);
    setChips(prev => prev - 10); // cost to spin

    // Check winnings
    if (newSlots.every(s => s === newSlots[0])) {
      setChips(prev => prev + 50);
      setMessage('🎉 Jackpot! You win 50 chips!');
    } else if (new Set(newSlots).size === 2) {
      setChips(prev => prev + 20);
      setMessage('✨ Nice! Two of a kind! You win 20 chips.');
    } else {
      setMessage('😢 Try again!');
    }
  };

  return (
    <div className="App">
      <h1>🎰 Slot Machine</h1>
      <div className="slot-display">
        {slots.map((symbol, index) => (
          <span key={index} className="slot">{symbol}</span>
        ))}
      </div>
      <button onClick={spin}>Spin</button>
      <p>Chips: {chips}</p>
      <p>{message}</p>
    </div>
  );
}

export default App;
