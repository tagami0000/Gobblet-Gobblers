import type { Board, Coord, Selection } from '../types/game'
import BoardCell from './BoardCell'

interface Props {
  board: Board
  selection: Selection | null
  winningLine: Coord[] | null
  onClickCell: (row: number, col: number) => void
  isValidTarget: (row: number, col: number) => boolean
}

export default function GameBoard({ board, selection, winningLine, onClickCell, isValidTarget }: Props) {
  const isWinningCell = (r: number, c: number) =>
    winningLine?.some(([wr, wc]) => wr === r && wc === c) ?? false

  return (
    <div className="relative rounded-3xl p-3 bg-gradient-to-br from-orange-700 via-amber-700 to-orange-800 shadow-2xl ring-1 ring-black/10">
      {/* 木目風の内枠 */}
      <div className="grid grid-cols-3 gap-2.5 rounded-2xl p-2.5 bg-orange-900/40 shadow-inner">
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
                isWinning={isWinningCell(r, c)}
                ghostPiece={selection?.piece ?? null}
                onClick={() => onClickCell(r, c)}
              />
            )
          })
        )}
      </div>
    </div>
  )
}
