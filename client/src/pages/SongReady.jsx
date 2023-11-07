import React from "react";
import Wrapper from "../components/wrapper/wrapper";
import Button from "../components/registerForm/Button";
import bgImg from "../assets/images/ready/success_card_bg.png";
import shareIcon from "../assets/images/ready/share-icon.png";
import downloadIcon from "../assets/images/ready/download-icon.png";
import { useFormData } from "../context/context";

const SongReady = ({page}) => {

  const { formData, dispatch  } = useFormData();
  const {lyrics,audioUrl}=formData

  const redeemGift = () => {console.log(formData)};
  const createAgain = () => {};
  const handleShare = () => {};

  const handleDownload = () => {
    console.log("handleDownload")
    console.log(audioUrl)
    if (audioUrl) {
      console.log("audioUrl is there")
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = 'audio.mp3';
      a.click();
    }
  };

  return (
    <Wrapper page={page}>
      <div className="absolute top-28 w-full h-full overflow-hidden">
        <div className="flex justify-center pt-5">
          <p className="text-white  text-center font-bold">
            Your unique song is ready!
          </p>
        </div>
        <div className="flex relative h-full px-8  py-5 justify-center">
          <div className="h-2/3 w-full flex-col p-0.5  pb-16 rounded-3xl bg-secondary">
            <div className="h-full w-full rounded-3xl rounded-b-none  bg-background ">
              <div className="flex-col px-8 py-10">
                <img src={bgImg} alt="" />
              </div>
              <div className="px-3">
                <p className="text-center text-white font-medium text-lg">
                  It's your boy.gotta give a shoutout to Ronit.
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <span className="border-e-background border-e-4  w-full">
                <Button name="Share" textColor="background" icon={shareIcon} />
              </span>
              
              <span  className="border-e-background w-full">
                <Button
                  type="button"
                  textColor="background"
                  name="Download"
                  handleClick={handleDownload}
                  icon={downloadIcon}
                  iconSize={"h-10 w-10"}
                />
              </span>
            </div>
          </div>

          <div className="fixed  bottom-5 flex justify-center gap-2 w-full  items-center">
            <Button
              name="Redeem Gift"
              handleClick={redeemGift}
              textColor="background"
            />
            <Button
              name="Create Again"
              handleClick={createAgain}
              textColor="background"
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SongReady;
