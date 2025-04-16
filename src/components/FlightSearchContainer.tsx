// FlightSearchContainer.tsx
import React, { useState } from "react";
import TripTypeTabs from "./TripTypeTabs";
import OneWay from "./OneWay";
import RoundWay from "./RoundWay";
import MultiCity from "./MultiCity";
import { TextField, MenuItem, Button } from "@mui/material";
import "animate.css";

const FlightSearchContainer: React.FC = () => {
  const [tripType, setTripType] = useState<"round" | "oneway" | "multicity">(
    "round"
  );

  return (
    <div className="relative w-[95%] max-w-[1200px] mx-auto flex p-6 rounded-xl">
      <div className="w-full bg-white p-6 rounded-xl border-r-[1px]">
        <TripTypeTabs selected={tripType} onChange={setTripType} />
        {tripType === "round" && (
          <div
            className={`  ${
              tripType === "round" ? "animate__animated animate__zoomIn" : ""
            }`}
          >
            <RoundWay />
          </div>
        )}
        {tripType === "oneway" && (
          <div
            className={`  ${
              tripType === "oneway" ? "animate__animated animate__zoomIn" : ""
            }`}
          >
            <OneWay />
          </div>
        )}
        {tripType === "multicity" && (
          <div
            className={`  ${
              tripType === "multicity"
                ? "animate__animated animate__zoomIn"
                : ""
            }`}
          >
            <MultiCity />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between bg-white p-6 rounded-xl">
        {/* Pax and cabin */}
        <div className="col-span-3 flex flex-col gap-2 ">
          <div className="flex gap-2">
            <TextField select size="small" defaultValue="1" fullWidth>
              {[...Array(9)].map((_, i) => (
                <MenuItem key={i} value={i + 1}>
                  <div className="text-xs"> {i + 1} ADULT</div>
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              size="small"
              defaultValue="0"
              fullWidth
              className="flex items-center "
            >
              {[...Array(6)].map((_, i) => (
                <MenuItem key={i} value={i} className="flex items-center">
                  <div className="text-xs flex items-center">{i} CHILD</div>
                </MenuItem>
              ))}
            </TextField>
            <TextField select size="small" defaultValue="0" fullWidth>
              {[...Array(5)].map((_, i) => (
                <MenuItem key={i} value={i}>
                  <div className="text-xs text-center"> {i} INFANT</div>
                </MenuItem>
              ))}
            </TextField>
          </div>
          <TextField select size="small" defaultValue="Economy" fullWidth>
            {["Economy", "Premium Economy", "Business", "First"].map(
              (option) => (
                <MenuItem key={option} value={option}>
                  <div className="text-sm">{option}</div>
                </MenuItem>
              )
            )}
          </TextField>
        </div>
        {/* Search button */}
        <div className="col-span-2 flex items-end">
          <Button
            variant="contained"
            fullWidth
            size="small"
            style={{ backgroundColor: "#32d095" }}
          >
            SEARCH FOR FLIGHT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchContainer;
