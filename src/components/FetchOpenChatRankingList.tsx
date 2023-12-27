import React, { memo } from 'react'
import useInfiniteFetchApi, { BASE_URL, LIMIT_ITEMS } from '../hooks/InfiniteFetchApi'
import { Chip, Skeleton } from '@mui/material'
import { OPEN_CHAT_CATEGORY_OBJ } from '../config/config'
import { useRecoilValue } from 'recoil'
import { listParamsState } from '../store/atom'
import { isSP } from '../utils/utils'

function EmblemIcon({ emblem }: { emblem: OpenChat['emblem'] }) {
  return <span className={`super-icon ${emblem === 1 ? 'sp' : 'official'}`}></span>
}

const OpenChatListItem = memo(function OpenChatListItem({
  oc,
  cateIndex,
  listParam,
}: {
  oc: OpenChat
  cateIndex: number
  listParam: ListParams['list']
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
    <li className={`openchat-item ${cateIndex === 0 ? 'all' : ''}`}>
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
              sx={{ height: 'fit-content', fontSize: 11 }}
              label={OPEN_CHAT_CATEGORY_OBJ[category]}
              size="small"
              variant="outlined"
            />
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

const dummyListLen = 40

export const FetchOpenChatRankingList = memo(function FetchOpenChatRankingList({
  query,
  cateIndex,
}: {
  query: string
  cateIndex: number
}) {
  const { data, useInViewRef, isValidating, isLastPage, error } = useInfiniteFetchApi<OpenChat>(query)
  const listParam = useRecoilValue(listParamsState).list
  const totalCount = data?.[0]?.[0]?.totalCount?.toLocaleString()

  return (
    <div className="div-fetchOpenChatRankingList">
      <span className="record-count">&nbsp;{data && `${totalCount} 件`}</span>
      {data &&
        data.map((list, i) =>
          list.map((oc, j) => (
            <div key={`${cateIndex}/${i}/${j}`}>
              <OpenChatListItem listParam={listParam} oc={oc} cateIndex={cateIndex} />
              {(i * LIMIT_ITEMS + j + 1) % 50 === 0 && (
                <span className="record-count middle">
                  {totalCount} 件中 {(i * LIMIT_ITEMS + j + 2).toLocaleString()} 件目
                </span>
              )}
            </div>
          ))
        )}
      {(!data || isValidating) && (
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
