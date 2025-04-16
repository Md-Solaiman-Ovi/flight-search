/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface BookingTypeButtonProps {
  bookingType: string;
  selected: string;
  onClick: () => void;
  icon?: React.ReactNode;
  label: string;
}

const BookingTypeButton: React.FC<BookingTypeButtonProps> = ({
  bookingType,
  selected,
  onClick,
  icon,
  label,
}) => {
  const isFlight = bookingType === "flight";

  return (
    <button
      onClick={onClick}
      className={`px-4 rounded-full text-xs flex items-center transition-all duration-300 ${
        bookingType === selected
          ? "bg-[#28C76F] text-white font-semibold"
          : "text-[#28C76F]"
      }`}
    >
      <span
        className={`pr-1 ${isFlight ? "rotate-45" : ""} ${
          bookingType === selected ? "text-white" : "text-[#525371]"
        }`}
      >
        {icon}
      </span>
      {label}
    </button>
  );
};

export default BookingTypeButton;
