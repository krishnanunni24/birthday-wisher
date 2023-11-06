import React from "react";

const Button = ({
  name,
  type,
  handleClick,
  backgroundColor,
  textColor,
  disabled,
  icon,
}) => {
  const buttonStyle = `px-4 py-2 ${
    !disabled && backgroundColor ? backgroundColor : "bg-secondary"
  } ${
    textColor && `text-${textColor}`
  } ${
    disabled && `bg-slate-400`
  }
   rounded-xl font-bold submit-button`;

  return (
    <div className="flex justify-center pt-2">
      <button
        onClick={handleClick && handleClick}
        type={type && type}
        disabled={disabled && disabled}
        className={buttonStyle}
      >
        <span className="flex items-center">
          {name}
          {icon && (
            <span>
              <img className="bg-blue-100" src={icon} alt="" />
            </span>
          )}
        </span>
      </button>
    </div>
  );
};

export default Button;
