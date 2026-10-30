import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Film from './components/Film'
import Services from './components/Services'
import Projects from './components/Projects'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Film />
        <Services />
        <Projects />
        <About />
        <Testimonials />
        <Process />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}

export default App
