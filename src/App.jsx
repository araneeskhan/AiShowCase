import { ChakraProvider, Box } from '@chakra-ui/react'
// Remove this import since we're not using routes
// import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import Features from './components/sections/Features'
import AIShowcase from './components/sections/AIShowcase'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import ChatBot from './components/features/ChatBot'
import ParticlesBackground from './components/shared/ParticlesBackground'

function App() {
  console.log('App is rendering')

  return (
    <ChakraProvider>
      <Box className="app">
        <ParticlesBackground />
        <Navbar />
        <main>
          <Hero />
          <Features />
          <AIShowcase />
          <Contact />
        </main>
        <ChatBot />
        <Footer />
      </Box>
    </ChakraProvider>
  )
}

export default App
