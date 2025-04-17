import React, { useState } from "react";
import TripTypeTabs from "./TripTypeTabs";
import OneWay from "./OneWay";
import RoundWay from "./RoundWay";
import MultiCity from "./MultiCity";
import { TextField, MenuItem, Button } from "@mui/material";
import "animate.css";
import { useFlightSearchFunction } from "../context/FlightSearchFunctionContext";

const FlightSearchContainer: React.FC = () => {
  const { runSearch } = useFlightSearchFunction();

  const [tripType, setTripType] = useState<"round" | "oneway" | "multicity">(
    "round"
  );

  // Common form state lifted to parent
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState<Date | null>(null);

  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");
  const [infants, setInfants] = useState("0");
  const [cabinClass, setCabinClass] = useState("Economy");
  // const { handleChildFunction } = useFunction();

  const handleSearch = () => {
    if (tripType === "oneway") {
      // console.log("Searching OneWay:", {
      //   from,
      //   to,
      //   departureDate,
      //   adults,
      //   children,
      //   infants,
      //   cabinClass,
      // });
      runSearch();
    } else if (tripType === "round") {
      console.log("Searching RoundTrip:", {
        from,
        to,
        departureDate,

        adults,
        children,
        infants,
        cabinClass,
      });
    } else if (tripType === "multicity") {
      console.log("Searching MultiCity:", {
        adults,
        children,
        infants,
        cabinClass,
      });
    }
  };

  return (
    <div className="relative w-[95%] max-w-[1200px] mx-auto flex p-6 rounded-xl">
      <div className="w-full bg-white p-6 rounded-xl border-r-[1px]">
        <TripTypeTabs selected={tripType} onChange={setTripType} />

        {tripType === "round" && (
          <div className="animate__animated animate__zoomIn">
            <RoundWay />
          </div>
        )}
        {tripType === "oneway" && (
          <div className="animate__animated animate__zoomIn">
            <OneWay
              setFrom={setFrom}
              setTo={setTo}
              setDepartureDate={setDepartureDate}
            />
          </div>
        )}
        {tripType === "multicity" && (
          <div className="animate__animated animate__zoomIn">
            <MultiCity />
          </div>
        )}
      </div>

      {/* Pax and cabin & Search Button */}
      <div className="flex flex-col justify-between bg-white p-6 rounded-xl">
        <div className="col-span-3 flex flex-col gap-2 ">
          <div className="flex gap-2">
            <TextField
              select
              size="small"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              fullWidth
            >
              {[...Array(9)].map((_, i) => (
                <MenuItem key={i} value={String(i + 1)}>
                  <div className="text-xs">{i + 1} ADULT</div>
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              size="small"
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              fullWidth
            >
              {[...Array(6)].map((_, i) => (
                <MenuItem key={i} value={String(i)}>
                  <div className="text-xs">{i} CHILD</div>
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              size="small"
              value={infants}
              onChange={(e) => setInfants(e.target.value)}
              fullWidth
            >
              {[...Array(5)].map((_, i) => (
                <MenuItem key={i} value={String(i)}>
                  <div className="text-xs">{i} INFANT</div>
                </MenuItem>
              ))}
            </TextField>
          </div>
          <TextField
            select
            size="small"
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value)}
            fullWidth
          >
            {["Economy", "Premium Economy", "Business", "First"].map(
              (option) => (
                <MenuItem key={option} value={option}>
                  <div className="text-sm">{option}</div>
                </MenuItem>
              )
            )}
          </TextField>
        </div>

        <div className="col-span-2 flex items-end">
          <Button
            variant="contained"
            fullWidth
            size="small"
            style={{ backgroundColor: "#32d095" }}
            onClick={handleSearch}
          >
            SEARCH FOR FLIGHT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlightSearchContainer;
