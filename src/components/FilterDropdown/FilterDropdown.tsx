// src/components/FilterDropdown/FilterDropdown.tsx

import React, { useCallback, useMemo } from "react";

import Select, { MultiValue } from "react-select";
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
    return options.filter((option) => selectedValues.includes(option.value));
  }, [options, selectedValues]);

  const inputElementId = `filter-input-${columnId}`;

  return (
    <div className={styles.filterContainer}>
      <label htmlFor={inputElementId}>{columnId}</label>
      <Select
        inputId={inputElementId}
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
