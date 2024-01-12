import { OPEN_CHAT_CATEGORY } from '../config/config'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Tabs, Tab } from '@mui/material'
import { type Swiper as SwiperCore } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import FetchOpenChatRankingList, { DummyOpenChatRankingList } from './FetchOpenChatRankingList'
import { isSP, samePageLinkNavi, scrollToTop, updateURLSearchParams } from '../utils/utils'
import { CategoryListAppBar } from './CategoryListAppBar'
import { listParamsState } from '../store/atom'
import { useRecoilState } from 'recoil'
import SiteHeader from './SiteHeader'
import { useInView } from 'react-intersection-observer'

function LinkTab(props: { label?: string; href?: string }) {
  return (
    <Tab
      component="a"
      onClick={(e: LinkEvent) => {
        if (samePageLinkNavi(e)) {
          e.preventDefault()
        }
      }}
      {...props}
    />
  )
}

const OpenChatRankingList = memo(FetchOpenChatRankingList)

function OcListSwiper({
  cateIndex,
  swiperRef,
}: {
  cateIndex: number
  swiperRef: React.MutableRefObject<SwiperCore | null>
}) {
  const navigate = useNavigate()
  const [params, setParams] = useRecoilState(listParamsState)
  const initialIndex = useRef(cateIndex)
  const currentIndex = useRef(cateIndex)
  const [tIndex, setTIndex] = useState<[number, string] | null>(null)
  const { ref: prevRef, inView: prevInView } = useInView()
  const { ref: nextRef, inView: nextInView } = useInView()

  const onSwiper = useCallback((swiper: SwiperCore) => (swiperRef.current = swiper), [])

  useEffect(() => {
    scrollToTop()
    scrollToTop('.hide-scrollbar-x')
  }, [currentIndex.current !== cateIndex])

  currentIndex.current = cateIndex

  const onSlideChange = useCallback((swiper: SwiperCore) => {
    const newValue = swiper.activeIndex
    if (currentIndex.current === newValue) return

    const category = OPEN_CHAT_CATEGORY[newValue][1]

    setParams((params) => {
      const url = updateURLSearchParams({ ...params, sub_category: '' })
      const q = url.searchParams.toString()
      navigate(`/ranking${category ? '/' + category : ''}${q ? '?' + q : ''}`, { replace: true })
      return { ...params, sub_category: '' }
    })
  }, [])

  const query = useCallback(
    (i: number) =>
      new URLSearchParams({
        ...params,
        sub_category: i === currentIndex.current ? params.sub_category : '',
        category: OPEN_CHAT_CATEGORY[i][1].toString(),
      }).toString(),
    [params]
  )

  return (
    <Swiper
      initialSlide={initialIndex.current}
      simulateTouch={true}
      onSlideChange={onSlideChange}
      onSlideChangeTransitionStart={() => setTIndex([cateIndex, query(cateIndex)])}
      onSlideChangeTransitionEnd={() => setTIndex(null)}
      onSwiper={onSwiper}
      speed={260}
    >
      {OPEN_CHAT_CATEGORY.map((el, i) => (
        <SwiperSlide key={i}>
          <div style={{ padding: '1rem', marginTop: '95px', position: 'relative', minHeight: 'calc(100svh - 191px)' }}>
            {(() => {
              if (i === cateIndex) {
                return <OpenChatRankingList query={query(i)} cateIndex={i} />
              } else if (tIndex && i === tIndex[0]) {
                return <OpenChatRankingList query={tIndex[1]} cateIndex={i} />
              } else if (i === cateIndex - 1 && prevInView && !tIndex) {
                return <DummyOpenChatRankingList query={query(i)} cateIndex={i} />
              } else if (i === cateIndex + 1 && nextInView && !tIndex) {
                return <DummyOpenChatRankingList query={query(i)} cateIndex={i} />
              }
            })()}
            {i === cateIndex && (
              <div style={{ position: 'absolute', top: 0, left: '-2px', width: '1px', height: '100%' }} ref={prevRef} />
            )}
            {i === cateIndex && (
              <div
                style={{ position: 'absolute', top: 0, right: '-2px', width: '1px', height: '100%' }}
                ref={nextRef}
              />
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default function OcListMainTabs({ cateIndex }: { cateIndex: number }) {
  const swiperRef = useRef<SwiperCore | null>(null)

  const handleChange = useCallback((e: React.SyntheticEvent, newValue: number) => {
    if (e.type === 'click' && !samePageLinkNavi(e as LinkEvent)) return
    swiperRef.current?.slideTo(newValue)
  }, [])

  const siperSlideTo = (index: number): void => {
    swiperRef.current?.slideTo(index)
  }

  return (
    <Box>
      <SiteHeader siperSlideTo={siperSlideTo} height="96px">
        <Tabs
          className="fix-min-width"
          value={cateIndex}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={true}
          allowScrollButtonsMobile={!isSP()}
          aria-label="オープンチャットのカテゴリータブ"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          {OPEN_CHAT_CATEGORY.map((el, i) => (
            <LinkTab label={el[0]} href={`/ranking${el[1] ? '/' + el[1] : ''}`} key={i} />
          ))}
        </Tabs>
      </SiteHeader>
      <CategoryListAppBar />
      <OcListSwiper cateIndex={cateIndex} swiperRef={swiperRef} />
    </Box>
  )
}
