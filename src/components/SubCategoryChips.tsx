import React, { memo } from 'react'
import { Box, Button, Chip, Stack, Toolbar } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useDraggable } from 'react-use-draggable-scroll'
import { isSP } from '../utils/utils'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { useIsLeftRightScrollable, useIsRightScrollable } from '../hooks/ScrollableHooks'

const subCategories = (window as any).subCategories as SubCategories

const Chips = memo(function SubCategoryChips({ sub_category, setParams }: SubCategoryChipsProps) {
  const { category } = useParams()
  const existsProp = category && Object.hasOwn(subCategories, category)

  const handleChange = (newValue: ListParams['sub_category']) => {
    setParams((params) => ({ ...params, sub_category: newValue }))
  }

  return (
    <Stack direction="row" spacing={1}>
      {existsProp &&
        subCategories[category as SubCategoryKey].map((el, i) =>
          sub_category === el ? (
            <Chip key={i} label={el} className="openchat-item-header-chip selected" onClick={() => handleChange('')} />
          ) : (
            <Chip key={i} label={el} className="openchat-item-header-chip" onClick={() => handleChange(el)} />
          )
        )}
    </Stack>
  )
})

const chevronBradientBoxSx = (gradientDeg: number) => ({
  position: 'absolute',
  zIndex: 1155,
  top: 0,
  background: `linear-gradient(${gradientDeg}deg, rgba(255,255,255,1) 55%, rgba(0,0,0,0) 100%)`,
})

const buttonSx = { minWidth: 40, minHeight: 48 }
const chevronSx = { fontSize: '1.25rem' }

export const SubCategoryChipsPC = memo(function SubCategoryChipsPC(props: SubCategoryChipsProps) {
  const { category } = useParams()
  const [isLeftScrollable, isRightScrollable, ref] = useIsLeftRightScrollable(category)

  const { events } = useDraggable(ref, {
    applyRubberBandEffect: true,
    decayRate: 0.95,
  })

  const onClickArrow = (value: number) => () => {
    ref.current?.scrollTo({
      left: ref.current.scrollLeft - value,
      behavior: 'smooth',
    })
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {isLeftScrollable && (
        <Box sx={{ ...chevronBradientBoxSx(90) }}>
          <Button color="inherit" aria-label="left scroll" onClick={onClickArrow(250)} sx={buttonSx}>
            <ChevronLeft sx={chevronSx} />
          </Button>
        </Box>
      )}
      <Toolbar className="hide-scrollbar-x" {...events} ref={ref} style={{ minHeight: 48, cursor: 'grab' }}>
        <Chips {...props} />
      </Toolbar>
      {isRightScrollable && (
        <Box sx={{ ...chevronBradientBoxSx(270), right: 0 }}>
          <Button color="inherit" aria-label="right scroll" onClick={onClickArrow(-250)} sx={buttonSx}>
            <ChevronRight sx={chevronSx} />
          </Button>
        </Box>
      )}
    </div>
  )
})

const gradientBoxSx = {
  position: 'absolute',
  zIndex: 1155,
  top: 0,
  minWidth: 52,
  minHeight: 48,
  right: 0,
  background: 'linear-gradient(270deg, rgba(255,255,255,0.93) 50%, rgba(0,0,0,0) 100%)',
}

export const SubCategoryChipsSP2 = memo(function SubCategoryChipsSP2(props: SubCategoryChipsProps) {
  const { category } = useParams()
  const [isRightVisible, ref] = useIsRightScrollable(category)

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Toolbar className="hide-scrollbar-x" ref={ref} style={{ minHeight: 48 }}>
        <Chips {...props} />
      </Toolbar>
      {isRightVisible && <Box sx={{ ...gradientBoxSx }} />}
    </div>
  )
})

export default function SubCategoryChips(props: SubCategoryChipsProps) {
  return isSP() ? <SubCategoryChipsSP2 {...props} /> : <SubCategoryChipsPC {...props} />
}
