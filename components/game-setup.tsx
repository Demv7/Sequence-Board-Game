import { useState } from 'react';
import type { Player, Card } from '@/lib/types';

interface GameSetupProps {
  onSetupComplete: (players: Player[]) => void;
}

export default function GameSetup({ onSetupComplete }: GameSetupProps) {
  const [step, setStep] = useState<'playerCount' | 'names' | 'colors'>('playerCount');
  const [playerCount, setPlayerCount] = useState<2 | 4 | null>(null);
  const [players, setPlayers] = useState<Partial<Player>[]>([]);
  const availableColors = ['red', 'blue', 'green', 'yellow'];

  const handlePlayerCountSelect = (count: 2 | 4) => {
    setPlayerCount(count);
    setPlayers(Array(count).fill({}).map((_, index) => ({ 
      id: index + 1,
      name: '', 
      color: '',
      hand: [] 
    })));
    setStep('names');
  };

  const handleNameSubmit = (index: number, name: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], name };
    setPlayers(updatedPlayers);

    if (players.every(p => p.name)) {
      setStep('colors');
    }
  };

  const handleColorSelect = (playerIndex: number, color: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex] = { ...updatedPlayers[playerIndex], color };
    setPlayers(updatedPlayers);

    if (players.every(p => p.color)) {
      onSetupComplete(players as Player[]);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      {step === 'playerCount' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Select Number of Players</h2>
          <div className="space-x-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => handlePlayerCountSelect(2)}
            >
              2 Players
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => handlePlayerCountSelect(4)}
            >
              4 Players
            </button>
          </div>
        </div>
      )}

      {step === 'names' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Enter Player Names</h2>
          {players.map((player, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder={`Player ${index + 1} name`}
                className="border p-2 rounded"
                value={player.name || ''}
                onChange={(e) => handleNameSubmit(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      {step === 'colors' && (
        <div>
          <h2 className="text-xl font-bold mb-4">Select Player Colors</h2>
          {players.map((player, playerIndex) => (
            <div key={playerIndex} className="mb-4">
              <p>{player.name}'s color:</p>
              <div className="flex space-x-2">
                {availableColors
                  .filter(color => !players.some((p, i) => i !== playerIndex && p.color === color))
                  .map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(playerIndex, color)}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
