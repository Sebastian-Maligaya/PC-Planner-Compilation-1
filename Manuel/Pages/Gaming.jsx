import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gaming.css';

const performanceData = {
  "Budget Gaming PC": { category: "Gaming", gaming: 60, productivity: 50, streaming: 40 },
  "Mid-Range Gaming PC": { category: "Gaming", gaming: 80, productivity: 65, streaming: 70 },
  "High-End Gaming PC": { category: "Gaming", gaming: 95, productivity: 80, streaming: 90 },
};

const Gaming = () => {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/builds/gaming');
        if (!res.ok) throw new Error('Failed to fetch builds');
        const data = await res.json();
        setBuilds(data);

        setTimeout(() => {
          const newValues = {};
          data.forEach(build => {
            newValues[build.name] = performanceData[build.name] || { category: "", gaming: 0, productivity: 0, streaming: 0 };
          });
          setAnimatedValues(newValues);
        }, 200);
      } catch (err) {
        console.error('Error fetching gaming builds:', err);
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

  const renderPerformanceBars = (perf) => {
    if (perf.category === "Gaming") {
      return (
        <>
          {renderStat("Gaming", perf.gaming, perf.category)}
          {renderStat("Productivity", perf.productivity, perf.category)}
          {renderStat("Streaming", perf.streaming, perf.category)}
        </>
      );
    }
    return <p>No performance data available</p>;
  };

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

export default Gaming;
