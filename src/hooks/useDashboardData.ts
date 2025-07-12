import { useState, useEffect, useMemo, useCallback } from "react";
import { loadCsvData } from "../api/dataLoader";
import { DataRow, ActiveFilters, DropdownOption } from "../types";
import { applyFilters, getUniqueColumnValues } from "../utils/helpers";
import debounce from "lodash.debounce";

const DATASET_SMALL_PATH = "/dataset_small.csv";
const DATASET_LARGE_PATH = "/dataset_large.csv";

export const useDashboardData = () => {
  const [originalData, setOriginalData] = useState<DataRow[]>([]);
  const [columnHeaders, setColumnHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await loadCsvData(DATASET_LARGE_PATH); // change to DATASET_SMALL_PATH for smaller dataset
        setOriginalData(data);
        if (data.length > 0) {
          setColumnHeaders(Object.keys(data[0]));
        }
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return applyFilters(originalData, activeFilters);
  }, [originalData, activeFilters]);

  const handleFilterChange = useCallback(
    (columnId: string, selectedValues: (string | number)[]) => {
      setActiveFilters((prevFilters) => {
        const newFilters = { ...prevFilters };
        if (selectedValues.length === 0) {
          delete newFilters[columnId];
        } else {
          newFilters[columnId] = selectedValues;
        }
        return newFilters;
      });
    },
    []
  );

  const debouncedHandleFilterChange = useMemo(
    () => debounce(handleFilterChange, 200),
    [handleFilterChange]
  );

  const getFilterDropdownOptions = useCallback(
    (currentColumnId: string): DropdownOption[] => {
      const filtersForOtherColumns: ActiveFilters = {};
      for (const columnId in activeFilters) {
        if (columnId !== currentColumnId) {
          filtersForOtherColumns[columnId] = activeFilters[columnId];
        }
      }

      const dataFilteredByOthers = applyFilters(
        originalData,
        filtersForOtherColumns
      );

      return getUniqueColumnValues(dataFilteredByOthers, currentColumnId);
    },
    [originalData, activeFilters]
  );

  return {
    originalData,
    filteredData,
    columnHeaders,
    loading,
    error,
    activeFilters,
    debouncedHandleFilterChange,
    getFilterDropdownOptions,
  };
};
