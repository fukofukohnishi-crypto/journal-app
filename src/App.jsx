import { useState } from 'react'
import RecordForm from './components/RecordForm'
import AccumulationVisual from './components/AccumulationVisual'
import heroImage from './assets/hero.jpg'
import './App.css'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="app">
      <img src={heroImage} alt="" className="hero-image" />
      <RecordForm onSaved={() => setRefreshKey((k) => k + 1)} />
      <AccumulationVisual refreshKey={refreshKey} />
    </div>
  )
}

export default App
