import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { TranslationProvider } from './context/TranslationContext'
import { useApp } from './context/AppContext'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Budgets from './pages/Budgets'
import Accounts from './pages/Accounts'
import Settings from './pages/Settings'
import Layout from './components/Layout'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { state } = useApp()
  
  if (!state.session.isAuthenticated) {
    return <Navigate to="/signin" replace />
  }
  
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/transactions" element={
        <ProtectedRoute>
          <Layout>
            <Transactions />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/budgets" element={
        <ProtectedRoute>
          <Layout>
            <Budgets />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/accounts" element={
        <ProtectedRoute>
          <Layout>
            <Accounts />
          </Layout>
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <Layout>
            <Settings />
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

function App() {
  return (
    <AppProvider>
      <TranslationProvider>
        <Router>
          <AppRoutes />
        </Router>
      </TranslationProvider>
    </AppProvider>
  )
}

export default App
