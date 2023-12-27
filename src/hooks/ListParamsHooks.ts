import { useSearchParams } from 'react-router-dom'
import { MutableSnapshot, useRecoilCallback, useRecoilValue } from 'recoil'
import { listParamsState } from '../store/atom'
import { scrollToTop } from '../utils/utils';

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
  const sub_category = params.get('sub_category') ?? ''

  const list = getValidParam<'list'>(params.get('list'), 'daily', paramsList)
  if (list === 'all') {
    return { list, sort: sortParam('member', paramsSortAll), order: orderParam('desc'), sub_category }
  }

  const sort = sortParam('rank', paramsSortRanking)
  if (sort === 'rank') {
    return { list, sort: sort, order: 'asc', sub_category }
  }

  return { list, sort: sortParam('rank', paramsSortRanking), order: orderParam('asc'), sub_category }
}

export const getInitListParamsState = (
  (params: ListParams) =>
    ({ set }: MutableSnapshot) =>
      set(listParamsState, params)
)(getValidListParams(new URLSearchParams(window.location.search)))

export function useListParams(): [ListParams, SetListParamsValue] {
  const setRealParams = useSearchParams()[1]
  const params = useRecoilValue(listParamsState)

  const setNewParams = useRecoilCallback(
    ({ snapshot, set }) =>
      async (getNewParams: (currentParams: ListParams) => ListParams) => {
        const currentParams = await snapshot.getPromise(listParamsState);
        const newParams = getValidListParams(new URLSearchParams(getNewParams(currentParams)))

        set(listParamsState, newParams)
        setRealParams(newParams, { replace: true })
        scrollToTop()
      },
    [window.location.pathname]
  )

  return [params, setNewParams]
}