import React, { useState } from "react";
import icon1 from "../../assets/images/navbar/navbar_icon1.png";
import icon2 from "../../assets/images/navbar/navbar_icon2.png";
import HamBurger from "./hamburger";
import OffCanvas from "./offCanvas";

const Navbar = () => {
  const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);

  const handleHamClick = () => {
    isOffcanvasOpen?
    setOffcanvasOpen(false):setOffcanvasOpen(true)
  };


  return (
    <>
    
    <div className="flex justify-between h-14 bg-[#1f0044] px-3">
      <div className="flex gap-3">
        <a href="#" className="flex px-2 py-2">
          <img src={icon1} alt="" />
        </a>
        <a href="#" className="flex px-2 py-2">
          <img src={icon2} alt="" />
        </a>
      </div>
        <OffCanvas isOffcanvasOpen={isOffcanvasOpen} handleClose={handleHamClick}/>

        <HamBurger handleClick={handleHamClick}/>
  
       
    
    </div>
    </>
  );
};

export default Navbar;
