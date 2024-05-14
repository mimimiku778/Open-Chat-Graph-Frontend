import { useEffect, useRef } from 'react'

export default function DisplayAds({ aspectRatio }: { aspectRatio?: string }) {
  const pushed = useRef(false)

  useEffect(() => {
    if ((window as any).adsbygoogle && process.env.NODE_ENV !== 'development' && !pushed.current) {
      ;(window as any).adsbygoogle.push({})
      pushed.current = true
    }
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', aspectRatio }}
      data-ad-client="ca-pub-2330982526015125"
      data-ad-slot="8037531176"
      data-ad-format={`${aspectRatio ? 'rectangle' : 'rectangle'}`}
      data-full-width-responsive="false"
    ></ins>
  )
}
