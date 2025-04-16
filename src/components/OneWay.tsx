import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import airports from "../data/airports.json";

interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

const OneWay: React.FC = () => {
  const [fromAirport, setFromAirport] = useState<Airport | undefined>(
    airports[0]
  );
  const [toAirport, setToAirport] = useState<Airport | undefined>(airports[1]);

  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  const [fromInputValue, setFromInputValue] = useState("");
  const [toInputValue, setToInputValue] = useState("");

  return (
    <div className="relative w-full z-10 flex justify-between bg-white rounded-md p-4 shadow-lg">
      {/* FROM */}
      <div className="w-1/3">
        <p className="text-center text-sm text-gray-500">FROM</p>
        <h2 className="text-4xl font-bold text-center text-[#32d095]">
          {fromAirport?.code}
        </h2>

        <div
          className="mt-2 flex items-center gap-2 bg-[#EAF2FF] p-2 rounded-md cursor-pointer"
          onClick={() => {
            setFromOpen(true);
            setFromInputValue(""); // clear search input on open
          }}
        >
          <LocationOnIcon fontSize="small" />
          <span className="text-sm">
            {fromAirport?.name} ({fromAirport?.code})
          </span>
        </div>

        {fromOpen && (
          <Autocomplete
            open
            onClose={() => setFromOpen(false)}
            options={airports}
            getOptionLabel={(option) =>
              fromInputValue ? `${option.city}, ${option.country}` : ""
            }
            value={fromAirport}
            onChange={(_, value) => {
              setFromAirport(value);
              setFromOpen(false);
              setFromInputValue("");
            }}
            inputValue={fromInputValue}
            onInputChange={(_, newInputValue) =>
              setFromInputValue(newInputValue)
            }
            disableClearable
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search airport..."
                variant="outlined"
                size="small"
                autoFocus
                InputProps={{
                  ...params.InputProps,
                  className:
                    "bg-white text-green-600 rounded shadow-md border-none",
                }}
              />
            )}
            PaperComponent={({ children }) => (
              <div className="bg-[#32d095] text-white rounded-md shadow-lg overflow-hidden mt-1 z-50">
                {children}
              </div>
            )}
            renderOption={(props, option) => (
              <li
                {...props}
                className="mx-1 px-1 py-2 hover:bg-[#525371] cursor-pointer relative"
              >
                <div className="text-xs font-semibold text-white">
                  {option.city}, {option.country}
                </div>
                <div className="text-[11px] text-white/80">{option.name}</div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999999] text-[13px] font-bold">
                  {option.code}
                </div>
              </li>
            )}
            sx={{ width: "100%", mt: 1 }}
          />
        )}

        <div className="flex items-center gap-2 bg-[#EAF2FF] p-2 rounded-md mt-2">
          <CalendarMonthIcon fontSize="small" />
          <span className="text-sm">15 Apr 25</span>
        </div>
      </div>

      {/* Plane Icon */}
      <div className="flex flex-col justify-center items-center text-[100px] relative">
        <div className="rotate-90 absolute -top-10">
          <FlightOutlinedIcon fontSize="inherit" className="text-[#32d095]" />
        </div>
      </div>

      {/* TO */}
      <div className="w-1/3">
        <p className="text-center text-sm text-gray-500">TO</p>
        <h2 className="text-4xl font-bold text-center text-[#32d095]">
          {toAirport?.code}
        </h2>

        <div
          className="mt-2 flex items-center gap-2 bg-[#EAF2FF] p-2 rounded-md cursor-pointer"
          onClick={() => {
            setToOpen(true);
            setToInputValue(""); // clear search input on open
          }}
        >
          <LocationOnIcon fontSize="small" />
          <span className="text-sm">
            {toAirport?.name} ({toAirport?.code})
          </span>
        </div>

        {toOpen && (
          <Autocomplete
            open
            onClose={() => setToOpen(false)}
            options={airports}
            getOptionLabel={(option) =>
              toInputValue ? `${option.city}, ${option.country}` : ""
            }
            value={toAirport}
            onChange={(_, value) => {
              setToAirport(value);
              setToOpen(false);
              setToInputValue("");
            }}
            inputValue={toInputValue}
            onInputChange={(_, newInputValue) => setToInputValue(newInputValue)}
            disableClearable
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search airport..."
                variant="outlined"
                size="small"
                autoFocus
                InputProps={{
                  ...params.InputProps,
                  className:
                    "bg-white text-green-600 rounded shadow-md border-none",
                }}
              />
            )}
            PaperComponent={({ children }) => (
              <div className="bg-[#32d095] text-white rounded-md shadow-lg overflow-hidden mt-1 z-50">
                {children}
              </div>
            )}
            renderOption={(props, option) => (
              <li
                {...props}
                className="mx-1 px-1 py-2 hover:bg-[#525371] cursor-pointer relative"
              >
                <div className="text-xs font-semibold text-white">
                  {option.city}, {option.country}
                </div>
                <div className="text-[11px] text-white/80">{option.name}</div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999999] text-[13px] font-bold">
                  {option.code}
                </div>
              </li>
            )}
            sx={{ width: "100%", mt: 1 }}
          />
        )}
      </div>
    </div>
  );
};

export default OneWay;
