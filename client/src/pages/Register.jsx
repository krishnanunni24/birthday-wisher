import React from "react";
import Wrapper from "../components/wrapper/wrapper.jsx";
import RegisterForm from "../components/registerForm/registerForm.jsx";
import cadburryImg from "../assets/images/landing/cadburry_celebration_img.png"


const Register = ({page}) => {
  return (
    <Wrapper page={page}>
      <div className="absolute top-10 left-0 h-full   overflow-hidden">
        <img src={cadburryImg} alt="" />
        <div className="absolute bottom-20 w-full">
          <div className="flex justify-center text-white font-bold text-2xl">
            <p>Register to create</p>
          </div>
          <div className="flex-col justify-center px-14">
            <RegisterForm />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;
