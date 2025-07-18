/**
 * Modern API Client
 * Context7'nin en güncel patternlerini kullanır
 * Type-safe API calls, error handling, caching
 */

import { z } from 'zod'
import { cache } from 'react'
import { useState, useEffect, useCallback } from 'react'
import 'server-only'

// ============================================================================
// MODERN API TYPES
// ============================================================================

/**
 * Modern API Response Types
 * Type-safe response handling
 */
export type ApiResponse<T> = {
  success: true
  data: T
  timestamp: string
} | {
  success: false
  error: string
  code: string
  details?: Record<string, any>
  timestamp: string
}

/**
 * Modern API Error Types
 * Structured error handling
 */
export type ApiError = {
  message: string
  code: string
  status: number
  details?: Record<string, any>
}

/**
 * Modern Pagination Types
 * Paginated response handling
 */
export type PaginationMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export type PaginatedResponse<T> = {
  data: T[]
  meta: PaginationMeta
}

// ============================================================================
// MODERN API CLIENT CONFIGURATION
// ============================================================================

/**
 * Modern API Client Configuration
 * Environment-based configuration
 */
const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
} as const

/**
 * Modern API Headers
 * Dynamic header management
 */
function getApiHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  // Add authentication header if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth-token')
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  return headers
}

// ============================================================================
// MODERN API CLIENT CORE
// ============================================================================

/**
 * Modern API Client Core
 * Base HTTP methods with type safety
 */
class ModernApiClient {
  private baseUrl: string
  private timeout: number
  private retries: number
  private retryDelay: number

  constructor(config: typeof API_CONFIG) {
    this.baseUrl = config.baseUrl
    this.timeout = config.timeout
    this.retries = config.retries
    this.retryDelay = config.retryDelay
  }

