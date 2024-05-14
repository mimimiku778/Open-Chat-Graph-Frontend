import React, { memo, useRef } from 'react'
import useInfiniteFetchApi from '../hooks/InfiniteFetchApi'
import { useRecoilValue } from 'recoil'
import { listParamsState } from '../store/atom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import OpenChatListItem, { DummyOpenChatListItem } from './OpenChatListItem'
import OCListTitleDesc from './OCListTitleDesc'
import OCListTotalCount from './OCListTotalCount'
import DisplayAds from './DisplayAds'

const dummyContainerStyle: React.CSSProperties = { opacity: 0.55 }

const DummyList = memo(function DummyList({
  data,
  error,
  isValidating,
  isLastPage,
  useInViewRef,
}: {
  data: boolean
  error: any
  isValidating: boolean
  isLastPage: boolean
  useInViewRef: (node?: Element | null | undefined) => void
}) {
  return (
    <>
      {((!data && !error) || isValidating) && (
        <ol className="openchat-item-container" style={dummyContainerStyle}>
          <DummyOpenChatListItem />
        </ol>
      )}
      {!(isValidating || isLastPage || error) && data && (
        <ol className="openchat-item-container" style={dummyContainerStyle} ref={useInViewRef}>
          <DummyOpenChatListItem />
        </ol>
      )}
      {error && <div style={{ textAlign: 'center' }}>通信エラー😥</div>}
    </>
  )
})

const ListItem = memo(OpenChatListItem)

const ListContext = memo(function ListContext({
  cateIndex,
  list,
  totalCount,
  sort,
  data,
  query,
}: {
  cateIndex: number
  list: ListParams['list']
  totalCount: string
  sort: ListParams['sort']
  data: OpenChat[]
  query: string
}) {
  const items = useRef<[String, React.JSX.Element[]]>(['', []])

  const dataLen = data.length
  let curLen = items.current[1].length

  if (items.current[0] === query && curLen === dataLen) {
    return <ol className="openchat-item-container">{items.current[1]}</ol>
  }

  if (items.current[0] !== query) {
    items.current[0] = query
    items.current[1] = []
    curLen = 0
  }

  for (let i = curLen; i < dataLen; i++) {
    items.current[1][i] = (
      <li key={`${cateIndex}/${i}`} className="OpenChatListItem-outer">
        <ListItem
          listParam={list}
          {...data[i]}
          cateIndex={cateIndex}
          showNorth={list === 'daily' && sort === 'rank' && i + 1 <= 3}
        />
        {(i + 1) % 10 === 0 && (
          <div className="record-count middle">
            <KeyboardArrowDownIcon sx={{ fontSize: '14px', display: 'block' }} />
            <span>
              {totalCount}中 {(i + 2).toLocaleString()} 件目〜
            </span>
          </div>
        )}
        {(i + 1) % 10 === 0 && (
          <div style={{ margin: '0 -1rem 2rem -1rem' }}>
            <DisplayAds aspectRatio="1.6" dataAdSlot={4900780682} />
          </div>
        )}
      </li>
    )
  }

  return <ol className="openchat-item-container">{items.current[1]}</ol>
})

const TotalCount = memo(OCListTotalCount)

function FetchDummyList({ query, cateIndex }: { query: string; cateIndex: number }) {
  const { data } = useInfiniteFetchApi<OpenChat>(query)
  const params = useRecoilValue(listParamsState)
  const totalCount = data?.length === 0 ? '0 件' : data ? data[0].totalCount!.toLocaleString() + ' 件' : ''

  return (
    <div>
      <OCListTotalCount totalCount={totalCount} cateIndex={cateIndex} keyword={params.keyword} subCategory="" />
      <div className="OpenChatListItem-outer">
        <ol className="openchat-item-container" style={data ? undefined : dummyContainerStyle}>
          {data ? (
            data.map((oc, i) => (
              <OpenChatListItem key={i} listParam={params.list} {...oc} cateIndex={cateIndex} showNorth={false} />
            ))
          ) : (
            <DummyOpenChatListItem />
          )}
        </ol>
      </div>
    </div>
  )
}

const ListTitleDesc = memo(OCListTitleDesc)

export function DummyOpenChatRankingList({ query, cateIndex }: { query: string; cateIndex: number }) {
  const params = useRecoilValue(listParamsState)

  return (
    <div className="dummy-list" style={{ position: 'relative' }}>
      <div
        className="div-fetchOpenChatRankingList"
        style={{ position: 'absolute', top: `${window.scrollY}px`, width: '100%' }}
      >
        <div className="google_ads_responsive_1" style={{ marginBottom: '1rem' }}></div>
        <ListTitleDesc cateIndex={cateIndex} isSearch={!!params.keyword} list={params.list} visibility={false} />
        <FetchDummyList cateIndex={cateIndex} query={query} />
      </div>
    </div>
  )
}

export function FetchOpenChatRankingList({ query, cateIndex }: { query: string; cateIndex: number }) {
  const { data, useInViewRef, isValidating, isLastPage, error } = useInfiniteFetchApi<OpenChat>(query)
  const params = useRecoilValue(listParamsState)

  const totalCount = data?.length === 0 ? '0 件' : data ? data[0].totalCount!.toLocaleString() + ' 件' : ''

  return (
    <div className="ranking-list">
      <div style={{ margin: '-1rem -1rem 1rem -1rem' }}>
        <DisplayAds aspectRatio="1.6" dataAdSlot={4394434097} />
      </div>
      <div className="div-fetchOpenChatRankingList">
        <ListTitleDesc cateIndex={cateIndex} isSearch={!!params.keyword} list={params.list} />
        <TotalCount
          totalCount={totalCount}
          cateIndex={cateIndex}
          subCategory={params.sub_category}
          keyword={params.keyword}
        />
        {data && (
          <ListContext
            cateIndex={cateIndex}
            totalCount={totalCount}
            data={data}
            list={params.list}
            sort={params.sort}
            query={query}
          />
        )}
        <DummyList
          data={!!data}
          error={error}
          isValidating={isValidating}
          isLastPage={isLastPage}
          useInViewRef={useInViewRef}
        />
      </div>
    </div>
  )
}

export default FetchOpenChatRankingList
