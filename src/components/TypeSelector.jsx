import { TYPES } from '../constants'

export default function TypeSelector({ value, onChange }) {
  return (
    <div className="field">
      <div className="field__label">種類</div>
      <div className="chip-row">
        {TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`chip${value === t.id ? ' is-selected' : ''}`}
            style={{ '--chip-color': t.color }}
            onClick={() => onChange(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}
