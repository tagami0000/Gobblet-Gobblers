import type { Player } from '../types/game'

const PLAYER_LABEL: Record<Player, string> = { player1: 'Player 1', player2: 'Player 2' }
const THEME: Record<Player, { text: string; button: string }> = {
  player1: { text: 'text-orange-600', button: 'bg-orange-500 hover:bg-orange-600' },
  player2: { text: 'text-blue-600', button: 'bg-blue-500 hover:bg-blue-600' },
}

const CONFETTI_COLORS = ['#fbbf24', '#f97316', '#38bdf8', '#3b82f6', '#facc15', '#fb7185']

interface Props {
  winner: Player
  onReplay: () => void
}

export default function WinOverlay({ winner, onReplay }: Props) {
  const theme = THEME[winner]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      {/* 紙吹雪 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => {
          const left = Math.random() * 100
          const delay = Math.random() * 2.5
          const duration = 2.8 + Math.random() * 2.5
          const size = 6 + Math.random() * 8
          const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length]
          return (
            <span
              key={i}
              className="absolute top-0 animate-confetti"
              style={{
                left: `${left}%`,
                width: `${size}px`,
                height: `${size * 1.4}px`,
                background: color,
                borderRadius: '2px',
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          )
        })}
      </div>

      {/* 祝福カード */}
      <div className="relative animate-scale-in bg-white rounded-3xl shadow-2xl px-12 py-10 text-center ring-1 ring-black/5">
        <div className="text-6xl mb-3">🏆</div>
        <div className="text-sm font-semibold text-orange-900/60 tracking-widest mb-1">WINNER</div>
        <div className={`font-display text-4xl font-bold mb-6 ${theme.text}`}>
          {PLAYER_LABEL[winner]}
        </div>
        <button
          onClick={onReplay}
          className={`px-8 py-3 rounded-full text-white font-bold shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 ${theme.button}`}
        >
          ↻ もう一度あそぶ
        </button>
      </div>
    </div>
  )
}
