import React from 'react'
import useSiteHaederSearchEffect from '../hooks/useSiteHaederSearchEffect'

export function SiteHeaderVerticalSearch() {
  useSiteHaederSearchEffect()

  return (
    <div style={{ position: 'absolute', top: 0, right: 0 }}>
      <header className="site_header_outer" id="site_header">
        <div className="site_header">
          <nav className="header-nav">
            <button className="header-button" id="search_button" aria-label="検索">
              <span className="search-button-icon"></span>
            </button>
          </nav>
        </div>
        <div className="backdrop" id="backdrop" role="button" aria-label="閉じる"></div>
        <div className="search-form site_header" style={{ margin: 0 }}>
          <form
            className="search-form-inner"
            method="GET"
            action="https://openchat-review.me/search"
            style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
          >
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
    </div>
  )
}

export default function SiteHeaderVertical({ height }: { height: string }) {
  return (
    <header className="site_header_outer" style={{ height }}>
      <div className="site_header" style={{ margin: '0' }}>
        <a className="header_site_title" href="https://openchat-review.me">
          <img src="https://openchat-review.me/assets/icon-192x192.png" alt="" />
          <h1>オプチャグラフ</h1>
        </a>
      </div>
      <div className="refresh-time" style={{ textAlign: 'center', marginLeft: '18px' }}>
        <div className="refresh-icon"></div>
        <time>{(window as any).rankingUpdatedAt}</time>
      </div>
    </header>
  )
}
