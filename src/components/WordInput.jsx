export default function WordInput({ value, onChange }) {
  const handleChange = (e) => {
    // 単語のみ許可。空白・改行を挟んだ瞬間に文章化するのを防ぐ
    const next = e.target.value.replace(/\s+/g, '').slice(0, 20)
    onChange(next)
  }

  return (
    <div className="field">
      <div className="field__label">単語（任意）</div>
      <input
        type="text"
        className="word-input"
        value={value}
        onChange={handleChange}
        maxLength={20}
      />
    </div>
  )
}
