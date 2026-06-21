import type { Player, PieceSize } from '../types/game'

export type PieceImageKey = `${Player}-${PieceSize}`

/**
 * コマ画像の設定
 *
 * 画像を使用する場合は public/pieces/ に画像を配置し、以下に追記する。
 *
 * 例:
 *   'player1-large':  '/pieces/player1-large.png',
 *   'player1-medium': '/pieces/player1-medium.png',
 *   'player1-small':  '/pieces/player1-small.png',
 *   'player2-large':  '/pieces/player2-large.png',
 *   'player2-medium': '/pieces/player2-medium.png',
 *   'player2-small':  '/pieces/player2-small.png',
 *
 * 未定義のキーはデフォルトの色付き円で表示される。
 */
export const PIECE_IMAGES: Partial<Record<PieceImageKey, string>> = {}
