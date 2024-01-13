import React from 'react'
import { Typography, useMediaQuery } from '@mui/material'
import OCListDescPopover, { HelpIcon } from './OCListDescPopover'

function ListDesc({ list, isAll }: { list: ListParams['list']; isAll: boolean }) {
  const p = { sx: { fontSize: 14 }, color: 'text.secondary' }

  switch (list) {
    case 'daily':
      return (
        <div>
          {!isAll && (
            <Typography gutterBottom {...p}>
              表示対象は、メンバー数が10人以上でオプチャ公式ランキングに掲載歴のあるルームです。
            </Typography>
          )}
          {isAll && (
            <Typography gutterBottom {...p}>
              表示対象は、メンバー数が10人以上の全てのルームです。
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
              表示対象は、メンバー数が10人以上でオプチャ公式ランキングに掲載歴のあるルームです。
            </Typography>
          )}
          {isAll && (
            <Typography gutterBottom {...p}>
              表示対象は、メンバー数が10人以上の全てのルームです。
            </Typography>
          )}
          <Typography {...p}>直近１週間の統計がない・１週間以上メンバー数に変動がないルームは除外されます。</Typography>
        </div>
      )
    case 'all':
      return (
        <div>
          <Typography gutterBottom {...p}>
            オプチャグラフによる現存確認済みのルームリストです。
          </Typography>
          {!isAll && <Typography {...p}>表示対象は、オプチャ公式ランキングに掲載歴のある全てのルームです。</Typography>}
          {isAll && (
            <Typography {...p}>
              表示対象は、LINE公式ランキングから自動登録されたルームと、オプチャグラフのフォームから登録された全てのルームです。
            </Typography>
          )}
        </div>
      )
  }
}

function HelpButton({ list, cateIndex }: { list: ListParams['list']; cateIndex: number }) {
  return (
    <OCListDescPopover>
      <ListDesc list={list} isAll={cateIndex === 0} />
    </OCListDescPopover>
  )
}

export default function OCListTitleDesc({
  list,
  cateIndex,
  visibility = true,
}: {
  list: ListParams['list']
  cateIndex: number
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
            {visibility ? <HelpButton list={list} cateIndex={cateIndex} /> : <HelpIcon />}
          </div>
        </div>
      )
    case 'weekly':
      return (
        <div style={outer}>
          <Typography children="１週間前〜今日の" sx={p} />
          <div style={inner}>
            <Typography children="メンバー増加ランキング" sx={p} />
            {visibility ? <HelpButton list={list} cateIndex={cateIndex} /> : <HelpIcon />}
          </div>
        </div>
      )
    case 'all':
      return (
        <div style={outer}>
          <div style={inner}>
            <Typography children="現存確認済みのオープンチャット" sx={p} />
            {visibility ? <HelpButton list={list} cateIndex={cateIndex} /> : <HelpIcon />}
          </div>
        </div>
      )
  }
}
