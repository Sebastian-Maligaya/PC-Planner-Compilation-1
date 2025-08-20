import './BuilderPage.css';
import PartSelector from '../PCBuilding/PartSelector';
import BuildSummary from '../PCBuilding/BuildSummary';
import React, { useState } from 'react';
import Header from '../Hazel/HomepageForm/Header.jsx';
import '../Hazel/HomepageForm/Header.css';

function BuilderPage() {
  const [selectedMOBO, setSelectedMOBO] = useState(null);
  const [selectedRAMs, setSelectedRAMs] = useState([]);
  const [selectedGPUs, setSelectedGPUs] = useState([]);
  const [selectedM2s, setSelectedM2s] = useState([]);
  const [selectedCPU, setSelectedCPU] = useState(null);
  const [selectedPSU, setSelectedPSU] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState([]);

  const formatPart = (type, part) => part ? { type, ...part } : null;

  const buildSummaryParts = [
    formatPart("Motherboard (MOBO)", selectedMOBO),
    formatPart("Processor (CPU)", selectedCPU),
    formatPart("Power Supply (PSU)", selectedPSU),
    formatPart("Case", selectedCase),
    ...selectedGPUs.map(gpu => formatPart("Graphics Card (GPU)", gpu)),
    ...selectedRAMs.map(ram => formatPart("Memory (RAM)", ram)),
    ...selectedM2s.map(m2 => formatPart("M.2 SSD", m2)),
    ...selectedStorage.map(storage => formatPart("Storage", storage))
  ].filter(Boolean);

  return (
    <div>
      <Header />
      <div className='Note'>
        <h1>Note on Compatibility Availability</h1>
        <h3>
          PC Planner focuses on components readily available in the Philippine market.
          Some older components or certain Chinese brands may not be included due to
          local availability issues. All prices are in Philippine Peso (₱) and are approximate.
        </h3>
      </div>

      <div className="BuilderPageLayout">
        <div className="LeftColumn">
          <h1>Computer Parts</h1>
          <PartSelector
            part={{ name: "Motherboard (MOBO)" }}
            selectedValue={selectedMOBO}
            setSelectedValue={(value) => {
              setSelectedMOBO(value);
              setSelectedRAMs([]);
              setSelectedGPUs([]);
              setSelectedM2s([]);
              setSelectedStorage([]);
            }}
          />

          <PartSelector part={{ name: "Processor (CPU)" }} selectedValue={selectedCPU} setSelectedValue={setSelectedCPU} />
          <PartSelector
            part={{ name: "Graphics Card (GPU)" }}
            selectedValue={selectedGPUs[0]}
            setSelectedValue={(value) => {
              const updated = [...selectedGPUs];
              updated[0] = value;
              setSelectedGPUs(updated);
            }}
          />
          {Array.from({ length: Math.max(0, (selectedMOBO?.gpuSlots || 1) - 1) }).map((_, index) => (
            <PartSelector
              key={`gpu-${index + 1}`}
              part={{ name: "Graphics Card (GPU)" }}
              selectedValue={selectedGPUs[index + 1]}
              setSelectedValue={(value) => {
                const updated = [...selectedGPUs];
                updated[index + 1] = value;
                setSelectedGPUs(updated);
              }}
            />
          ))}
          {Array.from({ length: selectedMOBO?.ramSlots || 0 }).map((_, index) => (
            <PartSelector
              key={`ram-${index}`}
              part={{ name: "Memory (RAM)" }}
              selectedValue={selectedRAMs[index]}
              setSelectedValue={(value) => {
                const updated = [...selectedRAMs];
                updated[index] = value;
                setSelectedRAMs(updated);
              }}
              selectedMOBO={selectedMOBO}
            />
          ))}
          {Array.from({ length: selectedMOBO?.m2Slots || 0 }).map((_, index) => (
            <PartSelector
              key={`m2-${index}`}
              part={{ name: "M.2 SSD" }}
              selectedValue={selectedM2s[index]}
              setSelectedValue={(value) => {
                const updated = [...selectedM2s];
                updated[index] = value;
                setSelectedM2s(updated);
              }}
            />
          ))}
          {Array.from({ length: selectedMOBO?.storageSlots || 0 }).map((_, index) => (
            <PartSelector
              key={`storage-${index}`}
              part={{ name: "Storage" }}
              selectedValue={selectedStorage[index]}
              setSelectedValue={(value) => {
                const updated = [...selectedStorage];
                updated[index] = value;
                setSelectedStorage(updated);
              }}
            />
          ))}
          <PartSelector part={{ name: "Power Supply (PSU)" }} selectedValue={selectedPSU} setSelectedValue={setSelectedPSU} />
          <PartSelector part={{ name: "Case" }} selectedValue={selectedCase} setSelectedValue={setSelectedCase} />
          <h1>Pheripirals</h1>
        </div>

        <div className="RightColumn">
          <BuildSummary selectedParts={buildSummaryParts} />
        </div>
      </div>
    </div>
  );
}

export default BuilderPage;
