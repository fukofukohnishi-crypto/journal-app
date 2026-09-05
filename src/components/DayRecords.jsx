import { useEffect, useState } from 'react'
import { getRecordsForDate } from '../db'
import { originColor } from '../constants'

function formatTime(timestamp) {
  const d = new Date(timestamp)
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export default function DayRecords({ date, refreshKey }) {
  const [records, setRecords] = useState([])

  useEffect(() => {
    getRecordsForDate(date).then(setRecords)
  }, [date, refreshKey])

  if (records.length === 0) return null

  const sorted = [...records].sort((a, b) => a.timestamp - b.timestamp)

  return (
    <div className="day-records">
      {sorted.map((r) => (
        <div key={r.id} className="day-records__row">
          <span className="day-records__time">{formatTime(r.timestamp)}</span>
          <span className="day-records__score">{r.bodyScore}%</span>
          <span className="day-records__score">{r.spaceScore}%</span>
          <span className="day-records__dots">
            {(r.origins ?? []).map((id) => (
              <span
                key={id}
                className="day-records__dot"
                style={{ background: originColor(id) }}
              />
            ))}
          </span>
          {(() => {
            const noteTexts = Object.values(r.originNotes ?? {}).filter(
              Boolean,
            )
            const combined = [...noteTexts, ...(r.thoughts ?? [])]
            if (combined.length === 0) return null
            return (
              <span className="day-records__note">
                {combined.join(' ／ ')}
              </span>
            )
          })()}
        </div>
      ))}
    </div>
  )
}
