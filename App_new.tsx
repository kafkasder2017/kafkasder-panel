import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { supabase } from './services/supabaseClient';
import { User } from '@supabase/supabase-js';
import { KullaniciRol } from './types';

// Components
import Login from './components/Login';
import AppContent from './components/AppContent';
import ErrorBoundary from './components/ErrorBoundary';
import ThemeProvider from './components/ThemeContext';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole] = useState<KullaniciRol>(KullaniciRol.YONETICI); // Default role for now

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <Login onLogin={async (email: string, password: string) => {
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
        }} />
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Router>
          <AppContent user={user} userRole={userRole} />
        </Router>
        <Toaster position="top-right" />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
