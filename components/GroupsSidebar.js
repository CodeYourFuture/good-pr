"use client";

import { useState, useEffect } from "react";
import SidebarLogo from "@components/SidebarLogo";
import SidebarDashboard from "@components/SidebarDashboard";
// import SidebarDarkMode from "@components/SidebarDarkMode";
import { FiMenu } from "react-icons/fi";

export default function GroupsSidebar() {
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Initial check
    checkIsMobile();

    // Event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const handleBurgerMenuClick = () => {
    setShowSidebar(!showSidebar);
  };

  if (isMobile) {
    return (
      <div className="relative">
        <div
          className=" flex fixed space-x-6 p-6 bg-local bg-[#1A1E1F]  
         bg-repeat-x w-full m-0 h-24 z-50 items-center"
        >
          <FiMenu
            size={40} // Increase the size to 40
            className="cursor-pointer text-[#606467] mr-2 
            "
            onClick={handleBurgerMenuClick}
          />
          <SidebarLogo className="w-auto h-8" />
        </div>
        <div
          className={`fixed z-20 first-letter:top-0 left-0 w-56 h-full bg-black bg-opacity-50 transform transition-transform duration-300 ${
            showSidebar ? "translate-x-0 w-1/3" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center gap-10 pt-14 p-4 h-full min-w-sm bg-[#1A1E1F] text-white">
            <SidebarDashboard />
            {showSidebar && (
              <>
                {/* <SidebarDarkMode /> */}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-10 pt-14 p-4 md:h-full min-w-sm bg-[#1A1E1F] text-white">
      <SidebarLogo className="w-auto h-8" /> {/* Adjust the desired size */}
      <SidebarDashboard />
      {/* <SidebarDarkMode /> */}
    </div>
  );
}
