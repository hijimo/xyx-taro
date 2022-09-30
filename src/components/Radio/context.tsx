import React from "react";

interface RadioContextProps {
  value?: any | any[];
  onChange?: (value: any) => void;
}

const RadioGroupContext = React.createContext<RadioContextProps | null>(null);

export const RadioGroupContextProvider = RadioGroupContext.Provider;

export default RadioGroupContext;
