export function localStorageProvider() {
  const map = new Map(JSON.parse(sessionStorage.getItem('app-cache') || '[]'))

  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()))
    sessionStorage.setItem('app-cache', appCache)
  })

  return map
}

export function samePageLinkNavi(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  if (
    e.defaultPrevented ||
    e.button !== 0 || // ignore everything but left-click
    e.metaKey ||
    e.ctrlKey ||
    e.altKey ||
    e.shiftKey
  ) {
    return false
  }
  return true
}

export function scrollToTop(selector: string = 'html') {
  document.querySelector(selector)?.scrollTo(0, 0)
}

export function isSP() {
  const ua = navigator.userAgent
  return ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('Mobile') > 0
}
