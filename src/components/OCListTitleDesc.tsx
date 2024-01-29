import React from 'react'
import { Typography, useMediaQuery } from '@mui/material'
import OCListDescPopover, { HelpIcon } from './OCListDescPopover'

function ListDesc({ list, isAll, isSearch }: { list: ListParams['list']; isAll: boolean; isSearch: boolean }) {
  const p = { sx: { fontSize: 14 }, color: 'text.secondary' }

  switch (list) {
    case 'daily':
      return (
        <div>
          {!isAll && (
            <Typography gutterBottom {...p}>
              表示対象は、メンバー数が10人以上でオプチャ公式サイトに掲載中のルームです。ランキング未掲載の場合を除きます。
            </Typography>
          )}
          {isAll && (
            <Typography gutterBottom {...p}>
              表示対象は、メンバー数が10人以上でオプチャ公式サイトに掲載中のルームです。
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
              表示対象は、メンバー数が10人以上でオプチャ公式サイトに掲載中のルームです。ランキング未掲載の場合を除きます。
            </Typography>
          )}
          {isAll && (
            <Typography gutterBottom {...p}>
              表示対象は、メンバー数が10人以上でオプチャ公式サイトに掲載中のルームです。
            </Typography>
          )}
          <Typography {...p}>直近１週間の統計がない・１週間以上メンバー数に変動がないルームは除外されます。</Typography>
        </div>
      )
    case 'all':
      return (
        <div>
          {!isSearch ? (
            <Typography gutterBottom {...p}>
              表示対象は、オプチャ公式サイトに掲載中の全てのルームです。
            </Typography>
          ) : (
            <Typography gutterBottom {...p}>
              表示対象は、オプチャ公式サイトに掲載中の全てのルームです。
            </Typography>
          )}
          {!isAll && <Typography {...p}>ランキング未掲載の場合を除きます。</Typography>}
          {isAll && <Typography {...p}></Typography>}
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

  switch (list) {
    case 'daily':
      return (
        <div style={outer}>
          <Typography children="昨日〜今日の" sx={p} />
          <div style={inner}>
            <Typography children="メンバー増加ランキング" sx={p} />
            {visibility ? <HelpButton list={list} cateIndex={cateIndex} isSearch={isSearch} /> : <HelpIcon />}
          </div>
        </div>
      )
    case 'weekly':
      return (
        <div style={outer}>
          <Typography children="１週間前〜今日の" sx={p} />
          <div style={inner}>
            <Typography children="メンバー増加ランキング" sx={p} />
            {visibility ? <HelpButton list={list} cateIndex={cateIndex} isSearch={isSearch} /> : <HelpIcon />}
          </div>
        </div>
      )
    case 'all':
      return (
        <div style={outer}>
          <div style={inner}>
            {!isSearch ? (
              <Typography children="現存確認済みのオープンチャット" sx={p} />
            ) : (
              <Typography children="すべてのオープンチャット" sx={p} />
            )}
            {visibility ? <HelpButton list={list} cateIndex={cateIndex} isSearch={isSearch} /> : <HelpIcon />}
          </div>
        </div>
      )
  }
}
