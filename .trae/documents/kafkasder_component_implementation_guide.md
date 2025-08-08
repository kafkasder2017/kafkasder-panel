# Kafkasder Projesi - Component Bazlı İyileştirme Implementation Guide

## 1. Kritik Öncelikli Component'ler

### 1.1 Dashboard.tsx - Ana Dashboard İyileştirmesi

#### Mevcut Sorunlar:

* Performance bottlenecks (çok fazla re-render)

* Büyük component boyutu

* Inline styling

* Memory leak potansiyeli

* Responsive design eksiklikleri

#### İyileştirme Planı:

**Adım 1: Component Bölünmesi**

```typescript
// components/dashboard/Dashboard.tsx
export function Dashboard() {
  return (
    <DashboardProvider>
      <div className="dashboard-container">
        <DashboardHeader />
        <DashboardStats />
        <DashboardCharts />
        <DashboardRecentActivities />
      </div>
    </DashboardProvider>
  )
}

// components/dashboard/DashboardStats.tsx
export function DashboardStats() {
  const { stats, loading } = useDashboardStats()
  
  if (loading) return <StatsCardSkeleton />
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Toplam Kişi"
        value={stats.totalPersons}
        icon={<Users />}
        trend={stats.personsTrend}
      />
      <StatsCard
        title="Toplam Bağış"
        value={formatCurrency(stats.totalDonations)}
        icon={<DollarSign />}
        trend={stats.donationsTrend}
      />
      {/* Diğer stat card'lar */}
    </div>
  )
}
```

**Adım 2: Performance Optimizasyonu**

```typescript
// hooks/useDashboardStats.ts
export function useDashboardStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => dashboardApi.getStats(),
    staleTime: 5 * 60 * 1000, // 5 dakika cache
    refetchInterval: 30 * 1000 // 30 saniyede bir güncelle
  })
  
  return {
    stats: stats || defaultStats,
    loading: isLoading
  }
}

// components/dashboard/StatsCard.tsx
export const StatsCard = memo(function StatsCard({
  title,
  value,
  icon,
  trend
}: StatsCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-blue-600">{icon}</div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <TrendIndicator trend={trend} />
        </div>
      )}
    </Card>
  )
})
```

### 1.2 KisiYonetimi.tsx - Kişi Yönetimi Refactoring

#### Mevcut Sorunlar:

* 800+ satır kod

* Çok fazla state variable

* Karmaşık form handling

* Inline event handlers

#### İyileştirme Planı:

**Adım 1: Feature-based Yapı**

```typescript
// features/person-management/PersonManagement.tsx
export function PersonManagement() {
  return (
    <PersonManagementProvider>
      <div className="person-management">
        <PersonHeader />
        <PersonFilters />
        <PersonTable />
        <PersonModals />
      </div>
    </PersonManagementProvider>
  )
}

// features/person-management/context/PersonManagementContext.tsx
interface PersonManagementState {
  persons: Person[]
  selectedPersons: string[]
  filters: PersonFilters
  modals: {
    create: boolean
    edit: boolean
    delete: boolean
  }
  currentPerson: Person | null
}

const PersonManagementContext = createContext<{
  state: PersonManagementState
  actions: PersonManagementActions
} | null>(null)

export function PersonManagementProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(personManagementReducer, initialState)
  
  const actions = useMemo(() => ({
    openCreateModal: () => dispatch({ type: 'OPEN_CREATE_MODAL' }),
    openEditModal: (person: Person) => dispatch({ type: 'OPEN_EDIT_MODAL', payload: person }),
    closeModals: () => dispatch({ type: 'CLOSE_MODALS' }),
    setFilters: (filters: PersonFilters) => dispatch({ type: 'SET_FILTERS', payload: filters }),
    selectPerson: (id: string) => dispatch({ type: 'SELECT_PERSON', payload: id }),
    selectAllPersons: () => dispatch({ type: 'SELECT_ALL_PERSONS' }),
    clearSelection: () => dispatch({ type: 'CLEAR_SELECTION' })
  }), [])
  
  return (
    <PersonManagementContext.Provider value={{ state, actions }}>
      {children}
    </PersonManagementContext.Provider>
  )
}
```

**Adım 2: Table Component Optimizasyonu**

