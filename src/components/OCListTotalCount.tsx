import React from 'react'
import { Typography } from '@mui/material'
import { OPEN_CHAT_CATEGORY } from '../config/config'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export default function OCListTotalCount({
  totalCount,
  cateIndex,
  subCategory,
}: {
  totalCount: string
  cateIndex: number
  subCategory: string
}) {
  console.log('TotalCount')
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography sx={{ fontSize: 13 }} color="text.secondary">
        {OPEN_CHAT_CATEGORY[cateIndex][0]}
      </Typography>
      <ChevronRightIcon sx={{ fontSize: '19px' }} color="action" />
      {subCategory && (
        <>
          <Typography sx={{ fontSize: 13 }} color="text.secondary">
            {subCategory}
          </Typography>
          <ChevronRightIcon sx={{ fontSize: '19px' }} color="action" />
        </>
      )}
      {totalCount && (
        <Typography sx={{ fontSize: 13 }} color="text.secondary">
          {totalCount}
        </Typography>
      )}
    </div>
  )
}