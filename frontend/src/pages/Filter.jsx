import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Filters() {
  const [filters, setFilters] = useState({ states: [], districts: [], villages: [] });
  const [data, setData] = useState([]);

  const [state, setState] = useState("All");
  const [district, setDistrict] = useState("All");
  const [village, setVillage] = useState("All");

  // Fetch filters from API
  useEffect(() => {
    axios.get("http://localhost:8000/filters")
      .then(res => setFilters(res.data))
      .catch(err => {
        console.error("Failed to fetch filters:", err);
        setFilters({ states: [], districts: [], villages: [] });
      });
  }, []);

  // Fetch FRA data based on filters
  const fetchData = () => {
    axios.get("http://localhost:8000/fra-data", {
      params: { state, district, village }
    })
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Failed to fetch FRA data:", err);
        setData([]);
      });
  };

  // Compute filtered districts and villages
  const filteredDistricts = state === "All" ? filters.districts : [...new Set(data.map(row => row.District))];
  const filteredVillages = district === "All" ? filters.villages : [...new Set(data.map(row => row.Village))];

  // Get all column names dynamically
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="mt-14.5" style={{ padding: "20px" }}>
      <h2>FRA Data Filters</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>State: </label>
        <select
          value={state}
          onChange={e => {
            setState(e.target.value);
            setDistrict("All");
            setVillage("All");
          }}
        >
          <option value="All">All States</option>
          {filters.states.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>District: </label>
        <select
          value={district}
          onChange={e => {
            setDistrict(e.target.value);
            setVillage("All");
          }}
        >
          <option value="All">All Districts</option>
          {filteredDistricts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Village: </label>
        <select
          value={village}
          onChange={e => setVillage(e.target.value)}
        >
          <option value="All">All Villages</option>
          {filteredVillages.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>

      <button onClick={fetchData} style={{ marginBottom: "20px" }}>Fetch FRA Data</button>

      <table border="1" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col}>{col.replace(/_/g, " ")}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center" }}>No data available</td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map(col => (
                  <td key={col}>{row[col]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