```typescript
// features/person-management/components/PersonTable.tsx
export function PersonTable() {
  const { state, actions } = usePersonManagement()
  const { data: persons, isLoading } = usePersons(state.filters)
  
  const columns = useMemo(() => [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      )
    },
    {
      accessorKey: 'ad',
      header: 'Ad',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('ad')}</div>
      )
    },
    {
      accessorKey: 'soyad',
      header: 'Soyad'
    },
    {
      accessorKey: 'telefon',
      header: 'Telefon',
      cell: ({ row }) => (
        <div className="text-sm text-gray-600">
          {formatPhoneNumber(row.getValue('telefon'))}
        </div>
      )
    },
    {
      id: 'actions',
      header: 'İşlemler',
      cell: ({ row }) => (
        <PersonTableActions person={row.original} />
      )
    }
  ], [])
  
  if (isLoading) return <TableSkeleton />
  
  return (
    <DataTable
      columns={columns}
      data={persons || []}
      onRowSelectionChange={actions.setSelectedPersons}
    />
  )
}

// components/ui/DataTable.tsx - Reusable table component
export function DataTable<TData, TValue>({
  columns,
  data,
  onRowSelectionChange
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      rowSelection
    }
  })
  
  useEffect(() => {
    onRowSelectionChange?.(rowSelection)
  }, [rowSelection, onRowSelectionChange])
  
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                Sonuç bulunamadı.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DataTablePagination table={table} />
    </div>
  )
}
```

### 1.3 BagisYonetimi.tsx - Bağış Yönetimi İyileştirmesi

#### Mevcut Sorunlar:

* Form validation eksiklikleri

* Tutarsız buton tasarımları

* API error handling yetersiz

* Para formatı sorunları

#### İyileştirme Planı:

**Adım 1: Form Validation**

```typescript
// features/donation-management/schemas/donationSchema.ts
import { z } from 'zod'

export const donationSchema = z.object({
  bagisci_id: z.string().min(1, 'Bağışçı seçimi zorunludur'),
  miktar: z.number().min(1, 'Miktar 0\'dan büyük olmalıdır'),
  para_birimi: z.enum(['TRY', 'USD', 'EUR']),
  bagis_turu: z.enum(['NAKIT', 'AYNI', 'HIZMET']),
  aciklama: z.string().optional(),
  tarih: z.date()
})

export type DonationFormData = z.infer<typeof donationSchema>

// features/donation-management/components/DonationForm.tsx
export function DonationForm({ donation, onSubmit, onCancel }: DonationFormProps) {
  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: donation || {
      miktar: 0,
      para_birimi: 'TRY',
      bagis_turu: 'NAKIT',
      tarih: new Date()
    }
  })
  
  const { mutate: saveDonation, isLoading } = useSaveDonation()
  
  const handleSubmit = (data: DonationFormData) => {
    saveDonation(data, {
      onSuccess: () => {
        toast.success('Bağış başarıyla kaydedildi')
        onSubmit()
      },
      onError: (error) => {
        toast.error('Bağış kaydedilirken hata oluştu')
        console.error(error)
      }
    })
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="bagisci_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bağışçı</FormLabel>
              <FormControl>
                <DonorSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder="Bağışçı seçin"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="miktar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Miktar</FormLabel>
                <FormControl>
                  <CurrencyInput
                    value={field.value}
                    onValueChange={field.onChange}
                    currency={form.watch('para_birimi')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="para_birimi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Para Birimi</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Para birimi seçin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="TRY">₺ Türk Lirası</SelectItem>
                    <SelectItem value="USD">$ Amerikan Doları</SelectItem>
                    <SelectItem value="EUR">€ Euro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            İptal
          </Button>
          <Button
            type="submit"
            loading={isLoading}
          >
            {donation ? 'Güncelle' : 'Kaydet'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
```

**Adım 2: Currency Input Component**

```typescript
// components/ui/CurrencyInput.tsx
interface CurrencyInputProps {
  value: number
  onValueChange: (value: number) => void
  currency: 'TRY' | 'USD' | 'EUR'
  placeholder?: string
  disabled?: boolean
}

export function CurrencyInput({
  value,
  onValueChange,
  currency,
  placeholder,
  disabled
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState('')
  
  useEffect(() => {
    setDisplayValue(formatCurrency(value, currency))
  }, [value, currency])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    const numericValue = parseFloat(inputValue.replace(/[^0-9.,]/g, '').replace(',', '.'))
    
    if (!isNaN(numericValue)) {
      onValueChange(numericValue)
    } else if (inputValue === '') {
      onValueChange(0)
    }
  }
  
  const currencySymbols = {
    TRY: '₺',
    USD: '$',
    EUR: '€'
  }
  
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm">
          {currencySymbols[currency]}
        </span>
      </div>
      <Input
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className="pl-8"
      />
    </div>
  )
}
```

## 2. Orta Öncelikli Component'ler

### 2.1 ProjeYonetimi.tsx - Proje Yönetimi

#### İyileştirme Planı:

**Adım 1: Project Status Management**

```typescript
// features/project-management/types/project.ts
export interface Project {
  id: string
  ad: string
  aciklama: string
  baslangic_tarihi: Date
  bitis_tarihi: Date
  durum: ProjectStatus
  butce: number
  harcanan: number
  sorumlu_id: string
  kategori: ProjectCategory
}

export enum ProjectStatus {
  PLANLANIYOR = 'PLANLANIYOR',
  DEVAM_EDIYOR = 'DEVAM_EDIYOR',
  TAMAMLANDI = 'TAMAMLANDI',
```

