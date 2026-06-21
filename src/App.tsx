import { useGameState } from './hooks/useGameState'
import GameBoard from './components/GameBoard'
import GameStatus from './components/GameStatus'
import PlayerArea from './components/PlayerArea'

export default function App() {
  const { state, selectReservePiece, clickCell, reset, isValidTarget } = useGameState()
  const { board, reserves, currentPlayer, selection, winner } = state

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-white text-4xl font-bold tracking-widest select-none">
        Gobblet Gobblers
      </h1>

      <GameStatus winner={winner} currentPlayer={currentPlayer} />

      <div className="flex items-center gap-8">
        <PlayerArea
          player="player1"
          reserves={reserves}
          selection={selection}
          currentPlayer={currentPlayer}
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
          onSelectPiece={selectReservePiece}
        />
      </div>

      <button
        onClick={reset}
        className="px-8 py-3 bg-slate-700 hover:bg-slate-600 active:bg-slate-500 text-white rounded-lg transition-colors font-medium text-sm tracking-wide select-none"
      >
        リセット
      </button>
    </div>
  )
}
