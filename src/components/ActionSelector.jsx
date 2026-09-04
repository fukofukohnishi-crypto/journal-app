import { ACTIONS } from '../constants'

export default function ActionSelector({ value, onChange }) {
  const toggle = (id) => {
    onChange(
      value.includes(id) ? value.filter((v) => v !== id) : [...value, id],
    )
  }

  return (
    <div className="field">
      <div className="field__label">やったこと（任意）</div>
      <div className="chip-row">
        {ACTIONS.map((a) => (
          <button
            key={a.id}
            type="button"
            className={`chip chip--neutral${value.includes(a.id) ? ' is-selected' : ''}`}
            onClick={() => toggle(a.id)}
          >
            {a.label}
          </button>
        ))}
      </div>
    </div>
  )
}
