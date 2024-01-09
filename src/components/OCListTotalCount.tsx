import React from 'react'
import { Typography } from '@mui/material'
import { OPEN_CHAT_CATEGORY } from '../config/config'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export default function OCListTotalCount({
  totalCount,
  cateIndex,
  subCategory,
  keyword,
}: {
  totalCount: string
  cateIndex: number
  subCategory: string
  keyword: string
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
      <Typography sx={{ fontSize: 13 }} color="text.secondary">
        {OPEN_CHAT_CATEGORY[cateIndex][0]}
      </Typography>
      <ChevronRightIcon sx={{ fontSize: '19px' }} color="action" />
      {(subCategory || keyword) && (
        <Typography sx={{ fontSize: 13, display: 'flex', alignItems: 'center' }} color="text.secondary">
          {subCategory}
          {keyword}
          <ChevronRightIcon sx={{ fontSize: '19px' }} color="action" />
        </Typography>
      )}
      {totalCount && (
        <Typography sx={{ fontSize: 13 }} color="text.secondary">
          {totalCount}
        </Typography>
      )}
    </div>
  )
}
