import { getTopPiece } from '../logic/gameLogic'
import type { Cell, Piece } from '../types/game'
import PieceCircle from './PieceCircle'

interface Props {
  cell: Cell
  isSelected: boolean
  isValidTarget: boolean
  isWinning: boolean
  ghostPiece: Piece | null
  onClick: () => void
}

export default function BoardCell({
  cell,
  isSelected,
  isValidTarget,
  isWinning,
  ghostPiece,
  onClick,
}: Props) {
  const top = getTopPiece(cell)
  const isStacked = cell.length > 1

  let stateClass = 'border-orange-200/70 bg-gradient-to-br from-amber-50 to-orange-50'
  if (isWinning) {
    stateClass = 'border-yellow-400 bg-yellow-100 animate-win'
  } else if (isSelected) {
    stateClass = 'border-orange-400 bg-white ring-2 ring-orange-300'
  } else if (isValidTarget) {
    stateClass = 'border-green-400 bg-green-50'
  }

  return (
    <div
      onClick={onClick}
      className={`
        group relative w-32 h-32 flex items-center justify-center
        border-2 rounded-2xl cursor-pointer transition-all duration-200
        ${stateClass}
        ${isValidTarget ? 'hover:scale-[1.03]' : ''}
      `}
    >
      {/* 配置可能マスの目印（コマが無いとき） */}
      {isValidTarget && !top && (
        <span className="absolute w-6 h-6 rounded-full border-2 border-dashed border-green-400 opacity-60 group-hover:opacity-0 transition-opacity" />
      )}

      {/* 下にコマが隠れている印（リムが覗く・中身は見せない） */}
      {isStacked && top && (
        <span
          className="absolute rounded-full border-2 border-black/15 bg-black/5"
          style={{ width: '76%', height: '76%' }}
        />
      )}

      {/* 頂上のコマ。id をキーにして配置・露出のたびに pop-in */}
      {top && (
        <div key={top.id} className="animate-pop-in relative z-10">
          <PieceCircle piece={top} selected={isSelected} />
        </div>
      )}

      {/* ホバー時のゴーストプレビュー */}
      {isValidTarget && ghostPiece && (
        <div className="absolute z-20 opacity-0 group-hover:opacity-70 transition-opacity pointer-events-none">
          <PieceCircle piece={ghostPiece} ghost />
        </div>
      )}
    </div>
  )
}
