import type { Player } from '../types/game'

const PLAYER_LABEL: Record<Player, string> = { player1: 'Player 1', player2: 'Player 2' }
const PLAYER_COLOR: Record<Player, string> = { player1: 'text-amber-400', player2: 'text-sky-400' }

interface Props {
  winner: Player | null
  currentPlayer: Player
}

export default function GameStatus({ winner, currentPlayer }: Props) {
  if (winner) {
    return (
      <div className="text-center py-2 h-12 flex items-center justify-center">
        <span className={`text-2xl font-bold ${PLAYER_COLOR[winner]}`}>
          {PLAYER_LABEL[winner]} の勝利！
        </span>
      </div>
    )
  }

  return (
    <div className="text-center py-2 h-12 flex items-center justify-center gap-2">
      <span className="text-slate-400 text-lg">手番:</span>
      <span className={`text-lg font-semibold ${PLAYER_COLOR[currentPlayer]}`}>
        {PLAYER_LABEL[currentPlayer]}
      </span>
    </div>
  )
}
