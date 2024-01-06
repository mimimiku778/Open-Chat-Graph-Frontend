import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OCListPage from './pages/OCListPage'
import { useEffect } from 'react'

function RedirectTo404() {
  useEffect(() => {
    window.location.replace('https://openchat-review.me/404')
  }, [])

  return null
}

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="ranking/" element={<OCListPage />} />
        <Route path="ranking/:category" element={<OCListPage />} />
        <Route path="*" element={<RedirectTo404 />} />
      </Routes>
    </BrowserRouter>
  )
}
