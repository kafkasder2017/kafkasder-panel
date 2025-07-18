'use client'

import React, { useState, useCallback, useMemo, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, CheckCircle, Loader2, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Context7 Form Validation Types
interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => string | null
}

interface ValidationRules {
  [key: string]: ValidationRule
}

interface FormErrors {
  [key: string]: string
}

interface FormState<T> {
  values: T
  errors: FormErrors
  touched: { [key: string]: boolean }
  isSubmitting: boolean
  isValid: boolean
}

// Context7 Advanced Form Hook
export function useAdvancedForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRules = {},
  onSubmit?: (values: T) => Promise<void>
) {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true
  })
  const [isPending, startTransition] = useTransition()

  // Memoized validation function
  const validateField = useCallback((name: string, value: any): string | null => {
    const rules = validationRules[name]
    if (!rules) return null

    if (rules.required && (!value || value.toString().trim() === '')) {
      return 'Bu alan zorunludur'
    }

    if (value && rules.minLength && value.length < rules.minLength) {
      return `En az ${rules.minLength} karakter olmalıdır`
    }

    if (value && rules.maxLength && value.length > rules.maxLength) {
      return `En fazla ${rules.maxLength} karakter olmalıdır`
    }

    if (value && rules.pattern && !rules.pattern.test(value)) {
      return 'Geçersiz format'
    }

    if (value && rules.custom) {
      return rules.custom(value)
    }

    return null
  }, [validationRules])

  // Validate all fields
  const validateForm = useCallback((values: T): FormErrors => {
    const errors: FormErrors = {}
    
    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName])
      if (error) {
        errors[fieldName] = error
      }
    })

    return errors
  }, [validationRules, validateField])

  // Update field value
  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setState(prev => {
      const newValues = { ...prev.values, [name]: value }
      const newErrors = { ...prev.errors }
      
      // Clear error when field is updated
      if (newErrors[name as string]) {
        delete newErrors[name as string]
      }

      // Validate field if touched
      if (prev.touched[name as string]) {
        const error = validateField(name as string, value)
        if (error) {
          newErrors[name as string] = error
        }
      }

      return {
        ...prev,
        values: newValues,
        errors: newErrors,
        isValid: Object.keys(newErrors).length === 0
      }
    })
  }, [validateField])

  // Mark field as touched
  const setFieldTouched = useCallback((name: keyof T, touched: boolean = true) => {
    setState(prev => {
      const newTouched = { ...prev.touched, [name]: touched }
      const newErrors = { ...prev.errors }

      // Validate field when touched
      if (touched) {
        const error = validateField(name as string, prev.values[name])
        if (error) {
          newErrors[name as string] = error
        } else {
          delete newErrors[name as string]
        }
      }

      return {
        ...prev,
        touched: newTouched,
        errors: newErrors,
        isValid: Object.keys(newErrors).length === 0
      }
    })
  }, [validateField])

  // Handle form submission
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault()
    
    // Mark all fields as touched
    const allTouched = Object.keys(validationRules).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {} as { [key: string]: boolean })

    setState(prev => ({
      ...prev,
      touched: allTouched
    }))

    // Validate all fields
    const errors = validateForm(state.values)
    
    if (Object.keys(errors).length > 0) {
      setState(prev => ({
        ...prev,
        errors,
        isValid: false
      }))
      return
    }

    if (onSubmit) {
      setState(prev => ({ ...prev, isSubmitting: true }))
      
      try {
        startTransition(async () => {
          await onSubmit(state.values)
        })
      } catch (error) {
        console.error('Form submission error:', error)
      } finally {
        setState(prev => ({ ...prev, isSubmitting: false }))
      }
    }
  }, [state.values, validationRules, validateForm, onSubmit])

  // Reset form
  const resetForm = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: true
    })
  }, [initialValues])

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting || isPending,
    isValid: state.isValid,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    resetForm
  }
}

// Context7 Advanced Form Field Component
interface AdvancedFormFieldProps {
  name: string
  label: string
  type?: 'text' | 'email' | 'password' | 'textarea' | 'select'
  placeholder?: string
  options?: { value: string; label: string }[]
  value: any
  error?: string
  touched?: boolean
  onChange: (value: any) => void
  onBlur: () => void
  disabled?: boolean
  required?: boolean
}

