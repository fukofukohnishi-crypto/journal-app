export default function MemoInput({ value, onChange, placeholder = 'メモ（任意）' }) {
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
      placeholder={placeholder}
      maxLength={40}
    />
  )
}
