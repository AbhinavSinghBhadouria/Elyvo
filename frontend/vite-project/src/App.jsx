import { useState, useEffect } from 'react'
import './App.css'
import { useUser } from '@clerk/clerk-react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProblemsPage from './pages/ProblemsPage'
import WelcomePage from './pages/WelcomePage'
import DashBoardPage from './pages/DashBoardPage'
import SessionPage from './pages/SessionPage'
import ProblemDetailPage from './pages/ProblemDetailPage'
import CompaniesPage from './pages/CompaniesPage'
import CompanyDetailPage from './pages/CompanyDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import { Toaster } from 'react-hot-toast'

function App() {
  const { isSignedIn, isLoaded } = useUser()
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('elyvo_visited')
  })

  useEffect(() => {
    if (!showSplash) return
    const timer = setTimeout(() => {
      sessionStorage.setItem('elyvo_visited', 'true')
      setShowSplash(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [showSplash])

  if (showSplash) {
    return <WelcomePage />
  }

  if (!isLoaded) {
    return (
      <div className="h-screen bg-[var(--bg-main)] flex items-center justify-center">
        <div className="spinner" />
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isSignedIn ? <Navigate to="/dashboard" /> : <HomePage />}
        />
        <Route
          path="/dashboard"
          element={isSignedIn ? <DashBoardPage /> : <Navigate to="/" />}
        />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problem/:id" element={<ProblemDetailPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/companies/:id" element={<CompanyDetailPage />} />
        <Route
          path="/session/:id"
          element={isSignedIn ? <SessionPage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0f0f16',
            color: '#f8fafc',
            border: '1px solid rgba(255,255,255,0.08)',
          },
        }}
      />
    </>
  )
}

export default App
