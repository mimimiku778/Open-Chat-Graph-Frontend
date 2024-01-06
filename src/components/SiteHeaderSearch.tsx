import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Box, IconButton, Input } from '@mui/material'
import useSiteHeaderSearch from '../hooks/useSiteHeaderSearch'

export default function SiteHeaderSearch({
  children,
  headerInnerStyle,
  searchFormStyle,
}: {
  children?: React.ReactNode
  headerInnerStyle?: React.CSSProperties
  searchFormStyle?: React.CSSProperties
}) {
  const {
    openSearch,
    closeSearch,
    onKeyDown,
    onChange,
    onSubmit,
    deleteInput,
    inputEmpty,
    inputRef,
    hiddenRef,
    buttonRef,
    open,
  } = useSiteHeaderSearch()

  return (
    <header className="site_header_outer" id="site_header">
      <div className="site_header" style={{ ...headerInnerStyle, display: open ? 'none' : undefined }}>
        {children}
        <nav className="header-nav">
          <button className="header-button" id="search_button" aria-label="検索" onClick={openSearch} ref={buttonRef}>
            <span className="search-button-icon"></span>
          </button>
        </nav>
      </div>
      <div hidden={!open}>
        <div className="backdrop" id="backdrop" role="button" aria-label="閉じる" onClick={closeSearch}></div>
        <form
          className="search-form site_header"
          style={searchFormStyle}
          method="GET"
          action="https://openchat-review.me/search"
          onSubmit={onSubmit}
        >
          <Box className="search-form-inner" sx={{ pt: '7px' }}>
            <label htmlFor="q" style={{ top: '16px' }}></label>
            <Input
              onKeyDown={onKeyDown}
              id="q"
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
            <input type="hidden" name="q" ref={hiddenRef} />
            {!inputEmpty && (
              <IconButton sx={{ position: 'absolute', right: '5px', top: '7px', zIndex: 2004 }} onClick={deleteInput}>
                <HighlightOffIcon color="action" sx={{ fontSize: '22px' }} />
              </IconButton>
            )}
          </Box>
        </form>
      </div>
    </header>
  )
}
