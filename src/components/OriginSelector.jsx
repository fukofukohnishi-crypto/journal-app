import { ORIGINS } from '../constants'
import MemoInput from './MemoInput'

export default function OriginSelector({ value, onChange, notes, onNoteChange }) {
  const toggle = (id) => {
    onChange(
      value.includes(id) ? value.filter((v) => v !== id) : [...value, id],
    )
  }

  const selected = ORIGINS.filter((o) => value.includes(o.id))

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
      {selected.length > 0 && (
        <div className="origin-notes">
          {selected.map((o) => (
            <div key={o.id} className="origin-notes__row">
              <span
                className="origin-notes__dot"
                style={{ background: o.color }}
              />
              <MemoInput
                value={notes[o.id] ?? ''}
                onChange={(v) => onNoteChange(o.id, v)}
                placeholder="何が気になってる？"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
