import { originColor } from '../constants'

const CHART_HEIGHT = 110
const TOP_MARGIN = 10
const BOTTOM_MARGIN = 10
const SPACING = 18
const DOT_GAP = 8
const DOT_RADIUS = 2.5
const POINT_RADIUS = 2.5

function scoreY(score) {
  const usable = CHART_HEIGHT - TOP_MARGIN - BOTTOM_MARGIN
  return TOP_MARGIN + (1 - score / 100) * usable
}

export default function MonthWave({ monthKey, records }) {
  const [year, month] = monthKey.split('-')
  const sorted = [...records].sort((a, b) => a.timestamp - b.timestamp)
  const width = Math.max(sorted.length * SPACING + 20, 40)
  const maxOrigins = sorted.reduce(
    (max, r) => Math.max(max, (r.origins ?? []).length),
    1,
  )
  const dotAreaHeight = maxOrigins * DOT_GAP + 10
  const totalHeight = CHART_HEIGHT + dotAreaHeight

  const points = (key) =>
    sorted.map((r, i) => `${10 + i * SPACING},${scoreY(r[key])}`).join(' ')

  return (
    <div className="month-wave">
      <div className="month-wave__label">
        {year}年{Number(month)}月
      </div>
      <div className="month-wave__scroll">
        <svg
          className="month-wave__svg"
          width={width}
          height={totalHeight}
          viewBox={`0 0 ${width} ${totalHeight}`}
        >
          {sorted.length > 1 && (
            <>
              <polyline
                points={points('spaceScore')}
                fill="none"
                stroke="var(--text-muted)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <polyline
                points={points('bodyScore')}
                fill="none"
                stroke="var(--text)"
                strokeWidth="1.5"
              />
            </>
          )}
          {sorted.map((r, i) => {
            const x = 10 + i * SPACING
            return (
              <g key={r.id}>
                <circle
                  cx={x}
                  cy={scoreY(r.spaceScore)}
                  r={POINT_RADIUS}
                  fill="var(--text-muted)"
                />
                <circle
                  cx={x}
                  cy={scoreY(r.bodyScore)}
                  r={POINT_RADIUS}
                  fill="var(--text)"
                />
                {(r.origins ?? []).map((originId, oi) => (
                  <circle
                    key={originId}
                    cx={x}
                    cy={CHART_HEIGHT + 10 + oi * DOT_GAP}
                    r={DOT_RADIUS}
                    fill={originColor(originId)}
                  />
                ))}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
