'use client'

import React, { ReactNode } from 'react'
import { FileText, Users, Heart, Search, Plus, RefreshCw, AlertTriangle } from 'lucide-react'
import { Button } from './button'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'default' | 'outline'
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  secondaryAction,
  className = ''
}: EmptyStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
        {icon || <FileText className="h-8 w-8 text-gray-400" />}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          {description}
        </p>
      )}
      
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          {action && (
            <Button
              onClick={action.onClick}
              variant={action.variant || 'default'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant="outline"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

// Veri yok durumu
interface NoDataProps {
  entity: string
  onAdd?: () => void
  addLabel?: string
  className?: string
}

export function NoData({ entity, onAdd, addLabel = 'Yeni Ekle', className = '' }: NoDataProps) {
  return (
    <EmptyState
      icon={<FileText className="h-8 w-8 text-gray-400" />}
      title={`Henüz hiç ${entity} yok`}
      description={`İlk ${entity.toLowerCase()}nizi ekleyerek başlayın.`}
      action={onAdd ? { label: addLabel, onClick: onAdd } : undefined}
      className={className}
    />
  )
}

// Arama sonucu yok
interface NoSearchResultsProps {
  searchTerm: string
  onClear?: () => void
  onAddNew?: () => void
  addLabel?: string
  className?: string
}

export function NoSearchResults({ 
  searchTerm, 
  onClear, 
  onAddNew, 
  addLabel = 'Yeni Ekle', 
  className = '' 
}: NoSearchResultsProps) {
  return (
    <EmptyState
      icon={<Search className="h-8 w-8 text-gray-400" />}
      title="Arama sonucu bulunamadı"
      description={`"${searchTerm}" araması için sonuç bulunamadı. Farklı kelimeler deneyin.`}
      action={onClear ? { label: 'Aramayı Temizle', onClick: onClear, variant: 'outline' } : undefined}
      secondaryAction={onAddNew ? { label: addLabel, onClick: onAddNew } : undefined}
      className={className}
    />
  )
}

// Bağışçı yok durumu
interface NoDonorsProps {
  onAddDonor?: () => void
  onImport?: () => void
  className?: string
}

export function NoDonors({ onAddDonor, onImport, className = '' }: NoDonorsProps) {
  return (
    <EmptyState
      icon={<Heart className="h-8 w-8 text-red-400" />}
      title="Henüz hiç bağışçı yok"
      description="İlk bağışçınızı ekleyerek bağış yönetimi sistemine başlayın."
      action={onAddDonor ? { label: 'İlk Bağışçıyı Ekle', onClick: onAddDonor } : undefined}
      secondaryAction={onImport ? { label: 'Toplu İçe Aktar', onClick: onImport } : undefined}
      className={className}
    />
  )
}

// Yardım alan yok durumu
interface NoBeneficiariesProps {
  onAddBeneficiary?: () => void
  onImport?: () => void
  className?: string
}

export function NoBeneficiaries({ onAddBeneficiary, onImport, className = '' }: NoBeneficiariesProps) {
  return (
    <EmptyState
      icon={<Users className="h-8 w-8 text-blue-400" />}
      title="Henüz hiç yardım alan kişi yok"
      description="İlk yardım alan kişiyi ekleyerek yardım yönetimi sistemine başlayın."
      action={onAddBeneficiary ? { label: 'İlk Kişiyi Ekle', onClick: onAddBeneficiary } : undefined}
      secondaryAction={onImport ? { label: 'Toplu İçe Aktar', onClick: onImport } : undefined}
      className={className}
    />
  )
}

// Bağlantı hatası durumu
interface ConnectionErrorProps {
  onRetry?: () => void
  onRefresh?: () => void
  className?: string
}

export function ConnectionError({ onRetry, onRefresh, className = '' }: ConnectionErrorProps) {
  return (
    <EmptyState
      icon={<AlertTriangle className="h-8 w-8 text-red-400" />}
      title="Bağlantı hatası"
      description="Sunucuya bağlanırken bir hata oluştu. Lütfen internet bağlantınızı kontrol edin."
      action={onRetry ? { label: 'Tekrar Dene', onClick: onRetry } : undefined}
      secondaryAction={onRefresh ? { label: 'Sayfayı Yenile', onClick: onRefresh } : undefined}
      className={className}
    />
  )
}

// Yetki yok durumu
interface NoPermissionProps {
  feature: string
  onGoBack?: () => void
  className?: string
}

export function NoPermission({ feature, onGoBack, className = '' }: NoPermissionProps) {
  return (
    <EmptyState
      icon={<AlertTriangle className="h-8 w-8 text-orange-400" />}
      title="Yetki gerekli"
      description={`${feature} özelliğini kullanmak için yetkiniz bulunmuyor. Yöneticinizle iletişime geçin.`}
      action={onGoBack ? { label: 'Geri Dön', onClick: onGoBack, variant: 'outline' } : undefined}
      className={className}
    />
  )
}

// Bakım modu
interface MaintenanceProps {
  message?: string
  estimatedTime?: string
  onRefresh?: () => void
  className?: string
}

export function Maintenance({ 
  message = 'Sistem bakımda', 
  estimatedTime,
  onRefresh,
  className = '' 
}: MaintenanceProps) {
  return (
    <EmptyState
      icon={<RefreshCw className="h-8 w-8 text-blue-400" />}
      title={message}
      description={
        estimatedTime 
          ? `Sistem şu anda bakımda. Tahmini tamamlanma süresi: ${estimatedTime}`
          : 'Sistem şu anda bakımda. Lütfen daha sonra tekrar deneyin.'
      }
      action={onRefresh ? { label: 'Durumu Kontrol Et', onClick: onRefresh, variant: 'outline' } : undefined}
      className={className}
    />
  )
}

// Filtre sonucu yok
interface NoFilterResultsProps {
  onClearFilters?: () => void
  onAddNew?: () => void
  addLabel?: string
  className?: string
}

export function NoFilterResults({ 
  onClearFilters, 
  onAddNew, 
  addLabel = 'Yeni Ekle', 
  className = '' 
}: NoFilterResultsProps) {
  return (
    <EmptyState
      icon={<Search className="h-8 w-8 text-gray-400" />}
      title="Filtre sonucu bulunamadı"
      description="Seçtiğiniz filtrelere uygun sonuç bulunamadı. Filtreleri temizleyerek tekrar deneyin."
      action={onClearFilters ? { label: 'Filtreleri Temizle', onClick: onClearFilters, variant: 'outline' } : undefined}
      secondaryAction={onAddNew ? { label: addLabel, onClick: onAddNew } : undefined}
      className={className}
    />
  )
}

// Genel boş liste
interface EmptyListProps {
  title: string
  description: string
  icon?: ReactNode
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function EmptyList({
  title,
  description,
  icon,
  actionLabel = 'Yeni Ekle',
  onAction,
  className = ''
}: EmptyListProps) {
  return (
    <EmptyState
      icon={icon || <Plus className="h-8 w-8 text-gray-400" />}
      title={title}
      description={description}
      action={onAction ? { label: actionLabel, onClick: onAction } : undefined}
      className={className}
    />
  )
} 