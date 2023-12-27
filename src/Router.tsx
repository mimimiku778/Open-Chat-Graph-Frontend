import { BrowserRouter, Routes, Route } from 'react-router-dom'
import OCListPage from './pages/OCListPage'
import { Page404 } from './pages/Page404'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="react-test/" element={<OCListPage />} />
        <Route path="react-test/:category" element={<OCListPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}
