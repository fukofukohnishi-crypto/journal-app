import { useState } from 'react'
import IntensityDial from './IntensityDial'
import TypeSelector from './TypeSelector'
import BodySelector from './BodySelector'
import WordInput from './WordInput'
import { typeColor } from '../constants'
import { addRecord } from '../db'

export default function RecordForm({ onSaved }) {
  const [intensity, setIntensity] = useState(0.5)
  const [type, setType] = useState(null)
  const [bodyPart, setBodyPart] = useState(null)
  const [word, setWord] = useState('')

  const canSave = Boolean(type)

  const handleSave = async () => {
    if (!canSave) return
    await addRecord({
      timestamp: Date.now(),
      intensity,
      type,
      bodyPart,
      word: word || null,
    })
    setIntensity(0.5)
    setType(null)
    setBodyPart(null)
    setWord('')
    onSaved()
  }

  return (
    <section className="record-form">
      <IntensityDial
        value={intensity}
        onChange={setIntensity}
        color={type ? typeColor(type) : '#9a9a9a'}
      />
      <TypeSelector value={type} onChange={setType} />
      <BodySelector value={bodyPart} onChange={setBodyPart} />
      <WordInput value={word} onChange={setWord} />
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
