# コンポーネント設計書

## コンポーネント構成図

```
App
├── GameStatus
├── div（横並びレイアウト）
│   ├── PlayerArea（Player 1 / 左）
│   ├── GameBoard
│   │   └── BoardCell × 9
│   └── PlayerArea（Player 2 / 右）
└── button（リセット）

共通部品（他コンポーネントから参照）
└── PieceCircle
```

## データフロー

```
useGameState（カスタムフック）
  ├── useReducer(gameReducer, initialState) → state
  │
  ├── state           → App → 各コンポーネントへ Props で渡す
  ├── selectReservePiece(piece) → PlayerArea のコールバック
  ├── clickCell(row, col)       → GameBoard / BoardCell のコールバック
  ├── reset()                   → リセットボタンのコールバック
  └── isValidTarget(row, col)   → GameBoard → BoardCell へ渡す計算関数
```

## 各コンポーネント詳細

---

### `App`

**責務**: 全体レイアウトの組み立て、`useGameState` フックの呼び出しと各コンポーネントへの Props 配布。

**使用フック**: `useGameState`

**子コンポーネント**: `GameStatus`, `PlayerArea` × 2, `GameBoard`, リセットボタン

---

### `GameStatus`

**責務**: 現在の手番プレイヤーまたは勝者を表示する。

| Prop | 型 | 説明 |
|---|---|---|
| `winner` | `Player \| null` | 勝者（null の間はゲーム中） |
| `currentPlayer` | `Player` | 現在の手番プレイヤー |

**表示ロジック**:
- `winner` が `null` → 「手番: Player X」を表示
- `winner` が存在 → 「Player X の勝利！」を表示

---

### `PlayerArea`

**責務**: プレイヤーの手持ちコマを表示し、コマ選択のインタラクションを提供する。

| Prop | 型 | 説明 |
|---|---|---|
| `player` | `Player` | このエリアのプレイヤー |
| `reserves` | `Record<Player, Piece[]>` | 全プレイヤーの手持ちコマ |
| `selection` | `Selection \| null` | 現在の選択状態 |
| `currentPlayer` | `Player` | 手番プレイヤー（非手番時にアクティブ表示を抑制） |
| `onSelectPiece` | `(piece: Piece) => void` | コマ選択時のコールバック |

**表示ロジック**:
- 手番プレイヤーのエリアをリングで強調
- 大・中・小の順に `PieceCircle` を表示
- 使用済み（手持ちから減った）コマは点線のゴースト表示
- 非手番時は `onSelectPiece` を渡さない（クリック無効化）

---

### `GameBoard`

**責務**: 3×3 のボードを描画し、各セルへのクリックイベントを仲介する。

| Prop | 型 | 説明 |
|---|---|---|
| `board` | `Board` | ボードの状態（3×3） |
| `selection` | `Selection \| null` | 現在の選択状態 |
| `onClickCell` | `(row, col) => void` | セルクリック時のコールバック |
| `isValidTarget` | `(row, col) => boolean` | 配置可能かどうかを返す関数 |

**処理**:
- `board` を `map` して `BoardCell` を 9 個描画
- 各 `BoardCell` に `isSelected`（選択中セルか）と `isValidTarget`（配置可能か）を計算して渡す

---

### `BoardCell`

**責務**: 1 マスの描画。状態に応じたビジュアルフィードバックを提供し、頂上コマを表示する。

| Prop | 型 | 説明 |
|---|---|---|
| `cell` | `Cell` | このマスのコマスタック |
| `selection` | `Selection \| null` | 現在の選択状態 |
| `isSelected` | `boolean` | このセルのコマが選択中か |
| `isValidTarget` | `boolean` | このセルに配置可能か |
| `onClick` | `() => void` | クリックコールバック |

**表示ロジック**:
- `getTopPiece(cell)` で頂上コマを取得し、`PieceCircle` で描画
- `isSelected` → 白枠・薄白背景
- `isValidTarget` → 緑枠・薄緑背景
- いずれでもなければ通常表示

---

### `PieceCircle`

**責務**: 1 つのコマを円形で描画する共通 UI 部品。

| Prop | 型 | 説明 |
|---|---|---|
| `piece` | `Piece` | 描画するコマ |
| `selected` | `boolean?` | 選択中か（リング表示） |
| `onClick` | `() => void?` | クリックコールバック（省略可） |
| `className` | `string?` | 追加 CSS クラス |

**バリエーション**:
- `onClick` あり → カーソルをポインターにしてホバーエフェクトを付与
- `selected` = true → 白リング + 1.1 倍に拡大

---

## カスタムフック

### `useGameState`

**責務**: `gameReducer` を `useReducer` でラップし、コンポーネントが使いやすい形でゲーム状態と操作関数を提供する。

**返り値**:

| 名前 | 型 | 説明 |
|---|---|---|
| `state` | `GameState` | 現在のゲーム状態 |
| `selectReservePiece` | `(piece: Piece) => void` | 手持ちコマを選択 |
| `clickCell` | `(row, col) => void` | ボードセルをクリック |
| `reset` | `() => void` | ゲームをリセット |
| `isValidTarget` | `(row, col) => boolean` | 指定セルが配置可能かを返す |

---

## ゲームロジック（`src/logic/gameLogic.ts`）

**責務**: React に依存しない純粋関数でゲームロジックを実装する。

| 関数 | 説明 |
|---|---|
| `createInitialState()` | 初期 `GameState` を返す |
| `getTopPiece(cell)` | セルの頂上コマを返す（なければ `null`） |
| `canPlace(piece, cell)` | コマがセルに配置可能かを返す |
| `checkWinner(board)` | 8 ライン全チェックし勝者を返す（なければ `null`） |
| `gameReducer(state, action)` | アクションに応じてゲーム状態を更新する |

**アクション一覧**:

| アクション | トリガー | 処理 |
|---|---|---|
| `SELECT_RESERVE` | 手持ちコマクリック | 選択状態を更新（同コマ再クリックで解除） |
| `CLICK_CELL` | ボードセルクリック | 未選択なら選択、選択中なら配置を試みる |
| `RESET` | リセットボタン | 初期状態に戻す |
