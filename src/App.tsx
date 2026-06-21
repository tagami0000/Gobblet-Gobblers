import { useGameState } from './hooks/useGameState'
import GameBoard from './components/GameBoard'
import GameStatus from './components/GameStatus'
import PlayerArea from './components/PlayerArea'

export default function App() {
  const { state, selectReservePiece, clickCell, reset, isValidTarget } = useGameState()
  const { board, reserves, currentPlayer, selection, winner } = state

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-200 via-orange-100 to-yellow-200 flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-orange-900 text-5xl font-extrabold tracking-widest drop-shadow-md select-none">
        Gobblet Gobblers
      </h1>

      <GameStatus winner={winner} currentPlayer={currentPlayer} />

      <div className="flex items-center gap-8">
        <PlayerArea
          player="player1"
          reserves={reserves}
          selection={selection}
          currentPlayer={currentPlayer}
          winner={winner}
          onSelectPiece={selectReservePiece}
        />

        <GameBoard
          board={board}
          selection={selection}
          onClickCell={clickCell}
          isValidTarget={isValidTarget}
        />

        <PlayerArea
          player="player2"
          reserves={reserves}
          selection={selection}
          currentPlayer={currentPlayer}
          winner={winner}
          onSelectPiece={selectReservePiece}
        />
      </div>

      <button
        onClick={reset}
        className="px-8 py-3 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white rounded-full shadow-lg transition-all font-bold text-sm tracking-wide select-none hover:shadow-xl"
      >
        リセット
      </button>
    </div>
  )
}
