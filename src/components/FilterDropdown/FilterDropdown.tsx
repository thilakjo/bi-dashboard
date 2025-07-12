// src/components/FilterDropdown/FilterDropdown.tsx

import React, { useCallback, useMemo } from "react";

import Select, { MultiValue } from "react-select"; // Import MultiValue type
import { DropdownOption } from "../../types";
import styles from "./FilterDropdown.module.css";

interface FilterDropdownProps {
  columnId: string;
  options: DropdownOption[];
  selectedValues: (string | number)[];
  onSelectionChange: (columnId: string, selected: (string | number)[]) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  columnId,
  options,
  selectedValues,
  onSelectionChange,
}) => {
  // Use MultiValue type for selectedOption
  const handleChange = useCallback(
    (selectedOption: MultiValue<DropdownOption>) => {
      const values = selectedOption
        ? selectedOption.map((option) => option.value)
        : [];
      onSelectionChange(columnId, values);
    },
    [columnId, onSelectionChange]
  );

  const selectedOptions = useMemo(() => {
    // Ensure we only show selected options that are also present in the current 'options' list
    return options.filter((option) => selectedValues.includes(option.value));
  }, [options, selectedValues]);

  // Define the ID that will be applied to the *internal input* of react-select
  const inputElementId = `filter-input-${columnId}`; // A more descriptive ID for the input

  return (
    <div className={styles.filterContainer}>
      {/* The label's 'htmlFor' must point to the *input's* ID */}
      <label htmlFor={inputElementId}>{columnId}</label>
      <Select
        // Change 'id' to 'inputId' here. This is the crucial fix!
        // This prop tells react-select to assign this ID to its *actual input* element.
        inputId={inputElementId}
        // It's still good practice to have a unique instanceId for react-select itself
        // to prevent potential collisions with its internal component IDs.
        instanceId={`react-select-instance-${columnId}`}
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        placeholder={`Select ${columnId}...`}
        className={styles.select}
        classNamePrefix="react-select"
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        isClearable={true}
        noOptionsMessage={() => "No options available"}
      />
    </div>
  );
};

export default FilterDropdown;
