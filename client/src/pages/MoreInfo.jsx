import React, { useState } from "react";
import Wrapper from "../components/wrapper/wrapper";
import BgImg from "../assets/images/more-info/background_img.png";
import Container from "../components/container/container";
import { Genre, mood, singerVoice } from "../data/options";
import Button from "../components/registerForm/Button";
import { toast } from "react-toastify";
import CustomErrorIcon from "../components/custom/customErrorIcon";
import { useFormData } from "../context/context";
import { useNavigate } from "react-router-dom";

const MoreInfo = ({page}) => {
  
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const { formData, dispatch } = useFormData();
  const navigate = useNavigate()

  const onInfoSubmit = () => {
    console.log("submited");
    if(selectedGender && selectedMood && selectedGenre){
       console.log("gender:",selectedGender,"mood:",selectedMood,"genre:",selectedGenre)
       const data = {gender:selectedGender.name,mood:selectedMood.name,genre:selectedGenre.name}
       dispatch({type:"UPDATE_FORM2",payload : data})
       navigate("/more-details")
    }else{
      console.log("gender:",selectedGender,"mood:",selectedMood,"genre:",selectedGenre)
      toast.error("Selection Required for all fields!",{
        className:"custom-error-toast",
        icon:<CustomErrorIcon/>
      })
  };
  }


  return (
    <Wrapper page={page}>
      <div className="absolute top-28 w-full h-full overflow-hidden">
        <div className="flex justify-center pt-5">
          <p className="text-white  text-center font-bold">
            What would you like their song's <br /> vibe to be?
          </p>
        </div>
        <div className="relative px-24 h-full">
          <img src={BgImg} alt="Loading..." />
          <div className="absolute top-1/4  px-8 h-[400px] pb-28 left-0 flex-col w-full overflow-y-auto">
            <Container
              data={mood}
              title="Mood"
              shape="round"
              selectedOption={selectedMood}
              setSelectedOption={setSelectedMood}
            />
            <Container
              data={Genre}
              title="Genre"
              shape="round"
              selectedOption={selectedGenre}
              setSelectedOption={setSelectedGenre}
            />
            <Container
              data={singerVoice}
              title="Singer's Voice"
              shape="square"
              selectedOption={selectedGender}
              setSelectedOption={setSelectedGender}
            />
          </div>
        </div>
        <div className="fixed bottom-0 flex justify-center w-full  h-36 items-center">
          <Button name="Proceed" handleClick={onInfoSubmit} />
        </div>
      </div>
    </Wrapper>
  );
};

export default MoreInfo;
