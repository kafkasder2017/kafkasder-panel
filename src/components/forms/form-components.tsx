'use client'

import React from 'react'
import { useForm, Controller, FormProvider, useFormContext, Control } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
// Removed import of Textarea due to missing module
import {
  FormControl,
  FormDescription,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '../ui/textarea'
// Form Field Wrapper bileşeni
interface FormFieldProps {
  label: string
  name: string
  error?: string
  required?: boolean
  children: React.ReactNode
  description?: string
  className?: string
}

export function FormField({
  label,
  name,
  error,
  required = false,
  children,
  description,
  className,
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className || ''}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// Select Component
interface SelectOption {
  value: string
  label: string
}

interface FormSelectProps {
  name: string
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
}

export function FormSelect({ name, options, placeholder, disabled }: FormSelectProps) {
  const { control, formState: { errors } } = useFormContext()
  
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <select
          {...field}
          disabled={disabled}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
        >
          {placeholder && (
            <option value="">{placeholder}</option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    />
  )
}

// Input Component
interface FormInputProps {
  name: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'date'
  placeholder?: string
  disabled?: boolean
}

export function FormInput({ name, type = 'text', placeholder, disabled }: FormInputProps) {
  const { register, formState: { errors } } = useFormContext()
  
  return (
    <Input
      {...register(name, { 
        valueAsNumber: type === 'number' ? true : false 
      })}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={errors[name] ? 'border-red-500' : ''}
    />
  )
}

// Textarea Component
interface FormTextareaProps {
  name: string
  placeholder?: string
  rows?: number
  disabled?: boolean
}

export function FormTextarea({ name, placeholder, rows = 3, disabled }: FormTextareaProps) {
  const { register, formState: { errors } } = useFormContext()
  
  return (
    <textarea
      {...register(name)}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 ${
        errors[name] ? 'border-red-500' : ''
      }`}
    />
  )
}

// Checkbox Component
interface FormCheckboxProps {
  name: string
  label: string
  disabled?: boolean
}

export function FormCheckbox({ name, label, disabled }: FormCheckboxProps) {
  const { register } = useFormContext()
  
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        {...register(name)}
        type="checkbox"
        disabled={disabled}
        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:bg-gray-100"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  )
}

// Radio Group Component
interface RadioOption {
  value: string
  label: string
}

interface FormRadioGroupProps {
  name: string
  options: RadioOption[]
  disabled?: boolean
}

export function FormRadioGroup({ name, options, disabled }: FormRadioGroupProps) {
  const { register } = useFormContext()
  
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
          <input
            {...register(name)}
            type="radio"
            value={option.value}
            disabled={disabled}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <span className="text-sm text-gray-700">{option.label}</span>
        </label>
      ))}
    </div>
  )
}

// Multi-Step Form Hook
interface Step {
  title: string
  description?: string
  component: React.ComponentType<any>
}

interface UseMultiStepFormProps {
  steps: Step[]
  onComplete: (data: any) => void
  schema?: z.ZodType<any>
}

export function useMultiStepForm({ steps, onComplete, schema }: UseMultiStepFormProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [formData, setFormData] = React.useState({})
  
  const methods = useForm({
    resolver: schema ? zodResolver(schema as any) : undefined,
    defaultValues: formData,
  })
  
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const currentData = methods.getValues()
      setFormData({ ...formData, ...currentData })
      setCurrentStep(currentStep + 1)
    }
  }
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }
  
  const handleSubmit = (data: any) => {
    const finalData = { ...formData, ...data }
    onComplete(finalData)
  }
  
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1
  
  return {
    currentStep,
    steps,
    methods,
    nextStep,
    prevStep,
    handleSubmit,
    isFirstStep,
    isLastStep,
    formData,
  }
}

// Multi-Step Form Component
interface MultiStepFormProps {
  steps: Step[]
  onComplete: (data: any) => void
  schema?: z.ZodType<any>
  className?: string
}

export function MultiStepForm({ steps, onComplete, schema, className }: MultiStepFormProps) {
  const {
    currentStep,
    steps: formSteps,
    methods,
    nextStep,
    prevStep,
    handleSubmit,
    isFirstStep,
    isLastStep,
  } = useMultiStepForm({ steps, onComplete, schema })
  
  const CurrentStepComponent = formSteps[currentStep].component
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Adım {currentStep + 1} / {formSteps.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentStep + 1) / formSteps.length) * 100)}% Tamamlandı
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / formSteps.length) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Step Title */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {formSteps[currentStep].title}
        </h2>
        {formSteps[currentStep].description && (
          <p className="text-gray-600">
            {formSteps[currentStep].description}
          </p>
        )}
      </div>
      
      {/* Form */}
      <FormProvider {...methods}>
        <form onSubmit={isLastStep ? methods.handleSubmit(handleSubmit) : methods.handleSubmit(nextStep)}>
          <Card className="p-6 mb-6">
            <CurrentStepComponent />
          </Card>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={isFirstStep}
            >
              Önceki
            </Button>
            
            <Button type="submit">
              {isLastStep ? 'Tamamla' : 'İleri'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

// Form Section Component
interface FormSectionProps {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="border-b border-gray-200 pb-2 mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  )
}

// Select Field
interface SelectFieldProps {
  control: Control<any>
  name: string
  label: string
  placeholder?: string
  options: { value: string; label: string }[]
  className?: string
}

export const SelectField: React.FC<SelectFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  options,
  className
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormField
        label={label}
        name={name}
        className={className}
      >
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
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
      </FormField>
    )}
  />
)

// Input Field
interface InputFieldProps {
  control: Control<any>
  name: string
  label: string
  type?: string
  placeholder?: string
  className?: string
  maxLength?: number
}

export const InputField: React.FC<InputFieldProps> = ({
  control,
  name,
  label,
  type = "text",
  placeholder,
  className,
  maxLength
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormField
        label={label}
        name={name}
        className={className}
      >
        <Input
          type={type}
          placeholder={placeholder}
          maxLength={maxLength}
          {...field}
          value={field.value || ''}
          onChange={(e) => {
            const value = type === 'number' ? Number(e.target.value) : e.target.value
            field.onChange(value)
          }}
        />
      </FormField>
    )}
  />
)

// Textarea Field
interface TextareaFieldProps {
  control: Control<any>
  name: string
  label: string
  placeholder?: string
  rows?: number
  className?: string
}

export const TextareaField: React.FC<TextareaFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  rows = 3,
  className
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormField
        label={label}
        name={name}
        className={className}
      >
        <Textarea
          placeholder={placeholder}
          rows={rows}
          {...field}
          value={field.value || ''}
        />
      </FormField>
    )}
  />
)

// Checkbox Field
interface CheckboxFieldProps {
  control: Control<any>
  name: string
  label: string
  description?: string
  className?: string
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  control,
  name,
  label,
  description,
  className
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormField
        label={label}
        name={name}
        description={description}
        className={className}
      >
        <input
          type="checkbox"
          checked={field.value}
          onChange={field.onChange}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </FormField>
    )}
  />
)

// Multi-Select Field
interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectFieldProps {
  control: Control<any>
  name: string
  label: string
  options: MultiSelectOption[]
  placeholder?: string
  className?: string
}

export const MultiSelectField: React.FC<MultiSelectFieldProps> = ({
  control,
  name,
  label,
  options,
  placeholder,
  className
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormField
        label={label}
        name={name}
        className={className}
      >
        <select
          multiple
          value={field.value || []}
          onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions, option => option.value)
            field.onChange(selectedOptions)
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>
    )}
  />
)
interface RadioOption {
  value: string
  label: string
}

interface RadioFieldProps {
  name: string
  label: string
  options: RadioOption[]
  className?: string
}

export const RadioField: React.FC<RadioFieldProps> = ({
  name,
  label,
  options,
  className
}) => (
  <Controller
    name={name}
    render={({ field }) => (
      <FormField
        label={label}
        name={name}
        className={className}
      >
        <div className="space-y-2">
          {options.map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value={option.value}
                checked={field.value === option.value}
                onChange={field.onChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </FormField>
    )}
  />
)

// Phone Field
interface PhoneFieldProps {
  control: Control<any>
  name: string
  label: string
  placeholder?: string
  className?: string
}

export const PhoneField: React.FC<PhoneFieldProps> = ({
  control,
  name,
  label,
  placeholder = "+90 5XX XXX XX XX",
  className
}) => (
  <InputField
    control={control}
    name={name}
    label={label}
    type="tel"
    placeholder={placeholder}
    className={className}
  />
)

// Currency Field
interface CurrencyFieldProps {
  control: Control<any>
  name: string
  label: string
  placeholder?: string
  className?: string
}

export const CurrencyField: React.FC<CurrencyFieldProps> = ({
  control,
  name,
  label,
  placeholder = "0.00",
  className
}) => (
  <InputField
    control={control}
    name={name}
    label={label}
    type="number"
    placeholder={placeholder}
    className={className}
  />
)

// File Upload Field
interface FileUploadFieldProps {
  control: Control<any>
  name: string
  label: string
  accept?: string
  multiple?: boolean
  className?: string
}

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  control,
  name,
  label,
  accept = "*/*",
  multiple = false,
  className
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <FormField
        label={label}
        name={name}
        className={className}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => {
            const files = e.target.files
            field.onChange(files ? Array.from(files) : null)
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </FormField>
    )}
  />
) 