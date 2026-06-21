import { getTopPiece } from '../logic/gameLogic'
import type { Cell } from '../types/game'
import PieceCircle from './PieceCircle'

interface Props {
  cell: Cell
  isSelected: boolean
  isValidTarget: boolean
  onClick: () => void
}

export default function BoardCell({ cell, isSelected, isValidTarget, onClick }: Props) {
  const top = getTopPiece(cell)

  let borderClass = 'border-slate-600'
  let bgClass = 'bg-slate-700'

  if (isSelected) {
    borderClass = 'border-white'
    bgClass = 'bg-white/10'
  } else if (isValidTarget) {
    borderClass = 'border-green-400'
    bgClass = 'bg-green-900/30'
  }

  return (
    <div
      onClick={onClick}
      className={`
        w-32 h-32 flex items-center justify-center border-2 cursor-pointer
        transition-all duration-150 hover:brightness-110
        ${borderClass} ${bgClass}
      `}
    >
      {top && (
        <PieceCircle
          piece={top}
          selected={isSelected}
        />
      )}
    </div>
  )
}
