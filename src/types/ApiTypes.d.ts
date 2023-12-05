/* eslint-disable @typescript-eslint/no-unused-vars */
interface ErrorResponse {
  error: {
    code: string
    message: string
  }
}

interface OpenChat {
  id: number
  name: string
  desc: string
  member: number
  img: string
  emblem: 0 | 1 | 2
  symbolIncrease: '' | 'positive' | 'negative'
  increasedMember: '' | string
  percentageIncrease: '' | string
  isAlive: boolean
}

type Sort = 'asc' | 'desc'