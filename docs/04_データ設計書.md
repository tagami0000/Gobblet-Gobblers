# データ設計書

## 型定義一覧

### 基本型

```typescript
// プレイヤー識別子
type Player = 'player1' | 'player2'

// コマのサイズ
type PieceSize = 'small' | 'medium' | 'large'
```

### Piece（コマ）

```typescript
interface Piece {
  id: string      // 例: "player1-large-0"
  player: Player  // どちらのプレイヤーのコマか
  size: PieceSize // コマのサイズ
}
```

> ID の命名規則: `{player}-{size}-{index}`  
> 例: `player1-large-0`, `player2-small-1`

### Cell（マス）

```typescript
type Cell = Piece[]
```

- 配列のスタック構造で表現
- `index 0` が一番下（最初に置かれたコマ）
- 最後の要素（`cell[cell.length - 1]`）が頂上（画面に表示されるコマ）
- 空のマスは空配列 `[]`

```
例: 大コマが小コマを覆っている状態
  [
    { id: 'player2-small-0', player: 'player2', size: 'small' },  // 底（非表示）
    { id: 'player1-large-0', player: 'player1', size: 'large' },  // 頂上（表示）
  ]
```

### Board（ボード）

```typescript
type Board = Cell[][]  // 3×3
```

- `board[row][col]` でアクセス（row, col ともに 0〜2）

```
インデックス対応:
  board[0][0]  board[0][1]  board[0][2]
  board[1][0]  board[1][1]  board[1][2]
  board[2][0]  board[2][1]  board[2][2]
```

### Selection（選択状態）

```typescript
type Selection =
  | { type: 'reserve'; piece: Piece }
  | { type: 'board'; piece: Piece; row: number; col: number }
```

- `reserve`: 手持ちエリアからコマを選択した状態
- `board`: ボード上のコマを選択した状態（位置情報を持つ）
- `null`: 何も選択していない状態

### GameState（ゲーム全体の状態）

```typescript
interface GameState {
  board: Board                    // ボード（3×3）
  reserves: Record<Player, Piece[]>  // 各プレイヤーの手持ちコマ
  currentPlayer: Player           // 現在の手番プレイヤー
  selection: Selection | null     // 選択中のコマ（null = 未選択）
  winner: Player | null           // 勝者（null = ゲーム中）
}
```

## 初期状態

```typescript
{
  board: [
    [[], [], []],
    [[], [], []],
    [[], [], []],
  ],
  reserves: {
    player1: [
      { id: 'player1-large-0',  player: 'player1', size: 'large'  },
      { id: 'player1-large-1',  player: 'player1', size: 'large'  },
      { id: 'player1-medium-0', player: 'player1', size: 'medium' },
      { id: 'player1-medium-1', player: 'player1', size: 'medium' },
      { id: 'player1-small-0',  player: 'player1', size: 'small'  },
      { id: 'player1-small-1',  player: 'player1', size: 'small'  },
    ],
    player2: [ /* 同様 */ ],
  },
  currentPlayer: 'player1',
  selection: null,
  winner: null,
}
```

## サイズ順序

コマの大小比較にはサイズランクを使用します。

```typescript
const SIZE_RANK: Record<PieceSize, number> = {
  small:  1,
  medium: 2,
  large:  3,
}
```

`canPlace(piece, cell)` はこのランクを使い、`piece のランク > 頂上コマのランク` の場合に配置可能と判定します。

## 状態遷移サマリー

```
初期状態
  winner: null
  selection: null
  currentPlayer: 'player1'

コマ選択
  selection: { type: 'reserve' | 'board', piece, ... }

コマ配置（手持ちから）
  reserves[currentPlayer] からコマを除去
  board[row][col] にコマを追加
  winner チェック
  selection: null
  currentPlayer: 次のプレイヤー（勝者なし時）

コマ移動（ボードから）
  board[from] からコマを取り除く
  → 特殊ルールチェック: 取り除き後に winner が出た場合 → ゲーム終了
  board[to] にコマを追加
  winner チェック
  selection: null
  currentPlayer: 次のプレイヤー（勝者なし時）

ゲーム終了
  winner: 'player1' | 'player2'
  以降の操作はすべて無視（RESET のみ有効）
```
