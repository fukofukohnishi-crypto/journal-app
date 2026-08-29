export default function ScoreSlider({ label, value, onChange }) {
  return (
    <div className="score-field">
      <div className="score-field__header">
        <span className="score-field__label">{label}</span>
        <span className="score-field__value">{value}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="score-field__slider"
      />
    </div>
  )
}
