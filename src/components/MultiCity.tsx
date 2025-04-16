import React, { useState } from "react";
import { Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import AddIcon from "@mui/icons-material/Add";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const MultiCity: React.FC = () => {
  const [segments, setSegments] = useState([
    { from: "DAC", to: "CXB", date: "15 Apr 25" },
  ]);

  const handleAddSegment = () => {
    setSegments([...segments, { from: "", to: "", date: "" }]);
  };

  const handleRemoveSegment = (index: number) => {
    const updated = segments.filter((_, i) => i !== index);
    setSegments(updated);
  };

  return (
    <div className="relative z-10 flex justify-between">
      <div className="bg-white rounded-xl w-full">
        {segments.map((segment, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between mb-4 gap-4 w-full"
          >
            {/* FROM */}
            <div className="col-span-3 flex flex-col text-start">
              <p className="text-center text-sm text-gray-500">FROM</p>
              <h2 className="text-4xl font-bold text-center text-[#32d095]">
                DAC
              </h2>
              <div className="flex items-center gap-2 bg-[#EAF2FF] p-2 rounded-md mt-2">
                <LocationOnIcon fontSize="small" />
                <span className="text-sm">
                  Hazrat Shahjalal Intl Airport (DAC)
                </span>
              </div>
            </div>

            {/* Icon */}
            <div className="col-span-3 flex flex-col justify-center items-center text-[100px] relative">
              <div className=" bg-inherit rotate-90 absolute  ">
                <FlightOutlinedIcon
                  fontSize="inherit"
                  className="text-[#32d095]"
                />
              </div>
            </div>
            <div className="col-span-3 relative">
              <p className="text-center text-sm text-gray-500">TO</p>
              <h2 className="text-4xl font-bold text-center text-[#32d095]">
                CXB
              </h2>
              <div className="flex items-center gap-2 bg-[#EAF2FF] p-2 rounded-md mt-2">
                <LocationOnIcon fontSize="small" />
                <span className="text-sm">Cox’s Bazar Airport (CXB)</span>
              </div>
              <div className="flex items-center gap-2 bg-[#EAF2FF] p-2 rounded-md mt-2">
                <CalendarMonthIcon fontSize="small" />
                <span className="text-sm">17 Apr 25</span>
              </div>
              {/* Remove Button */}
              {index > 0 && (
                <div
                  onClick={() => handleRemoveSegment(index)}
                  className="absolute top-0 right-0 cursor-pointer"
                >
                  <CancelOutlinedIcon className="text-red-500" />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add Segment */}
        <div className="flex justify-start">
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleAddSegment}
          >
            Add City
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MultiCity;
