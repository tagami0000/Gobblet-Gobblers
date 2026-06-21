export type Player = 'player1' | 'player2'
export type PieceSize = 'small' | 'medium' | 'large'

export interface Piece {
  id: string
  player: Player
  size: PieceSize
}

export type Cell = Piece[]  // スタック: index 0 が底、最後が頂上
export type Board = Cell[][]  // 3×3

export type Selection =
  | { type: 'reserve'; piece: Piece }
  | { type: 'board'; piece: Piece; row: number; col: number }

export interface GameState {
  board: Board
  reserves: Record<Player, Piece[]>
  currentPlayer: Player
  selection: Selection | null
  winner: Player | null
}
