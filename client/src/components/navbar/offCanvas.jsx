import React, { useEffect } from "react";
import closeIcon from "../../assets/images/sideNav/closeButton.png";
import sideNavLogo from "../../assets/images/sideNav/sideNav_Logo.png";
const OffCanvas = ({ isOffcanvasOpen, handleClose }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOffcanvasOpen) {
        const offCanvas = document.querySelector(".offCanvas-content");
        const hamButton = document.querySelector(".ham-button");
        if (
          offCanvas &&
          !offCanvas.contains(event.target) &&
          event.target !== hamButton
        ) {
          // Click occurred outside the modal, so close it
          console.log("ham", hamButton);
          handleClose();
        }
      }
    };

    // Make sure to add the event listener to the button element, not the document body
    const hamButton = document.querySelector(".ham-button");
    hamButton.addEventListener("click", handleClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      hamButton.removeEventListener("click", handleClickOutside);
    };
  }, [isOffcanvasOpen, handleClose]);

  return (
    <>
      {isOffcanvasOpen ? (
        <div className="fixed top-0 left-0 h-full z-50  w-full backdrop-blur-md">
          <div className="relative h-full offCanvas-content">
            {/* off-canvas component */}
            <div className="fixed top-0 right-0 h-full w-3/5 z-50 bg-background">
              <button onClick={handleClose}>
                <img
                  src={closeIcon}
                  alt="close icon"
                  className="absolute top-5 right-5 w-10 h-10 cursor-pointer"
                />
              </button>

              <div className="flex flex-col justify-center h-full divide-y-2 divide-indigo-500">
                <div className="flex ps-4 justify-end px-2 text-lg font-extrabold text-white  border-t-violet-600 border-b-indigo-600 border-y-2 py-4">
                  <span className="flex justify-end">How to participate</span>
                </div>
                <div className="flex  ps-4 justify-end px-2 text-lg   font-extrabold text-white  border-t-violet-600 border-b-indigo-600 border-y-2 py-4">
                  <span className="flex justify-end">Terms & Conditions</span>
                </div>
                <div className="flex ps-4 justify-end px-2 text-lg   font-extrabold text-white  border-t-violet-600 border-b-indigo-600 border-y-2 py-4">
                  <span className="flex justify-end">Privacy Policy</span>
                </div>
                <div className="flex ps-4 justify-end px-2 text-lg  font-extrabold text-white  border-t-violet-600 border-b-indigo-600 border-y-2 py-4">
                  <span className="flex justify-end">Contact Us</span>
                </div>
              </div>

              <div className="w-full absolute bottom-1 bg-white px-10 py-3 ">
                <img src={sideNavLogo} alt="LOGO" className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default OffCanvas;
