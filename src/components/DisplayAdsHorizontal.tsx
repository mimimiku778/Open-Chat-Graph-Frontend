import { useEffect, useRef } from 'react'

export default function DisplayAdsHorizontal() {
  const pushed = useRef(false)

  useEffect(() => {
    if ((window as any).adsbygoogle && process.env.NODE_ENV !== 'development' && !pushed.current) {
      ;(window as any).adsbygoogle.push({})
      pushed.current = true
    }
  }, [])

  return (
    <ins
      className="adsbygoogle google_ads_responsive_1"
      style={{ display: 'block', marginBottom: '2rem' }}
      data-ad-client="ca-pub-2330982526015125"
      data-ad-slot="8037531176"
    ></ins>
  )
}
