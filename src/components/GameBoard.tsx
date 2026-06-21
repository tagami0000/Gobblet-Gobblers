import type { Board, Selection } from '../types/game'
import BoardCell from './BoardCell'

interface Props {
  board: Board
  selection: Selection | null
  onClickCell: (row: number, col: number) => void
  isValidTarget: (row: number, col: number) => boolean
}

export default function GameBoard({ board, selection, onClickCell, isValidTarget }: Props) {
  return (
    <div className="grid grid-cols-3 gap-1 bg-slate-600 p-1 rounded-xl shadow-2xl">
      {board.map((row, r) =>
        row.map((cell, c) => {
          const isSelected =
            selection?.type === 'board' && selection.row === r && selection.col === c
          return (
            <BoardCell
              key={`${r}-${c}`}
              cell={cell}
              isSelected={isSelected}
              isValidTarget={isValidTarget(r, c)}
              onClick={() => onClickCell(r, c)}
            />
          )
        })
      )}
    </div>
  )
}
