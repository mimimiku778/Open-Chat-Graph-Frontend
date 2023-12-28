import { OPEN_CHAT_CATEGORY } from '../config/config'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Tabs, Tab } from '@mui/material'
import { type Swiper as SwiperCore } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import FetchOpenChatRankingList from './FetchOpenChatRankingList'
import { isSP, samePageLinkNavi, scrollToTop } from '../utils/utils'
import { CategoryListAppBar } from './CategoryListAppBar'
import { listParamsState } from '../store/atom'
import { useRecoilState } from 'recoil'
import SiteHeader from './SiteHeader'

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <Box hidden={value !== index} sx={{ p: 2, pt: 0 }}>
      {value === index && children}
    </Box>
  )
}

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

export default function OcListMainTabs({ cateIndex }: { cateIndex: number }) {
  const navigate = useNavigate()
  const [params, setParams] = useRecoilState(listParamsState)
  const swiperRef = useRef<SwiperCore | null>(null)

  const onSwiper = (swiper: SwiperCore) => (swiperRef.current = swiper)

  const onSlideChange = (swiper: SwiperCore) => {
    const newValue = swiper.activeIndex
    if (newValue === cateIndex) return

    const category = OPEN_CHAT_CATEGORY[newValue][1]
    const q = new URLSearchParams({ ...params, sub_category: '' }).toString()

    setParams({ ...params, sub_category: '' })
    navigate(`/react-test${category ? '/' + category : ''}${q ? '?' + q : ''}`, { replace: true })
    scrollToTop()
    scrollToTop('.hide-scrollbar-x')
  }

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    if (e.type === 'click' && !samePageLinkNavi(e as LinkEvent)) return

    swiperRef.current?.slideTo(newValue)
  }

  const query = new URLSearchParams({
    category: OPEN_CHAT_CATEGORY[cateIndex][1].toString(),
    ...params,
  }).toString()

  return (
    <Box>
      <SiteHeader height="96px">
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
            <LinkTab label={el[0]} href={`/react-test${el[1] ? '/' + el[1] : ''}`} key={i} />
          ))}
        </Tabs>
      </SiteHeader>
      <CategoryListAppBar />
      <Box sx={{ mt: '96px' }}>
        <Swiper initialSlide={cateIndex} simulateTouch={true} onSlideChange={onSlideChange} onSwiper={onSwiper}>
          {OPEN_CHAT_CATEGORY.map((el, i) => (
            <SwiperSlide key={i} style={{ cursor: 'grab' }}>
              <TabPanel value={cateIndex} index={i}>
                <FetchOpenChatRankingList query={query} cateIndex={cateIndex} />
              </TabPanel>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  )
}
