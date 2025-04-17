/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import airports from "../data/airports.json";
import { useNavigate } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import { useFlightSearchFunction } from "../context/FlightSearchFunctionContext";

interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

// Styled DatePicker with Tailwind-alike look
const StyledDatePicker = styled(DatePicker)(() => ({
  "& .MuiPaper-root": {
    borderRadius: 12,
    overflow: "hidden",
  },
  "& .MuiPickersCalendarHeader-root": {
    backgroundColor: "#f1f5f9",
    padding: "12px",
  },
  "& .MuiPickersDay-root": {
    fontSize: "14px",
    borderRadius: "6px",
  },
  "& .MuiPickersDay-root.Mui-selected": {
    backgroundColor: "#32d095",
    color: "#fff",
  },
  "& .MuiPickersDay-root:hover": {
    backgroundColor: "#e2e8f0",
  },
  "& .MuiPickersArrowSwitcher-root button": {
    color: "#333",
  },
}));

interface OneWayProps {
  setFrom: React.Dispatch<React.SetStateAction<string>>;
  setTo: React.Dispatch<React.SetStateAction<string>>;
  setDepartureDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

const OneWay: React.FC<OneWayProps> = ({
  setFrom,
  setTo,
  setDepartureDate,
}) => {
  const [fromAirport, setFromAirport] = useState<Airport | undefined>(
    airports[0]
  );
  const [toAirport, setToAirport] = useState<Airport | undefined>(airports[1]);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [fromInputValue, setFromInputValue] = useState("");
  const [toInputValue, setToInputValue] = useState("");
  const [departureDate, setLocalDepartureDate] = useState<Date | null>(
    new Date()
  );

  const navigate = useNavigate();

  const { registerSearchFn } = useFlightSearchFunction();

  useEffect(() => {
    // Define the search function here
    const handleSearchClick = () => {
      // Update parent state
      if (fromAirport && toAirport && departureDate) {
        setFrom(fromAirport.code);
        setTo(toAirport.code);
        setDepartureDate(departureDate);

        navigate("/flight-list", {
          state: {
            from: fromAirport.code,
            to: toAirport.code,
            date: departureDate.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            }),
          },
        });
      }
    };

    registerSearchFn(handleSearchClick);
  }, [registerSearchFn]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="relative w-full z-10 flex justify-between bg-white">
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
              setFromInputValue("");
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
              }}
              inputValue={fromInputValue}
              onInputChange={(_, newValue) => setFromInputValue(newValue)}
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
              renderOption={(props, option) => {
                const { key, ...rest } = props;
                return (
                  <li
                    key={option.code}
                    {...rest}
                    className="mx-1 px-1 py-2 hover:bg-[#525371] cursor-pointer relative"
                  >
                    <div className="text-xs font-semibold text-white">
                      {option.city}, {option.country}
                    </div>
                    <div className="text-[11px] text-white/80">
                      {option.name}
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999999] text-[13px] font-bold">
                      {option.code}
                    </div>
                  </li>
                );
              }}
              sx={{ width: "100%", mt: 1 }}
            />
          )}

          {/* Calendar Display */}
          <div
            className="flex items-center gap-2 bg-[#EAF2FF] p-2 rounded-md mt-2 cursor-pointer"
            onClick={() => setCalendarOpen(true)}
          >
            <CalendarMonthIcon fontSize="small" />
            <span className="text-sm">
              {departureDate?.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
              })}
            </span>
          </div>

          {calendarOpen && (
            <div className="mt-2 z-50">
              <StyledDatePicker
                value={departureDate}
                onChange={(newValue) => {
                  if (newValue instanceof Date || newValue === null) {
                    setLocalDepartureDate(newValue);
                  }
                  setCalendarOpen(false);
                }}
                open
                onClose={() => setCalendarOpen(false)}
                slotProps={{
                  textField: { hidden: true },
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, 10],
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          )}
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
              setToInputValue("");
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
              }}
              inputValue={toInputValue}
              onInputChange={(_, newValue) => setToInputValue(newValue)}
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
              renderOption={(props, option) => {
                const { key, ...rest } = props;
                return (
                  <li
                    key={option.code}
                    {...rest}
                    className="mx-1 px-1 py-2 hover:bg-[#525371] cursor-pointer relative"
                  >
                    <div className="text-xs font-semibold text-white">
                      {option.city}, {option.country}
                    </div>
                    <div className="text-[11px] text-white/80">
                      {option.name}
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999999] text-[13px] font-bold">
                      {option.code}
                    </div>
                  </li>
                );
              }}
              sx={{ width: "100%", mt: 1 }}
            />
          )}
        </div>

        {/* Search Button */}
        {/* <div className="w-full mt-6 flex justify-center">
          <button
            onClick={handleSearchClick}
            className="bg-[#32d095] text-white px-6 py-2 rounded-full text-xl"
          >
            Search Flights
          </button>
        </div> */}
      </div>
    </LocalizationProvider>
  );
};

export default OneWay;
