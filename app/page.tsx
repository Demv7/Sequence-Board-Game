"use client"

import { useState } from "react"
import GameBoard from "@/components/game-board"
import PlayerHand from "@/components/player-hand"
import GameInfo from "@/components/game-info"
import CreateGameForm from "@/components/create-game-form"

export default function Home() {
  const [gameState, setGameState] = useState<"lobby" | "playing">("lobby")
  const [gameId, setGameId] = useState<string | null>(null)
  const [players, setPlayers] = useState<Array<{name: string, color: string, id: string}>>([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)

  const handleCreateGame = (player1Name: string, player2Name: string) => {
    const gameId = "game-" + Math.random().toString(36).substring(2, 9)
    setPlayers([
      { name: player1Name, color: "blue", id: `player-${Date.now()}-1` },
      { name: player2Name, color: "red", id: `player-${Date.now()}-2` }
    ])
    setGameId(gameId)
    setGameState("playing")
  }

  const handleTurnEnd = () => {
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length)
  }

  return (
    <main className="min-h-screen p-4 md:p-8 bg-green-50">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-800">Sequence Game</h1>

      {gameState === "lobby" ? (
        <div className="max-w-md mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">Create New Game</h2>
            <CreateGameForm onCreateGame={handleCreateGame} />
          </div>
        </div>
      ) : (
        <div className="container mx-auto">
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-[1fr_2fr] gap-6">
              <div className="space-y-6">
                <GameInfo 
                  gameId={gameId || ""} 
                  currentPlayer={players[currentPlayerIndex]?.name || "Waiting for players..."} 
                  currentTeam={players[currentPlayerIndex]?.color || ""}
                  remainingCards={40}
                />
                <div className="grid grid-cols-1 gap-4">
                  {players.map((player, index) => (
                    <div key={player.id}>
                      <PlayerHand
                        playerName={player.name}
                        playerColor={player.color}
                        onPlayCard={handleTurnEnd}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <GameBoard />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
