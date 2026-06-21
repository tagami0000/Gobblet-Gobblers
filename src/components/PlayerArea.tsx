import type { Piece, PieceSize, Player, Selection } from '../types/game'
import PieceCircle, { SIZE_CLASS } from './PieceCircle'

const SIZES: PieceSize[] = ['large', 'medium', 'small']
const SIZE_LABEL: Record<PieceSize, string> = { large: '大', medium: '中', small: '小' }

interface Props {
  player: Player
  reserves: Record<Player, Piece[]>
  selection: Selection | null
  currentPlayer: Player
  winner: Player | null
  onSelectPiece: (piece: Piece) => void
}

export default function PlayerArea({ player, reserves, selection, currentPlayer, winner, onSelectPiece }: Props) {
  const isActive = player === currentPlayer && winner === null
  const pieces = reserves[player]

  const bySize = (size: PieceSize) => pieces.filter(p => p.size === size)

  const PLAYER_LABEL = player === 'player1' ? 'Player 1' : 'Player 2'
  const ACCENT      = player === 'player1' ? 'text-amber-600'  : 'text-sky-600'
  const BORDER_TOP  = player === 'player1' ? 'border-amber-400' : 'border-sky-400'
  const RING        = player === 'player1' ? 'ring-amber-400'   : 'ring-sky-400'

  return (
    <div
      className={`
        flex flex-col gap-5 px-6 py-5 rounded-2xl bg-white w-40 shadow-lg
        border-t-4 ${BORDER_TOP} transition-all duration-200
        ${isActive ? `ring-2 ${RING} shadow-xl` : 'opacity-70'}
      `}
    >
      <div className="text-center">
        <div className={`font-extrabold text-lg ${ACCENT}`}>{PLAYER_LABEL}</div>
        {isActive && (
          <div className="text-xs text-green-600 font-semibold mt-1">Your turn</div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {SIZES.map(size => {
          const available = bySize(size)
          const used = 2 - available.length

          return (
            <div key={size} className="flex flex-col gap-1">
              <span className="text-orange-800 text-xs text-center font-semibold">{SIZE_LABEL[size]}</span>
              <div className="flex justify-center gap-2 flex-wrap">
                {available.map(piece => {
                  const isSelected =
                    selection?.type === 'reserve' && selection.piece.id === piece.id
                  return (
                    <PieceCircle
                      key={piece.id}
                      piece={piece}
                      selected={isSelected}
                      onClick={isActive ? () => onSelectPiece(piece) : undefined}
                    />
                  )
                })}
                {Array.from({ length: used }).map((_, i) => (
                  <div
                    key={i}
                    className={`
                      rounded-full border-2 border-dashed border-orange-200 opacity-40 flex-shrink-0
                      ${SIZE_CLASS[size]}
                    `}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
