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
  category: number
  isAlive?: boolean
  symbolIncrease?: 'positive' | 'negative'
  increasedMember?: string
  percentageIncrease?: string
  createdAt?: string
  totalCount?: number
}

type ListParams = {
  order: 'asc' | 'desc' | '',
  sort: 'rank' | 'member' | 'increase' | 'rate' | 'created_at' | '',
  list: 'daily' | 'weekly' | 'all',
  sub_category: string
}

type ListParamsKey = keyof ListParams
type ListParamsValue<T extends ListParamsKey> = ListParams[T]
type SetListParamsValue = (getNewParams: (currentParams: ListParams) => ListParams) => void

type SubCategories = {
  "17": string[],
  "16": string[],
  "26": string[],
  "7": string[],
  "22": string[],
  "40": string[],
  "33": string[],
  "8": string[],
  "20": string[],
  "41": string[],
  "11": string[],
  "5": string[],
  "2": string[],
  "12": string[],
  "23": string[],
  "6": string[],
  "28": string[],
  "19": string[],
  "37": string[],
  "18": string[],
  "27": string[],
  "24": string[],
  "29": string[],
  "30": string[],
}

type SubCategoryKey = keyof SubCategories;
