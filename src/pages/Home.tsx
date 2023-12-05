import { SWRConfig } from 'swr'
import { localStorageProvider } from '../utils/utils'
import FetchOpenChatRankingList from '../components/FetchOpenChatRankingList'
import { useSearchParams } from 'react-router-dom'
import Switch from '@mui/material/Switch'

export default function Home({ category }: { category: number }) {
  const [searchParams, setSearchParams] = useSearchParams()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    searchParams.set('sort', e.target.checked ? 'desc' : 'asc')
    setSearchParams(searchParams)
  }

  return (
    <SWRConfig value={{ provider: localStorageProvider as any }}>
      <Switch onChange={handleChange} checked={searchParams.get('sort') !== 'asc'} />
      <FetchOpenChatRankingList query={searchParams.toString()} />
    </SWRConfig>
  )
}
