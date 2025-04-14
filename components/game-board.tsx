"use client"

import { useState } from "react"
import type { Card } from "@/lib/types"
import Image from "next/image"

// This would be generated from the backend in a real implementation
const generateMockBoard = () => {
  const suits = ["hearts", "diamonds", "clubs", "spades"]
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

  const board: Array<Array<{ card: Card | null; chip: string | null }>> = []

  for (let i = 0; i < 10; i++) {
    const row: Array<{ card: Card | null; chip: string | null }> = []
    for (let j = 0; j < 10; j++) {
      // Corner spaces are free spaces
      if ((i === 0 && j === 0) || (i === 0 && j === 9) || (i === 9 && j === 0) || (i === 9 && j === 9)) {
        row.push({ card: null, chip: "free" })
      } else {
        const randomSuit = suits[Math.floor(Math.random() * suits.length)]
        const randomValue = values[Math.floor(Math.random() * values.length)]
        row.push({
          card: { suit: randomSuit, value: randomValue },
          chip: null,
        })
      }
    }
    board.push(row)
  }

  return board
}

export default function GameBoard() {
  const [board, setBoard] = useState(generateMockBoard())

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    // This would be handled by the backend in a real implementation
    console.log(`Clicked cell at ${rowIndex}, ${colIndex}`)

    // For demonstration, let's toggle a chip on the clicked cell
    const newBoard = [...board]
    const cell = newBoard[rowIndex][colIndex]

    if (cell.chip === null && cell.card !== null) {
      newBoard[rowIndex][colIndex] = { ...cell, chip: "red" }
    } else if (cell.chip === "red" && cell.card !== null) {
      newBoard[rowIndex][colIndex] = { ...cell, chip: "blue" }
    } else if (cell.chip === "blue" && cell.card !== null) {
      newBoard[rowIndex][colIndex] = { ...cell, chip: "green" }
    } else if (cell.card !== null) {
      newBoard[rowIndex][colIndex] = { ...cell, chip: null }
    }

    setBoard(newBoard)
  }

  const getCardImage = (card: Card) => {
    return `/placeholder.svg?height=60&width=40`
    // In a real implementation, you would use actual card images:
    // return `/images/cards/${card.value}_of_${card.suit}.png`;
  }

  const getChipColor = (chip: string | null) => {
    if (chip === "red") return "bg-red-500"
    if (chip === "blue") return "bg-blue-500"
    if (chip === "green") return "bg-green-500"
    if (chip === "free") return "bg-yellow-300"
    return ""
  }

  const getSuitSymbol = (suit: string) => {
    switch (suit.toLowerCase()) {
      case 'hearts': return '♥';
      case 'diamonds': return '♦';
      case 'clubs': return '♣';
      case 'spades': return '♠';
      default: return '';
    }
  }

  const getSuitColor = (suit: string) => {
    return ['hearts', 'diamonds'].includes(suit.toLowerCase()) ? 'text-red-600' : 'text-black';
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-10 gap-1">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="relative aspect-square border border-gray-300 cursor-pointer hover:bg-gray-100"
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell.card ? (
                <div className="w-full h-full flex items-center justify-center relative">
                  <div className={`flex flex-col items-center justify-center w-full h-full ${getSuitColor(cell.card.suit)}`}>
                    <div className="text-lg font-bold">{cell.card.value}</div>
                    <div className="text-2xl">{getSuitSymbol(cell.card.suit)}</div>
                  </div>
                  {cell.chip && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`${getChipColor(cell.chip)} w-3/4 h-3/4 rounded-full opacity-80`}></div>
                    </div>
                  )}
                </div>
              ) : (
                <div className={`w-full h-full ${getChipColor(cell.chip)}`}></div>
              )}
            </div>
          )),
        )}
      </div>
    </div>
  )
}
