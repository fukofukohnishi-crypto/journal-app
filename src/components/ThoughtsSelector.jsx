import { useState } from 'react'
import { getThoughtsList, saveThoughtsList } from '../thoughtsStore'

export default function ThoughtsSelector({ value, onChange }) {
  const [items, setItems] = useState(() => getThoughtsList())
  const [editing, setEditing] = useState(false)
  const [newText, setNewText] = useState('')

  const toggle = (text) => {
    onChange(
      value.includes(text) ? value.filter((v) => v !== text) : [...value, text],
    )
  }

  const removeItem = (text) => {
    const next = items.filter((t) => t !== text)
    setItems(next)
    saveThoughtsList(next)
    if (value.includes(text)) onChange(value.filter((v) => v !== text))
  }

  const addItem = () => {
    const text = newText.trim()
    if (!text || items.includes(text)) return
    const next = [...items, text]
    setItems(next)
    saveThoughtsList(next)
    setNewText('')
  }

  return (
    <div className="field">
      <div className="field__label-row">
        <div className="field__label">今日思えたこと</div>
        <button
          type="button"
          className="field__edit-toggle"
          onClick={() => setEditing((e) => !e)}
        >
          {editing ? '完了' : '編集'}
        </button>
      </div>

      <svg className="plate" width="100%" height="84" viewBox="0 0 200 84">
        <ellipse
          cx="100"
          cy="60"
          rx="90"
          ry="20"
          fill="var(--surface)"
          stroke="var(--chip-border)"
          strokeWidth="1.5"
        />
        <ellipse
          cx="100"
          cy="57"
          rx="62"
          ry="11"
          fill="none"
          stroke="var(--chip-border)"
          strokeWidth="1.5"
        />
        {value.map((_, i) => {
          const perRow = 7
          const row = Math.floor(i / perRow)
          const col = i % perRow
          const itemsInRow = Math.min(perRow, value.length - row * perRow)
          const x = 100 - ((itemsInRow - 1) * 17) / 2 + col * 17
          const y = 52 - row * 15
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="8"
              fill="var(--text-muted)"
              stroke="var(--surface)"
              strokeWidth="1.5"
            />
          )
        })}
      </svg>

      <div className="thought-list">
        {items.map((text) => (
          <div key={text} className="thought-row">
            <button
              type="button"
              className={`thought-row__button${value.includes(text) ? ' is-selected' : ''}`}
              onClick={() => toggle(text)}
            >
              <span className="thought-row__dot" />
              {text}
            </button>
            {editing && (
              <button
                type="button"
                className="thought-row__remove"
                onClick={() => removeItem(text)}
                aria-label="削除"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {editing && (
        <div className="thought-add">
          <input
            type="text"
            className="memo-input"
            value={newText}
            onChange={(e) => setNewText(e.target.value.slice(0, 30))}
            placeholder="新しい項目"
            maxLength={30}
          />
          <button
            type="button"
            className="thought-add__button"
            onClick={addItem}
          >
            追加
          </button>
        </div>
      )}
    </div>
  )
}
