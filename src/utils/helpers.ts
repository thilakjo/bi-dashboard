import { DataRow, DropdownOption } from "../types";

export const getUniqueColumnValues = (
  data: DataRow[],
  columnId: string
): DropdownOption[] => {
  const uniqueValues = new Set<string | number>();
  data.forEach((row) => {
    const value = row[columnId];
    if (value !== null && value !== undefined) {
      uniqueValues.add(value);
    }
  });
  return Array.from(uniqueValues)
    .sort((a, b) => {
      if (typeof a === "number" && typeof b === "number") {
        return a - b;
      }
      return String(a).localeCompare(String(b));
    })
    .map((value) => ({
      label: String(value),
      value: value,
    }));
};

export const applyFilters = (
  data: DataRow[],
  activeFilters: { [key: string]: (string | number)[] }
): DataRow[] => {
  const filterKeys = Object.keys(activeFilters);
  if (filterKeys.length === 0) {
    return data;
  }

  return data.filter((row) => {
    for (const columnId of filterKeys) {
      const selectedValues = activeFilters[columnId];
      if (selectedValues.length > 0) {
        if (!selectedValues.includes(row[columnId])) {
          return false;
        }
      }
    }
    return true;
  });
};
