import RAMPic from '../assets/RAM.png';


function Ram() {
  return (
    <div className="card">
      <img className="Card-img" src={RAMPic} alt="RAM" />
      
      <div className="card-content">
        <p className="card-title">Memory (RAM)</p>
        <p className="Card-Desc">Temporary working space for active programs</p>
        
        <p className="card-text">
          Random Access Memory (RAM) provides temporary storage 
          for data that your computer is actively using. More RAM allows 
          for smoother multitasking.
        </p>

        <div className="specs-section">
          <p className="Key">Key Specifications:</p>
          <ul className="Specs">
            <li>Capacity: Total memory amount (e.g., 16GB, 32GB)</li>
            <li>Speed: Measured in MHz (e.g., 3200MHz, 3600MHz)</li>
            <li>Type: DDR4 or DDR5 (must match motherboard support)</li>
            <li>Timings/CAS Latency: Lower is better (e.g., CL16)</li>
          </ul>
        </div>
        <button
  className="card-button" onClick=
  {() => window.open('https://www.intel.com/content/www/us/en/tech-tips-and-tricks/computer-ram.html', '_blank')}>
  Browse Processors
</button>
      </div>
    </div>
  );
}

export default Ram