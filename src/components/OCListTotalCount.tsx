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
      <Typography sx={{ fontSize: 13 }}>{OPEN_CHAT_CATEGORY[cateIndex][0]}</Typography>

      {subCategory && (
        <>
          <ChevronRightIcon sx={{ fontSize: '17px' }} />
          <Typography sx={{ fontSize: 13, display: 'flex', alignItems: 'center' }}>{subCategory}</Typography>
        </>
      )}
      {keyword && (
        <>
          <ChevronRightIcon sx={{ fontSize: '17px' }} />
          <Typography sx={{ fontSize: 13, display: 'flex', alignItems: 'center' }}>「{keyword}」</Typography>
          <Typography sx={{ fontSize: 13, display: 'flex', alignItems: 'center' }}>の検索結果</Typography>
        </>
      )}
      {totalCount && (
        <Typography sx={{ fontSize: 13, display: 'flex', alignItems: 'center' }}>
          <ChevronRightIcon sx={{ fontSize: '17px' }} />
          {totalCount}
        </Typography>
      )}
    </div>
  )
}
