import React from "react";
import Wrapper from "../components/wrapper/wrapper";
import Button from "../components/registerForm/Button";
import { useFormData } from "../context/context";
import { useNavigate } from "react-router-dom";
import { generateLyrics, generateSong } from "../api/userRequests";
import CustomErrorIcon from "../components/custom/customErrorIcon";
import { toast } from "react-toastify";

const Lyrics = ({page}) => {
  const { formData, dispatch  } = useFormData();
  const {lyrics}=formData

  const navigate = useNavigate();

  const RecreateLyrics =async () => {
    const {wholeFormData}=formData
    try {
      const response = await generateLyrics(wholeFormData);
      console.log(response);
      dispatch({type:"UPDATE_LYRICS", payload:response.data.result})
      toast.success("Lyrics Recreated!",{
        className:"custom-success-toast"
      })
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!Recreation failed",{
        className:"custom-error-toast",
        icon:<CustomErrorIcon/>
      })
    }
  };
  
  const createSong = async() => {
    console.log("creaating soooong",lyrics)
    try{
      let response = await generateSong(lyrics)
      console.log("song generated:",response)
      const url = URL.createObjectURL(new Blob([response.data]));
       dispatch({type:"UPDATE_AUDIO_URL",payload:url})
       toast.success("Song generated",{
        className:"custom-success-toast",
       })
       navigate("/ready")
    }catch(err){
    console.error(err)
    }
  };

  

  return (
    <Wrapper page={page}> 
      <div className="absolute top-28 w-full h-full overflow-hidden">
        <div className="flex justify-center pt-5">
          <p className="text-white  text-center font-bold">
            Your song's lyrics are ready!
          </p>
        </div>
        <div className="flex relative h-full px-8  py-5 justify-center">
          <div className="h-2/3 w-full px-3 py-4 rounded-2xl bg-white overflow-auto">
            <p className="text-black">{lyrics}</p>
          </div>
          <div className="fixed bottom-0 flex justify-center gap-2 w-full  h-36 items-center pt-8">
            <Button
              name="Recreate Lyrics"
              handleClick={RecreateLyrics}
              backgroundColor="bg-purple-500"
              textColor="white"
            />
            <Button
              name="Create Song"
              handleClick={createSong}
              textColor="background"
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Lyrics;
