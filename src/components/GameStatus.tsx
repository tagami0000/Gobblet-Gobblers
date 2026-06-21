import type { Piece, Player } from '../types/game'
import PieceCircle from './PieceCircle'

const PLAYER_LABEL: Record<Player, string> = { player1: 'Player 1', player2: 'Player 2' }
const PLAYER_COLOR: Record<Player, string> = { player1: 'text-orange-600', player2: 'text-blue-600' }

interface Props {
  winner: Player | null
  currentPlayer: Player
}

export default function GameStatus({ winner, currentPlayer }: Props) {
  // 勝敗は WinOverlay 側で大きく表示するため、ここは手番表示に専念
  const player = winner ?? currentPlayer
  const piece: Piece = { id: `status-${player}`, player, size: 'small' }

  return (
    <div className="flex items-center gap-3 bg-white/70 backdrop-blur rounded-full px-7 py-2.5 shadow-md ring-1 ring-white/60">
      <PieceCircle piece={piece} className="!w-6 !h-6" />
      {winner ? (
        <span className={`text-lg font-bold ${PLAYER_COLOR[winner]}`}>
          {PLAYER_LABEL[winner]} の勝利！
        </span>
      ) : (
        <span className="text-base font-semibold text-orange-900">
          <span className={`font-bold ${PLAYER_COLOR[currentPlayer]}`}>{PLAYER_LABEL[currentPlayer]}</span>
          {' '}の番
        </span>
      )}
    </div>
  )
}
