import React, { useState, useRef } from 'react';
import MyGrid from './MyGrid';

function App() {
  const [searchText, setSearchText] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const gridRef = useRef();

  // onGridReady required for AG Grid v34 API
  const onGridReady = (params) => {
    gridRef.current = params.api;
  };

  const applyFilters = (search, department, location, active) => {
    if (!gridRef.current) return;

    gridRef.current.setQuickFilter(search);

    gridRef.current.setFilterModel({
      department: department ? { type: 'equals', filter: department } : null,
      location: location ? { type: 'equals', filter: location } : null,
      isActive: active
        ? { type: 'equals', filter: active === 'true' }
        : null,
    });
    gridRef.current.onFilterChanged();
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    applyFilters(e.target.value, departmentFilter, locationFilter, activeFilter);
  };

  const handleDepartmentFilter = (e) => {
    setDepartmentFilter(e.target.value);
    applyFilters(searchText, e.target.value, locationFilter, activeFilter);
  };

  const handleLocationFilter = (e) => {
    setLocationFilter(e.target.value);
    applyFilters(searchText, departmentFilter, e.target.value, activeFilter);
  };

  const handleActiveFilter = (e) => {
    setActiveFilter(e.target.value);
    applyFilters(searchText, departmentFilter, locationFilter, e.target.value);
  };

  const resetFilters = () => {
    setSearchText('');
    setDepartmentFilter('');
    setLocationFilter('');
    setActiveFilter('');
    applyFilters('', '', '', '');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '15px', color: '#333' }}>Employee Dashboard</h2>

      <div style={{
        marginBottom: '15px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        padding: '10px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc', minWidth: '200px' }}
        />

        <select value={departmentFilter} onChange={handleDepartmentFilter} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}>
          <option value="">-- All Departments --</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>

        <select value={locationFilter} onChange={handleLocationFilter} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}>
          <option value="">-- All Locations --</option>
          <option value="New York">New York</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
          <option value="Austin">Austin</option>
          <option value="Seattle">Seattle</option>
          <option value="Phoenix">Phoenix</option>
          <option value="Miami">Miami</option>
          <option value="Denver">Denver</option>
        </select>

        <select value={activeFilter} onChange={handleActiveFilter} style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ccc' }}>
          <option value="">-- All Status --</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <button onClick={resetFilters} style={{
          padding: '8px 12px',
          borderRadius: '6px',
          border: 'none',
          backgroundColor: '#1976d2',
          color: '#fff',
          cursor: 'pointer'
        }}>
          Reset Filters
        </button>
      </div>

      <div style={{ height: 700, width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
        <MyGrid onGridReady={onGridReady} />
      </div>
    </div>
  );
}

export default App;
