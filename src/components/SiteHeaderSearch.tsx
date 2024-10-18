import React from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Box, IconButton, Input } from '@mui/material'
import useSiteHeaderSearch from '../hooks/useSiteHeaderSearch'
import { rankingArgDto } from '../config/config'
import { listParamsState } from '../store/atom'
import { useRecoilValue } from 'recoil'
import { toggleButtons } from './ListToggleChips'

export default function SiteHeaderSearch({
  children,
  headerInnerStyle,
  searchFormStyle,
  siperSlideTo,
}: {
  children?: React.ReactNode
  headerInnerStyle?: React.CSSProperties
  searchFormStyle?: React.CSSProperties
  siperSlideTo: (index: number) => void
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
    handleCompositionStart,
    handleCompositionEnd,
  } = useSiteHeaderSearch(siperSlideTo)

  const params = useRecoilValue(listParamsState)
  if (!toggleButtons.find((el) => el[0] === params.list))
    return (
      <header className="site_header_outer" id="site_header">
        <div className="site_header" style={{ ...headerInnerStyle, display: open ? 'none' : undefined }}>
          {children}
        </div>
      </header>
    )

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
          action={`${rankingArgDto.baseUrl}/search`}
          onSubmit={onSubmit}
        >
          <Box className="search-form-inner" sx={{ pt: '0px' }}>
            <label htmlFor="q" style={{ top: '10px' }}></label>
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
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              className="search-input"
            />
            <input type="hidden" name="q" ref={hiddenRef} />
            {!inputEmpty && (
              <IconButton sx={{ position: 'absolute', right: '5px', top: '7px', zIndex: 2004 }} onClick={deleteInput}>
                <HighlightOffIcon sx={{ fontSize: '22px', color: '#777' }} />
              </IconButton>
            )}
          </Box>
        </form>
      </div>
    </header>
  )
}