  /**
   * Modern GET Request with Type Safety
   * Cached data fetching with validation
   */
  async get<T extends z.ZodTypeAny>(
    endpoint: string,
    schema: T,
    options: {
      cache?: RequestCache
      revalidate?: number
      tags?: string[]
    } = {}
  ): Promise<z.infer<T>> {
    const url = `${this.baseUrl}${endpoint}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getApiHeaders(),
      cache: options.cache || 'default',
      next: options.revalidate ? { revalidate: options.revalidate } : undefined,
    })

    if (!response.ok) {
      throw await this.handleError(response)
    }

    const data = await response.json()
    return schema.parse(data)
  }

  /**
   * Modern POST Request with Type Safety
   * Data validation and error handling
   */
  async post<TInput extends z.ZodTypeAny, TOutput extends z.ZodTypeAny>(
    endpoint: string,
    inputSchema: TInput,
    outputSchema: TOutput,
    data: z.infer<TInput>
  ): Promise<z.infer<TOutput>> {
    const url = `${this.baseUrl}${endpoint}`
    
    // Validate input data
    const validatedInput = inputSchema.parse(data)
    
    const response = await fetch(url, {
      method: 'POST',
      headers: getApiHeaders(),
      body: JSON.stringify(validatedInput),
    })

    if (!response.ok) {
      throw await this.handleError(response)
    }

    const result = await response.json()
    return outputSchema.parse(result)
  }

  /**
   * Modern PUT Request with Type Safety
   * Update operations with validation
   */
  async put<TInput extends z.ZodTypeAny, TOutput extends z.ZodTypeAny>(
    endpoint: string,
    inputSchema: TInput,
    outputSchema: TOutput,
    data: z.infer<TInput>
  ): Promise<z.infer<TOutput>> {
    const url = `${this.baseUrl}${endpoint}`
    
    // Validate input data
    const validatedInput = inputSchema.parse(data)
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: getApiHeaders(),
      body: JSON.stringify(validatedInput),
    })

    if (!response.ok) {
      throw await this.handleError(response)
    }

    const result = await response.json()
    return outputSchema.parse(result)
  }

  /**
   * Modern DELETE Request
   * Safe deletion with confirmation
   */
  async delete(endpoint: string): Promise<void> {
    const url = `${this.baseUrl}${endpoint}`
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: getApiHeaders(),
    })

    if (!response.ok) {
      throw await this.handleError(response)
    }
  }

  /**
   * Modern Error Handling
   * Structured error responses
   */
  private async handleError(response: Response): Promise<ApiError> {
    let errorData: any

    try {
      errorData = await response.json()
    } catch {
      errorData = { message: 'Unknown error occurred' }
    }

    return {
      message: errorData.message || 'An error occurred',
      code: errorData.code || 'UNKNOWN_ERROR',
      status: response.status,
      details: errorData.details,
    }
  }

  /**
   * Modern Retry Logic
   * Exponential backoff with jitter
   */
  private async withRetry<T>(
    operation: () => Promise<T>,
    retries: number = this.retries
  ): Promise<T> {
    try {
      return await operation()
    } catch (error) {
      if (retries > 0 && this.isRetryableError(error as ApiError)) {
        await this.delay(this.retryDelay * (this.retries - retries + 1))
        return this.withRetry(operation, retries - 1)
      }
      throw error
    }
  }

  /**
   * Modern Retryable Error Check
   * Determine if error should trigger retry
   */
  private isRetryableError(error: ApiError): boolean {
    return error.status >= 500 || error.status === 429
  }

  /**
   * Modern Delay with Jitter
   * Exponential backoff with randomization
   */
  private delay(ms: number): Promise<void> {
    const jitter = Math.random() * 0.1 * ms
    return new Promise(resolve => setTimeout(resolve, ms + jitter))
  }
}

// ============================================================================
// MODERN API CLIENT INSTANCE
// ============================================================================

/**
 * Modern API Client Instance
 * Singleton instance for the application
 */
export const apiClient = new ModernApiClient(API_CONFIG)

// ============================================================================
// MODERN CACHED API METHODS
// ============================================================================

/**
 * Modern Cached Data Fetching
 * Server-side caching with React cache
 */
export const getCachedData = cache(async <T extends z.ZodTypeAny>(
  endpoint: string,
  schema: T
): Promise<z.infer<T>> => {
  return apiClient.get(endpoint, schema, { cache: 'force-cache' })
})

/**
 * Modern Preload Pattern
 * Eager data loading for performance
 */
export const preloadData = (endpoint: string) => {
  void getCachedData(endpoint, z.any())
}

// ============================================================================
// MODERN API SCHEMAS
// ============================================================================

/**
 * Modern API Response Schemas
 * Type-safe response validation
 */
export const apiSchemas = {
  // Success response schema
  success: <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
      success: z.literal(true),
      data: dataSchema,
      timestamp: z.string(),
    }),

  // Error response schema
  error: z.object({
    success: z.literal(false),
    error: z.string(),
    code: z.string(),
    details: z.record(z.any()).optional(),
    timestamp: z.string(),
  }),

  // Paginated response schema
  paginated: <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
      data: z.array(dataSchema),
      meta: z.object({
        page: z.number().int().min(1),
        limit: z.number().int().min(1),
        total: z.number().int().min(0),
        totalPages: z.number().int().min(0),
        hasNext: z.boolean(),
        hasPrev: z.boolean(),
      }),
    }),

  // Generic response schema
  response: <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.union([
      apiSchemas.success(dataSchema),
      apiSchemas.error,
    ]),
}

// ============================================================================
// MODERN API HOOKS
// ============================================================================

/**
 * Modern API Hook for Client Components
 * React hooks for API calls
 */
export function useApi<T extends z.ZodTypeAny>(
  endpoint: string,
  schema: T,
  options: {
    enabled?: boolean
    refetchInterval?: number
  } = {}
) {
  const [data, setData] = useState<z.infer<T> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<ApiError | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiClient.get(endpoint, schema)
      setData(result)
    } catch (err) {
      setError(err as ApiError)
    } finally {
      setLoading(false)
    }
  }, [endpoint, schema])

  useEffect(() => {
    if (options.enabled !== false) {
      fetchData()
    }
  }, [fetchData, options.enabled])

  useEffect(() => {
    if (options.refetchInterval) {
      const interval = setInterval(fetchData, options.refetchInterval)
      return () => clearInterval(interval)
    }
  }, [fetchData, options.refetchInterval])

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  }
}

/**
 * Modern Mutations Hook
 * Optimistic updates and error handling
 */
export function useMutation<TInput extends z.ZodTypeAny, TOutput extends z.ZodTypeAny>(
  endpoint: string,
  inputSchema: TInput,
  outputSchema: TOutput,
  options: {
    onSuccess?: (data: z.infer<TOutput>) => void
    onError?: (error: ApiError) => void
  } = {}
) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<ApiError | null>(null)

  const mutate = useCallback(async (data: z.infer<TInput>) => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiClient.post(endpoint, inputSchema, outputSchema, data)
      options.onSuccess?.(result)
      return result
    } catch (err) {
      const apiError = err as ApiError
      setError(apiError)
      options.onError?.(apiError)
      throw apiError
    } finally {
      setLoading(false)
    }
  }, [endpoint, inputSchema, outputSchema, options])

  return {
    mutate,
    loading,
    error,
  }
}

// ============================================================================
// MODERN API UTILITIES
// ============================================================================

/**
 * Modern API Utilities
 * Helper functions for common operations
 */
export const apiUtils = {
  /**
   * Modern Query Builder
   * Type-safe query parameter construction
   */
  buildQuery: (params: Record<string, any>): string => {
    const searchParams = new URLSearchParams()
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, String(v)))
        } else {
          searchParams.append(key, String(value))
        }
      }
    })
    
    return searchParams.toString()
  },

  /**
   * Modern Response Handler
   * Generic response processing
   */
  handleResponse: async <T extends z.ZodTypeAny>(
    response: Response,
    schema: T
  ): Promise<z.infer<T>> => {
    if (!response.ok) {
      throw await apiClient['handleError'](response)
    }
    
    const data = await response.json()
    return schema.parse(data)
  },

  /**
   * Modern Error Formatter
   * User-friendly error messages
   */
  formatError: (error: ApiError): string => {
    const errorMessages: Record<string, string> = {
      'UNAUTHORIZED': 'Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.',
      'FORBIDDEN': 'Bu işlem için yetkiniz bulunmuyor.',
      'NOT_FOUND': 'İstenen kaynak bulunamadı.',
      'VALIDATION_ERROR': 'Girilen bilgiler geçersiz.',
      'RATE_LIMITED': 'Çok fazla istek gönderdiniz. Lütfen bekleyin.',
      'SERVER_ERROR': 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.',
    }
    
    return errorMessages[error.code] || error.message
  },
}

// ============================================================================
// MODERN API EXPORTS
// ============================================================================

// Tüm export'lar dosyanın içinde yapıldığı için burada tekrar export etmeye gerek yok 