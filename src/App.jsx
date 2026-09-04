import { useState } from 'react'
import RecordForm from './components/RecordForm'
import AccumulationVisual from './components/AccumulationVisual'
import DateNav from './components/DateNav'
import DayRecords from './components/DayRecords'
import heroImage from './assets/hero.jpg'
import './App.css'

function startOfToday() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

function App() {
  const [refreshKey, setRefreshKey] = useState(0)
  const [selectedDate, setSelectedDate] = useState(startOfToday())

  return (
    <div className="app">
      <img src={heroImage} alt="" className="hero-image" />
      <div className="day-panel">
        <DateNav date={selectedDate} onChange={setSelectedDate} />
        <DayRecords date={selectedDate} refreshKey={refreshKey} />
      </div>
      <RecordForm onSaved={() => setRefreshKey((k) => k + 1)} />
      <AccumulationVisual refreshKey={refreshKey} />
    </div>
  )
}

export default App
