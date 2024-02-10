import React from 'react'
import { Box, Button, SvgIcon } from '@mui/material'
import SiteHeaderSearch from './SiteHeaderSearch'
import { rankingArgDto } from '../config/config'

export function BetaIcon() {
  return (
    <span
      style={{
        fontSize: '12px',
        fontWeight: 'normal',
        display: 'inline-flex',
        alignItems: 'center',
        color: '#000',
        position: 'relative',
        height: '8px',
        width: '8px',
      }}
    >
      <SvgIcon sx={{ fill: '#777', fontSize: '14px', top: '-2px', left: '-6px', position: 'absolute' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 847 847" style={{ rotate: '17deg' }}>
          <path d="M284 796c9 15 5 34-10 43-15 10-34 5-44-10-17-29-42-247-36-451 3-133 18-262 54-335 31-62 290-60 323 56 14 49-15 87-55 109 77 28 148 86 137 176-19 149-209 194-332 173-17-3-29-20-26-37s20-29 37-26c85 15 244-8 258-117 14-115-232-134-263-133s-33-64 0-63c34 0 199-9 183-64-19-67-161-52-210-35-28 66-40 180-43 297-5 194 13 394 27 417z" />
        </svg>
      </SvgIcon>
    </span>
  )
}

export function SiteTitleBtn() {
  return (
    <Button href="https://openchat-review.me" sx={{ p: 0, display: 'flex' }}>
      <div className="header_site_title">
        <img src="https://openchat-review.me/assets/icon-192x192.png" alt="" />
        <h1>オプチャグラフ</h1>
        <BetaIcon />
      </div>
    </Button>
  )
}

export default function SiteHeader({
  children,
  height,
  siperSlideTo,
}: {
  children?: React.ReactNode
  height: string
  siperSlideTo: (index: number) => void
}) {
  return (
    <div className="site_header_box" style={{ height }}>
      <SiteHeaderSearch
        siperSlideTo={siperSlideTo}
        headerInnerStyle={{
          padding: '0 1rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
        searchFormStyle={{ margin: '0 1rem' }}
      >
        <Box sx={{ display: 'flex' }}>
          <SiteTitleBtn />
          <div className="refresh-time">
            <div className="refresh-icon"></div>
            <time>{rankingArgDto.rankingUpdatedAt}</time>
          </div>
        </Box>
      </SiteHeaderSearch>
      {children}
    </div>
  )
}
