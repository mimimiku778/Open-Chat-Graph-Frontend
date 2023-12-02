import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Page404 } from './pages/Page404'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* 上記のどれにも一致しなかった場合 */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}
