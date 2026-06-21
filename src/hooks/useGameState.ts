import { useReducer } from 'react'
import { canPlace, createInitialState, gameReducer } from '../logic/gameLogic'
import type { Piece } from '../types/game'

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, createInitialState())

  const selectReservePiece = (piece: Piece) => {
    dispatch({ type: 'SELECT_RESERVE', piece })
  }

  const clickCell = (row: number, col: number) => {
    dispatch({ type: 'CLICK_CELL', row, col })
  }

  const reset = () => {
    dispatch({ type: 'RESET' })
  }

  const isValidTarget = (row: number, col: number): boolean => {
    const { selection, board } = state
    if (!selection) return false
    if (selection.type === 'board' && selection.row === row && selection.col === col) return false
    return canPlace(selection.piece, board[row][col])
  }

  return { state, selectReservePiece, clickCell, reset, isValidTarget }
}
