import Header from './sections/Header'
import HeroBanner from './sections/HeroBanner'
import Team from './sections/Team'
import Research from './sections/Research'
import Publications from './sections/Publications'
import OpenSource from './sections/OpenSource'
import Contact from './sections/Contact'
import './App.css'

function App() {
  return (
    <div style={{ backgroundColor: '#ffffff' }}>
      <Header />
      <HeroBanner />
      <Team />
      <Research />
      <Publications />
      <OpenSource />
      <Contact />
    </div>
  )
}

export default App
