import { useEffect, useState } from 'react'
import { getAllRecords } from '../db'
import MonthWave from './MonthWave'

function groupByMonth(records) {
  const map = new Map()
  for (const r of records) {
    const d = new Date(r.timestamp)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    if (!map.has(key)) map.set(key, [])
    map.get(key).push(r)
  }
  // 古い月から新しい月の順（新しい月が下に積み上がる）
  return [...map.entries()].sort(([a], [b]) => (a < b ? -1 : 1))
}

export default function AccumulationVisual({ refreshKey }) {
  const [records, setRecords] = useState([])

  useEffect(() => {
    getAllRecords().then(setRecords)
  }, [refreshKey])

  const months = groupByMonth(records)

  if (months.length === 0) return null

  return (
    <section className="accumulation">
      {months.map(([key, monthRecords]) => (
        <MonthWave key={key} monthKey={key} records={monthRecords} />
      ))}
    </section>
  )
}
