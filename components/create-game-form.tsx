"use client"

import type React from "react"

import { useState } from "react"

interface CreateGameFormProps {
  onCreateGame: (player1Name: string, player2Name: string) => void;
}

export default function CreateGameForm({ onCreateGame }: CreateGameFormProps) {
  const [player1Name, setPlayer1Name] = useState("")
  const [player2Name, setPlayer2Name] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (player1Name.trim() && player2Name.trim()) {
      onCreateGame(player1Name, player2Name)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="player1Name" className="block text-sm font-medium text-gray-700 mb-1">
          Player 1 Name
        </label>
        <input
          type="text"
          id="player1Name"
          value={player1Name}
          onChange={(e) => setPlayer1Name(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter Player 1 name"
          required
        />
      </div>

      <div>
        <label htmlFor="player2Name" className="block text-sm font-medium text-gray-700 mb-1">
          Player 2 Name
        </label>
        <input
          type="text"
          id="player2Name"
          value={player2Name}
          onChange={(e) => setPlayer2Name(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter Player 2 name"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
      >
        Create Game
      </button>
    </form>
  );
}
