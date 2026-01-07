import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Dashboard } from './pages/Dashboard';
import { Visit } from './pages/Visit';
import { Setup } from './pages/Setup';

type Page = 'login' | 'signup' | 'dashboard' | 'visit' | 'setup';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('login');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col">
        <Header />
        {currentPage === 'login' ? (
          <Login
            onSignUpClick={() => setCurrentPage('signup')}
            onLoginSuccess={() => setCurrentPage('dashboard')}
          />
        ) : (
          <SignUp
            onLoginClick={() => setCurrentPage('login')}
            onSignUpSuccess={() => setCurrentPage('login')}
          />
        )}
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      {currentPage === 'dashboard' && (
        <Dashboard
          onVisitClick={() => setCurrentPage('visit')}
          onSetupClick={() => setCurrentPage('setup')}
        />
      )}
      {currentPage === 'visit' && (
        <Visit onBackClick={() => setCurrentPage('dashboard')} />
      )}
      {currentPage === 'setup' && (
        <Setup onBackClick={() => setCurrentPage('dashboard')} />
      )}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
