import type { Board, Cell, Coord, GameState, Piece, PieceSize, Player } from '../types/game'

const SIZE_RANK: Record<PieceSize, number> = { small: 1, medium: 2, large: 3 }

function createReserve(player: Player): Piece[] {
  const entries: [PieceSize, number][] = [['large', 2], ['medium', 2], ['small', 2]]
  return entries.flatMap(([size, count]) =>
    Array.from({ length: count }, (_, i) => ({ id: `${player}-${size}-${i}`, player, size }))
  )
}

function emptyBoard(): Board {
  return Array.from({ length: 3 }, () => Array.from({ length: 3 }, (): Cell => []))
}

export function createInitialState(): GameState {
  return {
    board: emptyBoard(),
    reserves: {
      player1: createReserve('player1'),
      player2: createReserve('player2'),
    },
    currentPlayer: 'player1',
    selection: null,
    winner: null,
    winningLine: null,
  }
}

export function getTopPiece(cell: Cell): Piece | null {
  return cell.length > 0 ? cell[cell.length - 1] : null
}

export function canPlace(piece: Piece, cell: Cell): boolean {
  const top = getTopPiece(cell)
  return top === null || SIZE_RANK[piece.size] > SIZE_RANK[top.size]
}

const WIN_LINES: Coord[][] = [
  [[0,0],[0,1],[0,2]],
  [[1,0],[1,1],[1,2]],
  [[2,0],[2,1],[2,2]],
  [[0,0],[1,0],[2,0]],
  [[0,1],[1,1],[2,1]],
  [[0,2],[1,2],[2,2]],
  [[0,0],[1,1],[2,2]],
  [[0,2],[1,1],[2,0]],
]

export interface WinResult {
  player: Player
  line: Coord[]
}

export function findWin(board: Board): WinResult | null {
  for (const line of WIN_LINES) {
    const tops = line.map(([r, c]) => getTopPiece(board[r][c]))
    if (
      tops[0] && tops[1] && tops[2] &&
      tops[0].player === tops[1].player &&
      tops[1].player === tops[2].player
    ) {
      return { player: tops[0].player, line }
    }
  }
  return null
}

export function checkWinner(board: Board): Player | null {
  return findWin(board)?.player ?? null
}

function cloneBoard(board: Board): Board {
  return board.map(row => row.map(cell => [...cell]))
}

function nextPlayer(p: Player): Player {
  return p === 'player1' ? 'player2' : 'player1'
}

export type GameAction =
  | { type: 'SELECT_RESERVE'; piece: Piece }
  | { type: 'CLICK_CELL'; row: number; col: number }
  | { type: 'RESET' }

export function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === 'RESET') return createInitialState()
  if (state.winner) return state

  const { selection } = state

  if (action.type === 'SELECT_RESERVE') {
    const { piece } = action
    if (piece.player !== state.currentPlayer) return state
    if (selection?.type === 'reserve' && selection.piece.id === piece.id) {
      return { ...state, selection: null }
    }
    return { ...state, selection: { type: 'reserve', piece } }
  }

  if (action.type === 'CLICK_CELL') {
    const { row, col } = action
    const cell = state.board[row][col]
    const top = getTopPiece(cell)

    if (!selection) {
      if (top?.player === state.currentPlayer) {
        return { ...state, selection: { type: 'board', piece: top, row, col } }
      }
      return state
    }

    // 同じボードセルをクリック → 選択解除
    if (selection.type === 'board' && selection.row === row && selection.col === col) {
      return { ...state, selection: null }
    }

    // 配置バリデーション
    if (!canPlace(selection.piece, cell)) return state

    const newBoard = cloneBoard(state.board)
    const newReserves: Record<Player, Piece[]> = {
      player1: [...state.reserves.player1],
      player2: [...state.reserves.player2],
    }

    if (selection.type === 'reserve') {
      newReserves[state.currentPlayer] = newReserves[state.currentPlayer]
        .filter(p => p.id !== selection.piece.id)
    } else {
      // ボードからコマを取り除く
      newBoard[selection.row][selection.col] = newBoard[selection.row][selection.col].slice(0, -1)

      // 特殊ルール: コマを取り除いた瞬間に誰かの3並びが露出した場合 → 即時勝利
      const reveal = findWin(newBoard)
      if (reveal) {
        return {
          ...state,
          board: newBoard,
          reserves: newReserves,
          selection: null,
          winner: reveal.player,
          winningLine: reveal.line,
        }
      }
    }

    // 配置
    newBoard[row][col] = [...newBoard[row][col], selection.piece]
    const win = findWin(newBoard)

    return {
      ...state,
      board: newBoard,
      reserves: newReserves,
      currentPlayer: win ? state.currentPlayer : nextPlayer(state.currentPlayer),
      selection: null,
      winner: win?.player ?? null,
      winningLine: win?.line ?? null,
    }
  }

  return state
}
