import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navigation/Navbar.jsx';
import Header from './Header'; 
import ComponentsPage from './Navigation/ComponentsPage.jsx';
import CompatibilityPage from './Navigation/CompatibilityPage.jsx';
import BottlenecksPage from './Navigation/BottlenecksPage.jsx';
import BudgettipsPage from './Navigation/BudgettipsPage.jsx';
import './index.css';
import Footer from './Footer.jsx';

function App() {
  return (
    <div className="app">
      <Header />
     
      
      <main className="content">
        <Routes>
          
          <Route path="/" element={<ComponentsPage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/compatibility" element={<CompatibilityPage />} />
          <Route path="/bottlenecks" element={<BottlenecksPage />} />
          <Route path="/budget-tips" element={<BudgettipsPage />} />
        </Routes>
        
        
      </main>
      
      

      <Footer />
    </div>
  );
}

export default App;
