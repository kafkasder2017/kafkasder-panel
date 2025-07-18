-- Kullanıcı rolleri ve izinler için tablolar
-- Bu dosya kullanıcı yönetimi ve rol bazlı erişim kontrolü için gerekli tabloları oluşturur

-- Kullanıcı profilleri tablosu
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'observer' CHECK (role IN ('admin', 'editor', 'operator', 'observer')),
  permissions TEXT[] DEFAULT ARRAY[]::TEXT[],
  organization_id UUID,
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Kullanıcı profil güncelleme fonksiyonu
CREATE OR REPLACE FUNCTION public.handle_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'role', 'observer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Yeni kullanıcı oluşturulduğunda profil oluştur
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_user_profile();

-- Kullanıcı profil güncelleme fonksiyonu
CREATE OR REPLACE FUNCTION public.update_user_profile(
  user_id UUID,
  full_name TEXT DEFAULT NULL,
  role TEXT DEFAULT NULL,
  permissions TEXT[] DEFAULT NULL,
  is_active BOOLEAN DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  UPDATE public.user_profiles
  SET
    full_name = COALESCE(update_user_profile.full_name, full_name),
    role = COALESCE(update_user_profile.role, role),
    permissions = COALESCE(update_user_profile.permissions, permissions),
    is_active = COALESCE(update_user_profile.is_active, is_active),
    updated_at = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS politikaları
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Admin tüm profilleri görebilir
CREATE POLICY "Admin can view all profiles" ON public.user_profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid() AND up.role = 'admin'
    )
  );

-- Kullanıcılar kendi profillerini görebilir
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (id = auth.uid());

-- Admin tüm profilleri güncelleyebilir
CREATE POLICY "Admin can update all profiles" ON public.user_profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles up
      WHERE up.id = auth.uid() AND up.role = 'admin'
    )
  );

-- Kullanıcılar kendi profillerini güncelleyebilir (sadece belirli alanlar)
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (id = auth.uid())
  WITH CHECK (
    id = auth.uid() AND
    role = (SELECT role FROM public.user_profiles WHERE id = auth.uid()) -- rol değiştirilemez
  );

-- İzin kontrol fonksiyonu
CREATE OR REPLACE FUNCTION public.has_permission(permission TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid() 
    AND is_active = true
    AND (
      role = 'admin' OR -- Admin tüm izinlere sahip
      permission = ANY(permissions)
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Rol kontrol fonksiyonu
CREATE OR REPLACE FUNCTION public.has_role(required_role TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE id = auth.uid() 
    AND is_active = true
    AND role = required_role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Varsayılan admin kullanıcısı oluştur (eğer yoksa)
INSERT INTO public.user_profiles (id, full_name, role, permissions)
VALUES (
  '00000000-0000-0000-0000-000000000000', -- placeholder UUID
  'System Admin',
  'admin',
  ARRAY[
    'dashboard:read',
    'donations:manage',
    'people:manage',
    'aid:manage',
    'members:manage',
    'finance:manage',
    'messaging:manage',
    'work:manage',
    'scholarship:manage',
    'piggy_bank:manage',
    'legal:manage',
    'parameters:manage'
  ]
) ON CONFLICT (id) DO NOTHING;

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_is_active ON public.user_profiles(is_active);
CREATE INDEX IF NOT EXISTS idx_user_profiles_organization ON public.user_profiles(organization_id);

-- Güncelleme zamanı trigger'ı
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column(); 