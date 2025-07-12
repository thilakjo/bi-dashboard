export type DataRow = {
  [key: string]: string | number;
};

export type ActiveFilters = {
  [columnId: string]: (string | number)[];
};

export type DropdownOption = {
  label: string;
  value: string | number;
};
