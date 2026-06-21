import { useGameState } from './hooks/useGameState'
import GameBoard from './components/GameBoard'
import GameStatus from './components/GameStatus'
import PlayerArea from './components/PlayerArea'
import WinOverlay from './components/WinOverlay'

export default function App() {
  const { state, selectReservePiece, clickCell, reset, isValidTarget } = useGameState()
  const { board, reserves, currentPlayer, selection, winner, winningLine } = state

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 flex flex-col items-center justify-center gap-7 p-8">
      {/* 背景の装飾ブロブ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="blob absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-300/40 blur-3xl" />
        <div className="blob absolute top-1/3 -right-32 w-[28rem] h-[28rem] rounded-full bg-rose-300/30 blur-3xl" style={{ animationDelay: '-6s' }} />
        <div className="blob absolute -bottom-32 left-1/4 w-96 h-96 rounded-full bg-sky-300/30 blur-3xl" style={{ animationDelay: '-12s' }} />
      </div>

      {/* ヘッダー */}
      <header className="relative text-center">
        <h1 className="font-display text-6xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 drop-shadow-sm select-none">
          Gobblet Gobblers
        </h1>
        <p className="mt-1 text-orange-900/60 font-medium tracking-wide select-none">
          並べて、かぶせて、3つそろえろ！
        </p>
      </header>

      <div className="relative z-10">
        <GameStatus winner={winner} currentPlayer={currentPlayer} />
      </div>

      <div className="relative z-10 flex items-center gap-8">
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
          winningLine={winningLine}
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
        className="relative z-10 px-8 py-3 bg-white/80 backdrop-blur hover:bg-white text-orange-700 rounded-full shadow-lg ring-1 ring-orange-200 transition-all font-bold text-sm tracking-wide select-none hover:shadow-xl hover:-translate-y-0.5"
      >
        ↻ リセット
      </button>

      {winner && <WinOverlay winner={winner} onReplay={reset} />}
    </div>
  )
}
