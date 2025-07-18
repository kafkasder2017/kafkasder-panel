-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neighborhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Helper function to get user role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
BEGIN
    RETURN (
        SELECT role 
        FROM public.profiles 
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN get_user_role() = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to check if user has role
CREATE OR REPLACE FUNCTION has_role(required_role user_role)
RETURNS BOOLEAN AS $$
DECLARE
    user_role_value user_role;
BEGIN
    user_role_value := get_user_role();
    
    -- Admin can do everything
    IF user_role_value = 'admin' THEN
        RETURN TRUE;
    END IF;
    
    -- Check specific roles
    RETURN user_role_value = required_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles policies
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
    ON public.profiles FOR SELECT
    TO authenticated
    USING (is_admin());

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can update all profiles"
    ON public.profiles FOR UPDATE
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Admins can insert profiles"
    ON public.profiles FOR INSERT
    TO authenticated
    WITH CHECK (is_admin());

-- Countries, Cities, Districts, Neighborhoods policies (reference data)
CREATE POLICY "Everyone can view countries"
    ON public.countries FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins can manage countries"
    ON public.countries FOR ALL
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Everyone can view cities"
    ON public.cities FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins can manage cities"
    ON public.cities FOR ALL
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Everyone can view districts"
    ON public.districts FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins can manage districts"
    ON public.districts FOR ALL
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "Everyone can view neighborhoods"
    ON public.neighborhoods FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins can manage neighborhoods"
    ON public.neighborhoods FOR ALL
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

-- Persons policies
CREATE POLICY "Authenticated users can view persons"
    ON public.persons FOR SELECT
    TO authenticated
    USING (
        has_role('admin') OR 
        has_role('editor') OR 
        has_role('operator') OR 
        has_role('viewer')
    );

CREATE POLICY "Editors and above can insert persons"
    ON public.persons FOR INSERT
    TO authenticated
    WITH CHECK (
        has_role('admin') OR 
        has_role('editor') OR 
        has_role('operator')
    );

CREATE POLICY "Editors and above can update persons"
    ON public.persons FOR UPDATE
    TO authenticated
    USING (
        has_role('admin') OR 
        has_role('editor') OR 
        has_role('operator')
    )
    WITH CHECK (
        has_role('admin') OR 
        has_role('editor') OR 
        has_role('operator')
    );

CREATE POLICY "Only admins can delete persons"
    ON public.persons FOR DELETE
    TO authenticated
    USING (has_role('admin'));

-- Organizations policies
CREATE POLICY "Authenticated users can view organizations"
    ON public.organizations FOR SELECT
    TO authenticated
    USING (
        has_role('admin') OR 
        has_role('editor') OR 
        has_role('operator') OR 
        has_role('viewer')
    );

CREATE POLICY "Editors and above can manage organizations"
    ON public.organizations FOR ALL
    TO authenticated
    USING (
        has_role('admin') OR 
        has_role('editor') OR 
        has_role('operator')
    )
    WITH CHECK (
        has_role('admin') OR 
        has_role('editor') OR 
        has_role('operator')
    );

-- Donations policies
CREATE POLICY "Authenticated users can view donations"
    ON public.donations FOR SELECT
    TO authenticated
    USING (
        has_role('admin') OR 
        has_role('editor') OR 
        has_role('operator') OR 
        has_role('viewer')
    );

CREATE POLICY "Operators and above can insert donations"
    ON public.donations FOR INSERT
    TO authenticated
    WITH CHECK (
        has_role('admin') OR 
        has_role('editor') OR 
        has_role('operator')
    );

CREATE POLICY "Editors and above can update donations"
    ON public.donations FOR UPDATE
    TO authenticated
    USING (
        has_role('admin') OR 
        has_role('editor')
    )
    WITH CHECK (
        has_role('admin') OR 
        has_role('editor')
    );

CREATE POLICY "Only admins can delete donations"
    ON public.donations FOR DELETE
    TO authenticated
    USING (has_role('admin'));

-- Bank accounts policies
CREATE POLICY "Authenticated users can view bank accounts"
    ON public.bank_accounts FOR SELECT
    TO authenticated
    USING (
        has_role('admin') OR 
        has_role('editor') OR 
        has_role('operator') OR 
        has_role('viewer')
    );

CREATE POLICY "Editors and above can manage bank accounts"
    ON public.bank_accounts FOR ALL
    TO authenticated
    USING (
        has_role('admin') OR 
        has_role('editor') OR 
        has_role('operator')
    )
    WITH CHECK (
        has_role('admin') OR 
        has_role('editor') OR 
        has_role('operator')
    );

-- Documents policies
CREATE POLICY "Authenticated users can view documents"
    ON public.documents FOR SELECT
    TO authenticated
    USING (
        has_role('admin') OR 
        has_role('editor') OR 
        has_role('operator') OR 
        has_role('viewer')
    );

CREATE POLICY "Operators and above can upload documents"
    ON public.documents FOR INSERT
    TO authenticated
    WITH CHECK (
        has_role('admin') OR 
        has_role('editor') OR 
        has_role('operator')
    );

CREATE POLICY "Editors and above can update documents"
    ON public.documents FOR UPDATE
    TO authenticated
    USING (
        has_role('admin') OR 
        has_role('editor')
    )
    WITH CHECK (
        has_role('admin') OR 
        has_role('editor')
    );

CREATE POLICY "Only admins can delete documents"
    ON public.documents FOR DELETE
    TO authenticated
    USING (has_role('admin')); 