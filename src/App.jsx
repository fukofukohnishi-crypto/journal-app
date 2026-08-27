import { useState } from 'react'
import RecordForm from './components/RecordForm'
import AccumulationVisual from './components/AccumulationVisual'
import './App.css'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="app">
      <RecordForm onSaved={() => setRefreshKey((k) => k + 1)} />
      <AccumulationVisual refreshKey={refreshKey} />
    </div>
  )
}

export default App
