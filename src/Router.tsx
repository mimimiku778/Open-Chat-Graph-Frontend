import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Test from './pages/Test'
import { Page404 } from './pages/Page404'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="explore/" element={<Test />} />
        <Route path="explore/:category" element={<Test />} />
        {/* 上記のどれにも一致しなかった場合 */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}
