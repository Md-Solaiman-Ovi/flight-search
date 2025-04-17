// import FlightSearchCard from "./FlightSearchCard";
import FlightSearchContainer from "../components/FlightSearchContainer";
import TopNavbar from "../components/TopNavBar";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";
import AirplaneTicketOutlinedIcon from "@mui/icons-material/AirplaneTicketOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import { useState } from "react";
import BookingTypeButton from "../components/BookingTypeButton";
import ImageCarousel from "../components/ImageCarousel";
import img1 from "../assets/sliderimg1.webp";
import img2 from "../assets/sliderimg2.webp";
import img3 from "../assets/sliderimg3.webp";
import img4 from "../assets/sliderimg4.webp";
import img5 from "../assets/sliderimg5.webp";

import HotDetails from "../components/HotDetails";

const images = [img1, img2, img3, img4, img5];

const Home = () => {
  const [bookingType, setBookingType] = useState<
    "flight" | "hotel" | "tour" | "visa" | "groupFare"
  >("flight");

  return (
    <div className="bg-[#EDF2F6] min-h-screen flex flex-col gap-4">
      <div className="sticky top-0 z-50">
        <TopNavbar />
      </div>
      <div className="container mx-auto">
        {/* Search Card */}
        <div
          className="h-auto bg-cover bg-top rounded-xl flex flex-col px-2 sm:px-4"
          style={{ backgroundImage: 'url("src/assets/mainbannerimg.webp")' }}
        >
          {/* Center Nav Tabs */}
          <div className="flex flex-wrap justify-around gap-2 sm:gap-4 bg-[#F4F6FA] py-1 rounded-full shadow-sm w-full max-w-[600px] mx-auto mt-10">
            <BookingTypeButton
              bookingType={"flight"}
              selected={bookingType}
              onClick={() => setBookingType("flight")}
              icon={<FlightOutlinedIcon />}
              label="FLIGHT"
            />
            <BookingTypeButton
              bookingType={"hotel"}
              selected={bookingType}
              onClick={() => setBookingType("hotel")}
              icon={<HomeWorkOutlinedIcon />}
              label="HOTEL"
            />
            <BookingTypeButton
              bookingType={"tour"}
              selected={bookingType}
              onClick={() => setBookingType("tour")}
              icon={<TravelExploreOutlinedIcon />}
              label="TOUR"
            />
            <BookingTypeButton
              bookingType={"visa"}
              selected={bookingType}
              onClick={() => setBookingType("visa")}
              icon={<AirplaneTicketOutlinedIcon />}
              label="VISA"
            />
          </div>

          <FlightSearchContainer />
        </div>

        {/* Ads */}
        <div className="w-[95%] max-w-[1200px] mx-auto flex p-6 my-5">
          <ImageCarousel images={images} />
        </div>

        {/* Hot deals */}
        <HotDetails bookingType={bookingType} setBookingType={setBookingType} />
      </div>
    </div>
  );
};

export default Home;
