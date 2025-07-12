import React, { createContext, useContext, ReactNode } from "react";
import { DataRow, ActiveFilters, DropdownOption } from "../types";
import { useDashboardData } from "../hooks/useDashboardData";

interface DashboardContextType {
  originalData: DataRow[];
  filteredData: DataRow[];
  columnHeaders: string[];
  loading: boolean;
  error: string | null;
  activeFilters: ActiveFilters;
  debouncedHandleFilterChange: (
    columnId: string,
    selectedValues: (string | number)[]
  ) => void;
  getFilterDropdownOptions: (currentColumnId: string) => DropdownOption[];
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const dashboardData = useDashboardData();

  return (
    <DashboardContext.Provider value={dashboardData}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
