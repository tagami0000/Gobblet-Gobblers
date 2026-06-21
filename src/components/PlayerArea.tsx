import type { Piece, PieceSize, Player, Selection } from '../types/game'
import PieceCircle, { SIZE_CLASS } from './PieceCircle'

const SIZES: PieceSize[] = ['large', 'medium', 'small']
const SIZE_LABEL: Record<PieceSize, string> = { large: '大', medium: '中', small: '小' }

interface Theme {
  header: string
  accent: string
  ring: string
  glow: string
}

const THEME: Record<Player, Theme> = {
  player1: {
    header: 'from-amber-400 to-orange-500',
    accent: 'text-orange-700',
    ring: 'ring-orange-400',
    glow: 'shadow-orange-300/60',
  },
  player2: {
    header: 'from-sky-400 to-blue-500',
    accent: 'text-blue-700',
    ring: 'ring-sky-400',
    glow: 'shadow-sky-300/60',
  },
}

interface Props {
  player: Player
  reserves: Record<Player, Piece[]>
  selection: Selection | null
  currentPlayer: Player
  winner: Player | null
  onSelectPiece: (piece: Piece) => void
}

export default function PlayerArea({
  player,
  reserves,
  selection,
  currentPlayer,
  winner,
  onSelectPiece,
}: Props) {
  const isActive = player === currentPlayer && winner === null
  const isWinner = player === winner
  const pieces = reserves[player]
  const theme = THEME[player]
  const label = player === 'player1' ? 'Player 1' : 'Player 2'

  const bySize = (size: PieceSize) => pieces.filter(p => p.size === size)
  const avatarPiece: Piece = { id: `avatar-${player}`, player, size: 'small' }

  return (
    <div
      className={`
        w-44 rounded-3xl bg-white/95 backdrop-blur overflow-hidden
        shadow-xl transition-all duration-300
        ${isActive ? `ring-4 ${theme.ring} ${theme.glow} shadow-2xl scale-[1.04]` : 'opacity-70'}
        ${isWinner ? `ring-4 ring-yellow-400 scale-105` : ''}
      `}
    >
      {/* ヘッダー */}
      <div className={`relative bg-gradient-to-r ${theme.header} px-4 py-3 flex items-center gap-2`}>
        <PieceCircle piece={avatarPiece} className="!w-7 !h-7" />
        <span className="font-display font-semibold text-white text-lg drop-shadow">{label}</span>
        {isActive && (
          <span className="ml-auto flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
        )}
      </div>

      {/* 状態テキスト */}
      <div className="h-6 flex items-center justify-center">
        {isActive && <span className={`text-xs font-bold ${theme.accent}`}>あなたの番です</span>}
        {isWinner && <span className="text-xs font-bold text-yellow-600">🏆 WINNER</span>}
      </div>

      {/* コマ置き場 */}
      <div className="flex flex-col gap-3 px-4 pb-5">
        {SIZES.map(size => {
          const available = bySize(size)
          const used = 2 - available.length
          return (
            <div key={size} className="flex items-center gap-2">
              <span className="text-orange-800/70 text-xs font-bold w-4 text-center">{SIZE_LABEL[size]}</span>
              <div className="flex items-center justify-center gap-2 flex-1 min-h-[5rem]">
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
                    className={`rounded-full border-2 border-dashed border-orange-200 opacity-40 flex-shrink-0 ${SIZE_CLASS[size]}`}
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
