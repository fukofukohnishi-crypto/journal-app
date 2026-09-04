const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土']

function formatDate(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日（${WEEKDAYS[date.getDay()]}）`
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export default function DateNav({ date, onChange }) {
  const today = new Date()
  const isToday = isSameDay(date, today)

  const shift = (days) => {
    const next = new Date(date)
    next.setDate(next.getDate() + days)
    onChange(next)
  }

  return (
    <div className="date-nav">
      <button
        type="button"
        className="date-nav__arrow"
        onClick={() => shift(-1)}
        aria-label="前の日"
      >
        ‹
      </button>
      <div className="date-nav__label">{formatDate(date)}</div>
      <button
        type="button"
        className="date-nav__arrow"
        onClick={() => shift(1)}
        disabled={isToday}
        aria-label="次の日"
      >
        ›
      </button>
    </div>
  )
}
