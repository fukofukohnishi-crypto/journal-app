import { typeColor } from '../constants'

const STRIP_HEIGHT = 160
const BAR_SPACING = 14
const BASE_THICKNESS = 3
const BODY_THICKNESS = 7
const TOP_MARGIN = 12
const BOTTOM_MARGIN = 10
const MAX_BAR_HEIGHT = STRIP_HEIGHT - TOP_MARGIN - BOTTOM_MARGIN
const MIN_BAR_HEIGHT = 6

export default function MonthStrip({ monthKey, records }) {
  const [year, month] = monthKey.split('-')
  const sorted = [...records].sort((a, b) => a.timestamp - b.timestamp)
  const width = Math.max(sorted.length * BAR_SPACING + 20, 40)

  return (
    <div className="month-strip">
      <div className="month-strip__label">
        {year}年{Number(month)}月
      </div>
      <div className="month-strip__scroll">
        <svg
          className="month-strip__svg"
          width={width}
          height={STRIP_HEIGHT}
          viewBox={`0 0 ${width} ${STRIP_HEIGHT}`}
        >
          {sorted.map((r, i) => {
            const barHeight =
              MIN_BAR_HEIGHT + r.intensity * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT)
            const thickness = r.bodyPart ? BODY_THICKNESS : BASE_THICKNESS
            const x = 10 + i * BAR_SPACING
            const y = STRIP_HEIGHT - BOTTOM_MARGIN - barHeight
            const opacity = 0.28 + r.intensity * 0.72
            return (
              <rect
                key={r.id}
                x={x - thickness / 2}
                y={y}
                width={thickness}
                height={barHeight}
                rx={thickness / 2}
                fill={typeColor(r.type)}
                opacity={opacity}
              />
            )
          })}
        </svg>
      </div>
    </div>
  )
}
