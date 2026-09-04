export default function ScoreSlider({ label, value, onChange }) {
  return (
    <div className="score-field">
      <div className="score-field__label">{label}</div>
      <div className="score-field__value">{value}%</div>
      <input
        type="range"
        min={0}
        max={100}
        step={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="score-field__slider"
      />
    </div>
  )
}
