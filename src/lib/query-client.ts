import { SWRConfiguration } from 'swr'
import { supabaseApiClient } from './services/api-client'

export const fetcher = async (key: [string, any]) => {
  const [table, params] = key
  return supabaseApiClient.get(table, params)
}

export const swrConfig: SWRConfiguration = {
  fetcher,
  errorRetryCount: 2,
  revalidateOnFocus: false,
  dedupingInterval: 2000,
} 