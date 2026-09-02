import { ORIGINS } from '../constants'

export default function OriginSelector({ value, onChange }) {
  const toggle = (id) => {
    onChange(
      value.includes(id) ? value.filter((v) => v !== id) : [...value, id],
    )
  }

  return (
    <div className="field">
      <div className="field__label">頭にあること</div>
      <div className="chip-row">
        {ORIGINS.map((o) => (
          <button
            key={o.id}
            type="button"
            className={`chip${value.includes(o.id) ? ' is-selected' : ''}`}
            style={{ '--chip-color': o.color }}
            onClick={() => toggle(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  )
}
