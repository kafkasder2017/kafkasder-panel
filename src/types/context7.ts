// Context7 Type Safety Patterns
export type Context7Record = Record<string, unknown>
export type Context7Callback<T = void> = (...args: unknown[]) => T
export type Context7EventHandler<T = Event> = (event: T) => void
export type Context7FormData = Record<string, string | number | boolean | File | null>
export type Context7ApiResponse<T = unknown> = {
  data: T
  success: boolean
  error?: string
  message?: string
}

// Context7 Generic Types
export type Context7Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type Context7Required<T, K extends keyof T> = T & Required<Pick<T, K>>
export type Context7Nullable<T> = T | null
export type Context7Undefined<T> = T | undefined

// Context7 Form Types
export type Context7FormErrors<T> = Partial<Record<keyof T, string>>
export type Context7FormTouched<T> = Partial<Record<keyof T, boolean>>
export type Context7FormState<T> = {
  values: T
  errors: Context7FormErrors<T>
  touched: Context7FormTouched<T>
  isSubmitting: boolean
  isValid: boolean
}

// Context7 API Types
export type Context7ApiOptions = {
  filters?: Context7Record
  orderBy?: { column: string; ascending?: boolean }
  select?: string
  limit?: number
  offset?: number
}

export type Context7Pagination = {
  page: number
  pageSize: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// Context7 Event Types
export type Context7ChangeEvent<T = HTMLInputElement> = {
  target: T & { name: string; value: string | number | boolean }
}

export type Context7SelectEvent<T = unknown> = {
  value: T
  label?: string
}

// Context7 Validation Types
export type Context7Validator<T> = (value: T) => string | undefined
export type Context7ValidationSchema<T> = Record<keyof T, Context7Validator<T[keyof T]>>

// Context7 State Types
export type Context7LoadingState = {
  loading: boolean
  error: string | null
}

export type Context7AsyncState<T> = Context7LoadingState & {
  data: T | null
}

// Context7 Hook Types
export type Context7HookResult<T> = {
  data: T
  loading: boolean
  error: string | null
  refetch: () => void
}

export type Context7MutationResult<T, P> = {
  mutate: (params: P) => Promise<T>
  loading: boolean
  error: string | null
}

// Context7 Component Props
export type Context7BaseProps = {
  className?: string
  id?: string
  'data-testid'?: string
}

export type Context7FormProps<T> = Context7BaseProps & {
  onSubmit: (values: T) => void | Promise<void>
  initialValues?: Partial<T>
  validationSchema?: Context7ValidationSchema<T>
}

// Context7 Utility Types
export type Context7DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? Context7DeepPartial<T[P]> : T[P]
}

export type Context7PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K]
}

export type Context7OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K]
} 