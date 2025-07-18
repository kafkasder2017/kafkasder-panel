'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Upload,
  Calendar,
  User,
  Folder,
  File,
  Lock
} from 'lucide-react';

// Mock data
const documents = [
  {
    id: 1,
    title: 'KAFKASDER vs. ABC Şirketi - Dava Dilekçesi',
    caseNumber: '2024/001',
    type: 'Dava Dilekçesi',
    category: 'Dava Belgeleri',
    status: 'active',
    uploadedBy: 'Av. Mehmet Yılmaz',
    uploadDate: '2024-01-10',
    lastModified: '2024-01-15',
    fileSize: '2.5 MB',
    fileType: 'PDF',
    description: 'ABC Şirketi aleyhine açılan ticari dava dilekçesi',
    tags: ['ticari dava', 'dilekçe', 'acil'],
    isConfidential: false
  },
  {
    id: 2,
    title: 'KAFKASDER vs. XYZ Vakfı - Cevap Dilekçesi',
    caseNumber: '2024/002',
    type: 'Cevap Dilekçesi',
    category: 'Dava Belgeleri',
    status: 'active',
    uploadedBy: 'Av. Fatma Demir',
    uploadDate: '2024-01-08',
    lastModified: '2024-01-12',
    fileSize: '1.8 MB',
    fileType: 'PDF',
    description: 'XYZ Vakfı\'nın iddialarına karşı cevap dilekçesi',
    tags: ['idari dava', 'cevap', 'vakıf'],
    isConfidential: true
  },
  {
    id: 3,
    title: 'KAFKASDER vs. DEF Derneği - Sözleşme',
    caseNumber: '2024/003',
    type: 'Sözleşme',
    category: 'Sözleşmeler',
    status: 'archived',
    uploadedBy: 'Av. Ali Kaya',
    uploadDate: '2024-01-05',
    lastModified: '2024-01-10',
    fileSize: '3.2 MB',
    fileType: 'PDF',
    description: 'DEF Derneği ile yapılan hukuki danışmanlık sözleşmesi',
    tags: ['sözleşme', 'danışmanlık', 'dernek'],
    isConfidential: false
  },
  {
    id: 4,
    title: 'KAFKASDER vs. GHI Limited - Delil Listesi',
    caseNumber: '2024/004',
    type: 'Delil Listesi',
    category: 'Dava Belgeleri',
    status: 'active',
    uploadedBy: 'Av. Zeynep Özkan',
    uploadDate: '2024-01-03',
    lastModified: '2024-01-08',
    fileSize: '4.1 MB',
    fileType: 'PDF',
    description: 'GHI Limited davası için sunulacak delillerin listesi',
    tags: ['delil', 'ticari dava', 'limited'],
    isConfidential: true
  },
  {
    id: 5,
    title: 'KAFKASDER vs. JKL Şirketi - Arabuluculuk Raporu',
    caseNumber: '2024/005',
    type: 'Arabuluculuk Raporu',
    category: 'Arabuluculuk',
    status: 'active',
    uploadedBy: 'Av. Burak Demir',
    uploadDate: '2024-01-01',
    lastModified: '2024-01-05',
    fileSize: '1.5 MB',
    fileType: 'PDF',
    description: 'JKL Şirketi ile yapılan arabuluculuk görüşmesi raporu',
    tags: ['arabuluculuk', 'rapor', 'sulh'],
    isConfidential: false
  },
  {
    id: 6,
    title: 'KAFKASDER vs. MNO Vakfı - İhtarname',
    caseNumber: '2024/006',
    type: 'İhtarname',
    category: 'İhtarnameler',
    status: 'active',
    uploadedBy: 'Av. Can Yıldız',
    uploadDate: '2023-12-28',
    lastModified: '2024-01-02',
    fileSize: '0.8 MB',
    fileType: 'PDF',
    description: 'MNO Vakfı\'na gönderilen ihtarname',
    tags: ['ihtarname', 'vakıf', 'acil'],
    isConfidential: true
  }
];

const documentTypes = [
  { value: 'all', label: 'Tümü' },
  { value: 'dava dilekçesi', label: 'Dava Dilekçesi' },
  { value: 'cevap dilekçesi', label: 'Cevap Dilekçesi' },
  { value: 'sözleşme', label: 'Sözleşme' },
  { value: 'delil listesi', label: 'Delil Listesi' },
  { value: 'arabuluculuk raporu', label: 'Arabuluculuk Raporu' },
  { value: 'ihtarname', label: 'İhtarname' }
];

