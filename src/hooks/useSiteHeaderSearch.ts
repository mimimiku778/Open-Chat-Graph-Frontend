import React, { useEffect, useRef, useState } from 'react'

export default function useSiteHeaderSearch() {
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [inputEmpty, setInputEmpty] = useState(true)

  const openSearch = () => {
    setOpen(true)
  }

  const closeSearch = () => {
    setOpen(false)
  }

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Escape' || e.key === 'Tab') {
      closeSearch()
      buttonRef.current?.focus()
    }
  }

  const onChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputEmpty(!e.currentTarget.value)
  }

  const deleteInput = () => {
    inputRef.current && (inputRef.current.value = '')
    inputRef.current?.focus()
    setInputEmpty(true)
  }

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  return { openSearch, closeSearch, onKeyDown, onChange, deleteInput, inputEmpty, inputRef, buttonRef, open }
}
