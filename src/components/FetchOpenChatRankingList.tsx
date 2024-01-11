import React, { memo, useRef } from 'react'
import useInfiniteFetchApi from '../hooks/InfiniteFetchApi'
import { useRecoilValue } from 'recoil'
import { listParamsState } from '../store/atom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import OpenChatListItem, { DummyOpenChatListItem } from './OpenChatListItem'
import OCListTitleDesc from './OCListTitleDesc'
import OCListTotalCount from './OCListTotalCount'

const dummyListElem = <DummyOpenChatListItem />

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
        <ol className="openchat-item-container">
          <DummyOpenChatListItem />
        </ol>
      )}
      {!(isValidating || isLastPage || error) && data && (
        <ol className="openchat-item-container" ref={useInViewRef}>
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
  sort,
  data,
  query,
}: {
  cateIndex: number
  list: ListParams['list']
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
        {(i + 1) % 10 === 0 && (
          <div className="record-count middle">
            <KeyboardArrowDownIcon sx={{ fontSize: '14px', display: 'block' }} />
            <span>{(i + 1).toLocaleString()} 件目</span>
          </div>
        )}
        <ListItem
          listParam={list}
          {...data[i]}
          cateIndex={cateIndex}
          showNorth={list === 'daily' && sort === 'rank' && i + 1 <= 3}
        />
      </li>
    )
  }

  return <ol className="openchat-item-container">{items.current[1]}</ol>
})

const TotalCount = memo(OCListTotalCount)

function FetchDummyList({ query, cateIndex }: { query: string; cateIndex: number }) {
  const { data } = useInfiniteFetchApi<OpenChat>(query)
  const params = useRecoilValue(listParamsState)
  const totalCount = data?.length === 0 ? '0' : data?.[0]?.totalCount?.toLocaleString()

  return (
    <>
      <OCListTotalCount
        totalCount={totalCount ? `${totalCount}件` : ''}
        cateIndex={cateIndex}
        keyword={params.keyword}
        subCategory=""
      />
      <div className="OpenChatListItem-outer">
        <ol className="openchat-item-container">
          {data
            ? data.map((oc, i) => (
                <OpenChatListItem key={i} listParam={params.list} {...oc} cateIndex={cateIndex} showNorth={false} />
              ))
            : dummyListElem}
        </ol>
      </div>
    </>
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
        <ListTitleDesc cateIndex={cateIndex} list={params.list} visibility={false} />
        <FetchDummyList cateIndex={cateIndex} query={query} />
      </div>
    </div>
  )
}

export function FetchOpenChatRankingList({ query, cateIndex }: { query: string; cateIndex: number }) {
  const { data, useInViewRef, isValidating, isLastPage, error } = useInfiniteFetchApi<OpenChat>(query)
  const params = useRecoilValue(listParamsState)
  const totalCount = data?.length === 0 ? '0' : data?.[0]?.totalCount?.toLocaleString()

  return (
    <div className="ranking-list">
      <div className="div-fetchOpenChatRankingList">
        <ListTitleDesc cateIndex={cateIndex} list={params.list} />
        <TotalCount
          totalCount={totalCount ? `${totalCount}件` : ''}
          cateIndex={cateIndex}
          subCategory={params.sub_category}
          keyword={params.keyword}
        />
        {data && <ListContext cateIndex={cateIndex} data={data} list={params.list} sort={params.sort} query={query} />}
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
