import { BODY_PARTS } from '../constants'

export default function BodySelector({ value, onChange }) {
  return (
    <div className="field">
      <div className="field__label">体（任意）</div>
      <div className="chip-row">
        {BODY_PARTS.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`chip chip--neutral${value === b.id ? ' is-selected' : ''}`}
            onClick={() => onChange(value === b.id ? null : b.id)}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  )
}
