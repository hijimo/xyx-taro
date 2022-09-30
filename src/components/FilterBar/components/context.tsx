import React from "react";

export interface FilterBarContextProps {
  value: Record<string, string>;
  onChange?: (label: Record<string, string>) => void;
}

const FilterBarContext = React.createContext<FilterBarContextProps | null>(
  null
);

export const FilterBarContextProvider = FilterBarContext.Provider;

export default FilterBarContext;
