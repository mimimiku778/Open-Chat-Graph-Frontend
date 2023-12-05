import React from 'react'
import { useInView } from 'react-intersection-observer'
import useInfiniteFetchApi, { BASE_URL, LIMIT_ITEMS } from '../hooks/InfiniteFetchApi'
import '../styles/OpenChat.css'
import '../styles/OpenChatList.css'

function EmblemIcon({ emblem }: { emblem: OpenChat['emblem'] }) {
  return <span className={`super-icon ${emblem === 1 ? 'sp' : 'official'}`}></span>
}

const CreateOpenChatListItem = React.memo(function OpenChatListItem({ oc }: { oc: OpenChat }) {
  const { id, name, desc, member, img, emblem, symbolIncrease, increasedMember, percentageIncrease } = oc

  return (
    <li className="openchat-item">
      {console.log(1) as unknown as null}
      <a className="overlay-link" href={`${BASE_URL}/oc/${id}`} tabIndex={-1} aria-hidden>
        {''}
      </a>
      <img
        className="openchat-item-img"
        src={`${BASE_URL}/oc-img/${img}/preview`}
        alt={`オープンチャット「${name}」のアイコン`}
      ></img>
      <h3>
        <a className="openchat-item-title-link" href={`${BASE_URL}/oc/${id}`}>
          {emblem !== 0 && <EmblemIcon emblem={emblem} />}
          {name}
        </a>
      </h3>
      <p className="openchat-item-desc">{desc}</p>
      <footer className="openchat-item-lower">
        <span>メンバー {member}</span>
        <span className={`openchat-stats-wrapper ${symbolIncrease}`}>
          <span>{increasedMember}</span>
          <span> ({percentageIncrease})</span>
        </span>
      </footer>
    </li>
  )
})

function CreateOpenChatList({ list, i }: { list: OpenChat[]; i: number }) {
  const { ref, inView: isInView } = useInView()
  return (
    <ol className="openchat-item-container" ref={ref}>
      {list.map((oc, j) =>
        isInView ? <CreateOpenChatListItem oc={oc} key={j} /> : <li className="openchat-item" key={j} />
      )}
    </ol>
  )
}

function CreateOpenChatLists({ data }: { data: OpenChat[][] }) {
  return <>{data.map((list, i) => (list.length ? <CreateOpenChatList list={list} key={i} i={i} /> : null))}</>
}

const DummyOpenChatListItem = new Array(LIMIT_ITEMS).fill(0).map((el, i) => (
  <li className="openchat-item" key={i}>
    <div className="openchat-item-img"></div>
    <h3>
      <div className="openchat-item-title-link"></div>
    </h3>
    <p className="openchat-item-desc"></p>
    <footer className="openchat-item-lower">
      <span>メンバー </span>
    </footer>
  </li>
))

export default function FetchOpenChatRankingList({ query }: { query: string }) {
  const { data, useInViewRef, isValidating, isLastPage } = useInfiniteFetchApi<OpenChat>(query)
  
  return (
    <>
      {data && <CreateOpenChatLists data={data} />}
      {isValidating && <ol className="openchat-item-container">{DummyOpenChatListItem}</ol>}
      {!isLastPage && (
        <ol className="openchat-item-container" ref={useInViewRef}>
          {DummyOpenChatListItem}
        </ol>
      )}
    </>
  )
}
