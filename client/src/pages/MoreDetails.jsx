import React, { useEffect, useRef, useState } from "react";
import Wrapper from "../components/wrapper/wrapper";
import bgImg from "../assets/images/more-info/more-details-bg.png";
import MoreDetailsForm from "../components/moreDetailsForm/MoreDetailsForm";
import Button from "../components/registerForm/Button";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomErrorIcon from "../components/custom/customErrorIcon";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../context/context";
import { generateLyrics } from "../api/userRequests";

const MoreDetails = ({ page }) => {
  const [answerMore, setAnswerMore] = useState(false);
  const answerMoreRef = useRef();
  const { formData, dispatch  } = useFormData();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
    console.log("form submit");
    console.log(data);
    dispatch({ type: "UPDATE_FORM3", payload: data });
    const { form1Data, form2Data, form3Data} = formData;
    const wholeFormData = {
      ...form1Data,
      ...form2Data,
      ...form3Data,
    };
    console.log("whole form data collected", wholeFormData);
    dispatch({type:"UPDATE_WHOLE_FORM_DATA",payload:wholeFormData})
    try {
      const response = await generateLyrics(wholeFormData);
      console.log(response);
      dispatch({type:"UPDATE_LYRICS", payload:response.data.result})
      navigate("/lyrics")
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (answerMore) {
      console.log("scrolling");
      answerMoreRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [answerMore]);

  const errorCheck = (e) => {
    if (e && e.petname)
      toast.error(e.petname.message, {
        className: "custom-error-toast",
        icon: <CustomErrorIcon />,
      });
    else if (e && e.angry)
      toast.error(e.angry.message, {
        className: "custom-error-toast",
        icon: <CustomErrorIcon />,
      });
    else if (e && e.funniestThing)
      toast.error(e.funniestThing.message, {
        className: "custom-error-toast",
        icon: <CustomErrorIcon />,
      });
    else
      toast.error("All fields are required!", {
        className: "custom-error-toast",
        icon: <CustomErrorIcon />,
      });
  };

  const onAnswerMore = () => {
    console.log("onAnswerMore");
    setAnswerMore(!answerMore);
  };
  return (
    <Wrapper page={page}>
      <form onSubmit={handleSubmit(handleFormSubmit, errorCheck)}>
        <div className="absolute top-28 w-full h-full overflow-hidden">
          <div className="flex justify-center pt-5">
            <p className="text-white  text-center font-bold">
              Tell us a little more about them...
            </p>
          </div>
          <div className="relative px-24 h-full">
            <img src={bgImg} alt="Loading..." />
            <div className="absolute top-1/4  px-8 h-[400px] pb-28 left-0 flex-col w-full overflow-y-auto">
              <MoreDetailsForm
                register={register}
                answerMore={answerMore}
                setAnswerMore={setAnswerMore}
                ref={answerMoreRef}
              />
            </div>
          </div>
        </div>
        <div className="fixed bottom-5 flex justify-center gap-2 w-full items-center pt-8">
          <Button
            name="Answer More"
            handleClick={onAnswerMore}
            disabled={answerMore}
            backgroundColor="bg-purple-500"
            textColor="white"
          />
          <Button name="Proceed" type="Submit" textColor="background" />
        </div>
      </form>
    </Wrapper>
  );
};

export default MoreDetails;
