import React from "react";
import BookingTypeButton from "./BookingTypeButton";
import img6 from "../assets/hotdealflightimg1.webp";
import img7 from "../assets/hotdealflightimg2.webp";
import img8 from "../assets/hotdealflightimg3.webp";
import { Dispatch, SetStateAction } from "react";

const hotDealImg1 = [img6, img7, img8];

interface HotDetailsProps {
  bookingType: "flight" | "hotel" | "tour" | "visa" | "groupFare";
  setBookingType: Dispatch<
    SetStateAction<"flight" | "hotel" | "tour" | "visa" | "groupFare">
  >;
}

const HotDetails: React.FC<HotDetailsProps> = ({
  bookingType,
  setBookingType,
}) => {
  return (
    <div className="w-[95%] max-w-[1200px] mx-auto p-6">
      <div className="flex justify-between items-center ">
        <div className="text-2xl font-bold">Hot Details</div>
        <div className="flex">
          <div className="flex flex-wrap justify-center sm:gap-4 bg-[#F4F6FA] px-2 sm:px-4 py-1 rounded-full shadow-sm w-full max-w-[550px] mx-auto">
            <BookingTypeButton
              bookingType="flight"
              selected={bookingType}
              onClick={() => setBookingType("flight")}
              label="FLIGHT"
            />
            <BookingTypeButton
              bookingType="groupFare"
              selected={bookingType}
              onClick={() => setBookingType("groupFare")}
              label="GROUP FARE"
            />
            <BookingTypeButton
              bookingType="tour"
              selected={bookingType}
              onClick={() => setBookingType("tour")}
              label="TOUR"
            />
            <BookingTypeButton
              bookingType="visa"
              selected={bookingType}
              onClick={() => setBookingType("visa")}
              label="VISA"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 my-10">
        {hotDealImg1.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Slide ${idx}`}
            className="object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default HotDetails;
