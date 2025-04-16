// TripTypeTabs.tsx
import React from "react";

type Props = {
  selected: "round" | "oneway" | "multicity";
  onChange: (value: "round" | "oneway" | "multicity") => void;
};

const TripTypeTabs: React.FC<Props> = ({ selected, onChange }) => {
  return (
    <div className="flex gap-8 mb-6 text-sm font-semibold text-[#32d095]">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="trip"
          checked={selected === "round"}
          onChange={() => onChange("round")}
        />
        ROUND-WAY
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="trip"
          checked={selected === "oneway"}
          onChange={() => onChange("oneway")}
        />
        ONE-WAY
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name="trip"
          checked={selected === "multicity"}
          onChange={() => onChange("multicity")}
        />
        MULTI-CITY
      </label>
    </div>
  );
};

export default TripTypeTabs;
