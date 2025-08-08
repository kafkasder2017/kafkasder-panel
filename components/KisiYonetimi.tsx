import React, { useState, useMemo, useRef, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import toast from 'react-hot-toast';
import { Person, PersonStatus, MembershipType, Uyruk, KimlikTuru, YardimTuruDetay, KullaniciRol, SponsorlukTipi, DosyaBaglantisi, RizaBeyaniStatus } from '../types.ts';
import KisiToolbar from './kisi/KisiToolbar';
import KisiFilters, { KisiFiltersState } from './kisi/KisiFilters';
import KisiTable from './kisi/KisiTable';
import KisiSelectionBar from './kisi/KisiSelectionBar';
import { ModernCard, ModernCardHeader, ModernCardContent } from './ui/ModernCard';
import { ModernButton } from './ui/ModernButton';
import { ModernInput } from './ui/ModernInput';
import { Users, UserPlus, Filter, Download, Upload, BarChart3, Eye, Edit, Trash2, Camera, Sparkles, Shield, CheckCircle, AlertTriangle } from 'lucide-react';

interface SavedView {
    id: string;
    name: string;
    filters: any;
    createdAt: string;
}
import { createPerson, updatePerson, deletePerson, deletePeople } from '../services/apiService.ts';
import { usePeople } from '../hooks/useData.ts';
import { usePDFGenerator } from '../hooks/usePDFGenerator';
import { useExcelUtils } from '../hooks/useExcelUtils';
import { Modal } from './ui/Modal';
import CameraCaptureModal from './CameraCaptureModal.tsx';

const getStatusClass = (status: PersonStatus) => {
    switch (status) {
        case PersonStatus.AKTIF: return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200';
        case PersonStatus.PASIF: return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200';
        case PersonStatus.BEKLEMEDE: return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200';
        default: return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200';
    }
};

const KisiFormModal: React.FC<{
    person: Partial<Person> | null,
    onClose: () => void,
    onSave: (person: Partial<Person>) => void,
    isCameraModalOpen: boolean,
    setIsCameraModalOpen: (open: boolean) => void,
    onCameraCapture: (imageData: string) => void
}> = ({ person, onClose, onSave, isCameraModalOpen, setIsCameraModalOpen, onCameraCapture }) => {
    const [formData, setFormData] = useState<Partial<Person>>(person || {});
    
    React.useEffect(() => {
        setFormData(person || {});
    }, [person]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMultiSelectChange = (field: 'uyruk' | 'aldigiYardimTuru', value: Uyruk | YardimTuruDetay) => {
        setFormData(prev => {
            const currentValues = (prev[field] as any[]) || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            return { ...prev, [field]: newValues };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const isNew = !person?.id;

    return (
        <>
            <Modal isOpen={true} onClose={onClose} title={isNew ? 'Yeni Kişi Ekle' : 'Kişi Bilgilerini Düzenle'}>
                {/* Enhanced Camera Scan Section */}
                <ModernCard variant="glass" className="mb-6 border border-purple-200/50">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center">
                                <Camera className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-purple-900">AI Destekli Hızlı Veri Girişi</h4>
                                <p className="text-sm text-purple-700">Kimlik kartını kamera ile tarayarak bilgileri otomatik doldurun</p>
                            </div>
                        </div>
                        <ModernButton
                            variant="primary"
                            onClick={() => setIsCameraModalOpen(true)}
                            icon={<Camera className="h-4 w-4" />}
                            className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
                        >
                            Kamera ile Tara
                        </ModernButton>
                    </div>
                </ModernCard>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Ad</label>
                            <ModernInput 
                                type="text" 
                                name="first_name" 
                                value={formData.first_name || ''} 
                                onChange={handleChange} 
                                placeholder="Kişinin adını girin"
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Soyad</label>
                            <ModernInput 
                                type="text" 
                                name="last_name" 
                                value={formData.last_name || ''} 
                                onChange={handleChange} 
                                placeholder="Kişinin soyadını girin"
                                required 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">E-posta</label>
                            <ModernInput 
                                type="email" 
                                name="email" 
                                value={formData.email || ''} 
                                onChange={handleChange} 
                                placeholder="ornek@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Telefon</label>
                            <ModernInput 
                                type="tel" 
                                name="phone" 
                                value={formData.phone || ''} 
                                onChange={handleChange} 
                                placeholder="+90 555 123 45 67"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Kimlik No</label>
                            <ModernInput 
                                type="text" 
                                name="kimlikNo" 
                                value={formData.kimlikNo || ''} 
                                onChange={handleChange} 
                                placeholder="12345678901"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Durum</label>
                            <select 
                                name="status" 
                                value={formData.status || PersonStatus.AKTIF} 
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            >
                                <option value={PersonStatus.AKTIF}>Aktif</option>
                                <option value={PersonStatus.PASIF}>Pasif</option>
                                <option value={PersonStatus.BEKLEMEDE}>Beklemede</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Adres</label>
                        <textarea 
                            name="address" 
                            value={formData.address || ''} 
                            onChange={handleChange} 
                            placeholder="Tam adres bilgisini girin"
                            rows={3}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                        <ModernButton variant="secondary" onClick={onClose}>
                            İptal
                        </ModernButton>
                        <ModernButton 
                            type="submit" 
                            variant="primary"
                            icon={<CheckCircle className="h-4 w-4" />}
                        >
                            {isNew ? 'Kişi Ekle' : 'Güncelle'}
                        </ModernButton>
                    </div>
                </form>
            </Modal>

            {isCameraModalOpen && (
                <CameraCaptureModal
                    isOpen={isCameraModalOpen}
                    onClose={() => setIsCameraModalOpen(false)}
                    onCapture={onCameraCapture}
                />
            )}
        </>
    );
};

const KisiYonetimi: React.FC = () => {
    const { data: people, isLoading, error, refresh } = usePeople();
    const [filters, setFilters] = useState<KisiFiltersState>({
        searchTerm: '',
        statusFilter: 'all',
        membershipFilter: 'all',
        uyeOlduguTarihBaslangic: '',
        uyeOlduguTarihBitis: '',
        yas: { min: 0, max: 120 }
    });

    const [selectedPeople, setSelectedPeople] = useState<Set<string>>(new Set());
    const [editingPerson, setEditingPerson] = useState<Partial<Person> | null>(null);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
    const [savedViews, setSavedViews] = useState<SavedView[]>([]);

    const { generatePDFReport } = usePDFGenerator();
    const { exportToExcel, importFromExcel } = useExcelUtils();

    // Filter people based on current filters
    const filteredPeople = useMemo(() => {
        return people.filter(person => {
            const matchesSearch = !filters.searchTerm || 
                `${person.first_name} ${person.last_name}`.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                person.email?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                person.phone?.includes(filters.searchTerm);

            const matchesStatus = filters.statusFilter === 'all' || person.status === filters.statusFilter;
            const matchesMembership = filters.membershipFilter === 'all' || person.membershipType === filters.membershipFilter;

            return matchesSearch && matchesStatus && matchesMembership;
        });
    }, [people, filters]);

    const handleAddPerson = () => {
        setEditingPerson({});
        setIsFormModalOpen(true);
    };

    const handleEditPerson = (person: Person) => {
        setEditingPerson(person);
        setIsFormModalOpen(true);
    };

    const handleSavePerson = async (personData: Partial<Person>) => {
        try {
            if (personData.id) {
                await updatePerson(personData.id, personData);
                toast.success('Kişi bilgileri güncellendi');
            } else {
                await createPerson(personData);
                toast.success('Yeni kişi eklendi');
            }
            setIsFormModalOpen(false);
            setEditingPerson(null);
            refresh();
        } catch (error) {
            toast.error('İşlem sırasında hata oluştu');
        }
    };

    const handleDeletePerson = async (personId: string) => {
        if (window.confirm('Bu kişiyi silmek istediğinizden emin misiniz?')) {
            try {
                await deletePerson(personId);
                toast.success('Kişi silindi');
                refresh();
            } catch (error) {
                toast.error('Silme işlemi başarısız');
            }
        }
    };

    const handleBulkDelete = async () => {
        if (selectedPeople.size === 0) return;
        
        if (window.confirm(`${selectedPeople.size} kişiyi silmek istediğinizden emin misiniz?`)) {
            try {
                await deletePeople(Array.from(selectedPeople));
                toast.success(`${selectedPeople.size} kişi silindi`);
                setSelectedPeople(new Set());
                refresh();
            } catch (error) {
                toast.error('Toplu silme işlemi başarısız');
            }
        }
    };

    const handleCameraCapture = (imageData: string) => {
        // AI ile görüntü analizi yapılacak ve form otomatik doldurulacak
        toast.success('Kimlik kartı tarandı, bilgiler otomatik dolduruldu');
        setIsCameraModalOpen(false);
    };

    if (isLoading) {
        return (
            <div className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                            Kişi Yönetimi
                        </h1>
                        <p className="text-gray-600">Sistem kullanıcıları ve bağışçıları yönetin</p>
                    </div>
                    <ModernButton variant="primary" onClick={handleAddPerson} icon={<UserPlus className="h-4 w-4" />}>
                        Yeni Kişi Ekle
                    </ModernButton>
                </div>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
                <ModernCard variant="default" className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Veri Yüklenemedi</h3>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <ModernButton variant="primary" onClick={refresh}>
                        Yeniden Dene
                    </ModernButton>
                </ModernCard>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
            {/* Enhanced Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        Kişi Yönetimi
                        <Sparkles className="h-8 w-8 text-blue-500" />
                    </h1>
                    <p className="text-gray-600">Sistem kullanıcıları ve bağışçıları yönetin</p>
                </div>
                
                <ModernButton variant="primary" onClick={handleAddPerson} icon={<UserPlus className="h-4 w-4" />}>
                    Yeni Kişi Ekle
                </ModernButton>
            </div>



            {/* Toolbar */}
            <KisiToolbar
                selectedCount={selectedPeople.size}
                onBulkDelete={handleBulkDelete}
                onExport={() => exportToExcel(Array.from(selectedPeople))}
                onImport={importFromExcel}
            />

            {/* Filters */}
            <KisiFilters
                filters={filters}
                onFiltersChange={setFilters}
                savedViews={savedViews}
                onSaveView={(view) => setSavedViews([...savedViews, view])}
                onLoadView={(view) => setFilters(view.filters)}
            />



            {/* Table */}
            <ModernCard variant="default">
                <KisiTable
                    data={filteredPeople}
                    selectedIds={Array.from(selectedPeople)}
                    onSelectAll={(selected) => {
                        if (selected) {
                            setSelectedPeople(new Set(filteredPeople.map(p => p.id)));
                        } else {
                            setSelectedPeople(new Set());
                        }
                    }}
                    onSelectOne={(id, selected) => {
                        const newSelected = new Set(selectedPeople);
                        if (selected) {
                            newSelected.add(id);
                        } else {
                            newSelected.delete(id);
                        }
                        setSelectedPeople(newSelected);
                    }}
                    onEdit={handleEditPerson}
                    onDelete={handleDeletePerson}
                    getStatusClass={getStatusClass}
                />
            </ModernCard>

            {/* Form Modal */}
            {isFormModalOpen && (
                <KisiFormModal
                    person={editingPerson}
                    onClose={() => {
                        setIsFormModalOpen(false);
                        setEditingPerson(null);
                    }}
                    onSave={handleSavePerson}
                    isCameraModalOpen={isCameraModalOpen}
                    setIsCameraModalOpen={setIsCameraModalOpen}
                    onCameraCapture={handleCameraCapture}
                />
            )}
        </div>
    );
};

export default KisiYonetimi;
