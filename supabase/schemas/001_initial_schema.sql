-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable RLS (Row Level Security) 
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'operator', 'viewer');
CREATE TYPE person_category AS ENUM ('donor', 'beneficiary', 'member', 'volunteer');
CREATE TYPE person_status AS ENUM ('draft', 'active', 'inactive', 'blocked');
CREATE TYPE donation_type AS ENUM ('cash', 'check', 'credit_card', 'online', 'in_kind');
CREATE TYPE donation_method AS ENUM ('cash', 'bank_transfer', 'credit_card', 'check', 'other');
CREATE TYPE donation_status AS ENUM ('pending', 'completed', 'failed', 'cancelled');

-- Users table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    role user_role DEFAULT 'viewer',
    avatar_url TEXT,
    phone TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Countries table
CREATE TABLE public.countries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    code TEXT NOT NULL UNIQUE,
    phone_code TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cities table
CREATE TABLE public.cities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_id UUID REFERENCES countries(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Districts table
CREATE TABLE public.districts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city_id UUID REFERENCES cities(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Neighborhoods table
CREATE TABLE public.neighborhoods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district_id UUID REFERENCES districts(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Person/Contact main table
CREATE TABLE public.persons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    mobile_phone TEXT,
    international_phone TEXT,
    nationality TEXT,
    identity_number TEXT,
    birth_date DATE,
    country_id UUID REFERENCES countries(id),
    city_id UUID REFERENCES cities(id),
    district_id UUID REFERENCES districts(id),
    neighborhood_id UUID REFERENCES neighborhoods(id),
    address TEXT,
    category person_category NOT NULL,
    file_number TEXT UNIQUE,
    sponsorship_type TEXT,
    status person_status DEFAULT 'draft',
    
    -- Identity information
    father_name TEXT,
    mother_name TEXT,
    identity_type TEXT,
    identity_validity_date DATE,
    identity_issuer TEXT,
    identity_series TEXT,
    previous_identities TEXT[],
    previous_addresses TEXT[],
    
    -- Passport and Visa
    passport_type TEXT,
    passport_number TEXT,
    passport_validity_date DATE,
    visa_start_date DATE,
    visa_end_date DATE,
    return_document TEXT,
    
    -- Personal data
    gender TEXT,
    birth_place TEXT,
    marital_status TEXT,
    education_level TEXT,
    employment_status TEXT,
    work_sector TEXT,
    profession_group TEXT,
    profession_description TEXT,
    criminal_record BOOLEAN DEFAULT false,
    
    -- Income and housing
    housing_type TEXT, -- rent, own, other
    monthly_income DECIMAL(15,2),
    monthly_expenses DECIMAL(15,2),
    social_security TEXT,
    income_sources TEXT[], -- salary, government_aid, zakat, agricultural, other
    
    -- Health information
    blood_type TEXT,
    smoking BOOLEAN DEFAULT false,
    disability_details TEXT,
    prosthetics TEXT[],
    medical_devices TEXT[],
    medications TEXT[],
    surgeries TEXT[],
    diseases TEXT[],
    health_notes TEXT,
    
    -- Emergency contact
    emergency_contact_name TEXT,
    emergency_contact_relation TEXT,
    emergency_contact_phone1 TEXT,
    emergency_contact_phone2 TEXT,
    
    -- Special tags
    tags TEXT[],
    
    -- Special situations
    is_earthquake_victim BOOLEAN DEFAULT false,
    special_situations TEXT[],
    
    -- Notes in multiple languages
    notes_tr TEXT,
    notes_en TEXT,
    notes_ar TEXT,
    
    -- Metadata
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Organizations table
CREATE TABLE public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    type TEXT,
    tax_number TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    address TEXT,
    contact_person_id UUID REFERENCES persons(id),
    country_id UUID REFERENCES countries(id),
    city_id UUID REFERENCES cities(id),
    district_id UUID REFERENCES districts(id),
    neighborhood_id UUID REFERENCES neighborhoods(id),
    status TEXT DEFAULT 'active',
    notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations table
CREATE TABLE public.donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    person_id UUID REFERENCES persons(id),
    organization_id UUID REFERENCES organizations(id),
    amount DECIMAL(15,2) NOT NULL,
    currency TEXT DEFAULT 'TRY',
    type donation_type NOT NULL,
    method donation_method NOT NULL,
    description TEXT,
    receipt_number TEXT,
    status donation_status DEFAULT 'pending',
    donated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    attachments TEXT[],
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT donation_donor_check CHECK (
        (person_id IS NOT NULL AND organization_id IS NULL) OR
        (person_id IS NULL AND organization_id IS NOT NULL)
    )
);

-- Bank accounts table
CREATE TABLE public.bank_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    person_id UUID REFERENCES persons(id),
    organization_id UUID REFERENCES organizations(id),
    bank_name TEXT NOT NULL,
    account_number TEXT NOT NULL,
    iban TEXT,
    swift_code TEXT,
    account_holder_name TEXT,
    is_primary BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT bank_account_owner_check CHECK (
        (person_id IS NOT NULL AND organization_id IS NULL) OR
        (person_id IS NULL AND organization_id IS NOT NULL)
    )
);

-- Documents table
CREATE TABLE public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    person_id UUID REFERENCES persons(id),
    organization_id UUID REFERENCES organizations(id),
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size BIGINT,
    mime_type TEXT,
    document_type TEXT, -- identity, passport, medical, financial, etc.
    is_verified BOOLEAN DEFAULT false,
    verified_by UUID REFERENCES auth.users(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT document_owner_check CHECK (
        (person_id IS NOT NULL AND organization_id IS NULL) OR
        (person_id IS NULL AND organization_id IS NOT NULL)
    )
);

-- Create indexes for better performance
CREATE INDEX idx_persons_category ON persons(category);
CREATE INDEX idx_persons_status ON persons(status);
CREATE INDEX idx_persons_file_number ON persons(file_number);
CREATE INDEX idx_persons_identity_number ON persons(identity_number);
CREATE INDEX idx_persons_created_at ON persons(created_at);

CREATE INDEX idx_donations_person_id ON donations(person_id);
CREATE INDEX idx_donations_status ON donations(status);
CREATE INDEX idx_donations_type ON donations(type);
CREATE INDEX idx_donations_donated_at ON donations(donated_at);

CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_persons_updated_at BEFORE UPDATE ON persons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donations_updated_at BEFORE UPDATE ON donations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bank_accounts_updated_at BEFORE UPDATE ON bank_accounts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 