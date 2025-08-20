import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Gaming from "./Pages/Gaming";
import Productivity from "./Pages/Productivity";
import GeneralUse from "./Pages/GeneralUse";
import Header from '../Hazel/HomepageForm/Header.jsx';
import '../Hazel/HomepageForm/Header.css';
import Navbar from "./Components/Navbar";
import Footer from "./Footer.jsx";
import All from "./Pages/All.jsx"
import './App.css';




function AppContent() {
  return (
    <div className="app">
      <Header />

      
      <div className="availability-note">
        <p className="note-title">Pre-built Builds</p>
        <p className="note-description">
          Pre-configured systems optimized for performance and value
        </p>
      </div>
       

      {/*dating lagayan ng extra banner*/}
      <Navbar />

      <main className="main-content">
        <Routes>
          
          <Route path="/" element={<Navigate to="/gaming" />} />
          <Route path="/all" element={<All />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/productivity" element={<Productivity />} />
          <Route path="/generaluse" element={<GeneralUse />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
