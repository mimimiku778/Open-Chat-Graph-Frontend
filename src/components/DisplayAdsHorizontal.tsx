import { Skeleton } from '@mui/material'
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
    <div className="google_ads_responsive_1" style={{ marginBottom: '1rem', position: 'relative' }}>
      <div style={{ background: '#fff' }}>
        <ins
          className="adsbygoogle google_ads_responsive_1"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-2330982526015125"
          data-ad-slot="8037531176"
        ></ins>
      </div>
    </div>
  )
}
