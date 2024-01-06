import React, { memo } from 'react'
import useInfiniteFetchApi from '../hooks/InfiniteFetchApi'
import { useRecoilValue } from 'recoil'
import { listParamsState } from '../store/atom'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import OpenChatListItem, { DummyOpenChatListItem } from './OpenChatListItem'
import OCListTitleDesc from './OCListTitleDesc'
import { useInView } from 'react-intersection-observer'
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
}: {
  cateIndex: number
  list: ListParams['list']
  sort: ListParams['sort']
  data: OpenChat[]
}) {
  return (
    <ol className="openchat-item-container">
      {data.map((el, i) => (
        <li key={i} className="OpenChatListItem-outer">
          {(i + 1) % 10 === 0 && (
            <div className="record-count middle">
              <KeyboardArrowDownIcon sx={{ fontSize: '14px', display: 'block' }} />
              <span>{(i + 1).toLocaleString()} 件目</span>
            </div>
          )}
          <ListItem
            listParam={list}
            {...el}
            cateIndex={cateIndex}
            showNorth={list === 'daily' && sort === 'rank' && i + 1 <= 3}
          />
        </li>
      ))}
    </ol>
  )
})

const TotalCount = memo(OCListTotalCount)

function FetchDummyList({ query, cateIndex }: { query: string; cateIndex: number }) {
  const { data } = useInfiniteFetchApi<OpenChat>(query)
  const params = useRecoilValue(listParamsState)
  const totalCount = data?.length === 0 ? '0' : data?.[0]?.totalCount?.toLocaleString()

  return (
    <>
      <OCListTotalCount totalCount={totalCount ? `${totalCount}件` : ''} cateIndex={cateIndex} subCategory={''} />
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
  const { ref, inView } = useInView()

  return (
    <div className="dummy-list" ref={ref} style={{ position: 'fixed', top: '0', bottom: '0', width: '100%' }}>
      <div
        className="div-fetchOpenChatRankingList"
        style={{ position: 'absolute', top: `${window.scrollY}px`, width: '100%' }}
      >
        <ListTitleDesc cateIndex={cateIndex} list={params.list} visibility={false} />
        {inView && <FetchDummyList cateIndex={cateIndex} query={query} />}
      </div>
    </div>
  )
}

export function FetchOpenChatRankingList({ query, cateIndex }: { query: string; cateIndex: number }) {
  const { data, useInViewRef, isValidating, isLastPage, error } = useInfiniteFetchApi<OpenChat>(query)
  const params = useRecoilValue(listParamsState)
  const totalCount = data?.length === 0 ? '0' : data?.[0]?.totalCount?.toLocaleString()
  console.log('fetch')
  return (
    <div className="ranking-list">
      <div className="div-fetchOpenChatRankingList">
        <ListTitleDesc cateIndex={cateIndex} list={params.list} />
        <TotalCount
          totalCount={totalCount ? `${totalCount}件` : ''}
          cateIndex={cateIndex}
          subCategory={params.sub_category}
        />
        {data && <ListContext cateIndex={cateIndex} data={data} list={params.list} sort={params.sort} />}
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
