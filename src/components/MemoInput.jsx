export default function MemoInput({ value, onChange }) {
  const handleChange = (e) => {
    const next = e.target.value.replace(/\n/g, '').slice(0, 40)
    onChange(next)
  }

  return (
    <input
      type="text"
      className="memo-input"
      value={value}
      onChange={handleChange}
      placeholder="メモ（任意）"
      maxLength={40}
    />
  )
}
