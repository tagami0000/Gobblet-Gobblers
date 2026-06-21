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

  let borderClass = 'border-orange-200'
  let bgClass = 'bg-amber-50'

  if (isSelected) {
    borderClass = 'border-orange-500'
    bgClass = 'bg-white'
  } else if (isValidTarget) {
    borderClass = 'border-green-400'
    bgClass = 'bg-green-100'
  }

  return (
    <div
      onClick={onClick}
      className={`
        w-32 h-32 flex items-center justify-center border-2 rounded-xl cursor-pointer
        transition-all duration-150 hover:brightness-95
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