const categories = [
  { value: 'all', label: 'Tümü' },
  { value: 'dava belgeleri', label: 'Dava Belgeleri' },
  { value: 'sözleşmeler', label: 'Sözleşmeler' },
  { value: 'arabuluculuk', label: 'Arabuluculuk' },
  { value: 'ihtarnameler', label: 'İhtarnameler' },
  { value: 'kararlar', label: 'Kararlar' },
  { value: 'diğer', label: 'Diğer' }
];

const statusOptions = [
  { value: 'all', label: 'Tümü' },
  { value: 'active', label: 'Aktif' },
  { value: 'archived', label: 'Arşivlenmiş' },
  { value: 'draft', label: 'Taslak' }
];

export default function BelgelerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Aktif</Badge>;
      case 'archived':
        return <Badge variant="secondary">Arşivlenmiş</Badge>;
      case 'draft':
        return <Badge variant="outline">Taslak</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'Dava Dilekçesi':
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Dava</Badge>;
      case 'Cevap Dilekçesi':
        return <Badge variant="default" className="bg-purple-100 text-purple-800">Cevap</Badge>;
      case 'Sözleşme':
        return <Badge variant="default" className="bg-green-100 text-green-800">Sözleşme</Badge>;
      case 'Delil Listesi':
        return <Badge variant="default" className="bg-orange-100 text-orange-800">Delil</Badge>;
      case 'Arabuluculuk Raporu':
        return <Badge variant="outline">Arabuluculuk</Badge>;
      case 'İhtarname':
        return <Badge variant="default" className="bg-red-100 text-red-800">İhtarname</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType) {
      case 'PDF':
        return <FileText className="w-5 h-5 text-red-600" />;
      case 'DOC':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'DOCX':
        return <FileText className="w-5 h-5 text-blue-600" />;
      default:
        return <File className="w-5 h-5 text-gray-600" />;
    }
  };

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.caseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || document.type.toLowerCase().includes(typeFilter);
    const matchesCategory = categoryFilter === 'all' || document.category.toLowerCase().includes(categoryFilter);
    const matchesStatus = statusFilter === 'all' || document.status === statusFilter;
    
    return matchesSearch && matchesType && matchesCategory && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([]);
    } else {
      setSelectedDocuments(filteredDocuments.map(d => d.id));
    }
  };

  const handleSelectDocument = (id: number) => {
    if (selectedDocuments.includes(id)) {
      setSelectedDocuments(selectedDocuments.filter(d => d !== id));
    } else {
      setSelectedDocuments([...selectedDocuments, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hukuki Belgeler</h1>
          <p className="text-gray-600 mt-1">
            Hukuki belge arşivi ve yönetimi
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Dışa Aktar
          </Button>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            Belge Yükle
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Belge</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <Folder className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Aktif Belgeler</p>
                <p className="text-2xl font-bold text-gray-900">124</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100">
                <Lock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Gizli Belgeler</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-100">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Bu Ay Eklenen</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filtreler
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Belge ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Belge tipi" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setTypeFilter('all');
              setCategoryFilter('all');
              setStatusFilter('all');
            }}>
              Filtreleri Temizle
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {filteredDocuments.length} belge bulundu
        </p>
        {selectedDocuments.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {selectedDocuments.length} belge seçildi
            </span>
            <Button variant="outline" size="sm">
              Toplu İşlem
            </Button>
          </div>
        )}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getFileTypeIcon(document.fileType)}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{document.fileType}</p>
                    <p className="text-xs text-gray-500">{document.fileSize}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {document.isConfidential && (
                    <Lock className="w-4 h-4 text-red-600" />
                  )}
                  <input
                    type="checkbox"
                    checked={selectedDocuments.includes(document.id)}
                    onChange={() => handleSelectDocument(document.id)}
                    className="rounded border-gray-300"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                    {document.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{document.caseNumber}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getTypeBadge(document.type)}
                  {getStatusBadge(document.status)}
                </div>
                
                <p className="text-sm text-gray-600 line-clamp-2">
                  {document.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {document.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                  {document.tags.length > 3 && (
                    <span className="text-xs text-gray-500">+{document.tags.length - 3}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{document.uploadedBy}</span>
                  <span>{document.uploadDate}</span>
                </div>
                
                <div className="flex space-x-2 pt-2 border-t">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    Görüntüle
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-1" />
                    İndir
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 