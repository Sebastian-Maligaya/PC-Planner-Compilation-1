import { useState } from 'react';
import Login from './LoginForm/Login.jsx';
import SignUp from './SignUpForm/SignUp.jsx';
import Header from './HomepageForm/Header.jsx';
import Section from './HomepageForm/Section.jsx';
import Footer from './HomepageForm/Footer.jsx';
import UserOverview from './Dashboard/UserOverview.jsx';
import UserSettings from './Dashboard/UserSettings.jsx';

function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="app-container">
      {page === 'home' && (
        <Header
          onClickSignIn={() => setPage('login')}
          onClickSignUp={() => setPage('signup')}
        />
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
            onLoginSuccess={() => setPage('overview')}
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
          <UserSettings 
            onBack={() => setPage('overview')} 
            onLogout={() => setPage('home')} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
