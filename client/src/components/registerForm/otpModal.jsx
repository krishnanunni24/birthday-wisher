import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { generateOtp, submitOtp } from "../../api/userRequests";
import { useNavigate } from "react-router-dom";
import CustomErrorIcon from "../custom/customErrorIcon";
import { toast } from "react-toastify";

const OtpModal = ({ closeModal, isModalOpen, phone, FormSubmit }) => {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleOtpChange = (event, index) => {
    const { value } = event.target;
    const newOtp = otp.split("");

    if (value.length > 1) {
      // If the user pastes multiple characters
      for (let i = 0; i < value.length; i++) {
        if (newOtp[index + i] !== undefined) {
          newOtp[index + i] = value.charAt(i);
        }
      }
    } else {
      newOtp[index] = value;
    }

    setOtp(newOtp.join(""));

    // Move focus to the next input field
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    if(isModalOpen){
      inputRefs.current[0].focus(); 
    }
    // Add a click event listener to the document body
    const handleClickOutside = (event) => {
      if (isModalOpen) {
        console.log("modal is open");
        const modal = document.querySelector(".modal-content");
        const submitButton = document.querySelector(".submit-button");
        if (
          modal &&
          !modal.contains(event.target) &&
          event.target !== submitButton
        ) {
          closeModal();
        }
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [isModalOpen, closeModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    if (!otp)
      return toast.error("Enter the OTP you received as sms", {
        autoClose: 2000,
        progressBar: false,
        className: "custom-error-toast",
        icon: <CustomErrorIcon />,
      });
    const Data = {
      otp,
      phone,
    };
    try {
      const { data } = await submitOtp(Data);
      if (data.message === "otp verified") {
        FormSubmit();
      } else {
        setOtp("");
        toast.error("otp incorrect", {
          autoClose: 2000,
          toastId: "custom-toast-id",
          progressBar: false,
          className: "custom-error-toast",
          icon: <CustomErrorIcon />,
        });
      }
    } catch (err) {
      console.error("otp submit failed", err);
      toast.error("otp Incorrect!", {
        toastId:"custom-toast-id",
        autoClose: 2000,
        progressBar: false,
        className: "custom-error-toast",
        icon: <CustomErrorIcon />,
      });
    }
  };
  const GenerateOtp = async () => {
    try {
      const { data } = await generateOtp(phone);
      console.log("otp generated:", phone);
      toast.success("New Otp generated!", {
        toastId:"custom-toast-id",
        className: "custom-success-toast",
        autoClose: 2000,
        preventDuplicates: true,
        progressBar: false,
      });
      inputRefs.current[0].focus(); 
    } catch (err) {
      console.log("OTP generation error:",err);
      if(err.response?.status === 429){ return toast.error("You have reached the maximum attempt! try again later", {
        autoClose: 2000,
        progressBar: false,
        className: "custom-error-toast",
        icon: <CustomErrorIcon />,
      }) }else {
      toast.error("Enter a Valid Phone number", {
        autoClose: 2000,
        progressBar: false,
        className: "custom-error-toast",
        icon: <CustomErrorIcon />,
      });
    }
    }
  };

  return (
    <>
      {isModalOpen ? (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none backdrop-blur-md">
          <div className="w-auto modal-content">
            <div className="h-60 rounded-xl px-12 bg-white py-3 text-center">
              <h1 className="text-2xl font-bold">Enter OTP</h1>

              <form>
              <div
                id="otp"
                className="mt-5 flex flex-row justify-center px-2 text-center"
              >

                <input
                  ref={(ref) => (inputRefs.current[0] = ref)}
                  className="form-control m-2 h-10 w-10 rounded border text-center bg-background text-secondary font-bold focus:border-secondary focus:border-4"
                  type="number"
                  value={otp.charAt(0) || ""}
                  maxLength="1"
                  onChange={(e) => handleOtpChange(e, 0)}
                />
                <input
                  ref={(ref) => (inputRefs.current[1] = ref)}
                  className="form-control m-2 h-10 w-10 rounded border text-center bg-background text-secondary font-bold focus:border-secondary focus:border-4"
                  type="number"
                  value={otp.charAt(1) || ""}
                  maxLength="1"
                  onChange={(e) => handleOtpChange(e, 1)}
                />
                <input
                  ref={(ref) => (inputRefs.current[2] = ref)}
                  className="form-control m-2 h-10 w-10 rounded border text-center bg-background text-secondary font-bold focus:border-secondary focus:border-4"
                  type="number"
                  value={otp.charAt(2) || ""}
                  maxLength="1"
                  onChange={(e) => handleOtpChange(e, 2)}
                />
                <input
                  ref={(ref) => (inputRefs.current[3] = ref)}
                  className="form-control m-2 h-10 w-10 rounded border text-center bg-background text-secondary font-bold focus:border-secondary focus:border-4"
                  type="number"
                  value={otp.charAt(3) || ""}
                  maxLength="1"
                  onChange={(e) => handleOtpChange(e, 3)}
                />
              </div>
              <a
                onClick={() => {
                  GenerateOtp();
                }}
                className="flex justify-end text-background  font-bold text-sm underline pe-3"
              >
                Resent OTP
              </a>

              <div className="flex justify-center pt-2">
                <Button handleClick={handleSubmit} name="Submit" type="submit"/>
              </div>
                  </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default OtpModal;
