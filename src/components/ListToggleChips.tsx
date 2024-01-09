import React, { memo } from 'react'
import { Chip, Stack } from '@mui/material'
import { useSetListParams } from '../hooks/ListParamsHooks'

const toggleButtons: [ListParams['list'], string][] = [
  ['daily', '前日比'],
  ['weekly', '前週比'],
  ['all', '全体'],
]

const ListToggleChips = memo(function ListToggleButton({ list }: { list: ListParams['list'] }) {
  const setParams = useSetListParams()
  const handleChange = (newList: ListParams['list']) => {
    newList && setParams((params) => ({ ...params, list: newList, order: '', sort: '' }))
  }

  return (
    <Stack direction="row" spacing={1}>
      {toggleButtons.map((el, i) =>
        list === el[0] ? (
          <Chip key={i} label={el[1]} className="openchat-item-header-chip selected" sx={{ cursor: 'default' }} />
        ) : (
          <Chip key={i} label={el[1]} onClick={() => handleChange(el[0])} className="openchat-item-header-chip" />
        )
      )}
    </Stack>
  )
})

export default ListToggleChips
