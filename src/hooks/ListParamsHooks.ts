import { MutableSnapshot, useRecoilCallback, useSetRecoilState } from 'recoil'
import { keywordState, listParamsState } from '../store/atom'
import { scrollToTop, updateURLSearchParams } from '../utils/utils';

const getValidParam = <T extends ListParamsKey>(
  value: string | null,
  defaultValue: ListParamsValue<T>,
  expectValues: ListParamsValue<T>[]
) => (expectValues.some((ex) => value === ex) ? (value as ListParamsValue<T>) : defaultValue)

const paramsList: ListParams['list'][] = ['daily', 'weekly', 'all']
const paramsSortRanking: ListParams['sort'][] = ['rank', 'increase', 'rate']
const paramsSortAll: ListParams['sort'][] = ['member', 'created_at']
const paramsOrder: ListParams['order'][] = ['asc', 'desc']

const getValidListParams = (params: URLSearchParams): ListParams => {
  const orderParam = (defaultValue: ListParams['order']) => getValidParam<'order'>(params.get('order'), defaultValue, paramsOrder)
  const sortParam = (defaultValue: ListParams['sort'], paramsSort: ListParams['sort'][]) => getValidParam<'sort'>(params.get('sort'), defaultValue, paramsSort)
  const keyword = params.get('keyword') ?? ''
  const sub_category = params.get('sub_category') ?? ''

  const list = getValidParam<'list'>(params.get('list'), 'daily', paramsList)
  if (list === 'all') {
    return { sub_category, keyword, list, sort: sortParam('member', paramsSortAll), order: orderParam('desc') }
  }

  const sort = sortParam('rank', paramsSortRanking)
  if (sort === 'rank') {
    return { sub_category, keyword, list, sort: sort, order: 'asc' }
  }

  return { sub_category, keyword, list, sort: sortParam('rank', paramsSortRanking), order: orderParam('asc') }
}

export const getInitListParamsState = (
  (params: ListParams) =>
    ({ set }: MutableSnapshot) => {
      set(listParamsState, params)
      set(keywordState, params.keyword)
    }
)(getValidListParams(new URLSearchParams(window.location.search)))

export function useSetListParams(): SetListParamsValue {
  const setKeyword = useSetRecoilState(keywordState)

  return useRecoilCallback(
    ({ snapshot, set }) =>
      async (getNewParams: (currentParams: ListParams) => ListParams) => {
        const currentParams = await snapshot.getPromise(listParamsState);
        const newParams = getValidListParams(new URLSearchParams(getNewParams(currentParams)))

        window.history.replaceState(null, '', updateURLSearchParams(newParams))
        set(listParamsState, newParams)
        setKeyword(newParams.keyword)
        scrollToTop()
      },
    [window.location.pathname]
  )
}