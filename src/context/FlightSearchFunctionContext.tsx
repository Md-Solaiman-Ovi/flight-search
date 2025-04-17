import { createContext, useContext } from "react";

type FlightSearchFunctionContextType = {
  registerSearchFn: (fn: () => void) => void;
  runSearch: () => void;
};

export const FlightSearchFunctionContext =
  createContext<FlightSearchFunctionContextType | null>(null);

export const useFlightSearchFunction = () => {
  const context = useContext(FlightSearchFunctionContext);
  if (!context)
    throw new Error(
      "useFlightSearchFunction must be used inside FlightSearchFunctionContext.Provider"
    );
  return context;
};
