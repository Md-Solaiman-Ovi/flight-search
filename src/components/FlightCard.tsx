import React from "react";
import { FaSuitcase } from "react-icons/fa";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import BSlogo from "../assets/BS.png";

interface FlightCardProps {
  flight: {
    airline: string;
    career: string;
    code: string;
    from: string;
    to: string;
    fromAirport: string;
    toAirport: string;
    departure: string;
    arrival: string;
    date: string;
    duration: string;
    refundable: boolean;
    class: string;
    price: number;
    originalPrice: number;
    baggage: string;
  };
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  return (
    <div className="flex bg-white rounded-xl shadow p-4 items-center  gap-4  container mx-auto">
      <div className="flex flex-col gap-4 w-full">
        <div className="grid grid-cols-4 items-center gap-4 text-sm">
          {/* Left side - Airline */}
          <div className="flex flex-col justify-start gap-1 w-1/4">
            <div className="w-10 h-10 rounded-full border-2 border-red-500">
              <img
                src={BSlogo}
                alt="Airline Logo"
                className="object-contain h-full w-full rounded-full"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#32d095] whitespace-nowrap">
                {flight.airline}
              </p>
              <p className="text-xs text-gray-600">
                {flight.career}-{flight.code}
              </p>
            </div>
          </div>
          <div className="text-start">
            <p className="text-[#32d095] text-3xl font-semibold">
              {flight.from}
            </p>
            <p className="text-[15px]">{flight.fromAirport}</p>
            <p className="text-sm font-semibold">{flight.departure}</p>
            <p className="text-xs text-gray-500">{flight.date}</p>
          </div>

          {/* Plane Icon */}
          <div className="flex flex-col justify-center items-center text-[100px] relative">
            <div className="rotate-90 absolute -top-10">
              <FlightOutlinedIcon
                fontSize="inherit"
                className="text-[#32d095]"
              />
            </div>
          </div>

          <div className="text-end">
            <p className="text-[#32d095] text-3xl font-semibold">{flight.to}</p>
            <p className="text-[15px]">{flight.toAirport}</p>
            <p className="text-sm font-semibold">{flight.arrival}</p>
            <p className="text-xs text-gray-500">{flight.date}</p>
          </div>
        </div>

        <div className=" grid grid-cols-4 items-center">
          <div>
            <p className="text-xs text-gray-500">{flight.duration}</p>
            <p className="text-xs text-gray-500">NON STOP</p>
          </div>
          <p className="text-xs text-gray-500">
            {flight.refundable ? "Refundable" : "Non-refundable"}
          </p>
          <p className="text-xs text-center text-gray-500">
            Class- {flight.class}
          </p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <FaSuitcase className="text-green-600 text-sm" />
            <p className="text-xs">{flight.baggage}</p>
          </div>
        </div>
      </div>
      {/* Right side - Price & Button */}
      <div className="flex flex-col justify-center items-end text-right  w-1/6 border-l-[1px]">
        <p className="text-green-600 text-xl font-bold">
          ৳ {flight.price.toLocaleString()}
        </p>
        <p className="text-sm line-through text-gray-400">
          ৳ {flight.originalPrice.toLocaleString()}
        </p>
        <button className="mt-2 px-4 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg">
          BOOK NOW
        </button>
        <p className="text-xs text-gray-500 mt-1">FLIGHT DETAILS ▶</p>
      </div>
    </div>
  );
};
