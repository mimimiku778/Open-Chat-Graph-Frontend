import { useEffect, useState, useCallback } from 'react'
import useSWRInfinite from 'swr/infinite'
import { useInView } from 'react-intersection-observer'

async function fetchApi<T,>(url: string) {
  const response = await fetch(url)

  const data: T | ErrorResponse = await response.json()
  if (!response.ok) {
    throw Error((data as ErrorResponse).error.message)
  }

  return data as T
}

const swrOptions = {
  revalidateOnReconnect: false,
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateFirstPage: false,
}

export const BASE_URL = 'http://192.168.11.10'

export const LIMIT_ITEMS = 40

export default function useInfiniteFetchApi<T,>() {
  const getKey = (pageIndex: number) => `${BASE_URL}/oclist?page=${pageIndex}&limit=${LIMIT_ITEMS}`

  const { data, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetchApi<T[]>,
    swrOptions
  )

  const { ref: useInViewRef, inView: isScrollEnd } = useInView()

  const isLastPage = isValidating || !data || !data[data.length - 1].length

  useEffect(() => {
    if (isScrollEnd && !isLastPage) {
      setSize(size + 1)
    }
  }, [isScrollEnd, isLastPage, size, setSize])

  return { data, useInViewRef, isValidating, isLastPage }
}
