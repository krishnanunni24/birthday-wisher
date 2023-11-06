import React, { useEffect } from "react";
import "../../assets/css/pagination.css";

const Pagination = ({page}) => {
  useEffect(() => {
    const boxes = document.querySelectorAll(".box");

    // Function to update box colors based on completed pages
    function updateProgressBar(completedPages) {
      boxes.forEach((box, index) => {
        if (index < completedPages) {
          box.style.backgroundColor = "#e7b464";
          box.style.border="none";
        } else {
          box.style.backgroundColor = "#3b0085";
        }
      });
    }

    // Example: If 3 pages are completed, call this function with 3 as the argument.
    updateProgressBar(page);
  }, []);

  return (
    <div className="flex justify-between p-10 px-20 w-full">
      <div className="box" id="box1"></div>
      <div className="box" id="box2"></div>
      <div className="box" id="box3"></div>
      <div className="box" id="box4"></div>
      <div className="box" id="box5"></div>
      <div className="box" id="box6"></div>
    </div>
  );
};

export default Pagination;
