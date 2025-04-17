/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useLocation } from "react-router-dom";
import rawFlightData from "../data/oneway.json";
import { FlightCard } from "../components/FlightCard";
import TopNavbar from "../components/TopNavBar";

interface SearchParams {
  from: string;
  to: string;
  date: string;
}

interface Flight {
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
}

export const FlightList: React.FC = () => {
  const location = useLocation();
  const params = location.state as SearchParams;
  console.log(params);

  const mappedFlights: Flight[] = (rawFlightData as any[]).map((flight) => ({
    airline: flight.careerName,
    career: flight.career,
    code: flight.segments?.go?.[0]?.marketingflight || "N/A",
    from: flight.godeparture,
    to: flight.goarrival,
    fromAirport:
      flight.segments?.go?.[0]?.departureAirport || "Unknown Airport",
    toAirport: flight.segments?.go?.[0]?.arrivalAirport || "Unknown Airport",
    departure: flight.godepartureTime,
    arrival: flight.goarrivalTime,
    date: flight.godepartureDate,
    duration: flight.goflightduration,
    refundable: flight.refundable === "Refundable",
    class: flight.class,
    price: flight.customerPrice,
    originalPrice: flight.BasePrice + flight.Taxes,
    baggage: flight.bags,
  }));

  const filteredFlights = mappedFlights.filter(
    (flight) => flight.from === params.from && flight.to === params.to
  );

  return (
    <div className=" min-h-screen flex flex-col gap-4 container mx-auto">
      <div className="sticky top-0 z-50">
        <TopNavbar />
      </div>
      <div className="container mx-auto">
        <div className="p-6  min-h-screen w-[95%] max-w-[1200px] mx-auto">
          <h1 className="text-2xl font-bold mb-4">
            {params.from} → {params.to} on {params.date}
          </h1>
          {filteredFlights.length > 0 ? (
            filteredFlights.map((flight, index) => (
              <FlightCard key={index} flight={flight} />
            ))
          ) : (
            <p>No flights available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
