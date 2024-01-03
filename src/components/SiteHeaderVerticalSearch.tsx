import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Box, IconButton, Input } from '@mui/material'
import useSiteHeaderSearch from '../hooks/useSiteHeaderSearch'

export default function SiteHeaderVerticalSearch() {
  const { openSearch, closeSearch, onKeyDown, onChange, deleteInput, inputEmpty, inputRef, buttonRef, open } =
    useSiteHeaderSearch()

  return (
    <div style={{ position: 'absolute', top: 0, right: '1rem' }}>
      <header className="site_header_outer" id="site_header">
        <div className="site_header">
          <nav className="header-nav">
            <button className="header-button" id="search_button" aria-label="検索" onClick={openSearch} ref={buttonRef}>
              <span className="search-button-icon"></span>
            </button>
          </nav>
        </div>
        {open && (
          <>
            <div className="backdrop" id="backdrop" role="button" aria-label="閉じる" onClick={closeSearch}></div>
            <div
              className="search-form"
              style={{
                background: '#fff',
                padding: '0.5rem',
                boxShadow: 'rgba(0, 0, 0, 0.3) 0px 3px 8px',
                borderRadius: '4px',
                position: 'absolute',
                width: '300px',
                left: '-287px',
                top: '33px',
              }}
            >
              <Box className="search-form-inner">
                <label htmlFor="q" style={{ top: '9px' }}></label>
                <Input
                  onKeyDown={onKeyDown}
                  id="q"
                  name="q"
                  required
                  autoComplete="off"
                  placeholder="オープンチャットを検索"
                  inputProps={{
                    'aria-label': 'weight',
                    sx: { pl: '2.1rem', pr: '3rem', m: '0.25rem 0' },
                    ref: inputRef,
                    onChange: onChange,
                  }}
                  sx={{ width: '100%' }}
                />
                {!inputEmpty && (
                  <IconButton
                    sx={{ position: 'absolute', right: '5px', top: '0px', zIndex: 2004 }}
                    onClick={deleteInput}
                  >
                    <HighlightOffIcon color="action" sx={{ fontSize: '22px' }} />
                  </IconButton>
                )}
              </Box>
            </div>
          </>
        )}
      </header>
    </div>
  )
}
