import { useEffect, useRef } from 'react'

/* ランキングSPAセパレーター-レスポンシブ
2531686846

ランキングSPAセパレーター-rectangle
8800242991

ランキングSPAトップ-rectangle
3188823663 */

export const AdsTopRectangle = 3188823663
export const AdsSeparatorRectangle = 8800242991

export default function DisplayAds({
  dataAdSlot,
  adsClass,
  show,
}: {
  dataAdSlot: number
  adsClass: string
  show: boolean
}) {
  const pushed = useRef(false)

  useEffect(() => {
    if (
      (window as any).adsbygoogle &&
      process.env.NODE_ENV !== 'development' &&
      !pushed.current &&
      show
    ) {
      ;(window as any).adsbygoogle.push({})
      pushed.current = true
    }
  }, [show])

  return (
    <ins
      className={`adsbygoogle ${adsClass}`}
      style={{ display: 'block' }}
      data-ad-client='ca-pub-2330982526015125'
      data-ad-slot={dataAdSlot}
    ></ins>
  )
}
