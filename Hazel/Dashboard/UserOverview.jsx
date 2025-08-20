import React, { useEffect, useState, useRef } from 'react';
import './UserOverview.css';
import pcImage from './PC.png';


import logo from './LOGO.png';
import profDefault from './profDefault.webp';
import { BarChart3, Eye, Save, History, ChevronDown, LogOut, Mail, Settings, User, Cpu, Clock3, TriangleAlert, Monitor, Star, Clock, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdWavingHand } from 'react-icons/md';




function UserOverview({ onClickSettings, onLogout, onClickSignIn, onClickSignUp,onBackClick }) {
  const user = {
    avatar: profDefault,
    name: 'Azie De Guzman',
    email: 'user@example.com',
  };
  const userName="Azie";
  {/* data in backend */}
  const recentBuilds = [];
  const detectedIssues =[];

{/*-------------------------------CURRENT DATE UPDATED---------------------------------*/}
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

{/*----------------------------------------------------------------*/}
  const [openDropdown, setOpenDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('overview');
  const [savedBuilds, setSavedBuilds] = useState([]);
  const [buildHistory, setBuildHistory] = useState([]);
  const dropdownRef = useRef(null);
  const headerNavRef = useRef(null);
  const hamburgerRef = useRef(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [userCollapsed, setUserCollapsed] = useState(false); // Track user manual collapse
  

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    setHideSidebar(false);
  };
  // Close mobile nav when clicking outside
  useEffect(() => {
    if (!menuOpen) return;
    function handleClickOutside(event) {
      if (
        headerNavRef.current &&
        !headerNavRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    if (!isSmallScreen) {
      setUserCollapsed(!sidebarCollapsed); // Track user preference on large screens
    }
  };

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      const smallScreen = window.innerWidth <= 1024;
      setIsSmallScreen(smallScreen);
      
      if (smallScreen) {
        setSidebarCollapsed(true);
        setUserCollapsed(false); // Reset user preference on small screen
      } else {
        // On large screen, use user preference or default to expanded
        setSidebarCollapsed(userCollapsed);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [userCollapsed]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (menuOpen) {
        if (currentY > lastScrollY) {
          setHideSidebar(true);
          setMenuOpen(false);
        } else {
          setHideSidebar(false);
        }
      }
      setLastScrollY(currentY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [menuOpen]);

  useEffect(() => {
    setSavedBuilds([]);
    setBuildHistory([]);
  }, []);

  const getButtonClass = (section) =>
    `sidebar-button ${activeSection === section ? 'active' : ''}`;

  return (
    <div className="header-parent">
      <div className="header-app">
        <header className="header-bar">
          <div className="header-logo-container">
            <img src={logo} alt="LOGO" className="header-logo" />
            <h1 className="header-title">PC Planner</h1>
          </div>


          {isSmallScreen && (
            <button className="hamburger-db" onClick={toggleMenu} ref={hamburgerRef}>
              {menuOpen ? <FaTimes size={24} color="#fff" /> : <FaBars size={24} color="#fff" />}
            </button>
          )}

          <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
            <nav className="header-nav" ref={headerNavRef}>
              <a href="#" className="header-nav-link" onClick={() => setMenuOpen(false)}>PC Builder</a>
              <a href="#" className="header-nav-link" onClick={() => setMenuOpen(false)}>Pre-built PCs</a>
              <a href="#" className="header-nav-link" onClick={() => setMenuOpen(false)}>Components</a>

              {!isSmallScreen && (
                <div className="header-dropdown" ref={dropdownRef}>
                  <button className="header-profile-btn" onClick={() => setOpenDropdown(!openDropdown)}>
                    <div className="profile-box">
                      <img src={user.avatar} alt="Profile" className="header-profile-img" />
                      <div className="profile-info">
                        <span className="profile-name">{user.name}</span>
                        <span className="profile-email">{user.email}</span>
                      </div>
                      <div className={`dropdown-icon ${openDropdown ? 'rotate' : ''}`}>
                        <ChevronDown size={20} />
                      </div>
                    </div>
                  </button>

                  {openDropdown && (
                    <div className="header-dropdown-content">
                      <div className="dropdown-arrow" />
                      <div className="dropdown-header">
                        <img src={user.avatar} alt="Profile" className="avatar-img-large" />
                        <div className="user-info">
                          <p className="user-name">{user.name}</p>
                          <p className="user-email">{user.email}</p>
                        </div>
                      </div>
                      <div className="dropdown-body">
                        <div className="signed-in">
                          <span>Signed in as</span>
                        </div>
                        <div className="user-detail">
                          <div className="user-line"><User size={14} /> {user.name}</div>
                          <div className="user-line"><Mail size={12} /> {user.email}</div>
                        </div>
                      </div>

                      <div className="dropdown-footer">
                        <button className="dropdown-btn" onClick={() => { setOpenDropdown(false); onClickSettings(); }}>
                          <Settings size={14} /> Account Settings
                        </button>
                        <button
                          className="dropdown-btn logout"
                          onClick={() => {
                          
                            setShowConfirm(true); // Show confirmation popup instead of logging out immediately
                          }}
                        >
                          <LogOut size={14} /> Log Out
                        </button>

                  {showConfirm && (
                    <div className="signout-modal-overlay">
                      <div className="signout-modal-box">
                        <p className="signout-modal-message">Are you sure you want to log out?</p>
                          <div className="signout-modal-actions">
                            <button
                              onClick={() => {
                                setShowConfirm(false); // Optional: close modal first
                                onLogout();
                              }}
                                className="signout-confirm-btn"
                            >
                              Yes
                            </button>
                            
                            <button
                              onClick={() => setShowConfirm(false)}
                                className="signout-cancel-btn"
                            >
                              Cancel
                            </button>
                      </div>
                  </div>
              </div>
)}

                      </div>
                    </div>
                    
                  )}
                </div>
              )}
            </nav>
          </div>
        </header>





<div className="dashboard-container">
       {/*----------------------------- Sidebar------------------------------------------- */}
        <aside className={`sidebar-db ${sidebarCollapsed ? 'collapsed' : ''}`}>
  <div className="sidebar-overlay"></div>
  <div className="decorative-element"></div>
  <div className="decorative-element-2"></div>

  <div className="sidebar-content">
    <div className="dashboard-title">
      <div className="dashboard-header">
        <h2 className="dashboard-title-text">
          <BarChart3 className="dashboard-icon" />
          {!sidebarCollapsed && <span>Dashboard</span>}
        </h2>
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      {!sidebarCollapsed && (
        <>
          <div className="dashboard-underline"></div>
          <svg className="fancy-divider" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0,10 C25,0 75,20 100,10" stroke="#1e3a8a" strokeWidth="3" fill="none" />
          </svg>
        </>
      )}
    </div>

    <div className="buttons-container">
      <button
        className={getButtonClass('overview')}
        onClick={() => setActiveSection('overview')}
        title="Overview"
      >
        <Eye className="button-icon" size={18} />
        {!sidebarCollapsed && <span>Overview</span>}
      </button>

      <button
        className={getButtonClass('saved')}
        onClick={() => setActiveSection('saved')}
        title="Saved Builds"
      >
        <Save className="button-icon" size={18} />
        {!sidebarCollapsed && <span>Saved Builds</span>}
      </button>

      <button
        className={getButtonClass('history')}
        onClick={() => setActiveSection('history')}
        title="Build History"
      >
        <History className="button-icon" size={18} />
        {!sidebarCollapsed && <span>Build History</span>}
      </button>
          {/* Settings button for mobile view */}
          {isSmallScreen && (
            <button
              className="sidebar-button"
              onClick={onClickSettings}
              title="Settings"
            >
              <Settings className="button-icon" size={18} />
              {!sidebarCollapsed && <span>Settings</span>}
            </button>
          )}
    </div>
  </div>

  {/* Bottom CTA Section */}

</aside>
        {/*------------------------------------------- Main Content Placeholder------------------- */}

{activeSection === 'overview' && (
<main className="main-content-overview">
  
<div className="welcome-box">
  <div className="welcome-content">
    <div className="welcome-text">
      <h2 className="gradientName">
        <span className="gradientText">Hello, {userName}!</span>
        <MdWavingHand className="wave-Icon" />
      </h2>
      <h3 className="text-h3">Welcome to your Dashboard</h3>
    </div>

    <div className="welcome-image">
      <img src={pcImage} alt="PC Illustration" />
    </div>
  </div>
</div>


{/*---------------------------------------------OVERVIEW--------------------------------------- */}
<div className='container-1'>
  <div className='box box-1'>
    <div className="box-top">
      <p className="box-label">Total Builds
        <Save size={20}className="box-icon-1" />
      </p>
      <h2 className="box-value">No Data</h2>
    </div>
    <div className="box-bottom">
      <p className="box-note">No cost data yet</p>
    </div>
  </div>

  <div className='box box-2'>
    <div className="box-top">
      <p className="box-label">Average Build Cost
        <Cpu size={20} className="box-icon-2" />
      </p>
      <h2 className="box-value">No Data</h2>
    </div>
    <div className="box-bottom">
      <p className="box-note">No usage data</p>
    </div>
  </div>

  <div className='box box-3'>
    <div className="box-top">
      <p className="box-label">Builds
        <Clock3 size={20} className="box-icon-3" />
      </p>
      <h2 className="box-value">0</h2>
    </div>
    <div className="box-bottom">
      <p className="box-note">You haven't saved any</p>
    </div>
  </div>

  <div className='box box-4'>
    <div className="box-top">
      <p className="box-label">Bottlenecks & Warnings
       <TriangleAlert size={20} className="box-icon-4" />

      </p>
      <h2 className="box-value">No Data</h2>
    </div>
    <div className="box-bottom">
      <p className="box-note">No recent activity</p>
    </div>
  </div>
</div>

<div className='container-2'>

  {/* Recent Builds */}
  <div className="box-recentBuilds">
  <div className="box-header">
    <h3>Recent Builds</h3>
    <p>Your most recently created or modified PC builds</p>
  </div>

  {recentBuilds.length === 0 ? (
    <div className="no-data-box">
      <div className="no-data-icon">🛠️</div>
      <p className="no-data-msg">You haven’t saved any builds yet.</p>
      <p className="no-data-subtext">Start building your custom PC now!</p>
    </div>
  ) : (
    <>
      <ul className="build-list">
        {recentBuilds.map((build, index) => (
          <li key={index}>
            <strong>{build.name}</strong><br />
            {build.specs} — ₱{build.price}
          </li>
        ))}
      </ul>
      <button className="view-button">View all Builds</button>
    </>
  )}
</div>


  {/* Detected Issues */}
  <div className='box-detectedIssues'>
  <div className="box-header">
    <h3>Detected Issues</h3>
    <p>Bottlenecks and warnings in your builds</p>
  </div>

  {detectedIssues.length === 0 ? (
    <div className="no-data-box">
      <div className="no-data-icon">✅</div>
      <p className="no-data-msg">No issues detected yet.</p>
      <p className="no-data-subtext">Your builds are looking good so far.</p>
    </div>
  ) : (
    <>
      <ul className="issue-list">
        {detectedIssues.map((issue, index) => (
          <li key={index}>
            <strong>{issue.type}</strong>: {issue.message}
          </li>
        ))}
      </ul>
      <button className="view-button">View all Issues</button>
    </>
  )}
</div>
</div>

</main>
  )}

  {/*-----------------------------------SAVED HISTORY----------------------------------------------------- */}
{activeSection === 'saved' && (
  <main className="user-saved-builds">
    <div className="welcome-box">
  <div className="welcome-content">
    <div className="welcome-text">
      <h2 className="gradientName">
        <span className="gradientText">Hello, {userName}!</span>
        <MdWavingHand className="wave-Icon" />
      </h2>
      <h3 className="text-h3">Welcome to your Saved Builds</h3>
    </div>

    <div className="welcome-image">
      <img src={pcImage} alt="PC Illustration" />
    </div>
  </div>
</div>


   <div className="saved-builds-container">
  {savedBuilds.length === 0 ? (
    <div className="saved-build-box empty">
      <div className="empty-icon">🗃️</div>
      <h3>No Saved Builds</h3>
      <p>You haven't saved any builds yet.</p>
      <p>Start creating one from the dashboard!</p>
    </div>
  ) : (
    savedBuilds.map((build, index) => (
      <div className="saved-build-box" key={index}>
        <h3>{build.title}</h3>
        <p>{build.description}</p>
      </div>
    ))
  )}
</div>

  </main>
)}

     {/*------------------------------------------- HISTORY------------------- */}
     {activeSection === 'history' && (
      <main className="user-history-builds">
        <div className="welcome-box">
  <div className="welcome-content">
    <div className="welcome-text">
      <h2 className="gradientName">
        <span className="gradientText">Hello, {userName}!</span>
        <MdWavingHand className="wave-Icon" />
      </h2>
      <h3 className="text-h3">Welcome to your Build History</h3>
    </div>

    <div className="welcome-image">
      <img src={pcImage} alt="PC Illustration" />
    </div>
  </div>
</div>


<div className="box-buildHistory">
      <div className="box-header">
        <h3>Build History</h3>
        <p>Track your saved builds over time</p>
      </div>

      {buildHistory.length === 0 ? (
        <div className="no-data-box">
          <div className="no-data-icon">📜</div>
          <p className="no-data-msg">No build history yet.</p>
          <p className="no-data-subtext">Start creating builds to track your progress.</p>
        </div>
      ) : (
        <>
          <ul className="history-list">
            {buildHistory.map((history, index) => (
              <li key={index}>
                <strong>{history.title}</strong><br />
                {history.date} — ₱{history.price}
              </li>
            ))}
          </ul>
          <button className="view-button">View Full History</button>
        </>
      )}
    </div>






      </main>




     )}
  
  




  
</div>

      </div>
      
    </div>
    

    
  );
}

export default UserOverview;
