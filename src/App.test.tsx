// src/App.test.tsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import * as useDashboardDataModule from "./hooks/useDashboardData";

// Mock the useDashboardData hook
const mockUseDashboardData = jest.spyOn(
  useDashboardDataModule,
  "useDashboardData"
);

// Test 1: Renders BI Dashboard title after loading
test("renders BI Dashboard title after loading", async () => {
  mockUseDashboardData.mockReturnValue({
    loading: false,
    error: null,
    originalData: [
      { number: 1, mod3: 1, mod4: 1, mod5: 1, mod6: 1 },
      { number: 2, mod3: 2, mod4: 2, mod5: 2, mod6: 2 },
    ],
    filteredData: [
      { number: 1, mod3: 1, mod4: 1, mod5: 1, mod6: 1 },
      { number: 2, mod3: 2, mod4: 2, mod5: 2, mod6: 2 },
    ],
    columnHeaders: ["number", "mod3", "mod4", "mod5", "mod6"],
    activeFilters: {},
    debouncedHandleFilterChange: Object.assign(jest.fn(), {
      cancel: jest.fn(),
      flush: jest.fn(),
    }),
    getFilterDropdownOptions: jest.fn(() => [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
    ]),
  });

  render(<App />);

  const titleElement = await screen.findByText(/BI Dashboard/i);
  expect(titleElement).toBeInTheDocument();

  expect(
    screen.queryByText(/Loading dashboard data.../i)
  ).not.toBeInTheDocument();

  // Now, getByLabelText should work correctly because the label points to the actual input
  const numberFilter = screen.getByLabelText(/number/i);
  expect(numberFilter).toBeInTheDocument();

  // Also check for another filter
  const mod3Filter = screen.getByLabelText(/mod3/i);
  expect(mod3Filter).toBeInTheDocument();
});

// Test 2: Renders loading state initially
test("renders loading state initially", () => {
  mockUseDashboardData.mockReturnValue({
    loading: true,
    error: null,
    originalData: [],
    filteredData: [],
    columnHeaders: [],
    activeFilters: {},
    debouncedHandleFilterChange: Object.assign(jest.fn(), {
      cancel: jest.fn(),
      flush: jest.fn(),
    }),
    getFilterDropdownOptions: jest.fn(),
  });

  render(<App />);

  expect(screen.getByText(/Loading dashboard data.../i)).toBeInTheDocument();
  expect(screen.queryByText(/BI Dashboard/i)).not.toBeInTheDocument();
});
