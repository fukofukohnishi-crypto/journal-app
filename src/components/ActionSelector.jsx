import { ACTIONS } from '../constants'
import MemoInput from './MemoInput'

export default function ActionSelector({ value, onChange, note, onNoteChange }) {
  const toggle = (id) => {
    onChange(
      value.includes(id) ? value.filter((v) => v !== id) : [...value, id],
    )
  }

  return (
    <div className="field">
      <div className="field__label">やったこと</div>
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
      <MemoInput value={note} onChange={onNoteChange} />
    </div>
  )
}
