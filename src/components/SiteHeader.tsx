import React from 'react'
import useSiteHaederSearchEffect from '../hooks/useSiteHaederSearchEffect'

export default function SiteHeader({ children, height }: { children?: React.ReactNode; height: string }) {
  useSiteHaederSearchEffect()

  return (
    <div className="site_header_box" style={{ height }}>
      <header className="site_header_outer" id="site_header">
        <div className="site_header">
          <a className="header_site_title" href="https://openchat-review.me">
            <img src="https://openchat-review.me/assets/icon-192x192.png" alt="" />
            <h1>オプチャグラフ</h1>
          </a>
          <div className="refresh-time">
            <div className="refresh-icon"></div>
            <time>{(window as any).rankingUpdatedAt}</time>
          </div>
          <nav className="header-nav">
            <button className="header-button" id="search_button" aria-label="検索">
              <span className="search-button-icon"></span>
            </button>
          </nav>
        </div>
        <div className="backdrop" id="backdrop" role="button" aria-label="閉じる"></div>
        <div className="search-form site_header">
          <form className="search-form-inner" method="GET" action="https://openchat-review.me/search">
            <label htmlFor="q"></label>
            <input
              type="text"
              id="q"
              name="q"
              placeholder="オープンチャットを検索"
              maxLength={40}
              autoComplete="off"
              required
            />
          </form>
        </div>
      </header>
      {children}
    </div>
  )
}
