import type { Player } from '../types/game'

const PLAYER_LABEL: Record<Player, string> = { player1: 'Player 1', player2: 'Player 2' }
const PLAYER_COLOR: Record<Player, string> = { player1: 'text-amber-600', player2: 'text-sky-600' }

interface Props {
  winner: Player | null
  currentPlayer: Player
}

export default function GameStatus({ winner, currentPlayer }: Props) {
  if (winner) {
    return (
      <div className="bg-white/70 backdrop-blur rounded-2xl px-10 py-3 shadow-md h-14 flex items-center justify-center">
        <span className={`text-2xl font-extrabold ${PLAYER_COLOR[winner]}`}>
          🎉 {PLAYER_LABEL[winner]} の勝利！
        </span>
      </div>
    )
  }

  return (
    <div className="bg-white/70 backdrop-blur rounded-2xl px-10 py-3 shadow-md h-14 flex items-center justify-center gap-2">
      <span className="text-orange-900 text-lg font-semibold">手番:</span>
      <span className={`text-lg font-bold ${PLAYER_COLOR[currentPlayer]}`}>
        {PLAYER_LABEL[currentPlayer]}
      </span>
    </div>
  )
}
