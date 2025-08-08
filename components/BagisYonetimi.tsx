import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { Bagis, BagisTuru, Person, Proje } from '../types';
import { createBagis, updateBagis, deleteBagis } from '../services/apiService';
import { useBagisYonetimi } from '../hooks/useData';
import { usePDFGenerator } from '../hooks/usePDFGenerator';
import { useExcelUtils } from '../hooks/useExcelUtils';
import { Modal } from './ui/Modal';
import { ModernCard, ModernCardHeader, ModernCardContent } from './ui/ModernCard';
import { ModernButton } from './ui/ModernButton';
import { ModernInput } from './ui/ModernInput';
import { PageHeader, StatCard, Table, Input, Select, Textarea, Button } from './ui';
import AdvancedFilter from './AdvancedFilter';
import SmartSearch from './SmartSearch';
import { formatCurrency, formatDate } from '../utils/format';
import { filterItems, sortItems } from '../utils/list';
import { Heart, DollarSign, Receipt, Download, Upload, Filter, Plus, TrendingUp, Users, Calendar, Sparkles, CheckCircle, AlertTriangle, Edit, Trash2, Eye } from 'lucide-react';

interface BagisYonetimiProps {
    initialFilter?: BagisTuru | 'all';
}

const BagisYonetimi: React.FC<BagisYonetimiProps> = ({ initialFilter = 'all' }) => {
    const { data, isLoading, error, refresh } = useBagisYonetimi();
    const { donations, people, projects } = data;
    const { generateDonationReport, isGenerating } = usePDFGenerator();
    const { 
        exportDonations, 
        importDonations, 
        generateDonationTemplate, 
        isExporting, 
        isImporting 
    } = useExcelUtils();

    const [filters, setFilters] = useState({ searchTerm: '', typeFilter: initialFilter });
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
    const [editingDonation, setEditingDonation] = useState<Partial<Bagis> | null>(null);
    const [receiptDonation, setReceiptDonation] = useState<Bagis | null>(null);

    const peopleMap = useMemo(() => new Map(people.map(p => [String(p.id), `${(p as any).ad ?? p.first_name ?? ''} ${(p as any).soyad ?? p.last_name ?? ''}`.trim()])), [people]);
    const projectsMap = useMemo(() => new Map(projects.map(p => [String(p.id), p.name])), [projects]);

    const [page, setPage] = useState(1);
    const pageSize = 20;

    useEffect(() => {
        const t = setTimeout(() => {
            setDebouncedQuery(filters.searchTerm || '');
        }, 300);
        return () => clearTimeout(t);
    }, [filters.searchTerm]);

    const { filteredDonations, monthlyTotal, donorCount, averageDonation } = useMemo(() => {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const monthlyTotalCalc = donations
            .filter(d => new Date(d.tarih) >= firstDayOfMonth)
            .reduce((sum, d) => sum + (d.tutar ?? 0), 0);

        const allDonors = new Set(donations.map(d => d.bagisciId));

        const filtered = filterItems(donations, (d) => {
            const donorName = (peopleMap.get(String(d.bagisciId)) || '').toLowerCase();
            const query = (debouncedQuery || '').toLowerCase();
            const matchesSearch = !query || donorName.includes(query) || (d.makbuzNo || '').toLowerCase().includes(query);
            const matchesType = filters.typeFilter === 'all' || d.bagisTuru === filters.typeFilter;
            return matchesSearch && matchesType;
        });

        const sorted = sortItems(filtered, (a, b) => new Date(b.tarih).getTime() - new Date(a.tarih).getTime());

        return {
            filteredDonations: sorted,
            monthlyTotal: monthlyTotalCalc,
            donorCount: allDonors.size,
            averageDonation: donations.length > 0 ? (donations.reduce((acc, curr) => acc + (curr.tutar ?? 0), 0) / donations.length) : 0
        };
    }, [donations, debouncedQuery, filters.typeFilter, peopleMap]);

    const handleAddDonation = () => {
        setEditingDonation({});
        setIsFormModalOpen(true);
    };

    const handleEditDonation = (donation: Bagis) => {
        setEditingDonation(donation);
        setIsFormModalOpen(true);
    };

    const handleSaveDonation = async (donationData: Partial<Bagis>) => {
        try {
            if (donationData.id) {
                await updateBagis(donationData.id, donationData);
                toast.success('Bağış bilgileri güncellendi');
            } else {
                await createBagis(donationData);
                toast.success('Yeni bağış kaydedildi');
            }
            setIsFormModalOpen(false);
            setEditingDonation(null);
            refresh();
        } catch (error) {
            toast.error('İşlem sırasında hata oluştu');
        }
    };

    const handleDeleteDonation = async (donationId: string) => {
        if (window.confirm('Bu bağış kaydını silmek istediğinizden emin misiniz?')) {
            try {
                await deleteBagis(donationId);
                toast.success('Bağış kaydı silindi');
                refresh();
            } catch (error) {
                toast.error('Silme işlemi başarısız');
            }
        }
    };

    const handleShowReceipt = (donation: Bagis) => {
        setReceiptDonation(donation);
        setIsReceiptModalOpen(true);
    };

    if (isLoading) {
        return (
            <div className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
                <div className="animate-pulse space-y-8">
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
                        ))}
                    </div>
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
                        <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center">
                            <Heart className="h-6 w-6 text-white" />
                        </div>
                        Bağış Yönetimi
                        <Sparkles className="h-8 w-8 text-rose-500" />
                    </h1>
                    <p className="text-gray-600">Bağış kayıtlarını yönetin ve raporlayın</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <ModernButton variant="outline" icon={<Filter className="h-4 w-4" />}>
                        Filtrele
                    </ModernButton>
                    <ModernButton variant="outline" icon={<Download className="h-4 w-4" />}>
                        Dışa Aktar
                    </ModernButton>
                    <ModernButton variant="primary" onClick={handleAddDonation} icon={<Plus className="h-4 w-4" />}>
                        Yeni Bağış Ekle
                    </ModernButton>
                </div>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <ModernCard variant="interactive" className="group">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900">
                                {formatCurrency(donations.reduce((sum, d) => sum + (d.tutar ?? 0), 0))}
                            </h3>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Toplam Bağış</p>
                            <div className="flex items-center gap-1 mt-2">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="text-xs text-green-600 font-medium">+12% bu ay</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                            <Heart className="h-6 w-6" />
                        </div>
                    </div>
                </ModernCard>

                <ModernCard variant="interactive" className="group">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900">{formatCurrency(monthlyTotal)}</h3>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Bu Ay</p>
                            <div className="flex items-center gap-1 mt-2">
                                <Calendar className="h-4 w-4 text-blue-500" />
                                <span className="text-xs text-blue-600 font-medium">{donations.filter(d => new Date(d.tarih).getMonth() === new Date().getMonth()).length} işlem</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                            <DollarSign className="h-6 w-6" />
                        </div>
                    </div>
                </ModernCard>

                <ModernCard variant="interactive" className="group">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900">{donorCount}</h3>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Bağışçı Sayısı</p>
                            <div className="flex items-center gap-1 mt-2">
                                <Users className="h-4 w-4 text-purple-500" />
                                <span className="text-xs text-purple-600 font-medium">Toplam kişi</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                            <Users className="h-6 w-6" />
                        </div>
                    </div>
                </ModernCard>

                <ModernCard variant="interactive" className="group">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-3xl font-bold text-gray-900">{formatCurrency(averageDonation)}</h3>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Ortalama Bağış</p>
                            <div className="flex items-center gap-1 mt-2">
                                <TrendingUp className="h-4 w-4 text-emerald-500" />
                                <span className="text-xs text-emerald-600 font-medium">Per kişi</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                            <Receipt className="h-6 w-6" />
                        </div>
                    </div>
                </ModernCard>
            </div>

            {/* Smart Search and Filters */}
            <ModernCard variant="glass" className="border border-blue-100/50">
                <ModernCardContent>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <ModernInput
                                    type="text"
                                    placeholder="🤖 AI Destekli Arama (bağışçı adı, makbuz no...)"
                                    value={filters.searchTerm}
                                    onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
                                    className="pr-12"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                                        <Sparkles className="h-3 w-3 text-white" />
                                        <span className="text-xs text-white font-bold">AI</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex gap-3">
                            <select 
                                value={filters.typeFilter} 
                                onChange={(e) => setFilters({ ...filters, typeFilter: e.target.value as BagisTuru | 'all' })}
                                className="px-4 py-3 bg-white border border-gray-200 rounded-xl transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            >
                                <option value="all">Tüm Türler</option>
                                <option value={BagisTuru.NAKIT}>Nakit</option>
                                <option value={BagisTuru.AYNI}>Ayni</option>
                                <option value={BagisTuru.FITRE_SADAKA}>Fitre/Sadaka</option>
                                <option value={BagisTuru.ZEKAT}>Zekat</option>
                                <option value={BagisTuru.KURBAN}>Kurban</option>
                            </select>
                            
                            <ModernButton 
                                variant="outline" 
                                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                                icon={<Filter className="h-4 w-4" />}
                            >
                                Gelişmiş Filtre
                            </ModernButton>
                        </div>
                    </div>
                </ModernCardContent>
            </ModernCard>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
                <ModernCard variant="default">
                    <ModernCardHeader 
                        title="Gelişmiş Filtreler" 
                        subtitle="Detaylı arama kriterleri"
                        icon={<Filter className="h-5 w-5" />}
                    />
                    <ModernCardContent>
                        <AdvancedFilter onFilterChange={(filters) => console.log('Advanced filters:', filters)} />
                    </ModernCardContent>
                </ModernCard>
            )}

            {/* Donations Table */}
            <ModernCard variant="default">
                <ModernCardHeader 
                    title="Bağış Kayıtları" 
                    subtitle={`Toplam ${filteredDonations.length} kayıt`}
                    icon={<Heart className="h-5 w-5" />}
                    actions={
                        <div className="flex gap-2">
                            <ModernButton variant="outline" size="sm" icon={<Download className="h-4 w-4" />}>
                                Excel
                            </ModernButton>
                            <ModernButton variant="outline" size="sm" icon={<Receipt className="h-4 w-4" />}>
                                PDF
                            </ModernButton>
                        </div>
                    }
                />
                <ModernCardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Bağışçı</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Tür</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Tutar</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Tarih</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Makbuz No</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDonations.slice((page - 1) * pageSize, page * pageSize).map((donation) => (
                                    <tr key={donation.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                                        <td className="py-4 px-4">
                                            <div className="font-medium text-gray-900">
                                                {peopleMap.get(String(donation.bagisciId)) || 'Bilinmeyen'}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200">
                                                {donation.bagisTuru}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="font-bold text-green-600">
                                                {formatCurrency(donation.tutar || 0)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-gray-600">
                                            {formatDate(donation.tarih)}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="font-mono text-sm text-gray-500">
                                                {donation.makbuzNo || '-'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleShowReceipt(donation)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Makbuz Görüntüle"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleEditDonation(donation)}
                                                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                                    title="Düzenle"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteDonation(donation.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Sil"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                            {((page - 1) * pageSize) + 1}-{Math.min(page * pageSize, filteredDonations.length)} / {filteredDonations.length} kayıt
                        </div>
                        <div className="flex gap-2">
                            <ModernButton 
                                variant="outline" 
                                size="sm" 
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                Önceki
                            </ModernButton>
                            <ModernButton 
                                variant="outline" 
                                size="sm" 
                                disabled={page * pageSize >= filteredDonations.length}
                                onClick={() => setPage(page + 1)}
                            >
                                Sonraki
                            </ModernButton>
                        </div>
                    </div>
                </ModernCardContent>
            </ModernCard>

            {/* Form Modal */}
            {isFormModalOpen && (
                <Modal isOpen={true} onClose={() => setIsFormModalOpen(false)} title={editingDonation?.id ? 'Bağış Düzenle' : 'Yeni Bağış Ekle'}>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveDonation(editingDonation || {});
                    }} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Bağışçı</label>
                                <select 
                                    value={editingDonation?.bagisciId || ''} 
                                    onChange={(e) => setEditingDonation({ ...editingDonation, bagisciId: e.target.value })}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    required
                                >
                                    <option value="">Bağışçı Seçin</option>
                                    {people.map(person => (
                                        <option key={person.id} value={person.id}>
                                            {(person as any).ad ?? person.first_name} {(person as any).soyad ?? person.last_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Bağış Türü</label>
                                <select 
                                    value={editingDonation?.bagisTuru || ''} 
                                    onChange={(e) => setEditingDonation({ ...editingDonation, bagisTuru: e.target.value as BagisTuru })}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    required
                                >
                                    <option value="">Tür Seçin</option>
                                    <option value={BagisTuru.NAKIT}>Nakit</option>
                                    <option value={BagisTuru.AYNI}>Ayni</option>
                                    <option value={BagisTuru.FITRE_SADAKA}>Fitre/Sadaka</option>
                                    <option value={BagisTuru.ZEKAT}>Zekat</option>
                                    <option value={BagisTuru.KURBAN}>Kurban</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Tutar</label>
                                <ModernInput 
                                    type="number" 
                                    value={editingDonation?.tutar || ''} 
                                    onChange={(e) => setEditingDonation({ ...editingDonation, tutar: Number(e.target.value) })}
                                    placeholder="0.00"
                                    step="0.01"
                                    min="0"
                                    required 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Tarih</label>
                                <ModernInput 
                                    type="date" 
                                    value={editingDonation?.tarih || ''} 
                                    onChange={(e) => setEditingDonation({ ...editingDonation, tarih: e.target.value })}
                                    required 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Açıklama</label>
                            <textarea 
                                value={editingDonation?.aciklama || ''} 
                                onChange={(e) => setEditingDonation({ ...editingDonation, aciklama: e.target.value })}
                                placeholder="Bağış ile ilgili ek bilgiler..."
                                rows={3}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                            <ModernButton variant="secondary" onClick={() => setIsFormModalOpen(false)}>
                                İptal
                            </ModernButton>
                            <ModernButton 
                                type="submit" 
                                variant="primary"
                                icon={<CheckCircle className="h-4 w-4" />}
                            >
                                {editingDonation?.id ? 'Güncelle' : 'Kaydet'}
                            </ModernButton>
                        </div>
                    </form>
                </Modal>
            )}

            {/* Receipt Modal */}
            {isReceiptModalOpen && receiptDonation && (
                <Modal isOpen={true} onClose={() => setIsReceiptModalOpen(false)} title="Bağış Makbuzu">
                    <div className="space-y-6">
                        <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                                <Receipt className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Kafkasder Bağış Makbuzu</h3>
                            <p className="text-blue-600 font-medium">#{receiptDonation.makbuzNo}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-gray-500">Bağışçı</label>
                                <p className="text-lg font-semibold text-gray-900">
                                    {peopleMap.get(String(receiptDonation.bagisciId))}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Tutar</label>
                                <p className="text-lg font-bold text-green-600">
                                    {formatCurrency(receiptDonation.tutar || 0)}
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Tür</label>
                                <p className="text-lg font-semibold text-gray-900">{receiptDonation.bagisTuru}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-500">Tarih</label>
                                <p className="text-lg font-semibold text-gray-900">
                                    {formatDate(receiptDonation.tarih)}
                                </p>
                            </div>
                        </div>

                        {receiptDonation.aciklama && (
                            <div>
                                <label className="text-sm font-medium text-gray-500">Açıklama</label>
                                <p className="text-gray-900">{receiptDonation.aciklama}</p>
                            </div>
                        )}

                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                            <ModernButton variant="outline" icon={<Download className="h-4 w-4" />}>
                                PDF İndir
                            </ModernButton>
                            <ModernButton variant="primary" onClick={() => setIsReceiptModalOpen(false)}>
                                Kapat
                            </ModernButton>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default BagisYonetimi;
