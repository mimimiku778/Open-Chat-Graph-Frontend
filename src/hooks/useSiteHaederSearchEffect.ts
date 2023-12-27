import { useEffect } from "react"

function validateStringNotEmpty(str: string) {
  const normalizedStr = str.normalize('NFKC')
  const string = normalizedStr.replace(/[\u200B-\u200D\uFEFF]/g, '')
  return string.trim() !== ''
}

export default function useSiteHaederSearchEffect() {
  useEffect(() => {
    const siteHeader = document.getElementById('site_header')!
    const searchInput = document.getElementById('q') as HTMLInputElement
    const searchBtn = document.getElementById('search_button')!
    const backdrop = document.getElementById('backdrop')!
    const searchForm = document.querySelector('.search-form-inner')!

    const openSearch = () => {
      siteHeader.classList.add('is-search-form-open')
      searchInput.focus()
    }

    const removeSearchFormOpen = () => {
      siteHeader.classList.remove('is-search-form-open')
    }

    const closeSearch = (e: any) => {
      if (e.key === 'Escape' || e.key === 'Tab') {
        removeSearchFormOpen()
        if (e.key === 'Escape') searchBtn.focus()
      }
    }

    const clearSearchInput = () => {
      searchInput.value = '';
      removeSearchFormOpen()
      window.removeEventListener('beforeunload', clearSearchInput)
    }

    const searchSubmitHandler = (e: any) => {
      if (!validateStringNotEmpty(e.target.elements['q'].value)) {
        e.preventDefault()
        return
      }

      window.addEventListener('beforeunload', clearSearchInput)
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', openSearch)
    }

    if (backdrop) {
      backdrop.addEventListener('click', removeSearchFormOpen)
    }

    if (searchInput) {
      searchInput.addEventListener('keydown', closeSearch)
    }

    if (searchForm) {
      searchForm.addEventListener('submit', searchSubmitHandler)
    }

    // クリーンアップ関数
    return () => {
      if (searchBtn) {
        searchBtn.removeEventListener('click', openSearch)
      }

      if (backdrop) {
        backdrop.removeEventListener('click', removeSearchFormOpen)
      }

      if (searchInput) {
        searchInput.removeEventListener('keydown', closeSearch)
      }

      if (searchForm) {
        searchForm.removeEventListener('submit', searchSubmitHandler)
      }
    }
  }, [])
}