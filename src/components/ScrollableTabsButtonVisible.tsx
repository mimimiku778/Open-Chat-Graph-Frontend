import { OPEN_CHAT_CATEGORY } from '../config/config'
import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Home from '../pages/Home'
import { Box, AppBar, Tabs, Tab } from '@mui/material'
import { type Swiper as SwiperCore } from 'swiper'
import { Keyboard } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

type TabPanelProps = React.PropsWithChildren<{
  index: number
  value: number
}>

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

export default function FullWidthTabs({ categoryIndex }: { categoryIndex: number }) {
  const [value, setValue] = useState(categoryIndex)
  const [swiper, setSwiper] = useState<SwiperCore | null>(null)
  const onSwiper = useCallback((currentSwiper: SwiperCore) => setSwiper(currentSwiper), [])
  const navigate = useNavigate()

  if (value !== categoryIndex) {
    swiper?.slideTo(categoryIndex, undefined, false)
    setValue(categoryIndex)
  }

  const onSlideChange = useCallback(
    (index: number) => {
      if (value === index) {
        return
      }

      setValue(index)
      document.querySelector('html')?.scrollTo(0, 0)
      const category = OPEN_CHAT_CATEGORY[index][1]
      navigate(`/explore${category ? '/' + category : ''}`)
    },
    [value, navigate]
  )

  console.log('current: ' + value)
  console.log('currentcategoryIndex: ' + categoryIndex)

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => swiper?.slideTo(newValue),
    [swiper]
  )

  return (
    <Box>
      <AppBar position="sticky" sx={{ color: 'black', bgcolor: 'background.paper', width: 1 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          {OPEN_CHAT_CATEGORY.map((el, i) => (
            <Tab label={el[0]} {...a11yProps(i)} key={i} />
          ))}
        </Tabs>
      </AppBar>
      <Swiper
        initialSlide={value}
        simulateTouch={true}
        onSlideChange={(currentSwiper: SwiperCore) => onSlideChange(currentSwiper.activeIndex)}
        modules={[Keyboard]}
        onSwiper={onSwiper}
        keyboard={{
          enabled: true,
        }}
      >
        {OPEN_CHAT_CATEGORY.map((el, i) => (
          <SwiperSlide key={i}>
            <TabPanel value={value} index={i}>
              <Home category={el[1]} />
            </TabPanel>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
