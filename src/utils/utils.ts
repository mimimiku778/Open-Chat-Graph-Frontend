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

export function isSP(): boolean {
  return !!('ontouchstart' in window || navigator.maxTouchPoints)
}

export function updateURLSearchParams(params: { [key: string]: string }): URL {
  const url = new URL(window.location.href);
  url.search = ''

  for (let k in params) {
    params[k] && url.searchParams.set(k, params[k])
  }

  url.searchParams.sort()

  return url
}

export function validateStringNotEmpty(str: string) {
  const normalizedStr = str.normalize('NFKC')
  const string = normalizedStr.replace(/[\u200B-\u200D\uFEFF]/g, '')
  return string.trim() !== ''
}