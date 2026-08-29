import { useState } from 'react'
import ScoreSlider from './ScoreSlider'
import OriginSelector from './OriginSelector'
import { addRecord } from '../db'

export default function RecordForm({ onSaved }) {
  const [bodyScore, setBodyScore] = useState(50)
  const [spaceScore, setSpaceScore] = useState(50)
  const [origins, setOrigins] = useState([])

  const canSave = origins.length > 0

  const handleSave = async () => {
    if (!canSave) return
    await addRecord({
      timestamp: Date.now(),
      bodyScore,
      spaceScore,
      origins,
    })
    setBodyScore(50)
    setSpaceScore(50)
    setOrigins([])
    onSaved()
  }

  return (
    <section className="record-form">
      <ScoreSlider
        label="体の調子"
        value={bodyScore}
        onChange={setBodyScore}
      />
      <ScoreSlider
        label="心の余白"
        value={spaceScore}
        onChange={setSpaceScore}
      />
      <OriginSelector value={origins} onChange={setOrigins} />
      <button
        type="button"
        className="save-button"
        disabled={!canSave}
        onClick={handleSave}
      >
        置く
      </button>
    </section>
  )
}
