import { useState } from 'react'
import ScoreSlider from './ScoreSlider'
import OriginSelector from './OriginSelector'
import ThoughtsSelector from './ThoughtsSelector'
import { addRecord } from '../db'

export default function RecordForm({ onSaved }) {
  const [bodyScore, setBodyScore] = useState(50)
  const [spaceScore, setSpaceScore] = useState(50)
  const [origins, setOrigins] = useState([])
  const [originNotes, setOriginNotes] = useState({})
  const [thoughts, setThoughts] = useState([])

  const canSave = origins.length > 0

  const handleOriginChange = (next) => {
    setOrigins(next)
    setOriginNotes((prev) => {
      const nextNotes = {}
      for (const id of next) nextNotes[id] = prev[id] ?? ''
      return nextNotes
    })
  }

  const handleNoteChange = (id, note) => {
    setOriginNotes((prev) => ({ ...prev, [id]: note }))
  }

  const handleSave = async () => {
    if (!canSave) return
    await addRecord({
      timestamp: Date.now(),
      bodyScore,
      spaceScore,
      origins,
      originNotes,
      thoughts,
    })
    setBodyScore(50)
    setSpaceScore(50)
    setOrigins([])
    setOriginNotes({})
    setThoughts([])
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
      <OriginSelector
        value={origins}
        onChange={handleOriginChange}
        notes={originNotes}
        onNoteChange={handleNoteChange}
      />
      <ThoughtsSelector value={thoughts} onChange={setThoughts} />
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
