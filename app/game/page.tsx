"use client"

import { useState } from 'react';
import type { Player } from '@/lib/types';
import GameSetup from '@/components/game-setup';
import GameController from '@/components/game-controller';

export default function GamePage() {
  const [players, setPlayers] = useState<Player[] | null>(null);

  if (!players) {
    return <GameSetup onSetupComplete={setPlayers} />;
  }

  return <GameController players={players} />;
}
