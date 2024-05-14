import { useEffect, useRef } from 'react'

export default function DisplayAdsResponsive({ dataAdSlot, adsClass }: { dataAdSlot: number; adsClass: string }) {
  const pushed = useRef(false)

  useEffect(() => {
    if ((window as any).adsbygoogle && process.env.NODE_ENV !== 'development' && !pushed.current) {
      ;(window as any).adsbygoogle.push({})
      pushed.current = true
    }
  }, [])

  return (
    <ins
      className={`adsbygoogle ${adsClass}`}
      style={{ display: 'block' }}
      data-ad-client="ca-pub-2330982526015125"
      data-ad-slot={dataAdSlot}
      data-ad-format="rectangle"
      data-full-width-responsive="false"
    ></ins>
  )
}
