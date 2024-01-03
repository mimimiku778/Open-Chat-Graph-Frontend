import { useEffect, useRef, useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import { useInView } from 'react-intersection-observer'
import { isSP } from '../utils/utils'

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
export const LIMIT_ITEMS = isSP() ? 10 : 20
const ROOT_MARGIN = isSP() ? "100px" : "500px"

export default function useInfiniteFetchApi<T,>(query: string) {
  const getKey = (i: number) => `${BASE_URL}/oclist?page=${i}&limit=${LIMIT_ITEMS}${query ? '&' + query : ''}`
  const { data, setSize, size, isValidating, error } = useSWRInfinite(
    getKey,
    fetchApi<T[]>,
    swrOptions
  )

  const { ref: useInViewRef, inView: isScrollEnd } = useInView({
    root: null,
    rootMargin: ROOT_MARGIN,
    threshold: 0.0
  })

  const isLastPage = !data || !data[data?.length - 1]?.length

  useEffect(() => {
    if (isScrollEnd && !isValidating && !error && !isLastPage) {
      setSize(size + 1)
    }
  }, [isScrollEnd])

  return { data: data?.flat(), useInViewRef, isValidating, isLastPage, error }
}