import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import BanlistPage from './pages/BanlistPage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/banlist" element={<BanlistPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App