import React, { useEffect, useState } from "react";
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
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState(null);
  const {userData,dispatch} = useFormData()
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkBox1, setCheckBox1] = useState(false);
  const [checkBox2, setCheckBox2] = useState(false);
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
        toast.error("Enter a Valid Phone number");
      }
      //
    }
  };

  const errorCheck = (e) => {
    if (errors && errors.emailId) {
      toast.error(errors.emailId.message, {
        autoClose: true,
        closeOnClick: true,
      }); // Set autoClose to false
    } else if (errors.fullName) {
      toast.error(errors.fullName.message, {
        autoClose: true,
        closeOnClick: true,
      });
    } else if (errors.phoneNumber) {
      toast.error(errors.phoneNumber.message, {
        autoClose: true,
        closeOnClick: true,
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
      
      if (data)
      dispatch({type:"LOGGED_IN",payload:formData})
        toast.success("Logged In!", {
         autoClose:true,
         closeOnClick:true ,
          className:"custom-success-toast"    
        })
          navigate("/birthday-info");
      console.log("response", data);
    } catch (err) {
      console.log("error",err);
    }
  };

  return (
    <div className="flex-col">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
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
        <Button name="Submit" type="Submit" handleClick={errorCheck} />
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
