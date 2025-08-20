import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './App.css'
import React, { useState, useEffect } from 'react';

// Corrected imports: use the Hazel folder for the homepage components
import Login from './Hazel/LoginForm/Login.jsx';
import SignUp from './Hazel/SignUpForm/SignUp.jsx';
import Header from './Hazel/HomepageForm/Header.jsx';
import Section from './Hazel/HomepageForm/Section.jsx';
import Footer from './Hazel/HomepageForm/Footer.jsx';
import UserOverview from './Hazel/Dashboard/UserOverview.jsx';
import UserSettings from './Hazel/Dashboard/UserSettings.jsx';

// Add imports for the other app entry points (fixed relative paths)
import BuilderPage from './BuildingPCPage/BuilderPage.jsx';
import VerecioApp from './Verecio/App.jsx';
import ManuelApp from './Manuel/App.jsx';
// add learn import
import LearnMain from './Learn-main/App.jsx';

function App() {
  const [page, setPage] = useState('home');

  // Listen to location.hash for header navigation (e.g. #/pcbuilder, #/prebuild, #/components)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash || '';
      if (hash.startsWith('#/pcbuilder')) setPage('pcbuilder');
      else if (hash.startsWith('#/prebuild')) setPage('prebuild');
      else if (hash.startsWith('#/components')) setPage('components');
      // keep existing Hazel page names intact
      else if (hash === '#/login') setPage('login');
      else if (hash === '#/signup') setPage('signup');
      else if (hash === '#/overview') setPage('overview');
      else if (hash === '#/settings') setPage('settings');
      else setPage('home');
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="app-container">
      {page === 'home' && (
        <Header /* if Header needs callbacks, keep them or Header can use anchors */ />
      )}

      <main className="main-content">
        {page === 'home' && (
          <>
            <Section />
            <Footer />
          </>
        )}

        {page === 'login' && (
          <Login
            onBackClick={() => setPage('home')}
            onSignUpClick={() => setPage('signup')}
            onLoginSuccess={() => {
              window.location.hash = '#/overview';
            }}
          />
        )}

        {page === 'signup' && (
          <SignUp
            onBackClick={() => setPage('home')}
            onLoginClick={() => setPage('login')}
          />
        )}

        {page === 'overview' && (
          <UserOverview
            onClickSettings={() => setPage('settings')}
            onLogout={() => setPage('home')}
          />
        )}

        {page === 'settings' && (
          <UserSettings onBack={() => setPage('overview')} onLogout={() => setPage('home')} />
        )}

        {/* New: render other project pages inside Hazel shell when hash routes are active */}
        {page === 'pcbuilder' && <BuilderPage />}
        {page === 'prebuild' && <VerecioApp />}
        {page === 'components' && <ManuelApp />}
        {page === 'prebuilts' && <PreBuiltPCs />}
        {page === 'learn' && <LearnMain />}
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
