import React from 'react'
import { Typography, useMediaQuery } from '@mui/material'
import OCListDescPopover, { HelpIcon } from './OCListDescPopover'
import { rankingArgDto } from '../config/config'

function ListDesc({ list, isAll, isSearch }: { list: ListParams['list']; isAll: boolean; isSearch: boolean }) {
  const p = { sx: { fontSize: 14 }, color: 'text.secondary' }

  switch (list) {
    case 'daily':
      return (
        <div>
          {!isAll && (
            <Typography gutterBottom {...p}>
              表示対象はメンバー数が10人以上で公式ランキングに掲載されたルームです。
            </Typography>
          )}
          {isAll && (
            <Typography gutterBottom {...p}>
              表示対象はメンバー数が10人以上のルームです。
            </Typography>
          )}
          <Typography {...p}>１週間以上メンバー数に変動がないルームは除外されます。</Typography>
        </div>
      )
    case 'weekly':
      return (
        <div>
          {!isAll && (
            <Typography gutterBottom {...p}>
              表示対象はメンバー数が10人以上で公式ランキングに掲載されたルームです。
            </Typography>
          )}
          {isAll && (
            <Typography gutterBottom {...p}>
              表示対象はメンバー数が10人以上のルームです。
            </Typography>
          )}
          <Typography {...p}>直近１週間の統計がない・１週間以上メンバー数に変動がないルームは除外されます。</Typography>
        </div>
      )
    case 'all':
      return (
        <div>
          {!isAll && <Typography {...p}>表示対象は公式ランキングに掲載されたルームです。</Typography>}
          {isAll && <Typography {...p}>表示対象は全てのルームです。</Typography>}
        </div>
      )
  }
}

function HelpButton({ list, cateIndex, isSearch }: { list: ListParams['list']; cateIndex: number; isSearch: boolean }) {
  return (
    <OCListDescPopover>
      <ListDesc list={list} isAll={cateIndex === 0} isSearch={isSearch} />
    </OCListDescPopover>
  )
}

export default function OCListTitleDesc({
  list,
  cateIndex,
  isSearch,
  visibility = true,
}: {
  list: ListParams['list']
  cateIndex: number
  isSearch: boolean
  visibility?: boolean
}) {
  const matches = useMediaQuery('(min-width:600px)') // 599px以下で false
  const divCss: React.CSSProperties = { display: 'flex', flexWrap: 'wrap' }
  const outer: React.CSSProperties = { ...divCss, marginBottom: '.5rem' }
  const inner: React.CSSProperties = { ...divCss, gap: '4px' }
  const p = { fontWeight: 700, fontSize: matches ? '17px' : '15px' }

  const updatedAt = new Date(rankingArgDto.modifiedUpdatedAtDate)
  const past = new Date(rankingArgDto.modifiedUpdatedAtDate)

  switch (list) {
    case 'daily':
      past.setDate(past.getDate() - 1)
      return (
        <div style={outer}>
          <Typography children="メンバー増加ランキング" sx={{ ...p, mr: 1 }} />
          <div style={inner}>
            <Typography
              children={`${past.getMonth() + 1}月${past.getDate()}日〜${
                updatedAt.getMonth() + 1
              }月${updatedAt.getDate()}日`}
              sx={p}
            />
            {visibility ? <HelpButton list={list} cateIndex={cateIndex} isSearch={isSearch} /> : <HelpIcon />}
          </div>
        </div>
      )
    case 'weekly':
      past.setDate(past.getDate() - 7)
      return (
        <div style={outer}>
          <Typography children="メンバー増加ランキング" sx={{ ...p, mr: 1 }} />
          <div style={inner}>
            <Typography
              children={`${past.getMonth() + 1}月${past.getDate()}日〜${
                updatedAt.getMonth() + 1
              }月${updatedAt.getDate()}日`}
              sx={p}
            />
            {visibility ? <HelpButton list={list} cateIndex={cateIndex} isSearch={isSearch} /> : <HelpIcon />}
          </div>
        </div>
      )
    case 'all':
      return (
        <div style={outer}>
          <div style={inner}>
            {!isSearch ? (
              <Typography children="すべてのオープンチャット" sx={p} />
            ) : (
              <Typography children="すべてのオープンチャット" sx={p} />
            )}
            {visibility ? <HelpButton list={list} cateIndex={cateIndex} isSearch={isSearch} /> : <HelpIcon />}
          </div>
        </div>
      )
  }
}
