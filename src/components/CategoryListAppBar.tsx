import React, { memo } from 'react'
import { useListParams } from '../hooks/ListParamsHooks'
import { Box, Slide, Toolbar, useMediaQuery, useScrollTrigger } from '@mui/material'
import OCListSortMenu, { allOptions2, rankingOptions2 } from './OCListSortMenu'
import ListToggleChips from './ListToggleChips'
import { useParams } from 'react-router-dom'
import SubCategoryChips from './SubCategoryChips'

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
  const height = 48
  const { category } = useParams()
  const [params, setParams] = useListParams()
  const matches = useMediaQuery('(min-width:600px)') // 599px以下で false

  return (
    <Box sx={{ height: category ? height * 2 : height }}>
      <HideOnScroll matches={matches}>
        <Box
          color="inherit"
          sx={{
            boxShadow: 0,
            zIndex: 1000,
            top: matches ? 'auto' : '95px',
            borderBottom: 1,
            borderColor: 'divider',
            position: matches ? 'static' : 'fixed',
            background: 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(8px)',
            width: '100%',
          }}
        >
          <Toolbar style={{ minHeight: height, paddingRight: 0 }}>
            <ListToggleChips list={params.list} setParams={setParams} />
            <OCListSortMenu
              options={params.list === 'all' ? allOptions2 : rankingOptions2}
              sort={params.sort}
              order={params.order}
              setParams={setParams}
            />
          </Toolbar>
          {category && <SubCategoryChips sub_category={params.sub_category} setParams={setParams} />}
        </Box>
      </HideOnScroll>
    </Box>
  )
})
