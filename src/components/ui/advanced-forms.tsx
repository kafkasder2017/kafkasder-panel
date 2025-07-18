'use client'

import React, { useState, useRef } from 'react'
import { X, Calendar, Upload, Plus, Check, ChevronDown } from 'lucide-react'
import { Button } from './button'
import { Input } from './input'

// Multi-Select Component
interface MultiSelectProps {
  options: Array<{ value: string; label: string }>
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Seçiniz...',
  className = '',
  disabled = false
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue))
    } else {
      onChange([...value, optionValue])
    }
  }

  const removeOption = (optionValue: string) => {
    onChange(value.filter(v => v !== optionValue))
  }

  const selectedLabels = value.map(v => 
    options.find(opt => opt.value === v)?.label || v
  )

  return (
    <div className={`relative ${className}`}>
      <div
        className={`min-h-[40px] w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer ${
          disabled ? 'bg-gray-100' : 'bg-white'
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {value.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selectedLabels.map((label, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
              >
                {label}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeOption(value[index])
                  }}
                  className="ml-1 hover:text-blue-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                value.includes(option.value) ? 'bg-blue-50' : ''
              }`}
              onClick={() => toggleOption(option.value)}
            >
              <span>{option.label}</span>
              {value.includes(option.value) && (
                <Check className="h-4 w-4 text-blue-600" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Date Range Picker
interface DateRangeProps {
  startDate?: Date
  endDate?: Date
  onChange: (startDate: Date | undefined, endDate: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DateRangePicker({
  startDate,
  endDate,
  onChange,
  placeholder = 'Tarih aralığı seçin',
  className = '',
  disabled = false
}: DateRangeProps) {
  const formatDate = (date: Date | undefined) => {
    if (!date) return ''
    return date.toLocaleDateString('tr-TR')
  }

  const displayValue = startDate && endDate 
    ? `${formatDate(startDate)} - ${formatDate(endDate)}`
    : startDate 
    ? `${formatDate(startDate)} - ...`
    : ''

  return (
    <div className={`relative ${className}`}>
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="date"
            value={startDate ? startDate.toISOString().split('T')[0] : ''}
            onChange={(e) => {
              const date = e.target.value ? new Date(e.target.value) : undefined
              onChange(date, endDate)
            }}
            disabled={disabled}
            placeholder="Başlangıç tarihi"
          />
        </div>
        <div className="flex items-center px-2 text-gray-500">-</div>
        <div className="flex-1">
          <Input
            type="date"
            value={endDate ? endDate.toISOString().split('T')[0] : ''}
            onChange={(e) => {
              const date = e.target.value ? new Date(e.target.value) : undefined
              onChange(startDate, date)
            }}
            disabled={disabled}
            placeholder="Bitiş tarihi"
            min={startDate ? startDate.toISOString().split('T')[0] : undefined}
          />
        </div>
      </div>
    </div>
  )
}

// File Upload Component
interface FileUploadProps {
  onFileSelect: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number // MB
  disabled?: boolean
  className?: string
  placeholder?: string
}

export function FileUpload({
  onFileSelect,
  accept = '*/*',
  multiple = false,
  maxSize = 10,
  disabled = false,
  className = '',
  placeholder = 'Dosya seçin veya sürükleyip bırakın'
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): boolean => {
    if (file.size > maxSize * 1024 * 1024) {
      setError(`Dosya boyutu ${maxSize}MB'dan büyük olamaz`)
      return false
    }
    setError(null)
    return true
  }

  const handleFiles = (files: FileList | null) => {
    if (!files) return

    const fileArray = Array.from(files)
    const validFiles = fileArray.filter(validateFile)
    
    if (validFiles.length > 0) {
      onFileSelect(validFiles)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (!disabled) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  return (
    <div className={className}>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragOver
            ? 'border-blue-400 bg-blue-50'
            : error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <Upload className={`mx-auto h-8 w-8 mb-2 ${error ? 'text-red-400' : 'text-gray-400'}`} />
        <p className={`text-sm ${error ? 'text-red-600' : 'text-gray-600'}`}>
          {error || placeholder}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Maksimum dosya boyutu: {maxSize}MB
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
        disabled={disabled}
      />
    </div>
  )
}

// Tag Input Component
interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  maxTags?: number
}

export function TagInput({
  value,
  onChange,
  placeholder = 'Etiket eklemek için yazın ve Enter\'a basın',
  className = '',
  disabled = false,
  maxTags
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('')

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !value.includes(trimmedTag)) {
      if (!maxTags || value.length < maxTags) {
        onChange([...value, trimmedTag])
      }
    }
    setInputValue('')
  }

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(inputValue)
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      removeTag(value.length - 1)
    }
  }

  return (
    <div className={`border border-gray-300 rounded-md p-2 min-h-[40px] flex flex-wrap gap-1 ${className}`}>
      {value.map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
        >
          {tag}
          <button
            onClick={() => removeTag(index)}
            className="ml-1 hover:text-blue-600"
            disabled={disabled}
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ''}
        className="flex-1 min-w-[120px] outline-none text-sm"
        disabled={disabled || Boolean(maxTags && value.length >= maxTags)}
      />
      {maxTags && (
        <span className="text-xs text-gray-500 self-center">
          {value.length}/{maxTags}
        </span>
      )}
    </div>
  )
}

// Searchable Select
interface SearchableSelectProps {
  options: Array<{ value: string; label: string }>
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  allowClear?: boolean
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder = 'Arayın ve seçin...',
  className = '',
  disabled = false,
  allowClear = true
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const selectedOption = options.find(opt => opt.value === value)

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleClear = () => {
    onChange('')
    setSearchTerm('')
  }

  return (
    <div className={`relative ${className}`}>
      <div
        className={`w-full border border-gray-300 rounded-md px-3 py-2 cursor-pointer ${
          disabled ? 'bg-gray-100' : 'bg-white'
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption?.label || placeholder}
          </span>
          <div className="flex items-center gap-1">
            {allowClear && selectedOption && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleClear()
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-2 border-b">
            <Input
              type="text"
              placeholder="Arama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm"
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                    value === option.value ? 'bg-blue-50 text-blue-600' : ''
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500 text-sm">
                Sonuç bulunamadı
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 