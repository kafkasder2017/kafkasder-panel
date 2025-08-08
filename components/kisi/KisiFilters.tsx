import React from 'react';
import { PersonStatus, Uyruk, YardimTuruDetay, MembershipType } from '../../types';
import AdvancedFilter from '../AdvancedFilter';
import SmartSearch from '../SmartSearch';

export interface KisiFiltersState {
  searchTerm: string;
  statusFilter: PersonStatus | 'all';
  nationalityFilter: Uyruk | 'all';
  yardimTuruFilter: YardimTuruDetay | 'all';
  cityFilter: string;
  ageRangeMin: string;
  ageRangeMax: string;
  registrationDateFrom: string;
  registrationDateTo: string;
  membershipTypeFilter: MembershipType | 'all';
  multipleStatusFilter: PersonStatus[];
  multipleNationalityFilter: Uyruk[];
}

interface KisiFiltersProps {
  filters: KisiFiltersState;
  onFiltersChange: (next: KisiFiltersState) => void;
  showAdvanced: boolean;
  setShowAdvanced: (val: boolean) => void;
  activeFilterCount: number;
  onClearAll: () => void;
  savedViews: Array<{ id: string; name: string; filters: any; createdAt: string }>;
  onLoadView: (id: string) => void;
  onOpenSaveView: () => void;
}

const KisiFilters: React.FC<KisiFiltersProps> = ({
  filters,
  onFiltersChange,
  showAdvanced,
  setShowAdvanced,
  activeFilterCount,
  onClearAll,
  savedViews,
  onLoadView,
  onOpenSaveView
}) => {

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target as any;
    onFiltersChange({ ...filters, [name]: value });
  };

  return (
    <>


      {/* Basit Arama */}
      <div className="mb-4">
        <input
          type="text"
          name="searchTerm"
          placeholder="Kişi ara..."
          value={filters.searchTerm}
          onChange={handleFilterChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>


    </>
  );
};

export default KisiFilters;
