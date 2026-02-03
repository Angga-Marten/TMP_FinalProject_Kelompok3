import { Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import UserDashboard from './pages/UserDashboard'
import AdminPanel from './pages/AdminPanel'

function App() {
  return (
    <>
      <Routes>
        <Route path="" element={<LandingPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/landingpage" element={<LandingPage />} />
      </Routes>
    </>
  )
}

export default App
