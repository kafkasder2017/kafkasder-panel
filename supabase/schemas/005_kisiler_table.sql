-- Context7: Create kisiler table for person management
CREATE TABLE IF NOT EXISTS kisiler (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  category VARCHAR(50) DEFAULT 'donor' CHECK (category IN ('donor', 'beneficiary', 'member', 'volunteer')),
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'inactive', 'blocked')),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Context7: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_kisiler_category ON kisiler(category);
CREATE INDEX IF NOT EXISTS idx_kisiler_status ON kisiler(status);
CREATE INDEX IF NOT EXISTS idx_kisiler_email ON kisiler(email);
CREATE INDEX IF NOT EXISTS idx_kisiler_created_at ON kisiler(created_at);

-- Context7: Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_kisiler_updated_at 
    BEFORE UPDATE ON kisiler 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Context7: Insert sample data
INSERT INTO kisiler (first_name, last_name, email, phone, category, status, city, country) VALUES
('Ahmet', 'Yılmaz', 'ahmet.yilmaz@email.com', '+90 555 123 4567', 'donor', 'active', 'İstanbul', 'Türkiye'),
('Fatma', 'Demir', 'fatma.demir@email.com', '+90 555 234 5678', 'beneficiary', 'active', 'Ankara', 'Türkiye'),
('Mehmet', 'Kaya', 'mehmet.kaya@email.com', '+90 555 345 6789', 'member', 'active', 'İzmir', 'Türkiye'),
('Ayşe', 'Özkan', 'ayse.ozkan@email.com', '+90 555 456 7890', 'volunteer', 'active', 'Bursa', 'Türkiye'),
('Ali', 'Çelik', 'ali.celik@email.com', '+90 555 567 8901', 'donor', 'draft', 'Antalya', 'Türkiye'),
('Zeynep', 'Arslan', 'zeynep.arslan@email.com', '+90 555 678 9012', 'beneficiary', 'active', 'Konya', 'Türkiye'),
('Mustafa', 'Koç', 'mustafa.koc@email.com', '+90 555 789 0123', 'member', 'inactive', 'Adana', 'Türkiye'),
('Elif', 'Şahin', 'elif.sahin@email.com', '+90 555 890 1234', 'volunteer', 'active', 'Gaziantep', 'Türkiye'),
('Hasan', 'Yıldız', 'hasan.yildiz@email.com', '+90 555 901 2345', 'donor', 'blocked', 'Kayseri', 'Türkiye'),
('Selin', 'Aydın', 'selin.aydin@email.com', '+90 555 012 3456', 'beneficiary', 'active', 'Mersin', 'Türkiye');

-- Context7: Enable Row Level Security
ALTER TABLE kisiler ENABLE ROW LEVEL SECURITY;

-- Context7: Create RLS policies
CREATE POLICY "Users can view all persons" ON kisiler
    FOR SELECT USING (true);

CREATE POLICY "Users can insert persons" ON kisiler
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update persons" ON kisiler
    FOR UPDATE USING (true);

CREATE POLICY "Users can delete persons" ON kisiler
    FOR DELETE USING (true); 