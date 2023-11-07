import React, { useState } from "react";
import Input from "../registerForm/input";
import { useForm } from "react-hook-form";
import downArrow from "../../assets/images/birthday_info/arrow-down.png";
import upArrow from "../../assets/images/birthday_info/arrow-up.png";
import Button from "../registerForm/Button";
import { toast } from "react-toastify";
import CustomErrorIcon from "../custom/customErrorIcon";
import { nameRules } from "../../data/formRules";
import { useFormData } from "../../context/context";
import { useNavigate } from "react-router-dom";
const BirthdayInfoForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [age, setAge] = useState(24);
  const [selectedValue, setSelectedValue] = useState("Male");
  const { formData, dispatch } = useFormData();
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
  };

  const onFormSubmit = ({ name }, ) => {

    const data = {
      name: name,
      gender: selectedValue,
      age: age,
    };
    dispatch({ type: "UPDATE_FORM1", payload: data });
    navigate("/more-info");
  };

  const errorCheck = () => {
    if (errors && errors.name) {
      toast.error(errors.name.message, {
        autoClose:2000,
        progressBar:false,
        className: "custom-error-toast",
        icon: <CustomErrorIcon />,
      });
    }
  };

  const Decrement = () => {
    if (age > 1) {
      setAge(age - 1);
    }
  };

  const Increment = () => {
    if (age < 151) {
      setAge(age + 1);
    }
  };

  return (
    <div className="px-12">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <Input
          name="name"
          placeholder="xxxxxx xxxxxxxxxxx"
          type="text"
          register={register}
          rules={nameRules}
        />

        <label className="justify-center flex text-white text-base py-4 font-bold w-full ">
          How old they'll be this birthday
        </label>

        <div className="relative h-10 w-full min-w-[200px]">
          <div className="absolute  top-2/4 right-3 grid h-15 w-15 -translate-y-2/4 place-items-center text-blue-gray-500">
            <div className="flex">
              <button onClick={Decrement} type="button">
                <img src={downArrow} alt="" className="h-2 px-2" />
              </button>
              <button onClick={Increment} type="button">
                <img
                  src={upArrow}
                  alt=""
                  className="h-2 px-2"
                 
                />
              </button>
            </div>
          </div>
          <input
            className="w-full rounded-full border bg-gray-200 py-3 px-5 text-md font-bold leading-none text-background placeholder-gray-400"
            value={age}
            readOnly
          />
        </div>

        <label className="justify-center flex text-white text-base py-4 font-bold w-full ">
          Gender
        </label>

        <div className="relative h-10 w-full min-w-[200px]">
          <div className="absolute  top-2/4 right-3 grid h-15 w-15 -translate-y-2/4 place-items-center text-blue-gray-500">
            <img src={downArrow} alt="" className="h-2 px-2" />
          </div>
          <select
            data-submit="false"
            onChange={handleSelectChange}
            value={selectedValue}
            className="appearance-none  w-full rounded-full border text-md  font-bold  bg-gray-200 py-3 px-5  leading-none text-gray-800 placeholder-background"
          >
            <option value="Male" defaultValue>
              Male
            </option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex justify-center py-4">
          <Button name="Proceed" handleClick={errorCheck} type="Submit" />
        </div>
      </form>
    </div>
  );
};

export default BirthdayInfoForm;
