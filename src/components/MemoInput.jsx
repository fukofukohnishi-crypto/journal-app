import { useRef } from 'react'

export default function MemoInput({ value, onChange, placeholder = 'メモ（任意）' }) {
  const inputRef = useRef(null)

  const handleChange = (e) => {
    const next = e.target.value.replace(/\n/g, '').slice(0, 40)
    onChange(next)
  }

  return (
    <div className="memo-field">
      <input
        ref={inputRef}
        type="text"
        className="memo-input"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={40}
      />
      <button
        type="button"
        className="memo-field__confirm"
        onClick={() => inputRef.current?.blur()}
        aria-label="確定"
      >
        ✓
      </button>
    </div>
  )
}
