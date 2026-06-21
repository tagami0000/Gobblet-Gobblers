# Gobblet Gobblers

ボードゲーム「Gobblet Gobblers」のブラウザ実装です。  
React + TypeScript + Tailwind CSS で開発したポートフォリオ作品です。

## ゲーム概要

3×3 のグリッド上で、大・中・小の入れ子構造になったコマを使って 3 つ並べたら勝利するボードゲームです。  
大きいコマで相手の小さいコマを「覆う（ゴブル）」ことができるのが特徴です。

## 技術スタック

| 用途 | 技術 |
|---|---|
| フレームワーク | React 18 |
| 言語 | TypeScript |
| ビルドツール | Vite |
| スタイリング | Tailwind CSS v4 |

## ローカルでの起動方法

```bash
git clone https://github.com/tagami0000/Gobblet-Gobblers.git
cd Gobblet-Gobblers
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。

## ドキュメント

| ドキュメント | 内容 |
|---|---|
| [要件定義書](docs/01_requirements.md) | プロジェクトの目的・機能一覧・スコープ |
| [ゲームルール](docs/02_game_rules.md) | ルール詳細・特殊ルール |
| [画面設計書](docs/03_screen_design.md) | UI レイアウト・状態・カラーパレット |
| [データ設計書](docs/04_data_design.md) | 型定義・状態構造 |
| [コンポーネント設計書](docs/05_component_design.md) | コンポーネント構成・データフロー |
