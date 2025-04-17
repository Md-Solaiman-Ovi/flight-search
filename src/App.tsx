import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FlightList } from "./pages/FlightList";
import Home from "./pages/Home";
import { FlightSearchFunctionContext } from "./context/FlightSearchFunctionContext";
import { useRef } from "react";

function App() {
  const searchFnRef = useRef<() => void>(() => {});

  const registerSearchFn = (fn: () => void) => {
    searchFnRef.current = fn;
  };
  const runSearch = () => {
    if (searchFnRef.current) {
      searchFnRef.current();
    }
  };

  return (
    <FlightSearchFunctionContext.Provider
      value={{ registerSearchFn, runSearch }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flight-list" element={<FlightList />} />
        </Routes>
      </Router>
    </FlightSearchFunctionContext.Provider>
  );
}

export default App;
