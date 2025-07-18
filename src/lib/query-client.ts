import { SWRConfiguration } from 'swr'
import { apiClient } from './services/api-client'

export const fetcher = async (key: [string, any]) => {
  const [table, params] = key
  return apiClient.get(table, params)
}

export const swrConfig: SWRConfiguration = {
  fetcher,
  errorRetryCount: 2,
  revalidateOnFocus: false,
  dedupingInterval: 2000,
} 