// App.tsx
// import { useState } from "react";
// import SearchTabs from "./components/SearchTabs";
// import OneWaySearch from "./components/OneWaySearch";
// import RoundTripSearch from "./components/RoundTripSearch";
// import MultiCityDesign from "./components/MultiCityDesign";

import Home from "./components/Home";

const App = () => {
  // const [tab, setTab] = useState(0);

  return (
    // <div className="p-4 max-w-4xl mx-auto">
    //   <SearchTabs selectedTab={tab} onChange={(e, newVal) => setTab(newVal)} />
    //   {tab === 0 && <OneWaySearch />}
    //   {tab === 1 && <RoundTripSearch />}
    //   {tab === 2 && <MultiCityDesign />}

    // </div>
    <div>
      {" "}
      <Home />
    </div>
  );
};

export default App;
