import { useCallback, useRef } from 'react'

const TRACK_HEIGHT = 200

export default function IntensityDial({ value, onChange, color }) {
  const trackRef = useRef(null)
  const dragging = useRef(false)

  const updateFromClientY = useCallback(
    (clientY) => {
      const rect = trackRef.current.getBoundingClientRect()
      const ratio = 1 - (clientY - rect.top) / rect.height
      onChange(Math.min(1, Math.max(0, ratio)))
    },
    [onChange],
  )

  const handlePointerDown = (e) => {
    dragging.current = true
    e.target.setPointerCapture(e.pointerId)
    updateFromClientY(e.clientY)
  }
  const handlePointerMove = (e) => {
    if (!dragging.current) return
    updateFromClientY(e.clientY)
  }
  const handlePointerUp = () => {
    dragging.current = false
  }

  const fillHeight = value * TRACK_HEIGHT
  const opacity = 0.25 + value * 0.75

  return (
    <div className="field">
      <div className="field__label">強さ</div>
      <div
        ref={trackRef}
        className="intensity-dial__track"
        style={{ height: TRACK_HEIGHT }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div
          className="intensity-dial__fill"
          style={{ height: fillHeight, background: color, opacity }}
        />
      </div>
    </div>
  )
}
