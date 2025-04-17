/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Autocomplete, Popper, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import airports from "../data/airports.json"; // Adjust your import path accordingly

interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

const StyledPopper = (props: any) => (
  <Popper
    {...props}
    placement="bottom-start"
    modifiers={[{ name: "offset", options: { offset: [0, 4] } }]}
    style={{ zIndex: 9999 }}
  />
);

const RoundWay: React.FC = () => {
  const [fromAirport, setFromAirport] = useState<Airport>(airports[0]);
  const [toAirport, setToAirport] = useState<Airport>(airports[1]);

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const [inputFrom, setInputFrom] = useState("");
  const [inputTo, setInputTo] = useState("");

  const [departureDate, setDepartureDate] = useState<Dayjs | null>(dayjs());
  const [returnDate, setReturnDate] = useState<Dayjs | null>(
    dayjs().add(2, "day")
  );

  const [openDepartureCalendar, setOpenDepartureCalendar] = useState(false);
  const [openReturnCalendar, setOpenReturnCalendar] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="relative z-10 flex justify-between bg-white">
        {/* FROM */}
        <div className="w-1/3">
          <p className="text-center text-sm text-gray-500">FROM</p>
          <h2 className="text-4xl font-bold text-center text-[#32d095]">
            {fromAirport.code}
          </h2>

          <div
            className="flex items-center gap-2 bg-[#EAF2FF] p-2 rounded-md mt-2 cursor-pointer"
            onClick={() => setOpenFrom(true)}
          >
            <LocationOnIcon fontSize="small" />
            <span className="text-sm">
              {fromAirport.name} ({fromAirport.code})
            </span>
          </div>

          <div ref={fromRef}>
            {openFrom && (
              <Autocomplete
                open={openFrom}
                onClose={() => setOpenFrom(false)}
                value={fromAirport}
                inputValue={inputFrom}
                onInputChange={(_, newInputValue) =>
                  setInputFrom(newInputValue)
                }
                onChange={(_, newValue) => {
                  if (newValue) {
                    setFromAirport(newValue);
                    setOpenFrom(false);
                    setInputFrom("");
                  }
                }}
                options={airports}
                getOptionLabel={(option) =>
                  inputFrom ? `${option.city}, ${option.country}` : ""
                }
                PopperComponent={StyledPopper}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    autoFocus
                    placeholder="Search airport..."
                    variant="outlined"
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      className: "bg-white text-green-600 rounded shadow-md",
                    }}
                  />
                )}
                PaperComponent={({ children }) => (
                  <div className="bg-[#32d095] w-full text-white rounded-md shadow-lg overflow-hidden mt-1 z-50">
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

          {/* Departure Date */}
          <div
            className="flex items-center gap-2 bg-[#EAF2FF] p-2 rounded-md mt-2 cursor-pointer"
            onClick={() => setOpenDepartureCalendar(true)}
          >
            <CalendarMonthIcon fontSize="small" />
            <span className="text-sm">
              {departureDate?.toDate().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
              })}
            </span>
          </div>
          {openDepartureCalendar && (
            <DatePicker
              open
              onClose={() => setOpenDepartureCalendar(false)}
              value={departureDate}
              onChange={(val) => {
                if (val) setDepartureDate(val);
                setOpenDepartureCalendar(false);
              }}
              slotProps={{
                textField: { hidden: true },
              }}
            />
          )}
        </div>

        {/* PLANE ICON */}
        <div className="flex flex-col justify-center items-center text-[100px] relative">
          <div className="rotate-90 absolute -top-10">
            <FlightOutlinedIcon fontSize="inherit" className="text-[#32d095]" />
          </div>
          <div className="-rotate-90 absolute top-4">
            <FlightOutlinedIcon
              fontSize="inherit"
              className="text-transparent"
              style={{ stroke: "#32d095", fill: "#32d095" }}
            />
          </div>
        </div>

        {/* TO */}
        <div className="w-1/3">
          <p className="text-center text-sm text-gray-500">TO</p>
          <h2 className="text-4xl font-bold text-center text-[#32d095]">
            {toAirport.code}
          </h2>

          <div
            className="flex items-center gap-2 bg-[#EAF2FF] p-2 rounded-md mt-2 cursor-pointer"
            onClick={() => setOpenTo(true)}
          >
            <LocationOnIcon fontSize="small" />
            <span className="text-sm">
              {toAirport.name} ({toAirport.code})
            </span>
          </div>

          <div ref={toRef}>
            {openTo && (
              <Autocomplete
                open={openTo}
                onClose={() => setOpenTo(false)}
                value={toAirport}
                inputValue={inputTo}
                onInputChange={(_, newInputValue) => setInputTo(newInputValue)}
                onChange={(_, newValue) => {
                  if (newValue) {
                    setToAirport(newValue);
                    setOpenTo(false);
                    setInputTo("");
                  }
                }}
                options={airports}
                getOptionLabel={(option) =>
                  inputTo ? `${option.city}, ${option.country}` : ""
                }
                PopperComponent={StyledPopper}
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    autoFocus
                    placeholder="Search airport..."
                    variant="outlined"
                    size="small"
                    InputProps={{
                      ...params.InputProps,
                      className: "bg-white text-green-600 rounded shadow-md",
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

          {/* Return Date */}
          <div
            className="flex items-center gap-2 bg-[#EAF2FF] p-2 rounded-md mt-2 cursor-pointer"
            onClick={() => setOpenReturnCalendar(true)}
          >
            <CalendarMonthIcon fontSize="small" />
            <span className="text-sm">
              {returnDate?.toDate().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "2-digit",
              })}
            </span>
          </div>
          {openReturnCalendar && (
            <DatePicker
              open
              onClose={() => setOpenReturnCalendar(false)}
              value={returnDate}
              onChange={(val) => {
                if (val) setReturnDate(val);
                setOpenReturnCalendar(false);
              }}
              slotProps={{
                textField: { hidden: true },
              }}
            />
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default RoundWay;
