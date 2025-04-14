"use client"

import { useState } from "react"
import type { Card } from "@/lib/types"
import Image from "next/image"

interface PlayerHandProps {
  onPlayCard: () => void;
  playerName: string;
  playerColor: string;
}

// Generate a mock hand of cards for demonstration
const generateMockHand = (): Card[] => {
  const suits = ["hearts", "diamonds", "clubs", "spades"]
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

  const hand: Card[] = []
  for (let i = 0; i < 20; i++) {
    const randomSuit = suits[Math.floor(Math.random() * suits.length)]
    const randomValue = values[Math.floor(Math.random() * values.length)]
    hand.push({ suit: randomSuit, value: randomValue })
  }

  return hand
}

const getSuitSymbol = (suit: string) => {
  const symbols = {
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
    spades: "♠"
  };
  return symbols[suit as keyof typeof symbols];
}

const getSuitColor = (suit: string) => {
  return suit === "hearts" || suit === "diamonds" ? "text-red-600" : "text-black";
}

export default function PlayerHand({ onPlayCard, playerName, playerColor }: PlayerHandProps) {
  const [hand, setHand] = useState<Card[]>(generateMockHand())
  const [selectedCard, setSelectedCard] = useState<number | null>(null)

  const handleCardClick = (index: number) => {
    setSelectedCard(index === selectedCard ? null : index)
    console.log(`Selected card: ${hand[index].value} of ${hand[index].suit}`)
  }

  const handlePlayCard = () => {
    if (selectedCard === null) return

    console.log(`Playing card: ${hand[selectedCard].value} of ${hand[selectedCard].suit}`)

    const newHand = [...hand]
    newHand.splice(selectedCard, 1)
    setHand(newHand)
    setSelectedCard(null)
    
    onPlayCard()
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4" style={{ color: playerColor }}>
        {playerName}'s Hand ({hand.length} cards)
      </h2>

      <div className="flex flex-wrap gap-1 mb-4 max-h-[400px] overflow-y-auto p-2">
        {hand.map((card, index) => (
          <div
            key={index}
            className={`relative w-16 h-24 bg-white border border-gray-300 rounded-lg cursor-pointer transition-transform flex-shrink-0 ${
              selectedCard === index 
                ? "transform -translate-y-4 border-blue-500 border-2 shadow-lg" 
                : "hover:-translate-y-2 hover:shadow-md"
            }`}
            onClick={() => handleCardClick(index)}
          >
            <div className={`absolute top-1 left-1 flex flex-col items-center ${getSuitColor(card.suit)}`}>
              <span className="text-sm font-bold">{card.value}</span>
              <span className="text-base">{getSuitSymbol(card.suit)}</span>
            </div>
            <div className={`absolute bottom-1 right-1 flex flex-col items-center rotate-180 ${getSuitColor(card.suit)}`}>
              <span className="text-sm font-bold">{card.value}</span>
              <span className="text-base">{getSuitSymbol(card.suit)}</span>
            </div>
          </div>
        ))}
      </div>

      <button
        className={`px-4 py-2 rounded-lg ${
          selectedCard !== null
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
        onClick={handlePlayCard}
        disabled={selectedCard === null}
      >
        Play Card
      </button>
    </div>
  );
}
