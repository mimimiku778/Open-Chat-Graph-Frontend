import React, { memo } from 'react'
import { Box, Slide, Toolbar, useMediaQuery, useScrollTrigger } from '@mui/material'
import { OCListSortMenu, allOptions2, rankingOptions2 } from './OCListSortMenu'
import ListToggleChips, { officialButtons, toggleButtons } from './ListToggleChips'
import { useParams } from 'react-router-dom'
import SubCategoryChips from './SubCategoryChips'
import { useRecoilValue } from 'recoil'
import { listParamsState } from '../store/atom'
import KeywordChip from './KeywordChip'

function HideOnScroll({ children, matches }: { children: React.ReactElement; matches: boolean }) {
  const trigger = useScrollTrigger()

  return matches ? (
    <>{children}</>
  ) : (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export const CategoryListAppBar = memo(function HideListAppBar() {
  const height = 52
  const { category } = useParams()
  const params = useRecoilValue(listParamsState)
  const matches = useMediaQuery('(min-width:600px)') // 599px以下で false

  function ToggleToolbar() {
    return (
      <>
        <Toolbar style={{ minHeight: height, paddingRight: 0 }}>
          <ListToggleChips list={params.list} toggleButtons={toggleButtons} />
          <OCListSortMenu
            options={params.list === 'all' ? allOptions2 : rankingOptions2}
            sort={params.sort}
            order={params.order}
          />
        </Toolbar>
        {category && !params.keyword && <SubCategoryChips sub_category={params.sub_category} />}
        {params.keyword && <KeywordChip keyword={params.keyword} />}
      </>
    )
  }

  function OfficialToolbar() {
    return (
      <Toolbar style={{ minHeight: height, paddingRight: 0 }}>
        <ListToggleChips list={params.list} toggleButtons={officialButtons} />
      </Toolbar>
    )
  }

  return (
    <Box
      sx={{
        height: toggleButtons.find((el) => el[0] === params.list) && (category || params.keyword) ? height * 2 : height,
      }}
    >
      <HideOnScroll matches={matches}>
        <Box
          color="inherit"
          sx={{
            boxShadow: 0,
            zIndex: 1000,
            top: matches ? 'auto' : '95px',
            borderBottom: 1,
            borderColor: '#efefef',
            position: matches ? 'static' : 'fixed',
            background: 'rgba(255,255,255,1)',
            width: '100%',
          }}
        >
          {params.list !== 'ranking' && params.list !== 'rising' ? <ToggleToolbar /> : <OfficialToolbar />}
        </Box>
      </HideOnScroll>
    </Box>
  )
})
