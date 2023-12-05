import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import ScrollableTabsButtonVisible from '../components/ScrollableTabsButtonVisible'
import { OPEN_CHAT_CATEGORY as OC_CAT } from '../config/config'

export default function Test() {
  const { category } = useParams()
  console.log('Route: ' + category)
  const index = typeof category === 'string' ? OC_CAT.findIndex((el) => el[1] === Number(category)) : 0
  return index !== -1 ? <ScrollableTabsButtonVisible categoryIndex={index} /> : <Navigate to="/404" />
}
