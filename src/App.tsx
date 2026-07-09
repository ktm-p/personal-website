import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { TransitionProvider, usePageTransition } from './context/TransitionContext'

import Navbar from './components/Navbar'
import PerspectiveGrid from './components/PerspectiveGrid'
import Landing from './pages/Landing'
import About from './pages/about'
import CDs from './pages/about/hobbies/cds'

function AnimatedRoutes() {
  const {phase} = usePageTransition()
  const location = useLocation()

  return (
    <div
      className={phase === 'exit' ? 'page-exit' : phase === 'between' ? 'page-between' : phase === 'enter' ? 'page-enter' : ''}
      style={{position: 'relative', zIndex: 1}}
    >
      <Routes location={location}>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/hobbies/cds" element={<CDs />} />
      </Routes>
    </div>
  )
}

function Inner() {
  return (
    <>
      <PerspectiveGrid />
      <Navbar />
      <AnimatedRoutes />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <TransitionProvider>
        <Inner />
      </TransitionProvider>
    </BrowserRouter>
  )
}