import { PIECE_IMAGES } from '../config/pieceImages'
import type { Piece, PieceSize } from '../types/game'

export const SIZE_CLASS: Record<PieceSize, string> = {
  large:  'w-20 h-20',
  medium: 'w-13 h-13',
  small:  'w-8 h-8',
}

const PLAYER_COLOR = {
  player1: 'bg-amber-400 border-amber-600 shadow-amber-300/60',
  player2: 'bg-sky-400 border-sky-600 shadow-sky-300/60',
}

interface Props {
  piece: Piece
  selected?: boolean
  onClick?: () => void
  className?: string
}

export default function PieceCircle({ piece, selected, onClick, className = '' }: Props) {
  const imageSrc = PIECE_IMAGES[`${piece.player}-${piece.size}`]

  return (
    <div
      onClick={onClick}
      className={`
        rounded-full border-4 shadow-md transition-all duration-150 flex-shrink-0 overflow-hidden
        ${SIZE_CLASS[piece.size]}
        ${imageSrc ? 'border-transparent bg-transparent' : PLAYER_COLOR[piece.player]}
        ${selected ? 'ring-4 ring-orange-500 ring-offset-2 ring-offset-white scale-110' : ''}
        ${onClick ? 'cursor-pointer hover:scale-105 hover:brightness-110' : ''}
        ${className}
      `}
    >
      {imageSrc && (
        <img src={imageSrc} alt="" draggable={false} className="w-full h-full object-contain" />
      )}
    </div>
  )
}
