export default function GameInfo({
  gameId,
  currentPlayer,
  currentTeam,
  remainingCards,
}: {
  gameId: string
  currentPlayer: string
  currentTeam: string
  remainingCards: number
}) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-green-700">Game Info</h2>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Game ID:</span>
          <span className="bg-gray-100 px-2 py-1 rounded text-sm">{gameId}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Current Player:</span>
          <span>{currentPlayer}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Team:</span>
          <span
            className={`px-3 py-0.5 rounded-full ${
              currentTeam === "Red"
                ? "bg-red-100 text-red-800"
                : currentTeam === "Blue"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
            }`}
          >
            {currentTeam}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Cards in Deck:</span>
          <span>{remainingCards}</span>
        </div>
      </div>
    </div>
  )
}
