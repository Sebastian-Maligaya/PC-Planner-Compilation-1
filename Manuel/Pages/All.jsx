import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gaming.css';

const performanceData = {
  // Gaming
  "Budget Gaming PC": { category: "Gaming", gaming: 60, productivity: 50, streaming: 40 },
  "Mid-Range Gaming PC": { category: "Gaming", gaming: 80, productivity: 65, streaming: 70 },
  "High-End Gaming PC": { category: "Gaming", gaming: 95, productivity: 80, streaming: 90 },

  // Productivity
  "Entry Workstation": { category: "Productivity", productivity: 75, multitasking: 60, mediaEditing: 55 },
  "Professional Workstation": { category: "Productivity", productivity: 85, multitasking: 80, mediaEditing: 75 },
  

  // General Use
  "Basic Home PC": { category: "General", web: 85, office: 70, entertainment: 60 },
  "Home Office PC": { category: "General", web: 95, office: 85, entertainment: 80 },
  "Premium General Use PC": { category: "General", web: 100, office: 95, entertainment: 90 },
};

const All = () => {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/builds/all');
        if (!res.ok) throw new Error('Failed to fetch builds');
        const data = await res.json();
        setBuilds(data);

        setTimeout(() => {
          const newValues = {};
          data.forEach(build => {
            // Safe default in case no performance data exists
            newValues[build.name] = performanceData[build.name] || { category: "", };
          });
          setAnimatedValues(newValues);
        }, 200);
      } catch (err) {
        console.error('Error fetching all builds:', err);
        setError('Failed to load builds. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBuilds();
  }, []);

  const renderList = (list) => {
    if (!Array.isArray(list)) return <li>Invalid data</li>;
    return list.map((item, idx) => <li key={idx}>{item}</li>);
  };

  const handleClick = () => {
    navigate('/customize');
  };

  const renderPerformanceBars = (perf) => {
    if (perf.category === "Gaming") {
      return (
        <>
          {renderStat("Gaming", perf.gaming, perf.category)}
          {renderStat("Productivity", perf.productivity, perf.category)}
          {renderStat("Streaming", perf.streaming, perf.category)}
        </>
      );
    } else if (perf.category === "Productivity") {
      return (
        <>
          {renderStat("Productivity", perf.productivity, perf.category)}
          {renderStat("Multitasking", perf.multitasking, perf.category)}
          {renderStat("Media Editing", perf.mediaEditing, perf.category)}
        </>
      );
    } else if (perf.category === "General") {
      return (
        <>
          {renderStat("Web Browsing", perf.web, perf.category)}
          {renderStat("Office Work", perf.office, perf.category)}
          {renderStat("Entertainment", perf.entertainment, perf.category)}
        </>
      );
    }
    return <p>No performance data available</p>;
  };

const renderStat = (label, value, category) => (
  <>
    <div className="stat-row">
      <span>{label}</span>
      <span>{value || 0}%</span>
    </div>
    <div className="progress-container">
      <div className={`progress-bar ${category?.toLowerCase()}`} style={{ width: `${value || 0}%` }}></div>
    </div>
  </>
);

  return (
    <div className="container">
      {loading && <p>Loading builds...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && (
        <div className="grid">
          {builds.map((build) => {
            const perf = animatedValues[build.name] || { category: "" };
            return (
              <div className="build-card" key={build.id}>
                <h2>{build.name}</h2>
                <p><strong>{build.description}</strong></p>
                <p><span className="price">₱{build.price.toLocaleString()}</span></p>

                <h4>Performance</h4>
                {renderPerformanceBars(perf)}

                <h4>Specifications</h4>
                <ul>{renderList(build.specs)}</ul>

                <h4>Recommended Peripherals</h4>
                <ul>{renderList(build.peripherals)}</ul>

                <button className="Customization" onClick={handleClick}>
                  Customize
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default All;
