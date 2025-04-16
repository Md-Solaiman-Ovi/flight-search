// src/components/TopNavbar.tsx
import React from "react";
import { Box, Button } from "@mui/material";

const TopNavbar: React.FC = () => {
  return (
    <div className=" bg-white shadow-md">
      <div className="flex items-center justify-between px-8 py-4  max-w-[1200px] mx-auto">
        {/* Logo image */}
        <Box sx={{ flexGrow: 1 }}>
          <img
            src="src\assets\companylogo.webp"
            alt="Fly Far Tech Logo"
            style={{ height: 70 }}
          />
        </Box>

        {/* Right Buttons */}
        <div className="flex items-center gap-4 ">
          <Button
            variant="contained"
            style={{ backgroundColor: "#28C76F" }}
            className="text-white font-semibold capitalize"
          >
            Travel Agency
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#6C63FF" }}
            className="text-white font-semibold capitalize"
          >
            Login / Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
