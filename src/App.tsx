import React from "react";
import { DashboardProvider, useDashboard } from "./context/DashboardContext";
import FilterDropdown from "./components/FilterDropdown/FilterDropdown";
import DataTable from "./components/DataTable/DataTable";
import Spinner from "./components/Spinner/Spinner";
import "./App.css";

const DashboardContent: React.FC = () => {
  const {
    loading,
    error,
    columnHeaders,
    activeFilters,
    debouncedHandleFilterChange,
    getFilterDropdownOptions,
    filteredData,
  } = useDashboard();

  if (loading) {
    return (
      <div className="dashboard-loading-container">
        <Spinner />
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return <div className="dashboard-error-container">Error: {error}</div>;
  }

  // Filter out the 'number' column from the filter dropdowns if you want it to be handled differently
  // or if it's always just a direct search/filter.
  // Based on your screenshot, 'number' is a regular filter, so include it.

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">BI Dashboard</h1>
      <div className="filters-section">
        {columnHeaders.map((header) => (
          <FilterDropdown
            key={header}
            columnId={header}
            options={getFilterDropdownOptions(header)}
            selectedValues={activeFilters[header] || []}
            onSelectionChange={debouncedHandleFilterChange}
          />
        ))}
      </div>
      <DataTable data={filteredData} columnHeaders={columnHeaders} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default App;
