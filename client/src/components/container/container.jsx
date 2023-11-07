import React, { useState } from "react";

const Container = ({
  title,
  shape,
  data,
  selectedOption,
  setSelectedOption,
}) => {
  const handleOptionClick = (i, {name}) => {
    if (i === selectedOption?.i) {
      // If the clicked option is already selected, deselect it
      setSelectedOption(null);
    } else {
      // Otherwise, select the clicked option and deselect the previous one
      setSelectedOption({i,name});
    }
  };

  return (
    <div
      className="flex flex-col px-1 mt-5 h-40
    3 pb-1 bg-secondary rounded-xl w-full"
    >
      <div className="flex mx-auto  h-8  text-background text-lg font-extrabold">
        {title}
      </div>
      <div
        className={`flex items-center h-full bg-background rounded-b-xl px-2 ${
          title === "Singer's Voice"
            ? "justify-center gap-5"
            : "justify-between"
        }`}
      >
        {data?.map((option, i) => {
          return (
              <div key={i} className="flex flex-col items-center">
                <div
                  id={option.name}
                  className={`w-11 h-11 flex justify-center items-center p-3 ${
                    shape === "round" ? "rounded-full" : "rounded-sm w-14"
                  } ${i === selectedOption?.i ? "bg-secondary" : "bg-white"}`}
                  onClick={() => handleOptionClick(i, option)}
                >
                  <img src={option.icon} alt="Loading..." />
                </div>
                <p className="flex justify-center text-white font-medium text-xs">
                  {option.name}
                </p>
              </div>
          );
        })}
      </div>
    </div>
  );
};

export default Container;
