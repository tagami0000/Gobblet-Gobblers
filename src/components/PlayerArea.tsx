import type { Piece, PieceSize, Player, Selection } from '../types/game'
import PieceCircle, { SIZE_CLASS } from './PieceCircle'

const SIZES: PieceSize[] = ['large', 'medium', 'small']
const SIZE_LABEL: Record<PieceSize, string> = { large: '大', medium: '中', small: '小' }

interface Props {
  player: Player
  reserves: Record<Player, Piece[]>
  selection: Selection | null
  currentPlayer: Player
  onSelectPiece: (piece: Piece) => void
}

export default function PlayerArea({ player, reserves, selection, currentPlayer, onSelectPiece }: Props) {
  const isActive = player === currentPlayer
  const pieces = reserves[player]

  const bySize = (size: PieceSize) => pieces.filter(p => p.size === size)

  const PLAYER_LABEL = player === 'player1' ? 'Player 1' : 'Player 2'
  const ACCENT = player === 'player1' ? 'text-amber-400' : 'text-sky-400'
  const RING = player === 'player1' ? 'ring-amber-400' : 'ring-sky-400'

  return (
    <div
      className={`
        flex flex-col gap-5 px-6 py-5 rounded-xl bg-slate-800 w-40
        transition-all duration-200
        ${isActive ? `ring-2 ${RING}` : 'opacity-60'}
      `}
    >
      <div className="text-center">
        <div className={`font-bold text-lg ${ACCENT}`}>{PLAYER_LABEL}</div>
        {isActive && (
          <div className="text-xs text-green-400 mt-1">Your turn</div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {SIZES.map(size => {
          const available = bySize(size)
          const used = 2 - available.length

          return (
            <div key={size} className="flex flex-col gap-1">
              <span className="text-slate-400 text-xs text-center">{SIZE_LABEL[size]}</span>
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
                      rounded-full border-2 border-dashed border-slate-600 opacity-30 flex-shrink-0
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
