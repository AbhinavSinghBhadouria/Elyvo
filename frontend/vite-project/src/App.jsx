import { useState, useEffect } from 'react'
import './App.css'
import { useUser } from '@clerk/clerk-react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProblemsPage from './pages/ProblemsPage'
import WelcomePage from './pages/WelcomePage'
import DashBoardPage from './pages/DashBoardPage'
import { Toaster } from 'react-hot-toast'

function App() {
  const { isSignedIn, isLoaded } = useUser()
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Splash Screen
  if (showSplash) {
    return <WelcomePage />
  }

  // Wait for Clerk
  if (!isLoaded) return null

  return (
    <>
      <Routes>

        {/* Public Home */}
        <Route 
          path="/" 
          element={isSignedIn ? <Navigate to="/dashboard" /> : <HomePage />} 
        />

        {/* Protected Dashboard */}
        <Route 
          path="/dashboard" 
          element={isSignedIn ? <DashBoardPage /> : <Navigate to="/" />} 
        />

        {/* Protected Problems */}
        <Route 
          path="/problems" 
          element={isSignedIn ? <ProblemsPage /> : <Navigate to="/" />} 
        />

      </Routes>

      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  )
}

export default App