export function AdvancedFormField({
  name,
  label,
  type = 'text',
  placeholder,
  options = [],
  value,
  error,
  touched,
  onChange,
  onBlur,
  disabled = false,
  required = false
}: AdvancedFormFieldProps) {
  const hasError = touched && error

  const renderField = () => {
    switch (type) {
      case 'textarea':
        return (
          <Textarea
            id={name}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              hasError && 'border-red-500 focus:border-red-500'
            )}
          />
        )

      case 'select':
        return (
          <Select
            value={value || ''}
            onValueChange={onChange}
            disabled={disabled}
          >
            <SelectTrigger className={cn(
              hasError && 'border-red-500 focus:border-red-500'
            )}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      default:
        return (
          <Input
            id={name}
            type={type}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              hasError && 'border-red-500 focus:border-red-500'
            )}
          />
        )
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      {renderField()}
      {hasError && (
        <p className="text-sm text-red-500 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  )
}

// Context7 Multi-Step Form Hook
export function useMultiStepForm<T extends Record<string, any>>(
  steps: Array<{
    id: string
    title: string
    fields: (keyof T)[]
    validation?: ValidationRules
  }>,
  initialValues: T,
  onSubmit?: (values: T) => Promise<void>
) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<T>(initialValues)
  const [stepErrors, setStepErrors] = useState<{ [stepId: string]: FormErrors }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentStepData = steps[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  const validateStep = useCallback((stepIndex: number): boolean => {
    const step = steps[stepIndex]
    if (!step.validation) return true

    const errors: FormErrors = {}
    step.fields.forEach(fieldName => {
      const fieldRules = step.validation![fieldName as string]
      if (fieldRules) {
        const value = formData[fieldName]
        
        if (fieldRules.required && (!value || value.toString().trim() === '')) {
          errors[fieldName as string] = 'Bu alan zorunludur'
        }
        // Add more validation rules as needed
      }
    })

    setStepErrors(prev => ({
      ...prev,
      [step.id]: errors
    }))

    return Object.keys(errors).length === 0
  }, [steps, formData])

  const nextStep = useCallback(() => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
    }
  }, [currentStep, validateStep, steps.length])

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }, [])

  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex)
    }
  }, [steps.length])

  const updateField = useCallback((fieldName: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }))
    
    // Clear step error when field is updated
    if (stepErrors[currentStepData.id]?.[fieldName as string]) {
      setStepErrors(prev => {
        const newStepErrors = { ...prev }
        if (newStepErrors[currentStepData.id]) {
          const newErrors = { ...newStepErrors[currentStepData.id] }
          delete newErrors[fieldName as string]
          newStepErrors[currentStepData.id] = newErrors
        }
        return newStepErrors
      })
    }
  }, [currentStepData.id, stepErrors])

  const handleSubmit = useCallback(async () => {
    if (!isLastStep) {
      nextStep()
      return
    }

    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    try {
      if (onSubmit) {
        await onSubmit(formData)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [isLastStep, currentStep, validateStep, formData, onSubmit, nextStep])

  return {
    currentStep,
    currentStepData,
    formData,
    stepErrors: stepErrors[currentStepData.id] || {},
    isFirstStep,
    isLastStep,
    isSubmitting,
    nextStep,
    prevStep,
    goToStep,
    updateField,
    handleSubmit,
    totalSteps: steps.length
  }
}

// Context7 Multi-Step Form Component
interface MultiStepFormProps<T> {
  steps: Array<{
    id: string
    title: string
    fields: (keyof T)[]
    validation?: ValidationRules
  }>
  initialValues: T
  onSubmit?: (values: T) => Promise<void>
  renderStep: (stepData: any, formData: T, errors: FormErrors, updateField: (field: keyof T, value: any) => void) => React.ReactNode
}

export function MultiStepForm<T extends Record<string, any>>({
  steps,
  initialValues,
  onSubmit,
  renderStep
}: MultiStepFormProps<T>) {
  const {
    currentStep,
    currentStepData,
    formData,
    stepErrors,
    isFirstStep,
    isLastStep,
    isSubmitting,
    nextStep,
    prevStep,
    handleSubmit
  } = useMultiStepForm(steps, initialValues, onSubmit)

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{currentStepData.title}</span>
          <Badge variant="secondary">
            Adım {currentStep + 1} / {steps.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderStep(currentStepData, formData, stepErrors, (field, value) => {
          // This will be handled by the parent component
        })}
        
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={isFirstStep}
          >
            Geri
          </Button>
          
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gönderiliyor...
              </>
            ) : isLastStep ? (
              'Gönder'
            ) : (
              'İleri'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Context7 Dynamic Form Hook
export function useDynamicForm<T extends Record<string, any>>(
  initialFields: Array<{
    id: string
    name: keyof T
    label: string
    type: 'text' | 'email' | 'textarea' | 'select'
    required?: boolean
    options?: { value: string; label: string }[]
  }>,
  initialValues: T,
  onSubmit?: (values: T) => Promise<void>
) {
  const [fields, setFields] = useState(initialFields)
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addField = useCallback((field: typeof initialFields[0]) => {
    setFields(prev => [...prev, field])
    setValues(prev => ({ ...prev, [field.name]: '' }))
  }, [])

  const removeField = useCallback((fieldId: string) => {
    setFields(prev => prev.filter(field => field.id !== fieldId))
  }, [])

  const updateField = useCallback((fieldId: string, updates: Partial<typeof initialFields[0]>) => {
    setFields(prev => prev.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ))
  }, [])

  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }))
    
    // Clear error when field is updated
    if (errors[name as string]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name as string]
        return newErrors
      })
    }
  }, [errors])

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    try {
      if (onSubmit) {
        await onSubmit(values)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }, [values, onSubmit])

  return {
    fields,
    values,
    errors,
    isSubmitting,
    addField,
    removeField,
    updateField,
    setFieldValue,
    handleSubmit
  }
} 