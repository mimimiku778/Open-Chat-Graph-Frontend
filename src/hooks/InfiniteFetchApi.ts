import { useEffect, useRef, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import { useInView } from 'react-intersection-observer'

async function fetchApi<T,>(url: string) {
  const response = await fetch(url)

  const data: T | ErrorResponse = await response.json()
  if (!response.ok) {
    const errorMessage = (data as ErrorResponse).error.message
    console.log(errorMessage)
    throw new Error(errorMessage)
  }

  return data as T
}

const swrOptions = {
  revalidateOnReconnect: false,
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateFirstPage: false,
}

//export const BASE_URL = 'http://192.168.11.10'
export const BASE_URL = 'https://openchat-review.me'
export const LIMIT_ITEMS = 40

export default function useInfiniteFetchApi<T,>(query = '') {
  const queryRef = useRef(query)
  const [page, setPage] = useState(1)
  const getKey = (i: number) => `${BASE_URL}/oclist?page=${i}&limit=${LIMIT_ITEMS}${query ? '&' + query : ''}`
  const { data, setSize, isValidating, error } = useSWRInfinite(
    getKey,
    fetchApi<T[]>,
    swrOptions
  )

  const { ref: useInViewRef, inView: isScrollEnd } = useInView({
    root: null,
    rootMargin: "3000px",
    threshold: 0.0
  })
  const isLastPage = !data || !data[data?.length - 1]?.length

  useEffect(() => {
    if (isScrollEnd && !isValidating && !error && !isLastPage) {
      setSize(page + 1)
      setPage(page + 1)
    }
  }, [isScrollEnd])

  useEffect(() => {
    if (queryRef.current !== query) {
      queryRef.current = query
      setPage(1)
    }
  }, [query])

  return { data: data?.slice(0, queryRef.current !== query ? 1 : page), useInViewRef, isValidating, isLastPage, error }
}