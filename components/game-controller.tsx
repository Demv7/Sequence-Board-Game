import { useState } from 'react';
import type { Player } from '@/lib/types';
import PlayerHand from './player-hand';
import GameInfo from './game-info';

interface GameControllerProps {
  players: Player[];
}

export default function GameController({ players }: GameControllerProps) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const handlePlayCard = () => {
    setCurrentPlayerIndex((currentIndex) => 
      currentIndex === players.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-6">
        <GameInfo 
          gameId="GAME-123"
          currentPlayer={players[currentPlayerIndex]?.name || ""}
          currentTeam={players[currentPlayerIndex]?.color || ""}
          remainingCards={40}
        />
        
        <div className="grid grid-cols-2 gap-6">
          {players.map((player, index) => (
            <div
              key={player.id}
              className={`transition-all duration-300 ${
                index === currentPlayerIndex 
                  ? 'ring-2 ring-yellow-400 shadow-lg transform scale-102' 
                  : 'opacity-75'
              }`}
            >
              <PlayerHand
                playerName={player.name}
                playerColor={player.color}
                onPlayCard={handlePlayCard}
                isActive={index === currentPlayerIndex}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
