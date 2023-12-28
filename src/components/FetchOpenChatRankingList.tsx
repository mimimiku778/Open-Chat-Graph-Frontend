import React, { memo } from 'react'
import useInfiniteFetchApi, { BASE_URL, LIMIT_ITEMS } from '../hooks/InfiniteFetchApi'
import { Box, Chip, Skeleton, Typography } from '@mui/material'
import { OPEN_CHAT_CATEGORY, OPEN_CHAT_CATEGORY_OBJ } from '../config/config'
import { useRecoilValue } from 'recoil'
import { listParamsState } from '../store/atom'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import OCListDescMouseOverPopover from './OCListDescMouseOverPopover'
import NorthIcon from '@mui/icons-material/North'

function EmblemIcon({ emblem }: { emblem: OpenChat['emblem'] }) {
  return <span className={`super-icon ${emblem === 1 ? 'sp' : 'official'}`}></span>
}

const OpenChatListItem = memo(function OpenChatListItem({
  oc,
  cateIndex,
  listParam,
  showNorth,
}: {
  oc: OpenChat
  cateIndex: number
  listParam: ListParams['list']
  showNorth: boolean
}) {
  const {
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
  } = oc
  const ocUrl = `${BASE_URL}/oc/${id}`

  const formatMember = (n: number) =>
    member < 1000 ? member : n >= 10000 ? (n / 10000).toFixed(1) + '万' : n.toLocaleString()

  console.log('item')
  return (
    <li className="openchat-item">
      <a className="overlay-link" href={ocUrl} tabIndex={-1} aria-hidden>
        {''}
      </a>
      <img
        className="item-img"
        src={`${BASE_URL}/oc-img/${img}/preview`}
        alt={`オープンチャット「${name}」のアイコン`}
        loading="lazy"
      ></img>
      <h3>
        <a className="item-title-link" href={ocUrl}>
          {emblem !== 0 && <EmblemIcon emblem={emblem} />}
          {name}
        </a>
        {showNorth && <NorthIcon className='show-north' sx={{ fontSize: '14px'}} />}
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
            <Chip sx={{ height: 'fit-content', fontSize: 11 }} label={OPEN_CHAT_CATEGORY_OBJ[category]} size="small" />
          )}
        </div>
      </footer>
    </li>
  )
})

export function DummyOpenChatListItem({ length, cateIndex }: { length: number; cateIndex: number }) {
  return (
    <>
      {new Array(length).fill(0).map((el, i) => (
        <li className={`openchat-item ${cateIndex === 0 ? 'all' : ''}`} key={i}>
          <div className="item-img">
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

function TotalCount({
  totalCount,
  cateIndex,
  subCategory,
}: {
  totalCount: string
  cateIndex: number
  subCategory: string
}) {
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

function ListDescP({ children, gutterBottom }: { children: React.ReactNode; gutterBottom?: boolean }) {
  return (
    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom={gutterBottom}>
      {children}
    </Typography>
  )
}

function ListDesc({ list, isAll }: { list: ListParams['list']; isAll: boolean }) {
  switch (list) {
    case 'daily':
      return (
        <div>
          {!isAll && (
            <ListDescP gutterBottom>
              表示対象は、メンバー数が10人以上でオプチャ公式ランキングに掲載歴のあるルームです。
            </ListDescP>
          )}
          {isAll && <ListDescP gutterBottom>表示対象は、メンバー数が10人以上の全てのルームです。</ListDescP>}
          <ListDescP>１週間以上メンバー数に変動がないルームは除外されます。</ListDescP>
        </div>
      )
    case 'weekly':
      return (
        <div>
          {!isAll && (
            <ListDescP gutterBottom>
              表示対象は、メンバー数が10人以上でオプチャ公式ランキングに掲載歴のあるルームです。
            </ListDescP>
          )}
          {isAll && <ListDescP gutterBottom>表示対象は、メンバー数が10人以上の全てのルームです。</ListDescP>}
          <ListDescP>直近１週間の統計がない・１週間以上メンバー数に変動がないルームは除外されます。</ListDescP>
        </div>
      )
    case 'all':
      return (
        <div>
          <ListDescP gutterBottom>オプチャグラフによる現存確認済みのルームリストです。</ListDescP>
          {!isAll && <ListDescP>表示対象は、オプチャ公式ランキングに掲載歴のある全てのルームです。</ListDescP>}
          {isAll && (
            <ListDescP>
              表示対象は、LINE公式ランキングから自動登録されたルームと、オプチャグラフのフォームから登録された全てのルームです。
            </ListDescP>
          )}
        </div>
      )
  }
}

function ListTitle({ list }: { list: ListParams['list'] }) {
  switch (list) {
    case 'daily':
      return <Typography sx={{ fontWeight: 'bold' }}>昨日〜今日のメンバー増加ランキング</Typography>
    case 'weekly':
      return <Typography sx={{ fontWeight: 'bold' }}>１週間前〜今日のメンバー増加ランキング</Typography>
    case 'all':
      return <Typography sx={{ fontWeight: 'bold' }}>全てのオープンチャット</Typography>
  }
}

const dummyListLen = 40

export const FetchOpenChatRankingList = memo(function FetchOpenChatRankingList({
  query,
  cateIndex,
}: {
  query: string
  cateIndex: number
}) {
  const { data, useInViewRef, isValidating, isLastPage, error } = useInfiniteFetchApi<OpenChat>(query)
  const params = useRecoilValue(listParamsState)
  const totalCount = data?.[0]?.length === 0 ? '0' : data?.[0]?.[0]?.totalCount?.toLocaleString()

  return (
    <div className="div-fetchOpenChatRankingList">
      <Box sx={{ mt: '8px' }}>
        <Box sx={{ mb: '8px', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.25rem' }}>
          <ListTitle list={params.list} />
          <OCListDescMouseOverPopover>
            <ListDesc list={params.list} isAll={cateIndex === 0} />
          </OCListDescMouseOverPopover>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.25rem' }}>
          <TotalCount
            totalCount={totalCount ? `${totalCount}件` : ''}
            cateIndex={cateIndex}
            subCategory={params.sub_category}
          />
        </Box>
      </Box>
      {data &&
        data.map((list, i) =>
          list.map((oc, j) => (
            <div key={`${cateIndex}/${i}/${j}`}>
              <OpenChatListItem
                listParam={params.list}
                oc={oc}
                cateIndex={cateIndex}
                showNorth={params.list === 'daily' && i * LIMIT_ITEMS + j + 1 <= 3}
              />
              {(i * LIMIT_ITEMS + j + 1) % 50 === 0 && (
                <span className="record-count middle">{(i * LIMIT_ITEMS + j + 1).toLocaleString()} 件目</span>
              )}
            </div>
          ))
        )}
      {((!data && !error) || isValidating) && (
        <ol className="openchat-item-container">
          <DummyOpenChatListItem length={dummyListLen} cateIndex={cateIndex} />
        </ol>
      )}
      {!(isValidating || isLastPage || error) && data && (
        <ol className="openchat-item-container" ref={useInViewRef}>
          <DummyOpenChatListItem length={dummyListLen} cateIndex={cateIndex} />
        </ol>
      )}
      {error && <div style={{ textAlign: 'center' }}>通信エラー😥</div>}
    </div>
  )
})

export default FetchOpenChatRankingList
