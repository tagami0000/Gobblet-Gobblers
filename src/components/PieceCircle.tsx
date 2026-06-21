import { PIECE_IMAGES } from '../config/pieceImages'
import type { Piece, PieceSize } from '../types/game'

export const SIZE_CLASS: Record<PieceSize, string> = {
  large:  'w-20 h-20',
  medium: 'w-14 h-14',
  small:  'w-9 h-9',
}

const BORDER_CLASS: Record<PieceSize, string> = {
  large:  'border-4',
  medium: 'border-[3px]',
  small:  'border-2',
}

interface PlayerStyle {
  outer: string   // 外側カップのグラデーション
  rim: string     // ふちの色
  inner: string   // 内側のくぼみ（穴）
  glow: string    // 影・発光色
}

const PLAYER_STYLE: Record<Piece['player'], PlayerStyle> = {
  player1: {
    outer: 'from-amber-200 via-amber-400 to-orange-500',
    rim: 'border-orange-600',
    inner: 'from-orange-600 to-orange-800',
    glow: 'shadow-orange-500/50',
  },
  player2: {
    outer: 'from-sky-200 via-sky-400 to-blue-500',
    rim: 'border-blue-600',
    inner: 'from-blue-600 to-blue-800',
    glow: 'shadow-blue-500/50',
  },
}

interface Props {
  piece: Piece
  selected?: boolean
  ghost?: boolean
  onClick?: () => void
  className?: string
}

export default function PieceCircle({ piece, selected, ghost, onClick, className = '' }: Props) {
  const imageSrc = PIECE_IMAGES[`${piece.player}-${piece.size}`]
  const style = PLAYER_STYLE[piece.player]

  // 画像モード
  if (imageSrc) {
    return (
      <div
        onClick={onClick}
        className={`
          rounded-full overflow-hidden flex-shrink-0 transition-all duration-150
          ${SIZE_CLASS[piece.size]}
          ${ghost ? 'opacity-50' : ''}
          ${selected ? 'animate-bob ring-4 ring-white ring-offset-2 ring-offset-amber-100 scale-110' : ''}
          ${onClick ? 'cursor-pointer hover:scale-105' : ''}
          ${className}
        `}
      >
        <img src={imageSrc} alt="" draggable={false} className="w-full h-full object-contain" />
      </div>
    )
  }

  // ゴーストプレビュー（配置先ホバー時の「置いたらこうなる」表示）
  if (ghost) {
    return (
      <div
        className={`
          relative rounded-full flex-shrink-0 pointer-events-none
          bg-gradient-to-br ${style.outer} ${BORDER_CLASS[piece.size]} ${style.rim}
          opacity-50 [border-style:dashed]
          ${SIZE_CLASS[piece.size]} ${className}
        `}
      />
    )
  }

  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-full flex-shrink-0 transition-all duration-200
        bg-gradient-to-br ${style.outer}
        ${BORDER_CLASS[piece.size]} ${style.rim}
        shadow-lg ${style.glow}
        ${selected ? `animate-bob scale-110 ring-4 ring-white ring-offset-2 ring-offset-amber-100 shadow-2xl ${style.glow}` : ''}
        ${onClick ? 'cursor-pointer hover:scale-110 hover:-translate-y-1' : ''}
        ${SIZE_CLASS[piece.size]}
        ${className}
      `}
    >
      {/* 内側のくぼみ（ゴブレット＝中空カップの開口部） */}
      <div
        className={`absolute inset-0 m-auto rounded-full bg-gradient-to-br ${style.inner} shadow-inner`}
        style={{ width: '50%', height: '50%' }}
      />
      {/* ツヤ（ハイライト） */}
      <span
        className="absolute rounded-full bg-white/60 blur-[2px]"
        style={{ top: '14%', left: '20%', width: '28%', height: '20%' }}
      />
    </div>
  )
}
