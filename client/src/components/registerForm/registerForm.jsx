import React, { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Input from "./input";
import CheckBox from "./checkBox";
import OtpModal from "./otpModal";
import Button from "./Button";
import { phoneNoRules, emailRules, nameRules } from "../../data/formRules";
import { generateOtp, registerUser } from "../../api/userRequests";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../../context/context";
import CustomErrorIcon from "../custom/customErrorIcon";

const RegisterForm = () => {
  const [formData, setFormData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    shouldFocusError: false,
  });
  const { dispatch } = useFormData();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (FormData, e) => {
    e.preventDefault();

    if (checkBox1 && checkBox2) {
      setFormData(FormData);
      try {
        const { data } = await generateOtp(FormData.phoneNumber);
        console.log("otp generated:", data);
        openModal();
      } catch (err) {
        console.log(err);
        console.log("OTP generation error:",err);
        if(err.response?.status === 429){ return toast.error("You have reached the maximum attempt! try again later", {
          autoClose: 2000,
          progressBar: false,
          className: "custom-error-toast",
          icon: <CustomErrorIcon />,
        }) } else{
        toast.error("Enter a Valid Phone number", {
          autoClose: 2000,
          toastId: "custom-toast-id",
          progressBar: false,
          className: "custom-error-toast",
          icon: <CustomErrorIcon />,
        });}
      }
      //
    } else {
      toast.error("Accept terms & Conditions", {
        autoClose: 2000,
        toastId: "custom-toast-id",
        progressBar: false,
        className: "custom-error-toast",
        icon: <CustomErrorIcon />,
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCheck1Click = () => {
    setCheckBox1(!checkBox1);
  };

  const handleCheck2Click = () => {
    setCheckBox2(!checkBox2);
  };

  const FormSubmit = async () => {
    try {
      const { data } = await registerUser(formData);

      if (data) dispatch({ type: "LOGGED_IN", payload: formData });
      toast.success("Logged In!", {
        autoClose: 2000,
        toastId: "custom-toast-id",
        progressBar: false,
        className: "custom-success-toast",
      });
      navigate("/birthday-info");
      console.log("response", data);
    } catch (err) {
      console.log("error", err);
    }
  };

  const onError = (err, e) => {
    console.log("error", err);
    console.log("e", e);
    document.activeElement.blur();
    e.preventDefault();

    if (err && err.emailId) {
      toast.error(err.emailId.message, {
        autoClose: 2000,
        progressBar: false,
        toastId: "custom-toast-id",
        className: "custom-error-toast",
        icon: <CustomErrorIcon />,
      }); // Set autoClose to false
    } else if (err.fullName) {
      toast.error(err.fullName.message, {
        autoClose: 2000,
        progressBar: false,
        toastId: "custom-toast-id",
        className: "custom-error-toast",
        icon: <CustomErrorIcon />,
      });
    } else if (err.phoneNumber) {
      toast.error(err.phoneNumber.message, {
        autoClose: 2000,
        progressBar: false,
        toastId: "custom-toast-id",
        className: "custom-error-toast",
        icon: <CustomErrorIcon />,
      });
    }
  };

  return (
    <div className="flex-col">
      <form onSubmit={handleSubmit(handleFormSubmit, onError)}>
        <Input
          name="phoneNumber"
          type="number"
          placeholder="Phone Number"
          register={register}
          rules={phoneNoRules}
        />
        <Input
          name="fullName"
          placeholder="Full Name"
          type="text"
          register={register}
          rules={nameRules}
        />
        <Input
          name="emailId"
          placeholder="Email Id"
          type="text"
          register={register}
          rules={emailRules}
        />
        <CheckBox
          id="ripple-on"
          label="I accept Terms & Conditions and Privacy Policy of Mondelez(Cadbury)"
          checked={checkBox1}
          onChange={handleCheck1Click}
        />
        <CheckBox
          id="ripple-off"
          label="I would like to receive promotional communication from Mondelez(Cadbury) about its products and offers."
          checked={checkBox2}
          onChange={handleCheck2Click}
        />
        <Button name="Submit" type="Submit" />
      </form>
      <OtpModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        FormSubmit={FormSubmit}
        phone={formData?.phoneNumber}
      />
    </div>
  );
};

export default RegisterForm;
