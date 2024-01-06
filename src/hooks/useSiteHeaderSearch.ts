import React, { useCallback, useEffect, useRef, useState } from 'react'

export default function useSiteHeaderSearch() {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const hiddenRef = useRef<HTMLInputElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [inputEmpty, setInputEmpty] = useState(true)

  const openSearch = useCallback(() => {
    setOpen(true)
  }, [])

  const closeSearch = useCallback(() => {
    setOpen(false)
  }, [])

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    if (e.key === 'Escape' || e.key === 'Tab') {
      closeSearch()
      buttonRef.current?.focus()
    }
  }, [])

  const onChange = useCallback((e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    hiddenRef.current && (hiddenRef.current.value = e.currentTarget.value)
    setInputEmpty(!e.currentTarget.value)
  }, [])

  const deleteInput = useCallback(() => {
    inputRef.current && (inputRef.current.value = '')
    inputRef.current?.focus()
    setInputEmpty(true)
  }, [])

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.currentTarget.submit()
    deleteInput()
    closeSearch()
  }, [])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  return { openSearch, closeSearch, onKeyDown, onChange, onSubmit, deleteInput, inputEmpty, inputRef, hiddenRef, buttonRef, open }
}
