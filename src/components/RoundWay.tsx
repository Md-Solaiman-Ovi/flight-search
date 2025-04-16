/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/RoundWay.tsx
// import React from "react";

// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";

// const RoundWay: React.FC = () => {
//   return (
//     <div className="relative z-10 flex justify-between">
//       <div className="flex justify-between gap-4 w-full bg-white">
//         {/* FROM */}
//         <div className="col-span-3">
//           <p className="text-center text-sm text-gray-500">FROM</p>
//           <h2 className="text-4xl font-bold text-center text-[#32d095]">DAC</h2>
//           <div className="flex items-center gap-2 bg-[#EAF2FF] p-2 rounded-md mt-2">
//             <LocationOnIcon fontSize="small" />
//             <span className="text-sm">Hazrat Shahjalal Intl Airport (DAC)</span>
//           </div>
//           <div className="flex items-center gap-2 bg-[#EAF2FF] p-2 rounded-md mt-2">
//             <CalendarMonthIcon fontSize="small" />
//             <span className="text-sm">15 Apr 25</span>
//           </div>
//         </div>

//         {/* Icon */}
//         <div className="col-span-3 flex flex-col justify-center items-center text-[100px] relative">
//           <div className=" bg-inherit rotate-90 absolute -top-10 ">
//             <FlightOutlinedIcon fontSize="inherit" className="text-[#32d095]" />
//           </div>
//           <div className="-rotate-90 absolute top-4">
//             <FlightOutlinedIcon
//               fontSize="inherit"
//               stroke="#32d095"
//               fill="#32d095"
//               className="text-transparent"
//             />
//           </div>
//         </div>

//         {/* TO */}
//         <div className="col-span-3">
//           <p className="text-center text-sm text-gray-500">TO</p>
//           <h2 className="text-4xl font-bold text-center text-[#32d095]">CXB</h2>
//           <div className="flex items-center gap-2 bg-[#EAF2FF] p-2 rounded-md mt-2">
//             <LocationOnIcon fontSize="small" />
//             <span className="text-sm">Cox’s Bazar Airport (CXB)</span>
//           </div>
//           <div className="flex items-center gap-2 bg-[#EAF2FF] p-2 rounded-md mt-2">
//             <CalendarMonthIcon fontSize="small" />
//             <span className="text-sm">17 Apr 25</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoundWay;

import React, { useRef, useState } from "react";
import { Autocomplete, TextField, Popper } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import airports from "../data/airports.json";

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
    modifiers={[
      {
        name: "offset",
        options: {
          offset: [0, 4],
        },
      },
    ]}
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

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative z-10 flex justify-between bg-white rounded-md ">
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
              onInputChange={(_, newInputValue) => setInputFrom(newInputValue)}
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
                <div className="bg-[#32d095] w-full text-white rounded-md  shadow-lg overflow-hidden mt-1 z-50">
                  {children}
                </div>
              )}
              renderOption={(props, option) => (
                <li
                  {...props}
                  className="mx-1 px-1 py-2 hover:bg-[#525371] cursor-pointer flex items-center justify-between "
                >
                  <div className="flex flex-col">
                    <div className="text-xs font-semibold text-white">
                      {option.city}, {option.country}
                    </div>
                    <div className="text-[11px] text-white/80">
                      {option.name}
                    </div>
                  </div>
                  <div className=" text-[#999999] text-[13px] font-bold">
                    {option.code}
                  </div>
                </li>
              )}
              sx={{ width: "100%", mt: 1 }}
            />
          )}
        </div>

        <div className="flex items-center gap-2 bg-[#EAF2FF] p-2 rounded-md mt-2">
          <CalendarMonthIcon fontSize="small" />
          <span className="text-sm">15 Apr 25</span>
        </div>
      </div>

      {/* PLANE ICON */}
      <div className="flex flex-col justify-center items-center text-[100px] relative">
        <div className="rotate-90 absolute -top-10">
          <FlightOutlinedIcon fontSize="inherit" className="text-[#32d095]" />
        </div>
        <div className="-rotate-90 absolute top-4">
          <FlightOutlinedIcon
            fontSize="inherit"
            stroke="#32d095"
            fill="#32d095"
            className="text-transparent"
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
              renderOption={(props, option) => (
                <li
                  {...props}
                  className="mx-1 px-1 py-2 hover:bg-[#525371] cursor-pointer flex items-center justify-between "
                >
                  <div className="flex flex-col">
                    <div className="text-xs font-semibold text-white">
                      {option.city}, {option.country}
                    </div>
                    <div className="text-[11px] text-white/80">
                      {option.name}
                    </div>
                  </div>
                  <div className=" text-[#999999] text-[13px] font-bold">
                    {option.code}
                  </div>
                </li>
              )}
              sx={{ width: "100%" }}
            />
          )}
        </div>

        <div className="flex items-center gap-2 bg-[#EAF2FF] p-2 rounded-md mt-2">
          <CalendarMonthIcon fontSize="small" />
          <span className="text-sm">17 Apr 25</span>
        </div>
      </div>
    </div>
  );
};

export default RoundWay;
