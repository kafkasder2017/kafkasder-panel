# KAFKASDER Merkezi Dashboard Rehberi

## 🎯 Amaç

Bu güncelleme ile KAFKASDER yönetim paneli, Context7'den alınan modern Next.js pattern'leri kullanılarak tek bir merkezi anasayfa üzerinden tüm modülleri yönetebilecek şekilde yeniden tasarlandı.

## 🏗️ Yeni Yapı

### Ana Sayfa (Dashboard)
- **Konum**: `/src/app/page.tsx`
- **Özellik**: Tüm modülleri tek yerden yöneten merkezi dashboard
- **Pattern**: Context7 SWR Pattern ile veri yönetimi

### Modül Yönetimi
Her modül artık ana sayfada bir kart olarak görünür ve şu bilgileri içerir:
- Modül adı ve açıklaması
- İstatistikler (toplam işlem sayısı, değişim oranı)
- Son aktiviteler
- Hızlı erişim butonları

## 📋 Modüller

### 1. Bağış Yönetimi (`/bagislar`)
- Nakit, çek/senet, kredi kartı ve ayni bağışlar
- Bağış raporları ve analizler

### 2. Kişiler & Kurumlar (`/kisiler`)
- Kişi ve kurum bilgileri yönetimi
- Yeni kayıt ve güncelleme işlemleri

### 3. Organizasyonlar (`/organizasyonlar`)
- Organizasyon ve şube yönetimi

### 4. Yardım Yönetimi (`/yardimlar`)
- Nakdi ve ayni yardım işlemleri
- Başvuru ve onay süreçleri

### 5. Üye Yönetimi (`/uyeler`)
- Üye kayıtları ve aidat takibi
- Üye raporları

### 6. Finans & Fon (`/finans`)
- Banka işlemleri ve finansal raporlar
- Döviz kurları ve kasa raporları

### 7. Mesajlaşma (`/mesajlasma`)
- E-posta, SMS ve WhatsApp gönderimi
- Mesaj şablonları ve grupları

### 8. İş Yönetimi (`/is-yonetimi`)
- Görevler, ekip ve proje yönetimi
- Takvim ve doküman yönetimi

### 9. Burs Yönetimi (`/burs-yonetimi`)
- Burs başvuruları ve öğrenci takibi
- Burs kampanyaları

### 10. Kumbara Yönetimi (`/kumbara-yonetimi`)
- Kumbara dağıtımı ve takibi
- Kumbara raporları

### 11. Hukuk Yönetimi (`/hukuk-yonetimi`)
- Dava takibi ve hukuki işlemler
- Tebligatlar ve belgeler

### 12. Parametreler (`/parametreler`)
- Sistem ayarları ve tanımlar

## 🔧 Teknik Özellikler

### Context7 Pattern'leri
1. **SWR Pattern**: Dashboard verilerinin yönetimi
2. **Memoized Components**: Performans optimizasyonu
3. **Stable Callbacks**: Re-render optimizasyonu
4. **Error Boundaries**: Hata yönetimi

### Modern UI/UX
- **Responsive Design**: Mobil ve desktop uyumlu
- **Search & Filter**: Modül arama ve filtreleme
- **Real-time Updates**: 30 saniyede bir otomatik güncelleme
- **Loading States**: Kullanıcı dostu yükleme durumları

### Navigation
- **Simplified Sidebar**: Sadece ana modüller
- **Breadcrumb Navigation**: Sayfa konumu gösterimi
- **Active States**: Aktif sayfa vurgulaması

## 🚀 Kullanım

### Ana Sayfa Özellikleri
1. **Quick Stats**: Üst kısımda genel istatistikler
2. **Module Cards**: Tüm modüllerin kart görünümü
3. **Search**: Modül arama özelliği
4. **Filter**: Aktif/bekleyen işlem filtreleme
5. **Real-time Data**: Otomatik veri güncelleme

### Modül Kartları
Her modül kartı şunları içerir:
- Modül ikonu ve rengi
- İstatistik bilgileri
- Son aktiviteler
- Görüntüle butonu
- Hızlı işlem butonları

## 📱 Responsive Tasarım

### Desktop
- 4 sütunlu grid layout
- Tam sidebar görünümü
- Breadcrumb navigation

### Tablet
- 3 sütunlu grid layout
- Daraltılabilir sidebar
- Mobil uyumlu header

### Mobile
- 1 sütunlu grid layout
- Mobil sidebar overlay
- Touch-friendly butonlar

## 🔄 Veri Yönetimi

### API Endpoint
- **URL**: `/api/dashboard`
- **Method**: GET
- **Refresh**: 30 saniye
- **Cache**: SWR ile otomatik cache

### Veri Yapısı
```typescript
interface DashboardData {
  stats: {
    totalMembers: number
    totalDonations: number
    totalOrganizations: number
    totalBeneficiaries: number
    // ...
  }
  pendingTasks: {
    pendingDonations: number
    pendingAidRequests: number
    // ...
  }
  // ...
}
```

## 🛠️ Geliştirme

### Yeni Modül Ekleme
1. `src/app/page.tsx` dosyasında `modules` array'ine ekle
2. Sidebar'da menü öğesi ekle
3. API endpoint'inde veri sağla
4. Gerekli sayfa dosyalarını oluştur

### Styling
- Tailwind CSS kullanılıyor
- Shadcn/ui component'leri
- Responsive design classes

### State Management
- SWR ile server state
- React useState ile local state
- Context API ile global state

## 🎨 Tema ve Renkler

Her modül için özel renkler:
- Bağış Yönetimi: Kırmızı
- Kişiler: Mavi
- Organizasyonlar: Mor
- Yardım: Turuncu
- Üyeler: Yeşil
- Finans: Zümrüt
- Mesajlaşma: İndigo
- İş Yönetimi: Cyan
- Burs: Amber
- Kumbara: Pembe
- Hukuk: Slate
- Parametreler: Gri

## 📊 Performans

### Optimizasyonlar
- Memoized components
- Lazy loading
- Image optimization
- Code splitting
- SWR caching

### Monitoring
- Error boundaries
- Loading states
- Retry mechanisms
- Offline support

## 🔐 Güvenlik

### Authentication
- Supabase Auth
- Protected routes
- Role-based access
- Session management

### Authorization
- Module permissions
- User roles
- Access control
- Audit logging

## 📈 Gelecek Geliştirmeler

1. **Real-time Notifications**: WebSocket entegrasyonu
2. **Advanced Analytics**: Detaylı raporlama
3. **Mobile App**: React Native uygulaması
4. **API Documentation**: Swagger entegrasyonu
5. **Testing**: Jest ve Cypress testleri

## 🐛 Sorun Giderme

### Yaygın Sorunlar
1. **Veri yüklenmiyor**: API endpoint kontrolü
2. **Sidebar açılmıyor**: Mobile overlay kontrolü
3. **Breadcrumb görünmüyor**: Route mapping kontrolü

### Debug
- Browser console kontrolü
- Network tab kontrolü
- React DevTools kullanımı

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. GitHub Issues kullanın
2. Dokümantasyonu kontrol edin
3. Context7 pattern'lerini inceleyin
4. Next.js dokümantasyonunu referans alın 