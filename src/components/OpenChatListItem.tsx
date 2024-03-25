import React from 'react'
import { LIMIT_ITEMS } from '../hooks/InfiniteFetchApi'
import { Chip, Skeleton } from '@mui/material'
import { OPEN_CHAT_CATEGORY_OBJ, rankingArgDto } from '../config/config'
import NorthIcon from '@mui/icons-material/North'

export function DummyOpenChatListItem({ len = LIMIT_ITEMS }: { len?: number }) {
  return (
    <>
      {new Array(len).fill(0).map((el, i) => (
        <li className="openchat-item" key={i}>
          <div className="item-img-outer">
            <Skeleton variant="circular" width="100%" height="100%" />
          </div>
          <Skeleton sx={{ mb: '5px' }} height={19} />
          <Skeleton sx={{ mb: '4px' }} height={13} />
          <Skeleton sx={{ mb: '4px' }} height={13} />
          <Skeleton width="50%" height={13} />
        </li>
      ))}
    </>
  )
}

function EmblemIcon({ emblem }: { emblem: OpenChat['emblem'] }) {
  return <span className={`super-icon ${emblem === 1 ? 'sp' : 'official'}`}></span>
}

const formatMember = (n: number) => (n < 1000 ? n : n >= 10000 ? (n / 10000).toFixed(1) + '万' : n.toLocaleString())

const getOcUrlParam = (listParam: ListParams['list']): string => {
  switch (listParam) {
    case 'hourly':
      return '?limit=hour'
    case 'daily':
      return ''
    case 'weekly':
      return ''
    case 'all':
      return ''
  }
}

export default function OpenChatListItem({
  id,
  name,
  desc,
  member,
  img,
  emblem,
  category,
  symbolIncrease,
  increasedMember,
  percentageIncrease,
  createdAt,
  cateIndex,
  listParam,
  showNorth,
}: OpenChat & {
  cateIndex: number
  listParam: ListParams['list']
  showNorth: boolean
}) {
  const ocUrl = `${rankingArgDto.baseUrl}/oc/${id}${getOcUrlParam(listParam)}`

  return (
    <div className="openchat-item">
      <a className="overlay-link" href={ocUrl} tabIndex={-1}>
        <span className="visually-hidden">{name}</span>
      </a>
      <div className="item-img-outer">
        <div style={{ opacity: 0.55, width: '100%', height: '100%' }}>
          <Skeleton variant="circular" width="100%" height="100%" />
        </div>
        <img
          className="item-img"
          src={`${rankingArgDto.baseUrl}/oc-img/preview/${img}_p.webp`}
          alt={`オープンチャット「${name}」のアイコン`}
          loading="lazy"
        ></img>
      </div>
      <h3>
        <a className="item-title-link" href={ocUrl}>
          {emblem !== 0 && <EmblemIcon emblem={emblem} />}
          {name}
        </a>
        {showNorth && <NorthIcon className="show-north" sx={{ fontSize: '14px', color: '#07B53B' }} />}
      </h3>
      <p className="item-desc">{desc}</p>
      <footer className="item-lower">
        <div className="item-lower-stats">
          <span>メンバー {formatMember(member)}</span>
          <span className={`stats-wrapper ${listParam} ${symbolIncrease ?? ''}`}>
            {increasedMember && <span>{increasedMember}</span>}
            {percentageIncrease && <span> ({percentageIncrease})</span>}
            {createdAt && <span className="api-created-at">作成 {createdAt}</span>}
          </span>
        </div>
        <div className="item-lower-category">
          {cateIndex === 0 && category >= 0 && (
            <Chip
              sx={{ height: 'fit-content', fontSize: 13, display: 'flex', width: 'fit-content', mt: '2px' }}
              label={category > 0 ? OPEN_CHAT_CATEGORY_OBJ[category] : 'その他'}
              size="small"
            />
          )}
        </div>
      </footer>
    </div>
  )
}
